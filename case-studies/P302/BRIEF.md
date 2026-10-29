# P302 — The quality improvement story

## Audience and thesis

The audience is a manufacturing improvement lead. The story's thesis is that defect reduction at Northline Works was uneven: Line B improved sharply after an in-process inspection change, while Lines A and C changed gradually.

## Intended understanding

The audience should leave understanding both the overall improvement and where it came from. The intervention marker is an explanatory annotation on fictional data, not a causal proof.

## Data and interaction

Six months of invented monthly output and defect counts for three lines support two views: defect rate and defect count. A line selector focuses the comparison. Hover and keyboard focus reveal exact values. January and June Line B defect categories reconcile to its totals. The story text updates with the selected measure and line; a category control reveals each category's contribution.

## Flow and success criteria

1. Read the main conclusion before touching the chart, then follow three chapters as they reveal on scroll.
2. Compare all three lines over time and locate the March inspection change.
3. Select Line B and inspect the February and June values.
4. Toggle count versus rate and understand why normalized rate is preferable for comparing lines of different output sizes.
5. Inspect Line B's defect mix and see why misalignment is the next question to investigate.

The chart must have a textual summary, labeled axes and legend, visible focus behavior, and a readable mobile layout. The data is explicitly identified as fictional.

## Design rationale

Editorial typography and a numbered narrative sequence distinguish the story from the dashboard. The chart lines draw as the reader reaches the evidence; the defect-mix bars make the final chapter concrete. Adjacent prose interprets the numbers and names the next decision. Interaction exposes detail without being required to understand the thesis.
