"use client";

import Script from "next/script";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState } from "react";
import { portfolio } from "@/data/portfolio";

type TurnstileOptions = {
  sitekey: string;
  theme: "auto" | "dark" | "light";
  size: "flexible" | "compact";
  action: string;
  "response-field": boolean;
  "refresh-expired": "auto";
  "refresh-timeout": "auto";
  callback: (token: string) => void;
  "expired-callback": () => void;
  "timeout-callback": () => void;
  "error-callback": () => boolean;
  "unsupported-callback": () => void;
};

type TurnstileApi = {
  render: (container: HTMLElement, options: TurnstileOptions) => string | undefined;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

type ContactChallengeProps = {
  siteKey: string;
  onToken: (token: string) => void;
  resetKey: number;
};

export function ContactChallenge({ siteKey, onToken, resetKey }: ContactChallengeProps) {
  const { resolvedTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const previousResetRef = useRef(resetKey);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);
  const [widgetVersion, setWidgetVersion] = useState(0);
  const [size, setSize] = useState<"flexible" | "compact">("compact");
  const [phase, setPhase] = useState<"loading" | "ready" | "error">("loading");
  const theme = resolvedTheme === "dark" || resolvedTheme === "light" ? resolvedTheme : "auto";

  useEffect(() => {
    const container = containerRef.current;
    if (!siteKey || !container) return;
    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setShouldLoad(true);
        observer.disconnect();
      }
    }, { rootMargin: "400px" });
    observer.observe(container);
    return () => observer.disconnect();
  }, [siteKey]);

  useEffect(() => {
    const container = widgetRef.current;
    if (!siteKey || !container) return;
    const updateSize = () => setSize(container.getBoundingClientRect().width >= 300 ? "flexible" : "compact");
    updateSize();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(updateSize);
    observer.observe(container);
    return () => observer.disconnect();
  }, [siteKey]);

  useEffect(() => {
    const api = window.turnstile;
    const container = widgetRef.current;
    if (!siteKey || !shouldLoad || !scriptReady || !api || !container) return;
    let active = true;
    let widgetId: string | undefined;
    const clearToken = () => {
      if (!active) return;
      onToken("");
      setPhase("loading");
    };
    const fail = () => {
      if (!active) return;
      onToken("");
      setPhase("error");
    };
    onToken("");
    setPhase("loading");
    try {
      widgetId = api.render(container, {
        sitekey: siteKey,
        theme,
        size,
        action: "portfolio_contact",
        "response-field": false,
        "refresh-expired": "auto",
        "refresh-timeout": "auto",
        callback: token => {
          if (!active) return;
          onToken(token);
          setPhase("ready");
        },
        "expired-callback": clearToken,
        "timeout-callback": clearToken,
        "error-callback": () => { fail(); return true; },
        "unsupported-callback": fail,
      });
      if (widgetId === undefined) throw new Error("Challenge could not initialize");
      widgetIdRef.current = widgetId;
    } catch {
      fail();
    }
    return () => {
      active = false;
      widgetIdRef.current = null;
      onToken("");
      if (widgetId !== undefined) api.remove(widgetId);
    };
  }, [siteKey, shouldLoad, scriptReady, theme, size, widgetVersion, onToken]);

  const resetChallenge = useCallback(() => {
    onToken("");
    setPhase("loading");
    const api = window.turnstile;
    const widgetId = widgetIdRef.current;
    if (!api) {
      setPhase("error");
      return;
    }
    if (widgetId === null) {
      setWidgetVersion(version => version + 1);
      return;
    }
    try {
      api.reset(widgetId);
    } catch {
      setPhase("error");
    }
  }, [onToken]);

  useEffect(() => {
    if (previousResetRef.current === resetKey) return;
    previousResetRef.current = resetKey;
    resetChallenge();
  }, [resetKey, resetChallenge]);

  if (!siteKey) return null;

  return <div
    ref={containerRef}
    id="contact-security-check"
    className="contact-challenge"
    role="group"
    aria-label={portfolio.contact.securityCheckLabel}
    aria-describedby={phase !== "ready" ? "contact-security-status" : undefined}
    tabIndex={-1}
    onFocusCapture={() => setShouldLoad(true)}
  >
    <span className="contact-challenge-label">{portfolio.contact.securityCheckLabel}</span>
    <div ref={widgetRef} className="contact-challenge-widget" />
    {phase !== "ready" && <p id="contact-security-status" className="contact-challenge-status" role="status" aria-live="polite">
      {phase === "error" ? portfolio.contact.securityCheckError : portfolio.contact.securityCheckLoading}
    </p>}
    {phase === "error" && scriptReady && <button type="button" className="text-link contact-challenge-retry" onClick={resetChallenge}>{portfolio.contact.securityCheckRetry}</button>}
    {shouldLoad && <Script
      id="contact-turnstile"
      src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
      strategy="afterInteractive"
      onReady={() => setScriptReady(true)}
      onError={() => { onToken(""); setPhase("error"); }}
    />}
  </div>;
}
