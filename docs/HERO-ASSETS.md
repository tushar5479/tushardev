# Hero assets

The hero uses the blue-shirt portrait and desk photograph supplied by Tanvir on 17 October 2026.

## Transparent portrait

- User source: `photo_2025-06-28_12-34-54.jpg`, 640 × 640 pixels.
- Site asset: `public/images/hero-profile-transparent.webp`, 1254 × 1254 pixels, 1,066,526 bytes (approximately 1.02 MiB).
- Preparation: background extraction and conservative clarity enhancement using the built-in `image_gen` tool, with `transparent_background: true`. This is an AI-assisted photographic cutout derived from the supplied portrait. It is not a pixel-identical copy of the source; the small source limits recoverable authentic detail.
- The generated RGBA image was encoded as **lossless WebP**, with dimensions and alpha preserved. Decoded RGBA bytes match the generated PNG exactly. All four corners are fully transparent.
- The main portrait uses `next/image` with `preload` and `unoptimized`, serving this exact WebP rather than a further compressed image-optimizer variant. The larger transfer size intentionally prioritizes the requested portrait clarity.
- The image has no white panel, arch crop, CSS blur, mask, shadow, filter, or transform. It is upright in a square `object-fit: contain` box, approximately 462 CSS pixels at its largest. Background grain renders behind content, not over the photograph. Only the decorative orbit responds to pointer movement.
- A dark/light asset comparison is provided as `outputs/hero-photo-layout-preview.png` in the delivery workspace. It is an image-asset study at the intended desktop width, not a browser screenshot.

### Final prompt

Mode: **built-in image generation**, edit request; use case: **background-extraction**. The supplied original portrait was the edit target.

> Edit the supplied real portrait photograph for a personal website hero. Remove the entire pale white background and output genuinely transparent RGBA. Preserve this exact man's identity, face shape, facial proportions, dark rectangular glasses, smile, hairstyle, beard, light-blue shirt, black watch and folded-arm pose. Keep the same full subject framing. Improve photographic clarity conservatively from this small source: clean crisp facial detail, natural individual hair strands, accurate glasses edges, visible shirt weave, no soft focus or haze. Do not invent new facial features, beautify the skin, reshape the person, change expression, repaint clothing, add cinematic lighting or change color grading. Aim for a high-resolution clean photographic cutout, roughly1500px square if supported. The silhouette must have accurate smooth antialiasing, with no white halo, red/cyan/blue color fringe, jagged clipping, stray opaque pixels or glow. Do not include any backdrop, white panel, arch, frame, shadow, text or graphics. Retain full transparency outside the person. Sharp natural photograph, not an illustration, not a stylized or plastic-looking AI portrait.

The result was inspected on dark and light canvases at the intended display width. Browser rendering and a fresh Lighthouse measurement remain unverified because browser automation was blocked by its URL security policy. Review the live page manually before publication.

## Work photograph

- User source: `photo_2026-04-15_12-36-43.jpg`, 2560 × 1920 pixels.
- Site asset: `public/images/hero-desk.webp`, 1000 × 750, approximately 95 KiB.
- Only ordinary resizing, metadata removal, and WebP compression were applied. The scene and framing were preserved.
- The small inset is hidden at 575 pixels and below to keep the mobile hero focused on the main portrait.

## Replacing the photos

Update `hero.visual` in `data/portfolio.ts`. Use a square transparent RGBA portrait with natural proportions, the full hairstyle and folded arms visible, and enough resolution for the intended display size. Retain lossless encoding and the main image's `unoptimized` setting if avoiding further compression is the priority. Keep meaningful alt text for both photographs.

All geometry and motion around the images are rendered by the application: `editorial-*` rules in `app/globals.css`, pointer response in `components/hero-object.tsx`, and the restrained 3D arc in `components/scene.tsx`.
