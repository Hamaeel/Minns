# Minns Water Sports: website audit

Date: 23 October 2026 (second audit, after the hero redesign and the booking form restore)
Page: `index.html` (one-page site)

## How it was checked

- The page was loaded at 6 screen widths: 320, 360, 390 (phones), 768 (tablet), 1024 and 1440 (desktop).
- A script measured:
  - text contrast against the WCAG AA standard;
  - font sizes;
  - tap size of links, buttons and form fields;
  - side scrolling;
  - image alt text;
  - H1 headings;
  - JavaScript errors.
- The SEO setup was checked:
  - title and meta description;
  - canonical, Open Graph and Twitter tags;
  - JSON-LD schema;
  - FAQ schema against the visible FAQ;
  - internal links;
  - robots.txt, sitemap.xml and llms.txt.
- Full-page screenshots were reviewed by eye on phone, tablet and desktop.

## Result

| Check | Result |
|---|---|
| Side scrolling (any screen) | None |
| JavaScript errors | None |
| Text contrast failures | 0 |
| Tap targets under 44px | 0 (after fix) |
| Images without alt text | 0 |
| H1 headings | 1 |
| Heading order | Correct (after fix) |
| Broken internal links | 0 |
| JSON-LD schema | Valid: WebSite, LocalBusiness, FAQPage |
| FAQ schema matches visible FAQ | Yes, 8 of 8 |
| Title, description, canonical, OG, robots, sitemap, llms.txt | All present |

## Fixed in this audit

1. **Gap under the hero was too big.**
   - On phones there was about 110px of empty space between the photo and "Why us".
   - It is now about 80px, the same as the other sections.
2. **Hero photo was heavy (410 KB).**
   - There are now two smaller versions, 80 KB for phones and 166 KB for desktop. The browser picks the right one.
   - This makes the page load faster on mobile data. That helps both Google ranking and bookings.
3. **Guide phone numbers could not be tapped.**
   - Numbers like "345-5049" were plain text.
   - All 54 guide numbers are now tap-to-call links, with the 242 area code added in the link.
4. **Logo tap area was small.** It was 34px tall and is now 44px.
5. **Heading order.** The footer jumped from H2 to H4. It now uses H3, which helps screen readers and SEO.
6. **Map image had no size set.** It now has a width and height, so the page does not jump while loading.
7. **Guide tabs on phones.** The last tab ("Kayaking") was cut off with no sign that you can swipe. A soft fade now shows there is more.
8. **"Exuma · Bahamas" under the logo** was 11px. It is now 13px.

## Still fine as is

- Small uppercase labels are 12.8px. These are the footer headings and table headers. That size is normal for labels.
- The booking form opens the visitor's email app. It works, but see the next steps.

## Recommended next steps (need your or the client's input)

1. **Real logo.** The current logo is a placeholder badge.
2. **Clear boat photos.** No boat photo is on the page yet; the hero shows the office. Good photos of each boat on the water would help bookings the most.
3. **Form service.** A service such as Formspree or Netlify Forms would deliver bookings straight to the inbox. It would also work for visitors with no email app set up.
4. **Google Business Profile.** Make sure the hours, phone number and website match the site exactly, for local SEO.
5. **Reviews.** Add real Google or TripAdvisor reviews once the client shares them. They must be real reviews only.
