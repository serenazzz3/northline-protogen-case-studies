# Verification record

## Automated checks

Run `npm test` to exercise operational filters and aggregation, quality-story calculations and reconciliation, mobile sample totals, and form validation. Run all three build targets to confirm each produces a case-specific root page. The current suite passes **10 of 10** checks; all three case-specific builds pass.

## Browser review — 2026-10-28

- P301: direct route opened; shift and cell filters updated every metric and the exception queue. Opening and acknowledging a scoped exception reduced the count to zero and showed the empty state. Reset is available for repeat review.
- P302: direct route opened; Line B and defect-count controls updated the chart, labels, and takeaway. Selecting a chart point exposed its exact value. Three story chapters and the data table are present.
- P303: direct route opened; empty submission produced specific field errors. A valid 34-minute PRESS-02 event produced a confirmation and appeared in recent events after reload.
- Visual review: checked the landing page and all three cases at desktop width, and P301, P302, and P303 at a 390-pixel phone width. The phone form retains large controls and the dashboard/cards reflow without horizontal page overflow.

## Data-story refinement review — 2026-10-28

- P301: the all-shift readout identifies Cell B as 135 of the 225-unit output gap (60%). The comparison table, queue, and readout respond to the same filter scope.
- P302: Line B's 93-unit defect reduction accounts for 66% of the plant's 141-unit reduction. The three defect categories reconcile to Line B's January and June totals; selecting a category updates its exact change and contribution. The chart line animates on entry and remains readable with reduced motion.
- P303: a fresh browser starts with two clearly labeled example events totaling 46 minutes. Reset clears the log and summary; saving a new 18-minute event updates the count and total to one and 18. The empty-state text remains accurate after reset.
- Re-ran all 10 automated checks and built P301, P302, and P303 successfully after these changes.

## Deployment smoke checks

For each live Vercel project: open root URL in a fresh session, enter the cohort passcode, complete the case's key interaction, reload, and verify browser-local state. Confirm direct `/p301/`, `/p302/`, and `/p303/` paths where relevant. Final URLs are in the README and handoff report. Recheck them after the refinement deployment.
