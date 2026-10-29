# Verification record

## Automated checks

Run `npm test` to exercise the operational filters and aggregation, the quality-story calculations, and mobile form validation. Run all three build targets to confirm each produces a case-specific root page.

## Browser review — 2026-10-28

- P301: direct route opened; shift and cell filters updated every metric and the exception queue. Opening and acknowledging a scoped exception reduced the count to zero and showed the empty state. Reset is available for repeat review.
- P302: direct route opened; Line B and defect-count controls updated the chart, labels, and takeaway. Selecting a chart point exposed its exact value. Three story chapters and the data table are present.
- P303: direct route opened; empty submission produced specific field errors. A valid 34-minute PRESS-02 event produced a confirmation and appeared in recent events after reload.
- Visual review: checked the landing page and all three cases at desktop width, and P301, P302, and P303 at a 390-pixel phone width. The phone form retains large controls and the dashboard/cards reflow without horizontal page overflow.

## Deployment smoke checks

For each live Vercel project: open root URL in a fresh session, enter the cohort passcode, complete the case's key interaction, reload, and verify browser-local state. Confirm direct `/p301/`, `/p302/`, and `/p303/` paths where relevant. Record final URLs in the handoff report.
