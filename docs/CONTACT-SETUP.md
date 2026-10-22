# Contact form setup

Intended recipient, confirmed by the owner: **tushartanvirrahman99@gmail.com**.

The owner supplied the Formspree endpoint, and its form ID is now configured in the local ignored `.env.local`. The public Turnstile site key and matching secret in Formspree are still missing, so real delivery is **not active or verified**. Provider activation, verified-recipient configuration, live CAPTCHA behavior, and provider-to-inbox delivery still need confirmation. No local configuration, provider credentials, real form ID, or live CAPTCHA key is bundled in the delivery archive.

```text
Visitor → Turnstile widget → POST /api/contact → validation → Formspree CAPTCHA/spam checks → owner inbox
```

## 1. Get your Formspree endpoint

This step is complete for the current local workspace. These instructions are retained for a fresh installation or a replacement form; do not recreate the existing form just to continue setup.

1. [Sign in or sign up at Formspree](https://formspree.io/) and verify your email.
2. In the dashboard choose **New Form** and name it **Tanvir Portfolio**.
3. Set the email recipient to **tushartanvirrahman99@gmail.com**. In **Workflow → Email**, use that verified Linked Email; finish any inbox verification requested.
4. Open **Integration** and copy **Your form's endpoint**, such as `https://formspree.io/f/abcd1234`.
5. The application needs just the ID, `abcd1234` in this example. Use the actual ID from your account.

Official references: [create a form and locate its endpoint](https://help.formspree.io/articles/building-your-form/building-an-html-form), [configure the recipient](https://help.formspree.io/articles/form-and-project-settings/changing-a-form-email-address/).

## 2. Enable spam protection with Turnstile

Follow [Formspree's official Turnstile guide](https://help.formspree.io/articles/form-and-project-settings/protecting-your-forms-with-cloudflare-turnstile):

1. In the [Cloudflare dashboard](https://dash.cloudflare.com/), open Turnstile and add a widget for this portfolio. Choose Managed mode.
2. Add the portfolio's real hostname, initially `tanvir-portfolio-7mn7.vercel.app`. For local testing, allow `localhost` and open the local site at `http://localhost:3000`; use a hostname allowed by that widget. Add any exact preview hostname you intend to test.
3. Copy the **Site Key** for the application's public environment variable.
4. In Formspree's form settings, keep **CAPTCHA protection enabled**, select **Cloudflare Turnstile**, and save the corresponding **Secret Key there**. The secret stays in Formspree; the app does not need it.
5. Keep provider spam filtering enabled. Do not enable an autoresponder that repeats untrusted visitor content.

The app passes the token as `cf-turnstile-response`; Formspree verifies it once. Do not also call Cloudflare Siteverify for that same token. The widget clears expired tokens and resets after every network submission attempt so retries obtain a fresh token. Missing form ID or public site key produces an honest `503` and no provider call. A missing token is rejected before forwarding; Formspree rejects invalid tokens when its Turnstile setting is configured correctly.

## 3. Set application configuration

For a fresh installation, create `.env.local` beside `package.json` by copying `.env.example`, then set the values below. In the current local workspace, the supplied form ID is already saved; preserve it and add the public Turnstile site key after completing section 2.

```dotenv
FORMSPREE_FORM_ID=your_actual_form_id
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_public_turnstile_site_key
NEXT_PUBLIC_SITE_URL=https://tanvir-portfolio-7mn7.vercel.app
```

The form ID is a server-side identifier, not a provider API key. The site key is intentionally public. The Turnstile secret belongs only in the provider dashboard. `.env.local` is gitignored and excluded from the delivery archive.

Restart development after changing configuration. Rebuild and restart production, or redeploy Vercel: `NEXT_PUBLIC_*` values are embedded into the browser bundle at build time. Configure the three variables in each intended Vercel environment before deploying; use separate preview forms/widgets if required. See [Vercel environment variables](https://vercel.com/docs/environment-variables).

## 4. Sender identity and phishing precautions

- Keep Formspree's default provider-managed sending address. The app never accepts visitor-controlled `from`, `to`, `cc`, `bcc`, redirect, HTML-template, or other provider settings.
- Notification subject is fixed by the server: **[Tanvir Portfolio] New contact message**. A visitor's topic appears as `project_subject` in the message fields and cannot replace that inbox subject.
- The validated visitor email becomes Reply-To through Formspree's `email` field. It is **unverified visitor information**, not proof of identity. A fixed notice in each notification identifies that limitation.
- User text remains field data. The app does not build HTML email from submitted markup. Keep the provider's default notification rendering; do not add an unescaped custom HTML template.
- Avoid sending visitors their own content automatically. Review unexpected links, payment requests, and identity claims before acting on a message.

These controls reduce automated spam and misleading notification headers. They do not guarantee that a human-submitted message contains no phishing attempt or that a typed email belongs to its submitter.

Official references: [notification subject](https://help.formspree.io/articles/building-your-form/email-subject-line), [Reply-To](https://help.formspree.io/articles/building-your-form/email-reply-to-address), [provider-managed From domain](https://help.formspree.io/articles/advanced-features/setting-email-domain).

## 5. Domain filtering and request limits

The API requires a valid same-host HTTP(S) Origin, rejects cross-site fetches, validates only allowed fields, and bounds all incoming JSON to 32 KiB, including streamed bodies. A honeypot quietly discards obvious bots. These checks complement CAPTCHA; Origin can be forged by non-browser clients and is not authentication.

The server sets the outgoing Referer from the configured canonical `NEXT_PUBLIC_SITE_URL`, after validating the incoming Origin. If enabling Formspree's **Restrict to Domain**, use that canonical hostname and test delivery afterwards. The route does not forward an arbitrary visitor Referer. Domain filtering remains supplementary, because headers are not proof of a human visitor. See [Formspree domain restrictions](https://help.formspree.io/articles/form-and-project-settings/restrict-to-domain).

Formspree rate limits are returned as `429` with a bounded Retry-After header. The app does not claim a process-local counter is a deployment-wide rate limiter. Add a suitable `/api/contact` limit in the hosting firewall for production traffic when needed; CAPTCHA and provider filtering still remain necessary.

## 6. Verify actual delivery

1. Finish both provider configurations, set the real values, and rebuild/restart or redeploy.
2. Open the contact form on an allowed hostname and complete its security check.
3. Submit a meaningful test using an email address you control; leave the hidden honeypot blank.
4. Confirm the success state, the Formspree dashboard entry, and the email in **tushartanvirrahman99@gmail.com** (including Spam).
5. Verify the fixed notification subject, provider From address, visitor topic and message, and intended Reply-To.
6. Retry after an expired/failed challenge and confirm typed content is preserved. Invalid CAPTCHA must not deliver a notification.

HTTP success means provider acceptance, not guaranteed inbox delivery. Current automated tests use controlled provider responses and send no external email. Live Turnstile behavior and inbox delivery remain unverified until this account configuration and real test are complete. Browser automation is currently blocked by its URL security policy, so no alternate browser route was used to bypass it.

## Validation and responses

Names and topics accept ordinary Unicode text but reject header-breaking controls and bidi overrides. Email must be one practical ASCII mailbox, not a display name or recipient list. Messages allow paragraphs, tabs, URLs, and code as text but reject unsafe control characters.

| Field | Limits |
| --- | --- |
| `name` | 2–100 characters |
| `email` | One mailbox; local part up to 64, total up to 254 characters |
| `subject` | 2–160 characters; forwarded only as visitor topic |
| `message` | 10–5,000 characters |
| `_gotcha` | Leave empty |
| `turnstileToken` | Required for delivery; string up to 2,048 characters |

| Status | Meaning |
| --- | --- |
| `200` | Provider accepted, or honeypot quietly discarded |
| `400` | Invalid fields, token format, or malformed JSON |
| `403` | Missing/invalid Origin, cross-site request, missing token, or provider CAPTCHA rejection |
| `413` | Body exceeds 32 KiB |
| `415` | Content-Type is not JSON |
| `429` | Provider rate limit; wait before retrying |
| `502` | Provider rejection or network failure |
| `503` | Missing/invalid form ID, public site key, or canonical configuration |
| `504` | Provider exceeded the ten-second timeout |

Failures preserve the visitor's form values. Run `npm run test:contact`, `npm run typecheck`, and `npm run build` after changing the integration.
