# Verification

Audited the optimized local production build on 16 October 2026, before the later project additions, workspace photo, editorial hero, and contact-security changes. The scores below are the saved typography-refinement audit, not a fresh audit of the current site. These measurements do not represent a deployed Vercel URL.

| Category | Mobile | Desktop |
| --- | ---: | ---: |
| Performance | 95 | 100 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

Lighthouse version: 12.8.2. Mobile LCP: 3.0 s; mobile cumulative layout shift: 0. Browser and hosting conditions can change future results.

## Earlier full-site checks

- `npm run build`: production compilation, TypeScript, and static route generation passed.
- `npm run typecheck`: passed.
- `npm run test:contact`: passed; covers validation boundaries, request limits, malformed JSON, Host/Origin normalization, offsite origins, honeypot handling, mocked provider acceptance/rejection, network failure, and the ten-second timeout. No external email is sent by this test.
- Browser layouts reviewed at 360, 768, 1024, and 1440 pixels, plus the default larger desktop viewport. No horizontal overflow was measured at the requested breakpoints.
- Dark and light themes reviewed; the choice persists across navigation.
- Project filtering, project dialogs, keyboard Tab, Escape dismissal, and focus restoration checked.
- Mobile navigation opened and dismissed with keyboard support.
- Mobile fallback confirmed: no 3D canvas and no custom cursor at 360 pixels.
- Empty form validation focuses the first invalid field. A valid local submission reaches the API and shows the honest missing-configuration state. Cross-host Origin is rejected.
- Page, robots.txt, sitemap.xml, provided PDF, and generated Open Graph image returned successfully.
- Ticker has a keyboard-accessible pause/resume control. Reduced-motion handling was inspected in code; OS-level reduced-motion interactions were not separately automated.

## FlowBridge Forms addition

- Added the fifth selected project using features verified against the user-supplied public GitHub repository.
- Included an original, explicitly labeled workflow illustration and the verified repository link; no demo URL was supplied.
- Updated filter counts, the selected-project counter, and the desktop layout for an odd final card.
- Rebuilt production output and checked TypeScript after the addition.
- Reviewed the Work grid, filters, source link, and project dialog at desktop and mobile widths. See the accompanying FlowBridge preview image.
- The contact backend was unchanged; its earlier test results above remain historical verification.

## About workspace photo addition

- Added the user-supplied workspace photo below the About bento grid, with a semantic figure, accessible description, and caption from `data/portfolio.ts`.
- Optimized the original 2.7 MB JPEG to a 1920 × 1440 WebP of approximately 190 KiB; preserved its framing and color and removed embedded metadata.
- Confirmed `next/image` serves the responsive optimized photo; it is lazy-loaded below the fold.
- Reviewed the new layout at 360, 768, 1024, and 1440 pixels with no horizontal overflow, including dark and light themes.
- Corrected navigation's reading-band margins to use viewport-height pixels so the About indicator remains accurate on wide viewports.
- Production build and TypeScript checks passed after these changes. The contact backend was unchanged.

## Editorial hero — 17 October 2026

- Made the developer's name the main headline, with a concise introduction about WordPress products, systems integration, and team leadership.
- Used the supplied blue-shirt portrait as the reference for an AI-assisted transparent cutout and clarity enhancement, plus the real desk-photo inset. Preparation, final built-in image-generation prompt, and source-resolution limits are documented in `docs/HERO-ASSETS.md`.
- Removed the white arch, cropping, tilted portrait card, layered frame, connectors, technology chips, and generic headline. The portrait and its ancestors have no transform, blur, filter, or mask. Canvas grain is behind content instead of over photographs.
- Added one ultra-thin 270-degree 3D arc behind the portrait. Pointer tilt is under 1.5 degrees and applies only to the decorative orbit. The portrait stays upright; the desk inset is hidden at 575 pixels and below.
- The transparent portrait is 1254 × 1254, approximately 1.02 MiB, encoded as lossless WebP. The decoded RGBA pixels match the generated PNG exactly, with fully transparent corners. `next/image` preloads and serves the file directly with `unoptimized`, avoiding further compression. The desk photograph is 1000 × 750, approximately 95 KiB.
- WebGL is delayed and dynamically imported, limited to fine pointers at 1024 pixels or wider without a reduced-motion preference. The frame loop pauses offscreen and in background tabs; GPU context loss restores the static arc.
- Updated the social-card title and artwork to match the name-led identity.
- `npm run build` and `npm run typecheck` passed after the transparency changes. Local HTTP checks returned 200 for the page and transparent WebP; initial HTML contains the direct transparent-image URL and its preload, with the old opaque hero URL absent. Serving tests confirm the downloaded image bytes match the source file.
- Code review calculated portrait boxes at 360, 768, 1024, and 1440 viewport widths with no CSS overlap beyond the intended desk inset. The transparent asset was inspected on dark and light canvases at the intended display width; this is an asset study, not a browser screenshot.
- Live browser layout, hover, GPU rendering, and a fresh Lighthouse audit were not verified for this hero: browser automation was blocked by the browser's URL security policy. No alternate browser or indirect automation was used to bypass the block. Review the live preview at 360, 768, 1024, and 1440 pixels before publishing.

## TCB Grading addition — 17 October 2026

- Added TCB Grading as project 06 in Websites, with WordPress and Elementor tags supported by the supplied screenshots. Copy describes the visible five grading tiers, submissions, customer dashboard, order history, and card details, without inventing a repository or backend technology.
- Confirmed `https://tcbgrading.com/` returned HTTP 200 with the title “TCB – Theory Card Breeze”. This availability check does not verify the submission workflow or authenticated customer dashboard.
- Built `public/images/project-tcb.webp` from the actual supplied homepage screenshot: removed the top 118-pixel navigation strip containing account information and framed the complete remaining hero. The optimized cover is 1200 × 820 pixels, 89,278 bytes. Customer dashboard screenshots containing account/order information are not published.
- Updated the image disclosure, project-specific screenshot note, documentation, and selected-project counter. All work now has six entries; Websites and Plugins each have three. Existing odd-card styling handles the three-card filtered views.
- Added optional `imageFit` data so the TCB screenshot is contained rather than cropped in the detail dialog.
- Production build and TypeScript checks passed. HTTP checks confirmed six project cards, category counts, the TCB image and optimized variant, and the unchanged transparent hero. Source review verified the TCB live link and details data.
- The cover asset was visually inspected. Live browser filter/dialog interaction and fresh responsive screenshots were not re-run because of the existing browser URL security-policy block. Earlier browser checks above remain historical.

## TCB plugin and expandable Work list — 17 October 2026

- Added TCB Card Grading as a separate seventh project under Plugins, with its public GitHub repository as the primary action. The existing TCB website remains a separate entry. Current counts: seven total, three Websites, four Plugins.
- Verified multi-step submissions, card uploads, service-tier selection, order review, return shipping, Stripe integration, confirmation, and order administration against the repository README and PHP sources. This source inspection does not establish live payment success or a security audit. Sources: `https://github.com/tushar5479/tcb-card-grading`, including `sgc-card-grading.php`, `includes/class-sgc-shortcode.php`, `includes/class-sgc-stripe-service.php`, `includes/class-sgc-stripe-webhook.php`, and `includes/class-sgc-customer-order-cpt.php`.
- Used the supplied grading-tier screenshot for `public/images/project-tcb-plugin.webp`: 1200 × 820, 153,030 bytes. The crop retains all five tiers while removing browser chrome, the WordPress admin bar, and signed-in navigation. The finished cover was visually inspected.
- Work shows six cards initially. A pill-shaped See more control expands the remaining project downward, toggles to Show fewer, updates the visible count, and supports repeated expansion and collapse. Filters reset expansion; categories with no extra matches omit the control. The labels and initial limit live in `data/portfolio.ts`.
- The controlled region is zero-height, transparent, `aria-hidden`, and inert while closed. The button supplies `aria-expanded` and `aria-controls`; reduced motion uses zero-duration transitions. Source review found no obvious layout/focus overflow at the requested widths; it is not a browser measurement.
- `npm run build` and `npm run typecheck` passed. HTTP/HTML checks confirmed six cards outside the initially closed region, one extra card inside it, seven/three/four filter counts, the new repository link, closed-state accessibility attributes, and successful raw/optimized image delivery.
- Browser clicking, keyboard traversal, expansion animation, and final responsive rendering were not live-tested because of the existing browser URL security-policy block. Fresh Lighthouse scores are not available for this change.

## Pepti.ca website addition — 17 October 2026

- Added Pepti.ca as project 08 under Websites, linked to `https://www.pepti.ca/`. Current counts: eight total, four Websites, four Plugins. The initial six-card limit is preserved; the expanded region now contains two projects.
- Verified categorized catalog, product options, cart access, affiliate links, and a contact page on the public website. Public HTML confirms WordPress, WooCommerce, and Elementor. Portfolio copy describes the storefront without repeating product efficacy or purity claims; no purchasing or form actions were performed.
- Used the supplied 1907 × 914 homepage screenshot at native resolution, with no resizing or cropping, centered on a warm ivory 1907 × 1303 canvas. The lossless `public/images/project-pepti.webp` is 1,143,072 bytes. Decoding and comparing the screenshot region confirmed exact pixel identity with the supplied original. The final asset was visually inspected.
- Added optional per-project `imageUnoptimized` so both the card and detail dialog serve the exact lossless WebP. `imageFit: "contain"` keeps the full cover visible. No blur, filters, or generated image editing were added. This preserves clarity at the cost of a larger transfer; the project image remains lazy-loaded.
- Updated the screenshot disclosure, selected-project counter, and customization instructions. The See more/Show fewer behavior and filter reset are unchanged.
- `npm run build` and `npm run typecheck` passed. HTTP/HTML checks confirmed eight/four/four filter counts, six cards outside the closed region and two within it, the direct Pepti image URL without a lossy optimizer variant, closed-region accessibility attributes, and byte-identical image delivery.
- Browser clicking, keyboard interaction, final responsive rendering, and a fresh Lighthouse audit were not re-run because of the existing browser URL security-policy block. Earlier browser checks remain historical.

## Galenix Labs website addition — 17 October 2026

- Added Galenix Labs as project 09 in Websites, linked to `https://galenixlabs.com/`. Current counts: nine total, five Websites, four Plugins. The initial six-card limit remains; See more reveals three additional projects. The existing odd-card rule gives the third extra card a full-width desktop row.
- Public HTML confirms WordPress, WooCommerce, and Elementor. The homepage, shop, and COA archive returned HTTP 200. Copy describes the product catalog, cart access, COA archive, and FAQ/contact navigation without reproducing product-quality or efficacy claims. The wholesale application navigation target returned 404 during the read-only check, so it is omitted from the listed features. No form, cart, or payment actions were performed.
- Used the supplied 1906 × 906 screenshot at native resolution on a matching navy 1906 × 1302 canvas, positioned at x0/y198. The lossless `public/images/project-galenix.webp` is 1,353,808 bytes. Every screenshot RGB pixel matches the original after decoding. No resizing, cropping, added blur, filter, or AI image recreation was applied; the final asset was visually inspected.
- The card and detail dialog use `imageFit: "contain"` and `imageUnoptimized: true` to show the complete lossless image without further compression. It remains lazy-loaded. Updated the selected-project counter, screenshot disclosure, and source documentation.
- `npm run build` and `npm run typecheck` passed. Local HTTP/HTML checks confirmed nine/five/four filter counts, six initial cards plus three in the collapsed region, zero-height/inert/hidden state, direct Galenix image serving, original screenshot pixel equality, and the unchanged transparent hero.
- Live browser interaction, final responsive screenshots, and a fresh Lighthouse audit remain unverified because of the existing browser URL security-policy block. Earlier browser results above are historical.

## Contact delivery and abuse protection — 17 October 2026

- Owner confirmed `tushartanvirrahman99@gmail.com` as the destination and supplied the Formspree endpoint. Its form ID is configured in the local ignored `.env.local`; the public Turnstile site key and matching secret in Formspree are still missing. Provider activation, verified-recipient configuration, live CAPTCHA behavior, and inbox delivery remain unverified. No external email was sent, delivery is not active, and local configuration is excluded from the source archive.
- Added native Formspree Turnstile support: public site key in the browser, secret only in Formspree's CAPTCHA settings. The route requires configuration and a nonempty token before forwarding; Formspree is the single verifier. The widget loads near the form, follows theme/available width, handles expiry/failure, and resets after each network attempt.
- Fixed notification subject and an explicit unverified-visitor notice are built on the server. Visitor topic is a body field; visitor From, To, cc, bcc, template, HTML and redirect settings are not forwarded. Email is one validated mailbox for Reply-To, not verified identity.
- Validation rejects raw header/control-character injection, preserves normal Unicode names and multiline messages, and bounds token size. Origin is now mandatory for this browser endpoint and cross-site fetches are rejected. The outgoing Referer uses the configured canonical origin. Existing streamed 32 KiB bounds, honeypot, ten-second timeout and error privacy remain.
- Provider CAPTCHA failures and rate limits receive clear responses without leaking provider detail. A ref prevents concurrent duplicate form requests. Typed values remain on failure.
- `npm run test:contact`, `npm run typecheck`, and `npm run build` passed. Security regression tests cover header/mailbox injection, notification settings allowlisting, fixed subject, Origin, body bounds, CAPTCHA token forwarding/rejection, rate limits, provider failures, and timeout. All provider responses were mocked; these tests send no external email.
- Local production HTTP checks verified the missing-configuration response, invalid-input/origin rejection, contact markup and existing project counts. Browser/CAPTCHA interaction was not live-tested because of the existing browser URL security-policy block. A real CAPTCHA/provider/inbox test is required after account setup.
- After saving the supplied form ID and restarting local production, the page returned HTTP 200 and the contact API returned the expected HTTP 503 while the public CAPTCHA key remained blank. This confirms the remaining-configuration guard; it does not verify Formspree delivery. See `outputs/contact-endpoint-verification.json` in the workspace delivery files.
- Updated `docs/CONTACT-SETUP.md` with exact account/endpoint, Turnstile, sender identity, environment, deployment and real-delivery steps. These controls reduce spam and spoofed notification headers; they do not certify visitor identity or guarantee that message content contains no phishing attempt.

## Pflege mit Herz Dessau addition — 17 October 2026

- Added Pflege mit Herz Dessau as project 10 in Websites, linked to `https://www.pflegemitherz-dessau.de/`. Current totals: ten projects, six Websites, four Plugins. All work still shows six initially and four in the expandable region; Websites has six matching cards.
- The public homepage returned HTTP 200 and confirms German-language care information, care inquiries, careers/contact navigation and a callback form with explicit consent. HTML markers confirm WordPress and Elementor. Copy describes the website interface without making medical, privacy-compliance or form-delivery guarantees; no care inquiry or callback was submitted.
- The supplied screenshot is 1904 × 908. It is preserved at native resolution on a neutral 1904 × 1301 canvas at x0/y196, with 197 pixels of bottom padding. `public/images/project-pflege.webp` is lossless WebP, 901,458 bytes. All screenshot RGB pixels match the original after decoding; the completed asset was visually inspected.
- The image is contained and served directly without further optimizer compression in both card and dialog. No resizing, cropping, added blur, filter or generated image editing was applied. Updated the project counter, screenshot disclosure and source documentation.
- `npm run build` and `npm run typecheck` passed. Local HTTP checks verified ten/six/four filter counts, six initial cards plus four in the closed/inert region, direct lossless image delivery and original screenshot pixel identity. The existing contact configuration remains protected and awaiting the Turnstile setup; no email was sent.
- Live browser rendering and interaction were not re-run because of the existing browser URL security-policy block. Earlier browser checks and Lighthouse measurements remain historical.

## Education and testing expertise — 17 October 2026

- Replaced the workspace caption with a dedicated educational-background panel beside the existing photo. It lists Bachelor of Science in Computer Science & Engineering at American International University-Bangladesh, the Software Engineering & AI Systems major, and SQA & Software Testing expertise, using the owner's supplied information.
- All education-panel copy is in `about.education` in `data/portfolio.ts`, and the QA skill group's subtitle reflects the supplied testing expertise. Education is shown only in About; Experience contains the two professional roles, with no education timeline entry.
- The panel uses a labeled article, heading, semantic major definition list and decorative icons hidden from assistive technology. Desktop columns allow text to determine height; the photo and text stack below 1024 pixels with fluid mobile type and no fixed text height.
- Production build and TypeScript checks passed. HTTP markup checks confirmed the complete education panel and testing-skills text, plus the unchanged ten-project Work list. Browser rendering was not re-tested because of the existing browser URL security-policy block.

## Configuration before launch

The supplied `FORMSPREE_FORM_ID` is saved locally. Configure the public `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, its matching secret in Formspree's native Turnstile settings, and confirm provider activation and the verified recipient to activate protected email delivery. Fresh installations and Vercel deployments also need the form ID set separately because `.env.local` is not bundled. A real provider-to-inbox delivery check remains necessary after configuration. Provider success/failure paths were tested with controlled responses, not an actual recipient inbox.

The source has not been deployed to Vercel. Follow README.md and docs/CONTACT-SETUP.md. Run Lighthouse against your final public deployment after changing content, fonts, assets, or hosting.

## Repeat a local audit

Run the production server in one terminal, then use a separate terminal with Chrome installed:

```powershell
npx lighthouse http://127.0.0.1:3000 --only-categories=performance,accessibility,best-practices,seo --output=html --output-path=lighthouse-mobile.html --chrome-flags="--headless"
npx lighthouse http://127.0.0.1:3000 --preset=desktop --only-categories=performance,accessibility,best-practices,seo --output=html --output-path=lighthouse-desktop.html --chrome-flags="--headless"
```
