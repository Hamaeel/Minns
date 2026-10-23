# Layout and responsive verification — 23 October 2026

This report covers the current light, split-hero page and its contact/booking
form. Earlier responsive reports refer to a previous version of the page.

## Applied changes

- Retained the shared 1200px content width and matching header/section edges.
  Side gutters are 20px below 600px and 32px from 600px upward; wide screens
  center the content instead of stretching it.
- Section padding uses 56px on phones, 72px on tablets and 88px on large desktops.
  Header-to-content spacing is 28/32/40px and column gaps follow 32/40/48px.
  Adjacent white hero/Why us sections avoid doubled empty space.
- Hero buttons wrap before they collide with the photo at intermediate widths.
- Guide tabs form a two-column grid on phones. Tables wrap long phone/email
  values, forms shrink safely, and contact/footer links have 44px touch areas.
- Navigation adapts when the full menu will not fit, including enlarged text.
  The measured header height keeps the hero and anchor targets clear of it.
- Large text reflows rate controls, fleet actions, tabs, price tables and fields.
- The mobile action bar respects the bottom safe area and hides while the booking
  section is visible, or in short landscape viewports.

## Rendered checks

Chrome 155.0.8059.86, using local HTTP and the installed browser:

320×740, 360×800, 375×812, 390×844, 414×896, 480×800, 600×900,
700×900, 768×1024, 820×1180, 844×390, 900×900, 1024×768,
1100×900, 1280×800, 1304×884, 1319×884, 1440×900, 1920×1080,
2560×1440.

Also checked 200% text at 320/768/1280px and touch emulation at 390/820px.
The expanded price table was included in layout measurements.

All checks passed: no detected page/element overflow, broken referenced images,
small interactive targets (44px minimum with rounding tolerance), JavaScript
errors or inconsistent page gutters. Mobile menu, landscape menu fit, rate
changes, boat transfer, optional form fields and guide tabs work. No booking
was submitted and no email was sent.

## Files and evidence

- Active layout rules: `assets/css/layout.css`.
- Run: `node tests/layout.audit.cjs` (bundled Playwright + installed Chrome).
- [Measurements](tests/layout-results/report.json)
- [Desktop screenshot](tests/layout-results/1440-viewport.png)
- [Phone screenshot](tests/layout-results/390-viewport.png)
- [Tablet full page](tests/layout-results/768-full.jpg)

Coverage is Chrome viewport/touch emulation. Physical devices, Safari and
Firefox were not tested.
