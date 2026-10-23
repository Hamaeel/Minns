# CRO changes

Existing visual direction retained. These changes reduce known sources of
confusion; they do not establish a measured conversion-rate uplift.

## Implemented

- Hero states self-drive rental service, a short-stay starting rate, VAT and fuel exclusions.
- Primary inquiry buttons say “Request availability”; fleet actions say “Choose this boat”.
- Quick estimator defaults to the lowest-priced boat and includes 12% VAT.
- Rental summary shows base rental, VAT, total rental, multi-day savings and the separate refundable deposit/fuel charges.
- Rate-tier choices carry into the request's intended duration. A boat change preserves already-entered dates unless a different fleet rate tier was explicitly chosen.
- Six visible form fields instead of nine. Phone, accommodation and notes are in an optional disclosure. Four text/date entries are necessary with the default “Help me choose” selection.
- Dates, passenger capacity, name and email have actionable error messages and accessible invalid/error associations.
- An explicit draft review replaces the ambiguous “Send my booking” email redirect. The site never claims to send an email or confirm a boat.
- Copy-request fallback supports visitors without a configured email app. Editing the form hides the old draft.
- Local guides appear after the inquiry section; the mobile action bar hides while the inquiry is in view.
- Mobile input font sizes avoid the small-input zoom issue.

## Evidence informing the changes

- [Baymard: minimizing visible form fields](https://baymard.com/research-articles/checkout-flow-average-form-fields). Applied as a design heuristic to this inquiry form; this is not a checkout and the research does not establish Minns-specific uplift.
- [Baymard: marking required and optional fields](https://baymard.com/research-articles/required-optional-form-fields).
- [Nielsen Norman Group: actionable form error messages](https://www.nngroup.com/articles/hostile-error-messages/).

## Verification and limits

Run `node tests/cro.test.cjs` and `node --check assets/js/main.js`.
Offline regression checks cover production calculation/validation functions and
draft preparation: VAT, tiers, deposits, capacity, missing/reversed/past dates,
unknown rates, draft invalidation and email contents. DOM/validity stubs are used;
these checks do not substitute for browser-native input or clipboard tests.

The updated desktop inquiry layout was visually inspected. Final mobile/browser
interaction checks could not be completed because the local HTTP preview was
unreachable from the available browser. No email was sent and no booking was made.

## Measurement hooks

The site dispatches `mws:conversion` CustomEvents on `window`. Available event
names in `event.detail.event`:

- `availability_started`: quick estimator carried into the request form; boat and duration only.
- `boat_selected`: fleet selection; boat and rate tier only.
- `request_prepared`: valid draft prepared; boat and duration only.
- `email_handoff`: visitor clicked the email-app link. This does **not** prove an email was sent.
- `request_copied`: Clipboard API reported a successful copy. This does **not** prove an email was sent.
- `phone_click`: visitor clicked a telephone link. This does **not** prove a connected call.

No analytics provider, personal-data transmission or persistent tracking was added.
Connect these hooks to the chosen analytics system before collecting a baseline.
Measure confirmed inquiries and actual bookings separately using the business's
email/booking records. No fabricated reviews, availability or urgency were added.

## Remaining conversion bottleneck

Inquiries still depend on the visitor sending an email. A direct submission flow
requires a real form backend with delivery/error handling and spam protection.
No endpoint or booking integration is configured in this project.

## Subsequent content cleanup

The fleet now has one visual/list presentation; the duplicate rate table was
replaced with concise deposit details. Three rental steps replace four, FAQ
content is reduced to four distinct policy questions, and repeated inquiry
instructions/contact blocks were removed. Guides are inside a native disclosure.
Pricing, request preparation, validation and measurement hooks are retained.

## Step form

The request builder now has Rental, Contact and Review steps with a visible
progress indicator. Validation is scoped on the first step and rechecks all
details before review. Back preserves entered data; estimate/fleet prefill starts
at rental details. The final action still opens an email draft, and does not
send or confirm a booking. Automated checks cover step progression, invalid
inputs, Back navigation, review visibility and retained values. Browser visual
verification remains subject to the preview connection limitation noted above.
