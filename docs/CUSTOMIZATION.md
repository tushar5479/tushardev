# Customize the portfolio

Use the data file for content and the style tokens for visual changes. Keep the supplied résumé and career facts accurate as you edit.

## Personal content

Edit `data/portfolio.ts` for the profile, contact address, social links, hero copy, biography, skills, project details, and experience. Each section groups its copy under a clear key, such as `hero`, `work`, `about`, or `contact`.

- `name`, `shortName`, `brand`, `role`, and `location` establish identity.
- `hero.eyebrow`, `hero.line1`, `hero.line2`, and `hero.intro` control the greeting, two-line name, and professional introduction. The initial name lines are `Tanvir` and `Tushar.`.
- `hero.visual.image` and `hero.visual.imageAlt` control the hero portrait and its accessible description; `hero.visual.deskImage`, `hero.visual.deskImageAlt`, and `hero.visual.deskCaption` control the real desk-photo inset and caption.
- `email` and `socials` control direct contact and profile links.
- `projects` contains the ten cards and their detail dialogs.
- `work.visibleCount` sets the initial project limit (six). `seeMoreLabel`, `seeLessLabel`, `projectsShownLabel`, and `moreRegionLabel` control the expandable-list labels.
- `experience.entries` contains professional work history only.
- `about.stats` controls the visible counters; update the labels and values together.
- `about.workspace` controls the About section’s workspace photo and accessible description. Replace `public/images/workspace.webp` with your own optimized image; desktop fills the photo column and mobile preserves a 4:3 frame.
- `about.education` controls the education panel beside that photo: qualification, degree, university, major, and SQA/testing expertise. Keep the testing skill group consistent when updating these details. Education is shown only in About.
- `resume` and `portrait` are public asset paths.
- `NEXT_PUBLIC_SITE_URL` supplies the canonical deployment origin through the environment.

Avoid embedding confidential details in this file: it is used by the public interface. Review metadata, social cards, and structured data whenever changing the portfolio owner or professional identity.

## Colors

Edit the CSS variables in `app/globals.css`. `:root` defines the light theme and `.dark` defines the dark theme:

| Token | Purpose |
| --- | --- |
| `--bg` | Page background |
| `--surface` | Subtle panels |
| `--surface-raised` | Raised card surfaces |
| `--text` | Main copy |
| `--muted`, `--subtle` | Supporting copy |
| `--line` | Borders and dividers |
| `--accent` | Filled accent elements |
| `--accent-ink` | Accent text and outlines |
| `--button-ink` | Text on lime buttons |
| `--header` | Translucent navigation background |
| `--serif-color` | Expressive serif highlights |

The starting palette is warm charcoal `#11130f`, ivory `#f2f1eb`, lime `#c2f970`, and light canvas `#f5f5ef`. Lime text needs a darker companion in light mode, which is why `--accent-ink` differs between themes. Check text and focus contrast in both themes after changing the palette.

Some decorative colors are deliberately explicit in the 3D arc material, local SVG artwork, hover glows, and social-card image. If replacing lime completely, search for `#c2f970` and the related green values, then update those assets as well as the CSS variables.

## Typography

`app/layout.tsx` loads fonts through `next/font/google`:

- Space Grotesk → `--font-display` for headings and the wordmark.
- Geist → `--font-body` for body copy and interface text.
- Instrument Serif → `--font-serif` for italic accents.

Change the imports and font initialization together, preserve the variable names, and keep `display: "swap"`. Recheck hero line breaks at 360, 768, 1024, and 1440 pixels because font metrics change the layout.

Reading and interface sizes share five tokens near the top of `app/globals.css`. Their pixel equivalents assume the browser's default 16px root size:

| Token | Default | Used for |
| --- | --- | --- |
| `--text-body` | `1rem` / 16px | Main descriptions, biography, project details, and form inputs |
| `--text-support` | `0.9375rem` / 15px | Compact card descriptions and company names |
| `--text-ui` | `0.875rem` / 14px | Navigation, buttons, links, form labels, and status messages |
| `--text-small` | `0.8125rem` / 13px | Supporting notes, location status, and validation errors |
| `--text-label` | `0.75rem` / 12px | Section labels, technology chips, dates, and short metadata |

Change these tokens to adjust the reading scale consistently across screen sizes. Display headings keep their own responsive sizes and `clamp()` rules. The hero name is intentionally the largest text; preserve a clear gap between it and the smaller professional introduction. Paragraph line height is generally 1.75; preserve comfortable line lengths and keep form inputs at least 16px at the default root size. The narrow-screen layout stacks the smaller about cards and lets filters and buttons wrap to make room for readable text. After changing sizes, check the project dialog, long contact address, filter row, and about cards at the four viewport widths above.

## Project cards and dialogs

Each project in `data/portfolio.ts` includes:

| Key | Purpose |
| --- | --- |
| `id`, `number`, `title` | Unique identity and visible ordering |
| `category`, `kind` | Filtering and project context |
| `summary`, `description`, `contribution` | Card and dialog copy |
| `features`, `tech` | Detail list and stack tags |
| `image`, `imageAlt`, `color` | Artwork, accessible description, and card backdrop |
| `imageInk` | Optional image-number color for dark artwork |
| `imageFit` | Optional `contain` to keep a screenshot fully visible in cards and the detail dialog; defaults to `cover` |
| `imageUnoptimized` | Optional direct image serving in both card and dialog; used for the native-resolution Pepti.ca, Galenix Labs and Pflege mit Herz screenshots |
| `live`, `github` | Optional verified links |
| `stage`, `imageNote` | Optional development status and project-specific visual disclosure |

Keep project IDs unique. Ensure each category appears in `work.filters`, or add a new filter label when adding a category. Use `null` for missing live or repository URLs. A project with a repository but no live URL uses the GitHub source as its primary action. A project with neither uses an email inquiry. Filter counts derive from the data; update the selected-project counter in `about.stats` when adding or removing projects. An odd final card spans the desktop grid with its image and copy side by side.

The first `work.visibleCount` matches appear immediately; remaining matches sit in an animated expandable region. Its button appears only when there are extras and toggles between “See more projects” and “Show fewer projects”. Choosing a category resets it. Keep `aria-expanded`, `aria-controls`, `aria-hidden`, and `inert` in sync so collapsed cards cannot be reached by keyboard or screen reader. The reduced-motion version opens and closes immediately. Preserve the small side padding around the clipped region so keyboard focus outlines remain visible.

The current SVG images in `public/images/` are illustrative interface studies and a FlowBridge Forms workflow overview. TCB Grading uses `public/images/project-tcb.webp`; TCB Card Grading uses `public/images/project-tcb-plugin.webp`; Pepti.ca uses `public/images/project-pepti.webp`; Galenix Labs uses `public/images/project-galenix.webp`; Pflege mit Herz Dessau uses `public/images/project-pflege.webp`. These are supplied screenshots with project-specific `imageNote` values and `imageFit: "contain"`. Pepti.ca, Galenix Labs and Pflege mit Herz additionally use `imageUnoptimized: true` so their lossless screenshots are served unchanged; retain this when clarity matters more than a smaller transfer. Replace illustrations with approved screenshots or case-study images when available, update `imageAlt`, and keep the visual-disclosure copy accurate. A roughly **1200 × 820** source image, or a larger image with the same proportions, fits the existing layout. Use local WebP, AVIF, or JPEG for photographs and screenshots. The components use `next/image` with responsive sizes unless direct serving is enabled.

Clicking a project opens a native `<dialog>` with title, contribution, feature list, stack, and actions. Keep its accessible title and close button when changing the design. Check Tab and Escape, focus restoration, and scrolling on touch devices. The dialog's inner content is marked to allow its own scrolling when Lenis is active.

## Portrait and résumé

Replace `public/images/tanvir.jpg` for the About portrait, `public/images/hero-profile-transparent.webp` for the hero portrait, `public/images/hero-desk.webp` for the desk inset, and `public/resume.pdf` for the résumé, or change their paths in the data file. Use a transparent RGBA image for the hero and retain enough detail for its displayed size. See [hero asset notes](HERO-ASSETS.md) for sources and preparation. The résumé is a publicly downloadable file; review its contact details before publication.

## Editorial hero artwork

`components/hero-object.tsx` combines an upright transparent portrait, a thin open arc behind it, and a small photograph of Tanvir working at his desk. The name and professional introduction are in `components/hero.tsx`. All editable image and caption content is under `hero.visual` in `data/portfolio.ts`:

- `image`: path to the transparent portrait, initially `/images/hero-profile-transparent.webp`.
- `imageAlt`: an accessible description of the portrait.
- `deskImage`: path to the real workplace photograph, initially `/images/hero-desk.webp`.
- `deskImageAlt`: an accessible description of that photograph.
- `deskCaption`: the short caption, initially `At work, Dhaka.`.

The portrait remains upright in a square, transparent `object-fit: contain` box without cropping, filters, shadows, blur, or transforms. Preserve natural proportions, clean alpha edges, and a clear face when replacing it. The `editorial-*` rules in `app/globals.css` control composition, arc, and desk-photo placement. Adjust these together to prevent overlap with the name and introduction. The desk inset remains on desktop and tablet and is hidden at **575 pixels and below**. The main image's `next/image` uses `preload` and `unoptimized`: the lossless WebP is served directly, avoiding additional compression at the cost of a larger download. Keep the background grain behind content so it does not add texture to the portrait.

`components/scene.tsx` contains one React Three Fiber torus arc: a **270-degree** open curve with a **0.014** tube radius, stretched and angled into an ellipse behind the portrait. Its thin profile gives the photograph a little depth without surrounding it with a heavy frame. Change the arc span, scale, rotation, material color, roughness, and lighting together; keep the static arc aligned with the WebGL version. Avoid enlarging the tube until it competes with the portrait or name.

Pointer tilt of less than **1.5 degrees** applies only to the decorative orbit. The portrait and desk photograph remain static to preserve sharp rendering. Keep movement restrained and avoid adding transforms to the portrait or its ancestors.

`components/hero-object.tsx` dynamically imports the scene with server rendering disabled. The scene becomes eligible only at **1024 pixels or wider**, with a **fine pointer**, and with **no reduced-motion preference**. It starts after a short delay, pauses its frame loop outside the viewport, and has an error boundary. The canvas pixel ratio is capped to limit rendering work.

The photographs and static arc render before WebGL and stay visible on screens up to 1023 pixels, with reduced motion, or when the scene fails. Native GPU context loss also restores the static arc. Preserve this fallback and both accessible image descriptions when editing the scene. Check the final composition in both themes and at the requested viewport widths after making changes.

## Motion and pointer behavior

- `components/motion.tsx` contains shared reveals, magnetic links, number counters, the progress bar, and desktop cursor states.
- `components/providers.tsx` configures dark-first themes, reduced-motion support, and the lazy Lenis import.
- `components/projects.tsx` contains card tilt, filtered-grid transitions, and the project dialog.
- `components/hero.tsx` controls the hero text reveal.
- `app/globals.css` contains hover styles, ticker movement, responsive behavior, and reduced-motion overrides.

Retain `useReducedMotion`, the CSS media query, fine-pointer checks, and touch-friendly targets. Mouse-only decoration should never be required to find information or activate a control. Keep a visible keyboard focus indicator. This portfolio is a single-page experience; smooth transitions primarily apply to anchor navigation, reveals, filtering, and the project dialog.

For a system-controlled theme instead of dark-first behavior, adjust the `ThemeProvider` in `components/providers.tsx`. Check the first render and theme toggle after changing its defaults.

## SEO and sharing

- `app/layout.tsx` supplies title, description, canonical URL, Open Graph, Twitter, and viewport metadata.
- `app/page.tsx` emits the JSON-LD Person schema.
- `app/opengraph-image.tsx` generates the social preview, and `app/twitter-image.tsx` supplies the Twitter image route.
- `app/sitemap.ts` and `app/robots.ts` generate the crawl files using the configured site URL.
- `app/icon.svg` is the favicon.

Update the favicon and social-preview artwork when rebranding. Check `/opengraph-image`, `/twitter-image`, `/sitemap.xml`, and `/robots.txt` after a production build. Set a real HTTPS canonical origin before launch, then rebuild and redeploy when changing it.

## Contact and launch

Configure the server-only Formspree form ID, verified recipient, public Turnstile site key, and matching secret in Formspree's CAPTCHA settings as described in [contact setup](CONTACT-SETUP.md). `components/contact-challenge.tsx` manages the widget; Formspree verifies its token once. Keep field names, shared validation, token reset, and API responses consistent when editing. Notification subject and unverified-sender notice are in `portfolio.contact`; keep them server-controlled rather than using visitor text for notification headers.

After visual changes, run `npm run typecheck` and `npm run build`, then review a production build in both themes and all requested viewport sizes. Recheck keyboard navigation and reduced motion. Audit Lighthouse against the production build: 90+ is the performance/accessibility/SEO target, and must be measured after your final content and deployment are in place.
