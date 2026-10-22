"use client";

import { ArrowUpRight, CheckCircle2, LoaderCircle, Send } from "lucide-react";
import { useCallback, useRef, useState, type FormEvent } from "react";
import { portfolio } from "@/data/portfolio";
import { validateContactInput, type ContactFieldErrors, type ContactResponse } from "@/lib/contact-validation";
import { Reveal } from "./motion";
import { ContactChallenge } from "./contact-challenge";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [turnstileToken, setTurnstileToken] = useState("");
  const [challengeResetKey, setChallengeResetKey] = useState(0);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() || "";
  const updateChallengeToken = useCallback((token: string) => {
    setTurnstileToken(token);
    if (token) setMessage(current => current === portfolio.contact.securityCheckRequired ? "" : current);
  }, []);
  const submittingRef = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending" || submittingRef.current) return;
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    const validation = validateContactInput(values);
    if (!validation.ok) {
      setErrors(validation.fieldErrors || {}); setStatus("error"); setMessage(validation.error);
      const first = Object.keys(validation.fieldErrors || {})[0];
      if (first) (form.elements.namedItem(first) as HTMLInputElement)?.focus();
      return;
    }
    setErrors({});
    if (siteKey && !turnstileToken) {
      setStatus("error"); setMessage(portfolio.contact.securityCheckRequired);
      form.querySelector<HTMLElement>("#contact-security-check")?.focus();
      return;
    }
    submittingRef.current = true;
    setStatus("sending"); setMessage("");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...validation.data, ...(turnstileToken ? { turnstileToken } : {}) }), signal: AbortSignal.timeout(15000) });
      const data = await response.json() as ContactResponse;
      if (!response.ok || !data.ok) {
        setErrors(data.fieldErrors || {}); setStatus("error");
        setMessage(response.status === 503 ? portfolio.contact.unconfigured : data.error || portfolio.contact.error);
        return;
      }
      setStatus("success"); setMessage(portfolio.contact.success); form.reset();
    } catch { setStatus("error"); setMessage(portfolio.contact.error); }
    finally {
      submittingRef.current = false;
      setTurnstileToken("");
      setChallengeResetKey(key => key + 1);
    }
  }
  return <section id="contact" className="contact-section section" aria-labelledby="contact-heading"><div className="container contact-layout">
    <Reveal className="contact-copy"><p className="eyebrow">{portfolio.contact.eyebrow}</p><h2 id="contact-heading">{portfolio.contact.heading}<br /><span className="serif accent">{portfolio.contact.headingAccent}</span><span className="contact-heading-arrow" aria-hidden="true">↗</span></h2><p>{portfolio.contact.description}</p><div className="contact-email"><span className="card-number">{portfolio.contact.emailLabel}</span><a href={`mailto:${portfolio.email}`}>{portfolio.email}<ArrowUpRight size={19} /></a></div><div className="contact-socials"><span className="card-number">{portfolio.contact.socialsLabel}</span><div>{portfolio.socials.map(social => <a className="text-link" key={social.name} href={social.href} target="_blank" rel="noopener noreferrer">{social.name}<ArrowUpRight size={16} /></a>)}</div></div></Reveal>
    <Reveal className="contact-form-card" delay={0.1}><h3>{portfolio.contact.formTitle}</h3><form ref={formRef} onSubmit={submit} noValidate>
      <div className="form-row"><div className="form-field"><label htmlFor="name">{portfolio.contact.nameLabel}</label><input id="name" name="name" autoComplete="name" placeholder={portfolio.contact.namePlaceholder} minLength={2} maxLength={100} required aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />{errors.name && <span id="name-error" className="field-error">{errors.name}</span>}</div><div className="form-field"><label htmlFor="email">{portfolio.contact.emailFieldLabel}</label><input id="email" name="email" type="email" autoComplete="email" placeholder={portfolio.contact.emailPlaceholder} maxLength={254} required aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />{errors.email && <span id="email-error" className="field-error">{errors.email}</span>}</div></div>
      <div className="form-field"><label htmlFor="subject">{portfolio.contact.subjectLabel}</label><input id="subject" name="subject" placeholder={portfolio.contact.subjectPlaceholder} minLength={2} maxLength={160} required aria-invalid={!!errors.subject} aria-describedby={errors.subject ? "subject-error" : undefined} />{errors.subject && <span id="subject-error" className="field-error">{errors.subject}</span>}</div>
      <div className="form-field"><label htmlFor="message">{portfolio.contact.messageLabel}</label><textarea id="message" name="message" rows={4} placeholder={portfolio.contact.messagePlaceholder} minLength={10} maxLength={5000} required aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />{errors.message && <span id="message-error" className="field-error">{errors.message}</span>}</div>
      <div className="honeypot" aria-hidden="true"><label htmlFor="website">Leave this field empty</label><input name="_gotcha" id="website" autoComplete="off" tabIndex={-1} /></div>
      <ContactChallenge siteKey={siteKey} onToken={updateChallengeToken} resetKey={challengeResetKey} />
      <button className="button button-primary submit-button" type="submit" disabled={status === "sending"}>{status === "sending" ? portfolio.contact.sending : portfolio.contact.submit}{status === "sending" ? <LoaderCircle size={17} className="spin" /> : <Send size={16} />}</button>
      <p className="form-privacy">{portfolio.contact.privacy}</p><div className={`form-status ${status}`} role="status" aria-live="polite" aria-atomic="true">{status === "success" && <CheckCircle2 size={19} />}{message}</div>
    </form></Reveal>
  </div></section>;
}
