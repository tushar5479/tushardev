import { NextRequest, NextResponse } from "next/server";
import { portfolio } from "@/data/portfolio";
import { type ContactResponse, validateContactInput } from "@/lib/contact-validation";

export const runtime = "nodejs";
export const maxDuration = 15;

const MAX_BODY_BYTES = 32 * 1024;
const PROVIDER_TIMEOUT_MS = 10_000;

function respond(body: ContactResponse, status: number, extraHeaders: Record<string, string> = {}) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", ...extraHeaders },
  });
}

class BodyTooLargeError extends Error {}

/** Bound bytes as they arrive; Content-Length alone can be absent or misleading. */
async function readJsonBody(request: NextRequest): Promise<unknown> {
  if (!request.body) throw new SyntaxError("Missing body");

  const reader = request.body.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let bytes = 0;
  let text = "";

  try {
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      bytes += chunk.value.byteLength;
      if (bytes > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new BodyTooLargeError();
      }
      text += decoder.decode(chunk.value, { stream: true });
    }
    text += decoder.decode();
  } finally {
    reader.releaseLock();
  }

  return JSON.parse(text) as unknown;
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin || request.headers.get("sec-fetch-site") === "cross-site") {
    return respond({ ok: false, error: "This request could not be accepted." }, 403);
  }
  try {
    const originUrl = new URL(origin);
    // Next.js can normalize nextUrl to an internal hostname. The HTTP Host
    // header identifies the host the browser actually requested, including
    // a development port. Never derive this from X-Forwarded-Host.
    const requestHost = request.headers.get("host") || request.nextUrl.host;
    if (
      !["http:", "https:"].includes(originUrl.protocol) || originUrl.username || originUrl.password ||
      originUrl.pathname !== "/" || originUrl.search || originUrl.hash ||
      originUrl.host !== requestHost.toLowerCase()
    ) {
      return respond({ ok: false, error: "This request could not be accepted." }, 403);
    }
  } catch {
    return respond({ ok: false, error: "This request could not be accepted." }, 403);
  }

  const contentType = request.headers.get("content-type")?.split(";", 1)[0]?.trim().toLowerCase();
  if (contentType !== "application/json") {
    return respond({ ok: false, error: "Please submit the form as JSON." }, 415);
  }

  const contentLength = request.headers.get("content-length");
  if (contentLength && (!/^\d+$/.test(contentLength) || Number(contentLength) > MAX_BODY_BYTES)) {
    return respond({ ok: false, error: "This message is too large. Please shorten it." }, 413);
  }

  let input: unknown;
  try {
    input = await readJsonBody(request);
  } catch (error) {
    if (error instanceof BodyTooLargeError) {
      return respond({ ok: false, error: "This message is too large. Please shorten it." }, 413);
    }
    return respond({ ok: false, error: "The form could not be read. Please try again." }, 400);
  }

  // Quietly discard honeypot submissions without contacting the email provider.
  if (
    typeof input === "object" && input !== null && !Array.isArray(input) &&
    "_gotcha" in input && typeof input._gotcha === "string" && input._gotcha.trim().length > 0
  ) {
    return respond({ ok: true }, 200);
  }

  const validation = validateContactInput(input);
  if (!validation.ok) return respond(validation, 400);

  const formId = process.env.FORMSPREE_FORM_ID?.trim();
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();
  if (!formId || !/^[a-zA-Z0-9]{4,80}$/.test(formId) || !siteKey || !/^[a-zA-Z0-9_-]{10,128}$/.test(siteKey)) {
    return respond({
      ok: false,
      error: "The contact form is not configured yet. Please use the email link instead.",
    }, 503);
  }

  if (!validation.data.turnstileToken?.trim()) {
    return respond({ ok: false, error: portfolio.contact.securityCheckRequired }, 403);
  }

  let referer: string;
  try {
    const canonical = new URL(portfolio.siteUrl);
    if (!["http:", "https:"].includes(canonical.protocol) || canonical.username || canonical.password) throw new Error("Invalid canonical origin");
    referer = `${canonical.origin}/`;
  } catch {
    return respond({ ok: false, error: "The contact form is not configured yet. Please use the email link instead." }, 503);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), PROVIDER_TIMEOUT_MS);

  try {
    const response = await fetch(`https://formspree.io/f/${formId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json", Referer: referer },
      // These fields are constructed here; visitors cannot override recipients,
      // sender headers, notification subject, or provider/template settings.
      body: JSON.stringify({
        name: validation.data.name,
        email: validation.data.email,
        subject: portfolio.contact.notificationSubject,
        project_subject: validation.data.subject,
        sender_notice: portfolio.contact.notificationNotice,
        message: validation.data.message,
        _gotcha: "",
        "cf-turnstile-response": validation.data.turnstileToken,
      }),
      signal: controller.signal,
      cache: "no-store",
      redirect: "error",
    });

    if (!response.ok) {
      if (response.status === 429) {
        const retry = response.headers.get("retry-after");
        const seconds = retry && /^\d{1,5}$/.test(retry) ? Math.min(Math.max(Number(retry), 1), 3600) : 60;
        await response.body?.cancel();
        return respond({ ok: false, error: "Too many attempts. Please wait a little and try again." }, 429, { "Retry-After": String(seconds) });
      }
      const failure: unknown = await response.json().catch(() => null);
      if (typeof failure === "object" && failure !== null && "errors" in failure && Array.isArray(failure.errors)) {
        const captchaFailed = failure.errors.some((item: unknown) => {
          if (typeof item !== "object" || item === null) return false;
          const field = "field" in item && typeof item.field === "string" ? item.field : "";
          const code = "code" in item && typeof item.code === "string" ? item.code : "";
          return /captcha|turnstile/i.test(field) || /captcha|turnstile/i.test(code);
        });
        if (captchaFailed) return respond({ ok: false, error: portfolio.contact.securityCheckError }, 403);
      }
      return respond({
        ok: false,
        error: "Your message could not be delivered. Please try again or use the email link.",
      }, 502);
    }

    await response.body?.cancel();
    return respond({ ok: true }, 200);
  } catch {
    if (controller.signal.aborted) {
      return respond({
        ok: false,
        error: "Delivery timed out. Please try again in a moment or use the email link.",
      }, 504);
    }
    return respond({
      ok: false,
      error: "Your message could not be delivered. Please try again or use the email link.",
    }, 502);
  } finally {
    clearTimeout(timeout);
  }
}
