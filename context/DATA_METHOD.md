# Data definitions and reconciliation

All data is invented for this design exercise. It is deliberately small, internally consistent, and suitable for a reviewer to recalculate. It does not represent a real plant or a client system.

## P301 operational snapshot

`src/data.js` contains six records: Cells A, B, and C for day and night shifts. Each record has produced units, planned units, first-pass yield, downtime minutes, and six hourly output values. The six hourly values sum to produced units for that record.

- **Output:** sum of produced units in the selected shift/cell scope.
- **Pace:** output divided by planned units.
- **First-pass yield:** produced-unit-weighted average of the selected records' yield rates.
- **Downtime:** sum of recorded minutes. The guide shown in the UI is 20 minutes per selected cell-shift record; it is a fictional operating threshold.
- **Output gap:** planned units minus produced units. Across all records, the gap is 225 units. Cell B contributes 135 units, or 60%.
- **Exception queue:** four scripted signals tied to specific shift/cell records. Acknowledgement changes only the browser-local queue state; it does not alter production history.

## P302 quality story

`src/data.js` also contains monthly output and defect counts for Lines A, B, and C from January through June 2026. A line's defect rate is defects divided by output. The plant rate is the sum of all line defects divided by the sum of all line output, not an average of line percentages.

- Plant rate: 343/9,000 = 3.8% in January; 202/9,600 = 2.1% in June, after rounding.
- Line B: 143/2,800 = 5.1% in January and February; 50/3,100 = 1.6% in June.
- Plant defective-unit reduction: 141. Line B's reduction is 93, or 66% after rounding.
- Line B category mix: January misalignment 62, surface finish 41, dimensional 40 = 143. June 16, 18, and 16 = 50. Misalignment's reduction of 46 is 49% of Line B's reduction of 93.

The March inspection annotation marks a fictional process change. The story treats the timing as a question for further investigation and does not claim the change caused the improvement.

## P303 demo log

On a fresh browser visit, two labeled example records show 34 and 12 minutes of downtime, or 46 total. They are context for the mobile log, not a live feed. Their display times are generated relative to the visit. User-created events add to the count and minute total and stay in the current browser's local storage. Reset demo clears the log and exposes the empty state.
