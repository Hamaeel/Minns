# Supplied audit compared with current source

Reviewed 23 October 2026 against the user-supplied audit dated 22 October.
The supplied six-viewport measurements and screenshots were not reproduced in
this run. They are reference findings, not newly verified results.

## Confirmed in source

- `style.css` already contains the deeper `#0a767c` teal, focus treatments,
  larger supporting text and 44px navigation-phone height.
- The current hero uses generated WebP imagery, with a 900px responsive variant.
  A second optimized image appears in How it works. The office-photo finding
  and WebP/mobile-image recommendation are therefore outdated for this version.
- Actual high-resolution fleet photographs and a real logo still require client assets.
- Inquiry delivery still requires sending an email; a direct-submission backend
  has not been configured.

## Fixed during reconciliation

The page had reverted to a single-step form while its JavaScript expected the
previously requested three-step builder. Required IDs such as `formBack`,
`requestFields`, `rentalSummary` and `fleetRateNote` were absent. Restored compatible
Rental / Contact / Review markup and scoped styling in `booking-steps.css`.
The present page theme and generated images are retained.

Also repaired navigation/guide ARIA targets, restored the one-day estimator
option, made its label explicit about VAT, and removed the premature head-script
class that could hide content if JavaScript failed. Optional phone, accommodation
and notes fields are behind a disclosure in the Contact step.

Generated-image captions are now at least 14px. The hero credit has an opaque
dark background rather than relying on photographic contrast. Quick-estimator
inputs are at least 44px tall and have explicit focus outlines.

## Corrections to report terminology

- Uppercase text has no blanket contrast exemption. Ordinary text needs 4.5:1;
  qualifying large text needs 3:1. Logo/brand text has a specific exception.
  [W3C Contrast Minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- WCAG does not classify text below 14px as an automatic failure; 14px here is a
  project readability preference. Contrast, resizing and reflow still matter.
- WCAG 2.2 AA target-size minimum is 24×24 CSS pixels, subject to exceptions;
  44×44 is the enhanced AAA criterion. Using 44px for important controls is a
  useful project target, not proof of complete AA compliance.
  [W3C Minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html),
  [W3C Enhanced](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html)
- Do not dismiss the nav-phone contrast finding solely because it looks readable.
  Its actual composited backdrop must be checked in both transparent and solid
  navigation states. The logo exception does not extend to phone numbers.

## Validation

Passed JavaScript syntax, pricing/validation and step-navigation regressions,
HTML nesting, local assets, IDs, ARIA targets and progressive-startup checks.
Every literal `getElementById` used by the script now exists in the HTML.

Calculated fixed-colour pairs: teal on white, warm paper and pale aqua, and white
on the solid image-credit background each exceed 4.5:1. This calculation does
not establish contrast for every live element, composited glass or photograph.

No new claim is made of zero JavaScript errors in a browser, six-width visual
verification, zero overflow or full WCAG compliance. Those require a fresh
browser run against this exact version.
