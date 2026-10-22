# Tanvir Tushar — personal portfolio

A complete Next.js App Router portfolio for **Tanvir Rahman Tushar**, a Senior Web Developer & Team Lead in Dhaka. The source includes the provided résumé, portrait, workspace photo, career history, ten projects, contact endpoint, local visual assets, and deployment instructions.

## Design concept

An editorial portfolio built around oversized name typography, restrained lime accents, generous spacing, and authentic photographs of Tanvir. The hero leads with “Tanvir / Tushar.” beside an upright photographic portrait, a thin open 3D arc, and a small photograph of Tanvir at work. The introduction describes his WordPress development, integrations, and team leadership. Fine borders, a low-opacity grain layer, and a clear project grid carry the same quiet visual language through the page.

| Element | Direction |
| --- | --- |
| Dark canvas | Warm charcoal `#11130f` |
| Primary text | Soft ivory `#f2f1eb` |
| Accent | Lime `#c2f970` |
| Light canvas | Warm off-white `#f5f5ef` |
| Display type | Space Grotesk |
| Body type | Geist |
| Expressive type | Instrument Serif, italic |

Reading copy uses a shared type scale in `app/globals.css`: 16px body text and form inputs, 15px compact supporting copy, 14px controls and navigation, 13px small notes, and 12px labels and chips at the default browser root size. The `--text-*` tokens keep these sizes consistent across breakpoints; display headings retain their responsive scale. See [typography customization](docs/CUSTOMIZATION.md#typography) to adjust them.

Framer Motion handles text, hover, filtering, and count transitions. Lenis adds smooth scrolling on supported desktop pointers. The transparent portrait renders immediately through `next/image` as lossless WebP, with further optimization disabled to preserve detail. The portrait stays upright and static; restrained pointer input tilts only the decorative orbit. A single React Three Fiber ellipse arc loads lazily on eligible desktops and pauses outside the viewport. The photograph and a static arc remain visible on screens up to 1023 pixels, with reduced motion, and when WebGL fails or loses its context. The desk-photo inset is hidden at 575 pixels and below. Reduced-motion preferences disable decorative movement and smooth scrolling.

## Run locally

Use **Node.js 22.13 or later** and npm. Run these commands from the directory containing `package.json`:

```powershell
npm ci
Copy-Item .env.example .env.local
npm run dev
```

On macOS or Linux, use `cp .env.example .env.local` for the copy step. Open [http://127.0.0.1:3000](http://127.0.0.1:3000).

The owner supplied the Formspree endpoint, and its form ID is configured in the local ignored `.env.local`. The owner also confirmed `tushartanvirrahman99@gmail.com` as the recipient. The public Turnstile site key and matching secret in Formspree are still missing; provider activation, recipient verification, CAPTCHA behavior, and inbox delivery remain unverified. The form stays unavailable for delivery until the remaining configuration is complete and offers the email link. The delivery archive excludes local configuration; follow [contact setup](docs/CONTACT-SETUP.md) when installing or deploying it.

To check and run the production build:

```powershell
npm run typecheck
npm run test:contact
npm run build
npm run start
```

Stop the development server before starting production on the same port. `next/font` downloads the selected Google fonts during the build; the build environment needs access to the font service. The resulting site serves the font files itself.

## Environment variables

| Variable | Value | Scope |
| --- | --- | --- |
| `FORMSPREE_FORM_ID` | The ID from your Formspree endpoint, without the URL | Server only; keep the current name |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Public widget site key; save its matching secret in Formspree CAPTCHA settings | Public; embedded at build time |
| `NEXT_PUBLIC_SITE_URL` | Your canonical HTTPS origin, without a trailing slash or path | Public; used for metadata, sitemap, and Person schema |

Example `.env.local`:

```dotenv
FORMSPREE_FORM_ID=your_actual_form_id
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_public_turnstile_site_key
NEXT_PUBLIC_SITE_URL=https://tanvir-portfolio-7mn7.vercel.app
```

Replace `your_actual_form_id` with the real ID. Keep `.env.local` out of Git; `.gitignore` already excludes it. Restart development after changing environment variables. Redeploy after changing them in Vercel.

## Folder structure

```text
tanvir-portfolio/
├── app/
│   ├── api/contact/route.ts
│   ├── globals.css
│   ├── icon.svg
│   ├── layout.tsx
│   ├── not-found.tsx
│   ├── opengraph-image.tsx
│   ├── page.tsx
│   ├── robots.ts
│   ├── sitemap.ts
│   └── twitter-image.tsx
├── components/
│   ├── about.tsx
│   ├── contact.tsx
│   ├── contact-challenge.tsx
│   ├── experience.tsx
│   ├── footer.tsx
│   ├── hero-object.tsx
│   ├── hero.tsx
│   ├── motion.tsx
│   ├── navbar.tsx
│   ├── projects.tsx
│   ├── providers.tsx
│   ├── scene.tsx
│   └── tech-ticker.tsx
├── data/
│   └── portfolio.ts
├── docs/
│   ├── CONTACT-SETUP.md
│   ├── CUSTOMIZATION.md
│   ├── HERO-ASSETS.md
│   └── VERIFICATION.md
├── lib/
│   └── contact-validation.ts
├── public/
│   ├── images/
│   │   ├── code-symbol.svg
│   │   ├── hero-desk.webp
│   │   ├── hero-profile-natural.webp
│   │   ├── hero-profile-transparent.webp
│   │   ├── hero-tanvir.webp
│   │   ├── project-deposits.svg
│   │   ├── project-estate.svg
│   │   ├── project-flowbridge.svg
│   │   ├── project-galenix.webp
│   │   ├── project-pool.svg
│   │   ├── project-pepti.webp
│   │   ├── project-pflege.webp
│   │   ├── project-tax.svg
│   │   ├── project-tcb.webp
│   │   ├── project-tcb-plugin.webp
│   │   ├── tanvir.jpg
│   │   └── workspace.webp
│   └── resume.pdf
├── tests/
│   └── contact.mjs
├── .env.example
├── .gitignore
├── AGENTS.md
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

Next.js generates `next-env.d.ts` and `.next/` locally. The included `AGENTS.md` contains guidance generated by Next.js for coding agents. Keep the lockfile for reproducible installs; omit `node_modules/` and `.next/` from source archives.

## Content and assets

Start with `data/portfolio.ts`: name, role, biography, contact details, skills, hero copy, project details, links, and experience are collected there. `hero.visual` groups the portrait and desk-photo paths, accessible descriptions, and desk caption. The résumé and career information come from the supplied résumé. Review career dates and availability as they change.

Pflege mit Herz Dessau, Galenix Labs, Pepti.ca, the TCB Grading website, and the TCB Card Grading plugin use **actual user-supplied screenshots** presented for the portfolio. The other five visuals are original illustrations: four interface studies and a FlowBridge Forms workflow overview. This distinction is disclosed beside the work and in each project dialog. Replace illustrations with your own approved screenshots when available. FlowBridge Forms features and its initial-development version are based on the user-supplied [public repository](https://github.com/tushar5479/flowbridge-forms); its card and dialog link directly to that source. It has no public demo link. TCB Grading links to [tcbgrading.com](https://tcbgrading.com/); its description reflects the supplied homepage, tiers, and dashboard screenshots. The separate [TCB Card Grading plugin](https://github.com/tushar5479/tcb-card-grading) links to its source and describes repository-verified submission, upload, shipping, Stripe-integration, and order-administration features. [Pepti.ca](https://www.pepti.ca/) and [Galenix Labs](https://galenixlabs.com/) are listed under Websites with WordPress, WooCommerce, and Elementor tags verified in their public HTML. [Pflege mit Herz Dessau](https://www.pflegemitherz-dessau.de/) has verified WordPress/Elementor markers and a care-information/callback interface. These three lossless screenshots retain the original screenshot pixels and are served directly in cards and the detail dialog, avoiding further compression. The published covers exclude browser chrome, signed-in navigation, and customer data. Unprovided project repository links are `null`, so the interface does not invent source links. The pool-table project uses an email inquiry when a public demo is unavailable.

Work initially shows **six projects**. A centered pill button with a lime arrow expands the remaining projects below it and toggles to “Show fewer projects”. The shown/total count updates alongside the button. Category selection resets expansion and shows up to six matching projects; the button is omitted when that category has no extras. The closed region is inert and hidden from accessibility navigation. Motion respects reduced-motion preferences. Configure the limit and labels under `work` in `data/portfolio.ts`.

`public/resume.pdf` is the provided résumé. `public/images/tanvir.jpg` is the About portrait; `public/images/hero-profile-transparent.webp` is the AI-assisted transparent cutout derived from the supplied blue-shirt photograph, `public/images/hero-desk.webp` is the real desk photograph inset, and `public/images/workspace.webp` is the About workspace photo. The earlier original-background WebP remains available as `hero-profile-natural.webp`. See [hero asset notes](docs/HERO-ASSETS.md) for sources, preparation, final prompt, and quality tradeoffs. The downloadable résumé is publicly accessible once deployed. Testimonials are omitted because no verified endorsements were supplied.

See [customization](docs/CUSTOMIZATION.md) for colors, fonts, 3D geometry, project content, and metadata.

## Deploy to Vercel

This project uses Next.js server features for `/api/contact` and image optimization. Deploy the Next.js project directly; do not export it as static HTML. Vercel detects Next.js without a custom `vercel.json`. See [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs).

### Git import

1. Put this source folder in a Git repository and push it to your Git provider.
2. Import the repository into Vercel. Set the project root to the folder containing this `package.json`.
3. Choose the detected **Next.js** framework preset. The build command is `npm run build`; leave the output directory at the framework default.
4. Select **Node.js 24.x** in Build and Deployment settings. Local Node.js 22+ is supported. See [supported Vercel Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions).
5. Add the three variables from `.env.example` to the intended Preview and Production environments. Keep `NEXT_PUBLIC_SITE_URL` set to the canonical public production origin.
6. Deploy, review the preview, then deploy production through your chosen Git workflow. Repeat the form delivery check on the final production URL.

### CLI option

From this source folder, the following creates a preview and prompts you to sign in or link a project:

```powershell
npx vercel
```

Add the environment variables to the linked Vercel project, then create a new deployment so they take effect. When you are ready to publish production:

```powershell
npx vercel --prod
```

These are deployment instructions; this package does not establish that a deployment has been made. See [Vercel deployment documentation](https://vercel.com/docs/deployments) and [environment variables](https://vercel.com/docs/environment-variables).

## Launch checks

See [verification notes](docs/VERIFICATION.md) for the scope of completed local checks and previously measured Lighthouse scores. Earlier measurements do not certify later visual changes; repeat the relevant checks on the final build.

- Check layouts at **360, 768, 1024, and 1440 pixels** and at your preferred larger desktop width.
- Navigate with the keyboard: skip link, navigation, mobile menu, theme toggle, filters, project dialog, form, and back-to-top link. Escape closes the native project dialog.
- Check dark and light themes, reduced motion, touch input, and the static portrait composition with WebGL unavailable.
- Confirm the final name, career details, all live links, portrait, résumé, canonical origin, and social cards.
- Configure the verified Formspree recipient and native Turnstile check, submit a real message, and confirm it appears in both the provider dashboard and recipient inbox. Confirm provider From, fixed subject and Reply-To. Source checks do not establish inbox delivery.
- Run Lighthouse against the production build. **90+ is a target, not a guaranteed score**; device, network, browser, hosting, and later content changes affect results.
- Keep Formspree CAPTCHA and spam filtering enabled; configure a suitable hosting rate limit when needed. Server-owned notification subject, provider-managed sender, control-character rejection, honeypot and Origin checks reduce abuse; visitor identity and message links remain unverified.
