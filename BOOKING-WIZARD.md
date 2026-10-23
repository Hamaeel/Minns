# Animated booking form — 23 October 2026

The booking form now has three steps:

The form is centered in a 720px maximum-width column over a water image with a
dark teal overlay. Contact details are grouped in the FAQ card, with phone,
email, hours and address icons; the duplicate booking-side contact list is removed.

1. Rental: boat, optional group size, start and end dates.
2. Contact: required name/email; optional phone, accommodation and notes.
3. Review: the completed request and a link to open an email draft.

Progress indicators update as visitors continue. Forward/back panels slide and
fade over 300ms, form height adjusts over 280ms, and the progress bar animates
over 350ms. Reduced-motion preferences disable these animations.

Each step validates its own fields. Dates cannot start in the past or end before
the start date; optional passenger counts must be whole numbers within the boat's
capacity. Back preserves all entries. Choosing a different fleet boat returns to
rental details while retaining the visitor's other entries.

Review content uses text nodes, including user notes. The email draft is prepared
only after validation. Opening it does not send a message or confirm availability.
Without JavaScript, disabled fields and an email/phone fallback remain available.

## Implementation

- `index.html`: grouped step panels, progress, review and navigation.
- `assets/css/booking-wizard.css`: wizard styling and motion.
- `assets/js/booking-wizard.js`: validation, state and email draft preparation.
- The previous single-page submit handler was removed from `main.js`.

## Verification

`node tests/booking-wizard.audit.cjs`: passed progression, validation, preserved
values, fleet reset, safe review, draft generation, no-JS fallback, forward/back
animation styles and reduced motion. Checked 21 rendered step layouts across
phone/tablet/desktop widths, including 200% text. No email was sent.

`node tests/layout.audit.cjs`: passed the full 20-screen responsive regression.

- [Rental step](tests/wizard-results/390-1x-step-0.png)
- [Contact step](tests/wizard-results/390-1x-step-1.png)
- [Review step](tests/wizard-results/390-1x-step-2.png)
- [Test results](tests/wizard-results/report.json)

Browser coverage: installed Chrome with viewport/touch emulation. Physical
devices and Safari/Firefox were not tested.
