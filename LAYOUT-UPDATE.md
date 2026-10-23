# Browser comment updates — 23 October 2026

The active page loads `layout-polish.css` after the existing styles. The older
`refinements.css` remains unlinked.

- Navigation now spans the full viewport, has square corners, and sits directly
  below the announcement bar. Its contents retain the page's horizontal alignment.
- A fixed announcement bar puts social icons on the left and hours on the right.
  Facebook and Instagram URLs intentionally remain `#`, as requested.
- Hero copy and actions are centered; opening hours moved out of the hero.
- The estimate has a white input area with a short heading and outlined fields,
  plus a pale green price/action panel. These areas stack on phones. All three
  inputs remain visible, with the existing calculation and booking transfer.
  It now spans the same full width as the hero and sits directly below it without
  overlap or a gap, with square top corners and rounded bottom corners. The hero
  image has rounded top corners (24px) and square bottom corners. The estimate
  card has no drop shadow. Why us and Guides heading blocks are centered.
  The hero starts below the fixed announcement/navigation stack, followed by a
  gap from the spacing scale (32px on desktop). On desktop (1024px and wider),
  its edges and the attached estimate match the main content's 1200px maximum
  width and responsive gutters. Phones and tablets retain full-width images.
  Navigation has an opaque navy background before scrolling because it now
  appears above the hero rather than over the photo.
- Hero text and actions stay fixed while only the background images rotate.
  The visible slider control bar was removed. Motion pauses on hover or focus;
  touch users can tap to pause, and a keyboard-accessible pause action appears
  only when focused. Reduced-motion users start with a static background.
- Fleet rows use bordered cards and real thumbnails for the two available boat
  photographs. Larger boats retain size tiles rather than unrelated photographs.
- Cancellation and weather information lives inside the how-it-works text
  column under its steps, with separate headings and icons. The two items align
  with the desktop step columns and stack on phones.

Verification: HTML integrity, pricing/form tests, navigation/tab interaction tests
and JavaScript syntax checks passed. Live browser visual verification could not
be completed: the preview connection timed out, and file URL navigation was
blocked by the browser tool. Responsive CSS has been reviewed in source; new
rendered screenshots are still needed to confirm the final appearance.
