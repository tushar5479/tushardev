import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire, stripTypeScriptTypes } from "node:module";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const project = fileURLToPath(new URL("../", import.meta.url));
const requireFromProject = createRequire(path.join(project, "package.json"));
const { NextRequest } = requireFromProject("next/server");

function tsModuleUrl(relativePath, aliases = {}) {
  const filename = path.join(project, relativePath);
  const source = readFileSync(filename, "utf8");
  const stripped = stripTypeScriptTypes(source).replace(/from "([^"]+)"/g, (_, id) => {
    const resolved = aliases[id] ?? pathToFileURL(requireFromProject.resolve(id)).href;
    return `from ${JSON.stringify(resolved)}`;
  });
  return "data:text/javascript;base64," + Buffer.from(stripped).toString("base64");
}

const validationUrl = tsModuleUrl("lib/contact-validation.ts");
const portfolioUrl = tsModuleUrl("data/portfolio.ts");
const validation = await import(validationUrl);
const { portfolio } = await import(portfolioUrl);
const { POST } = await import(tsModuleUrl("app/api/contact/route.ts", { "@/lib/contact-validation": validationUrl, "@/data/portfolio": portfolioUrl }));
const good = { name: " Tanvir Tushar ", email: "hello@example.com", subject: " A new project ", message: "Let's build something thoughtful.", _gotcha: "", turnstileToken: "test-turnstile-token" };

assert.equal(validation.validateContactInput(good).data.name, "Tanvir Tushar");
assert.equal(validation.validateContactInput(good).data.subject, "A new project");
assert.equal(validation.validateContactInput({ ...good, name: "ab", subject: "ab", message: "a".repeat(10) }).ok, true);
assert.equal(validation.validateContactInput({ ...good, name: "a".repeat(100), subject: "a".repeat(160), message: "a".repeat(5000) }).ok, true);
for (const malformed of [null, [], "hello", 42]) {
  assert.equal(validation.validateContactInput(malformed).ok, false);
}
for (const [field, value] of [
  ["name", "a"], ["name", "a".repeat(101)], ["name", 12],
  ["email", "broken@example"], ["email", "a".repeat(245) + "@example.com"],
  ["subject", "a"], ["subject", "a".repeat(161)],
  ["message", "short"], ["message", "a".repeat(5001)],
]) {
  assert.equal(validation.validateContactInput({ ...good, [field]: value }).ok, false, field);
}
assert.equal(validation.validateContactInput({ ...good, _gotcha: {} }).ok, false);
assert.equal(validation.validateContactInput({ ...good, name: "তানভীর তুষার", email: "hello+portfolio@example.co.uk", message: "First line.\r\n\tSecond line with https://example.com and <code>." }).ok, true);
assert.equal(validation.validateContactInput({ ...good, email: `${"a".repeat(64)}@example.com` }).ok, true);
for (const field of ["name", "email", "subject"]) {
  for (const control of ["\r", "\n", "\t", "\u0000", "\u007f", "\u202e", "\u2066"]) {
    assert.equal(validation.validateContactInput({ ...good, [field]: control + good[field] }).ok, false, `${field} must reject raw controls before trimming`);
  }
}
for (const email of ["Name <hello@example.com>", "a@example.com,b@example.com", "a@example.com;b@example.com", "a..b@example.com", ".a@example.com", "a@-example.com", "a@example-.com", "a@exam_ple.com", "a@example.123", `${"a".repeat(65)}@example.com`]) {
  assert.equal(validation.validateContactInput({ ...good, email }).ok, false, email);
}
assert.equal(validation.validateContactInput({ ...good, message: "Text with\u0000 control." }).ok, false);
for (const turnstileToken of [{}, "x".repeat(2049), "bad\r\ntoken"]) {
  const result = validation.validateContactInput({ ...good, turnstileToken });
  assert.equal(result.ok, false);
  assert.equal(result.fieldErrors, undefined);
}
assert.equal(validation.validateContactInput({ ...good, turnstileToken: "x".repeat(2048) }).ok, true);
const injected = { ...good, subject: "Password reset for your account", from: "admin@example.com", to: "victim@example.com", cc: "cc@example.com", bcc: "bcc@example.com", _subject: "An urgent invoice", html: "<a href='https://evil.example'>Pay</a>", _next: "https://evil.example", template: "evil" };
assert.deepEqual(Object.keys(validation.validateContactInput(injected).data).sort(), ["name", "email", "subject", "message", "_gotcha", "turnstileToken"].sort());

function request(body = good, overrides = {}) {
  const { headers, raw, ...rest } = overrides;
  return new NextRequest("http://localhost:3000/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", host: "localhost:3000", origin: "http://localhost:3000", ...headers },
    body: raw ?? JSON.stringify(body),
    ...rest,
  });
}

const originalFetch = globalThis.fetch;
const originalFormId = process.env.FORMSPREE_FORM_ID;
const originalSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
let fetchCalls = 0;
globalThis.fetch = async () => {
  fetchCalls += 1;
  throw new Error("Unexpected outbound request");
};

try {
  delete process.env.FORMSPREE_FORM_ID;
  delete process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  assert.equal((await POST(request())).status, 503);
  assert.equal((await POST(request({ ...good, name: "a" }))).status, 400);
  assert.equal((await POST(request(good, { raw: "{" }))).status, 400);
  assert.equal((await POST(request(good, { headers: { origin: "https://other.example" } }))).status, 403);
  assert.equal((await POST(request(good, { headers: { origin: "null" } }))).status, 403);
  assert.equal((await POST(request(good, { headers: { origin: "ftp://localhost:3000" } }))).status, 403);
  assert.equal((await POST(request(good, { headers: { origin: "http://localhost:3000/path" } }))).status, 403);
  assert.equal((await POST(request(good, { headers: { origin: "http://user@localhost:3000" } }))).status, 403);
  assert.equal((await POST(request(good, { headers: { "sec-fetch-site": "cross-site" } }))).status, 403);
  assert.equal((await POST(request(good, { headers: { origin: "https://other.example", "x-forwarded-host": "other.example" } }))).status, 403);
  assert.equal((await POST(request(good, { headers: { "content-type": "text/plain" } }))).status, 415);
  assert.equal((await POST(request(good, { headers: { "content-length": "32769" } }))).status, 413);
  assert.equal((await POST(request(good, { raw: "x".repeat(32769) }))).status, 413);
  assert.equal((await POST(request(good, { raw: "x".repeat(32769), headers: { "content-length": "8" } }))).status, 413);
  assert.equal((await POST(request(good, { raw: JSON.stringify({ ...good, message: "😀".repeat(9000) }) }))).status, 413);
  assert.equal((await POST(request(good, { raw: new Uint8Array([0xc3]) }))).status, 400);
  assert.equal((await POST(request({ _gotcha: "spam" }))).status, 200);
  assert.equal((await POST(request({ _gotcha: "" }))).status, 400);
  assert.equal(fetchCalls, 0, "Invalid and honeypot submissions must never reach the provider");

  process.env.FORMSPREE_FORM_ID = "abcd1234";
  assert.equal((await POST(request())).status, 503, "Bot protection must be configured before sending");
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = "0x4AAAAATESTPUBLICKEY";
  const withoutToken = { ...good };
  delete withoutToken.turnstileToken;
  assert.equal((await POST(request(withoutToken))).status, 403);
  assert.equal((await POST(request({ ...good, turnstileToken: "   " }))).status, 403);
  assert.equal((await POST(request({ ...good, turnstileToken: "bad\nvalue" }))).status, 400);
  const noOrigin = request();
  noOrigin.headers.delete("origin");
  assert.equal((await POST(noOrigin)).status, 403);
  assert.equal(fetchCalls, 0, "Missing Origin/configuration/token must never reach the provider");
  globalThis.fetch = async (url, init) => {
    assert.equal(url, "https://formspree.io/f/abcd1234");
    assert.equal(init.method, "POST");
    assert.equal(init.redirect, "error");
    assert.equal(JSON.parse(init.body).name, "Tanvir Tushar");
    assert.equal(JSON.parse(init.body)._gotcha, "");
    assert.equal(init.headers.Referer, `${new URL(portfolio.siteUrl).origin}/`);
    assert.equal(JSON.parse(init.body).subject, "[Tanvir Portfolio] New contact message");
    assert.equal(JSON.parse(init.body)["cf-turnstile-response"], good.turnstileToken);
    assert.deepEqual(Object.keys(JSON.parse(init.body)).sort(), ["name", "email", "subject", "project_subject", "sender_notice", "message", "_gotcha", "cf-turnstile-response"].sort());
    return new Response(null, { status: 200 });
  };
  const success = await POST(request());
  assert.equal(success.status, 200);
  assert.deepEqual(await success.json(), { ok: true });
  assert.equal(success.headers.get("cache-control"), "no-store");

  let delivered;
  globalThis.fetch = async (_url, init) => { delivered = JSON.parse(init.body); return new Response(null, { status: 200 }); };
  assert.equal((await POST(request(injected, { headers: { referer: "https://evil.example" } }))).status, 200);
  assert.equal(delivered.subject, portfolio.contact.notificationSubject);
  assert.equal(delivered.project_subject, injected.subject);
  assert.equal(delivered.sender_notice, portfolio.contact.notificationNotice);
  for (const key of ["from", "to", "cc", "bcc", "_subject", "html", "_next", "template", "turnstileToken"]) assert.equal(key in delivered, false, key);

  // Production Next.js may normalize nextUrl to localhost even when a browser
  // requested 127.0.0.1. Compare Origin with the actual HTTP Host header.
  const normalizedUrl = request(good, {
    headers: { host: "127.0.0.1:3000", origin: "http://127.0.0.1:3000" },
  });
  assert.equal(normalizedUrl.nextUrl.host, "localhost:3000");
  assert.equal((await POST(normalizedUrl)).status, 200);
  assert.equal((await POST(request(good, {
    headers: { host: "127.0.0.1:3000", origin: "http://localhost:3000" },
  }))).status, 403);

  globalThis.fetch = async () => new Response(null, { status: 422 });
  assert.equal((await POST(request())).status, 502);
  globalThis.fetch = async () => Response.json({ errors: [{ field: "cf-turnstile-response", code: "CAPTCHA_FAILED", message: "Private provider details" }] }, { status: 422 });
  const captchaFailure = await POST(request());
  assert.equal(captchaFailure.status, 403);
  assert.equal((await captchaFailure.text()).includes("Private provider details"), false);
  for (const [provided, expected] of [["120", "120"], ["99999", "3600"], ["nonsense", "60"]]) {
    globalThis.fetch = async () => new Response(null, { status: 429, headers: { "Retry-After": provided } });
    const limited = await POST(request());
    assert.equal(limited.status, 429);
    assert.equal(limited.headers.get("retry-after"), expected);
  }
  globalThis.fetch = async () => { throw new Error("network detail must stay private"); };
  const networkFailure = await POST(request());
  assert.equal(networkFailure.status, 502);
  assert.equal((await networkFailure.text()).includes("network detail"), false);

  globalThis.fetch = async (_url, init) => new Promise((_resolve, reject) => {
    init.signal.addEventListener("abort", () => reject(new Error("aborted")), { once: true });
  });
  assert.equal((await POST(request())).status, 504);

  process.env.FORMSPREE_FORM_ID = "https://untrusted.example";
  assert.equal((await POST(request())).status, 503);
  process.env.FORMSPREE_FORM_ID = "abcd1234";
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = "https://untrusted.example";
  assert.equal((await POST(request())).status, 503);
  console.log("Contact checks passed: control/header injection, one-mailbox validation, notification allowlist/fixed subject, Origin, bounded body, honeypot, Turnstile forwarding/rejection, provider rate limit/failure, and timeout. Provider responses are mocked; no external email sent.");
} finally {
  globalThis.fetch = originalFetch;
  if (originalFormId === undefined) delete process.env.FORMSPREE_FORM_ID;
  else process.env.FORMSPREE_FORM_ID = originalFormId;
  if (originalSiteKey === undefined) delete process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  else process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = originalSiteKey;
}
