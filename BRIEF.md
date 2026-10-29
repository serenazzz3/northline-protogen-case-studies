# Northline Works | Protogen case studies

## Context and decision

Northline Works is a fictional precision-parts manufacturer. The three case studies share the same operational setting and invented dataset, but each serves a different person and decision. The common visual system uses a warm neutral canvas, ink text, restrained teal for normal operations, and coral for action. This makes the portfolio feel like one workplace while giving each task its own hierarchy.

All company, people, equipment, and performance data are invented. No client or Slalom information is used.

## P301: operational dashboard

**User:** Maya Chen, plant operations director. **Moment:** first ten minutes of the morning shift. **Question:** which production cell needs intervention now? **Core flow:** change shift and cell filters, compare throughput and quality against targets, inspect exceptions, acknowledge one, and see the queue update. **Design decision:** exceptions precede trend detail because an operations director needs to act before exploring.

See [case-studies/P301/BRIEF.md](case-studies/P301/BRIEF.md).

## P302: interactive data story

**Audience:** manufacturing improvement lead. **Point of view:** defects did not improve evenly; most of the gain came after an inspection change on Line B. **Core flow:** read the story in sequence, switch between rate and defect count, compare lines, and inspect monthly points and the annotated intervention. **Design decision:** a clear written conclusion sits beside the chart so interaction deepens the story rather than hiding it.

See [case-studies/P302/BRIEF.md](case-studies/P302/BRIEF.md).

## P303: mobile experience

**User:** Alex Rivera, floor supervisor moving between machines. **Moment:** a machine stops during a shift. **Task:** log a downtime event with machine, reason, duration, and optional note, then confirm it appears in the recent log. **Design decision:** one thumb-friendly form and a persistent confirmation reduce the effort of recording an event while away from a desk.

See [case-studies/P303/BRIEF.md](case-studies/P303/BRIEF.md).

## Review and delivery

The root page gives reviewers a direct link to each experience and the README explains setup and demo behavior. Each case has a specific brief, purposeful interactions, responsive layout, and empty or error states. Vercel can deploy the repository as a Vite project with the default build command and `dist` output.
