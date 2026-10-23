# Responsive testing — 23 October 2026

Tested the actual page in installed Chrome 155.0.8059.86 using a local HTTP
server and Playwright. These are rendered browser checks, not source estimates.

## Coverage

18 viewport sizes: 320×740, 360×800, 375×812, 390×844, 414×896, 600×900,
700×900, 768×1024, 820×1180, 844×390 (landscape), 900×900, 1024×768,
1100×900, 1280×800, 1304×884, 1440×900, 1920×1080 and 2560×1440.

- 200% text resizing at 320px, 768px and 1280px.
- Touch emulation at 390×844 (3× pixel density) and 820×1180 (2×).
- Mobile menu, Escape, landscape menu scrolling, keyboard guide tabs, rate
  changes, estimate transfer, contact/review steps and preserved Back values.
- Image loading, document/element overflow, text clipping, interactive target
  dimensions, header clearance and desktop content alignment.

## Fixes

- Header clearance follows the measured announcement/navigation height, including
  when fonts enlarge. Desktop navigation switches to a menu when links won't fit.
- Mobile guide tabs use two columns so every option is visible.
- Contact, footer and guide links have at least 44px height. The mobile action
  bar fits narrow screens and respects the device's bottom safe area.
- Short landscape screens use a shorter hero; menus scroll within the available
  height. The floating action bar is hidden in this orientation to preserve space.
- Guide tables wrap long phone/email values. Forms allow narrow native date
  controls to shrink without widening the page.
- At large text sizes, fields, progress labels, rate controls and guide tabs
  reflow. Fleet actions wrap rather than forcing horizontal scrolling.
- The FAQ indicator remains within its row when rotated.

## Results

All tested normal viewports: no page or element overflow, detected text clipping,
broken images, JavaScript errors or interactive targets below 44px (1px rounding
tolerance). Hero and estimate widths match; desktop edges match the main content.
Header clearance is 20px on phones and 32px from 600px upward. Enlarged-text
layouts also have no detected overflow or header overlap.

The three-step booking review works; test data stays local and no message was
sent. Existing HTML, pricing/form, navigation/tab and background-slider tests pass.

## Evidence and limits

- [Machine-readable measurements](tests/responsive-results/report.json)
- [Desktop viewport](tests/responsive-results/1440-viewport.png)
- [Phone viewport](tests/responsive-results/390-viewport.png)
- [Phone fleet](tests/responsive-results/390-fleet.png)
- [Phone booking](tests/responsive-results/390-reserve.png)

Full-page screenshots are also saved for 320, 390, 768, 1024 and 1440px.
Section-only captures temporarily hide fixed headers/action bars for visibility;
the viewport captures retain the real UI. Testing uses Chrome and touch emulation,
not physical phones or Safari/Firefox. Those engines have not been verified.
