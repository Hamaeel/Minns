# Minns Water Sports (MWS Boats) — website redesign

Open `index.html` in a browser to preview.

- `index.html` — one-page site (v3, modern look): glass pill nav, full-bleed photo hero with a booking bar (boat, date, days, live estimate), scrolling highlights strip, statement intro, bento feature grid, fleet list with real photos and a 1–2 / 3–6 / 7+ day rate switch, "a day on the harbour" timeline + rental area + maps, swipeable underwater gallery, how it works + policies, charters & guides (tabs), FAQ, reservation request form, contact
- `assets/css/style.css`, `assets/js/main.js`, `assets/logo.svg`, `assets/favicon.svg`
- `robots.txt`, `sitemap.xml`, `llms.txt` — SEO + AI-search (GEO) files for the site root
- `assets/images/` — all photos saved locally from MWS's Google Site (office, boats, reef photos, harbour maps). `boat-17-whaler.jpg` and `boat-19-whaler.jpg` are cropped from their fleet collage. `image-urls.txt` / `download-images.ps1` are no longer needed.

All content (fleet, rates, deposits, policies, hours, phone numbers, FAQ, guide list) is taken from mwsboats.com and sites.google.com/site/minnswatersports.
Neither source has a logo, so `assets/logo.svg` is a simple MWS badge; swap it for the real logo if the client has one.
There is no booking form: every "Book this boat" button and the "Get your price" card open a short pre-filled email to info@mwsboats.com, and the "Book your boat" section shows the office, mobile and email.
