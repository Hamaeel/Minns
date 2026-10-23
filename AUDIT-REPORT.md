# Frontend and UX engineering review

Scope: the current local Minns Water Sports page, from rental estimation through
inquiry preparation, navigation, guide discovery and failure recovery.

**Status:** code review and regression fixes completed. Screenshot-based visual
audit remains blocked: both the in-app browser and Chrome timed out loading the
current preview over local HTTP. No new screenshots were available to establish
visual findings. Older screenshots were not used as evidence for this review.

## Confirmed defects and fixes

| Priority | Trigger and former behavior | Fix | Evidence |
| --- | --- | --- | --- |
| P1 | Choose a fleet rate tier, edit request dates, then choose another boat. The old tier could replace the visitor's edited duration. | Consume explicit fleet-duration preferences once; clear them when dates/boat are edited. Preserve the existing range otherwise. Browsing fleet rates no longer changes the quick estimate. | Production-handler regression tests. |
| P1 | JavaScript disabled or initialization fails. The head script hid reveal content; other guide panels remained CSS-hidden. Forms lacked a guarded startup state. | Content no longer hides before initialization. Without enhancement, all guide panels are available, fallback contact links remain visible, and inquiry controls stay disabled. Enable controls only after handlers initialize. | HTML assertions, CSS/source inspection. Browser failure-mode verification pending. |
| P2 | Correct an email/name field after a failed submit. Each input rebuilt the entire live price summary and reran global errors. | Only rental fields update the summary. Validate edits on change/focusout after a submit attempt, and change the global alert text only when its message changes. | Handler tests verify personal-field input does not update the summary. Real screen-reader verification pending. |
| P2 | Open mobile navigation and press Escape, click elsewhere or tab away. Menu stayed open and the toggle lacked a controlled-region relationship. | Added a navigation landmark, `aria-controls`, accurate toggle labels, Escape/focus/outside-click recovery and desktop-resize reset. | Production-handler and static relationship tests. |
| P2 | Use guide tabs with a keyboard. Every button was a separate tab stop, arrow keys did nothing and panels lacked labelled relationships. | Added one active tab stop, Left/Right wrapping, Home/End, labelled panels, explicit visibility and panel focus targets. | Production-handler tests and static ID/ARIA checks. |
| P2 | Activate quick inquiry and interact with another control while scrolling. A 700ms timer could subsequently steal focus. | Removed delayed focus. The required destination receives focus immediately with scroll prevention. | Source inspection; browser focus/scroll verification pending. |
| P2 | Small-screen focus and reading. Rules allowed 38px menu buttons, small metadata and no visible focus ring on form fields. | Increased menu controls to 44px, enlarged mobile metadata/fine print, added input/panel focus rings and forced-colour borders. | CSS inspection only; visual, zoom, contrast and device checks pending. |

## Journey review

1. **Entry and navigation:** recovery logic improved; current appearance and mobile-menu layout unverified.
2. **Browse boats and estimate:** calculation checks pass; rate browsing and inquiry duration now have explicit ownership.
3. **Enter rental details:** validation and stale-draft protection retained; price-summary updates no longer run for personal details.
4. **Review and send inquiry:** draft calculation/content checks pass. Email is still an explicit visitor handoff; no message was sent during testing.
5. **Find a local guide:** keyboard/ARIA logic repaired; directory remains collapsed until requested. Actual assistive-technology behavior unverified.

## Checks run

```text
node --check assets/js/main.js
node tests/cro.test.cjs
node tests/interaction.test.cjs
python tests/structure.test.py
```

All pass. JavaScript tests use lightweight DOM fixtures and production functions;
they do not replace real-browser, mobile-device or screen-reader tests. Structural
checks cover nesting, assets, IDs, ARIA targets, guarded controls and JSON-LD.

## Remaining limits

- Need an accessible preview of this exact version to capture the real flow and finish desktop/mobile visual verification.
- No claim of WCAG compliance, contrast compliance, measured conversion uplift or complete visual audit.
- The form still requires an email app or copying into webmail. Direct submission requires a configured backend and delivery/error handling.
- Low-resolution supplied boat photographs remain a source-asset limitation.

## Standards used for interaction fixes

- [W3C APG Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/): keyboard behavior, tab stops and panel relationships.
- [W3C APG Disclosure Navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/): Escape, focus recovery and disclosure semantics.

The APG examples themselves call for browser/assistive-technology testing; these
source-level repairs are not a substitute for that validation.
