# Minns Water Sports — design refinement

The existing one-page site, navy/mint palette, local photographs, pricing,
reservation form and section anchors are retained. The visual changes are in
`assets/css/refinements.css`, with focused markup changes in `index.html`.

## References reviewed before implementation

- [Aqua Yacht — Orix Creative, Dribbble](https://dribbble.com/shots/26772360-Aqua-Yacht-Website-Design): stronger headline hierarchy, clear photography and restrained product information. Adapted these principles to the existing fleet section.
- [Aqua Yacht on Pinterest](https://in.pinterest.com/pin/308426274501111941/): oversized typography, a large photographic surface and smaller inset panels. Inspired the hero's boat postcard and more deliberate scale.
- [Sunsail](https://www.sunsail.com/): a booking strip directly connected to the hero and clear rental inputs. Refined the existing estimate strip and exposed date/duration inputs on mobile.

These references informed composition; their artwork, logos and text were not copied.

## Applied changes

- Restored the existing Instrument Serif font for selective italic accents.
- Refined the floating navigation, hero contrast, heading scale and action hierarchy.
- Integrated two real boat photographs into the fleet rows, with a single interactive price list.
- Gave the harbour section a navy background and framed its existing map.
- Simplified to three rental steps and four FAQs; collapsed the long guide directory and removed repeated booking/contact blocks.
- Added visible keyboard focus treatments and retained reduced-motion support.

## Verification

Browser checks: desktop, tablet and mobile layouts; no page-level horizontal
overflow; rate tiers; live rental estimate; boat preselection; quick-booking
transfer; navigation menu; guide tabs; FAQ. The reservation submission remains
the existing email-app handoff; no request was sent during verification.

The supplied boat photos are small crops; higher-resolution originals would
improve sharpness on large screens.

## Content consolidation

Removed the hero boat postcard, separate fleet showcase, duplicate rate table,
standalone reef section, repeated inquiry steps and repeated contact blocks.
Deposits/rental details remain expandable; cancellation terms live in the FAQ.
The current cleanup was checked for balanced HTML, working anchor and ARIA
references, local asset paths, JavaScript syntax and pricing/form regressions.
Final browser layout verification remains limited by the local preview connection.
