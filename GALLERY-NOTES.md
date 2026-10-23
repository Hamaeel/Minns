# Gallery and restored fleet photos — 23 October 2026

All five fleet rows have thumbnails again, with the boat-size number inside the
image. The 17′/19′ photos are original assets. The 20′/22′/26′ thumbnails reuse
the previously generated illustrations; visible copy identifies them as such.

The new gallery follows How it works and is linked from the footer. It has one
featured boat-day scene and four smaller photos covering reef life, the office
and a boat. The boat-day scene retains its illustrative caption. Reef previews
use optimized WebP copies while the viewer loads the original full-size images.

The native modal viewer supports next/previous, arrow keys, Escape, backdrop
closing, keyboard focus containment and focus restoration. Without JavaScript,
the photo links still open the source images. Reduced-motion settings disable
the hover animation.

## Files and verification

- `assets/css/gallery.css`: gallery, viewer and thumbnail sizing.
- `assets/js/gallery.js`: viewer interactions.
- `node tests/gallery.audit.cjs`: passed keyboard/focus, navigation, responsive
  viewer, 200% text and fallback checks.
- `node tests/layout.audit.cjs`: passed all 20 viewport sizes and touch emulation.

[Desktop gallery](tests/gallery-results/1440-1x-gallery.png) ·
[Phone gallery](tests/gallery-results/390-1x-gallery.png) ·
[Restored fleet](tests/gallery-results/390-1x-fleet.png)
