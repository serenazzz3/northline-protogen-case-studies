# Requirements review

This review maps the attached learner instructions and the cohort site's use-case and deployment guidance to concrete evidence. It is a self-check, not a claim of an official grade.

| Review point | Evidence in this repository and live sites |
| --- | --- |
| Site is live and accessible | Three production Vercel URLs are in the README. Each has a browser-session passcode gate using the cohort guide's sample passcode. |
| Core flows work end to end | P301 filters, opens, acknowledges, and resets exceptions. P302 changes line/measure, exposes exact values, and reveals a defect category. P303 validates, saves, confirms, persists, and resets events. |
| Build reflects the brief | Root BRIEF.md and three case-specific briefs state the user, scenario, core flow, and design decision. Each route implements its corresponding flow. |
| Edge and empty states | P301 explains an empty queue; P303 explains an empty log and shows field-specific errors; P302 offers a data table and reduced-motion fallback. |
| Screen sizes | Browser review included desktop and 390-pixel phone widths. The dashboard cards reflow; the chart scrolls within its card on narrow screens; the mobile form remains thumb-friendly. |
| AI scaffolding and organization | BRIEF.md, PLAN.md, case briefs, context files, README.md, LICENSE, src/, scripts/, and tests/ have distinct purposes. |
| Real work in Git history | Planning, implementation, verification, and the subsequent data-story refinement use descriptive commits. |
| Industry fit and orientation | Manufacturing-specific measures, cell/line language, operational status, and a consistent visual system make each entry point understandable to its named user. |
| Thoughtful data story | P302 leads with a conclusion, guides the reader through three chapters, draws chart lines on entry, annotates the process change, and ends with a quantified defect mix and a cautious next decision. |
| No client or Slalom-specific data | Northline Works, people, equipment, and figures are invented; no client names or Slalom-specific content appear in the app. |

## Practical limits

The passcode ships in client-side code because the cohort guide suggests a simple free gate. It does not protect confidential data. Browser-local acknowledgements and downtime logs are reviewable demos rather than shared production records. Fictional data is explicitly disclosed and reconciled in `DATA_METHOD.md`.
