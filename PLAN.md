# Build plan

## Review target

Deliver three independent, directly addressable case-study experiences in one coherent fictional manufacturing portfolio. Each must match its own brief and work without a backend. The reviewer should be able to open each URL, understand the intended user and task, and complete the core flow.

The attached learner instructions define the pass/redo criteria. The cohort site adds a stronger narrative cue for P302 (scroll-driven reveals) and requires a password screen before submission. The linked Primeritus repository is a separate financial-services proof of concept; its organized documentation and descriptive history are useful references, but its client-specific domain and code are not part of this project.

## Phases and acceptance checks

### 1. Plan and scaffold

- Write a root brief and separate case briefs before implementation.
- Keep README and LICENSE at repo root, with context files in one logical folder.
- Establish a shared design system and explicit sample-data disclosure.
- Create descriptive commits for actual planning, implementation, and verification steps.

### 2. P301 operational dashboard

- Show status, targets, metrics, and prioritized exceptions at a glance.
- Filter by shift and cell; all visible metrics and exceptions respond consistently.
- Let the reviewer inspect and acknowledge an exception; reflect the changed state and support reset.
- Provide an empty queue state and usable narrow layout.

### 3. P302 interactive data story

- State the finding immediately, then guide the reader through three scroll sections.
- Animate or reveal chart evidence as sections enter view, while respecting reduced-motion preferences.
- Compare lines and toggle defect rate/count; exact values remain available to mouse and keyboard users.
- Label invented data and avoid claiming the inspection change proves causation.

### 4. P303 phone-first task

- Present one quick downtime form with clear labels and large touch targets.
- Validate required fields and positive duration without discarding entries.
- Save locally, show explicit confirmation, and display the new record in recent history.
- Include an empty state, reset, and a layout that remains useful on desktop.

### 5. Review and publish

- Verify direct URLs, interactions, keyboard focus, empty/error states, mobile widths, and a production build.
- Add a simple session password gate to the whole deployment per cohort guidance. Document that client-side gates are visible in source and do not secure sensitive data.
- Publish a real Git history to the user's GitHub account, verify the repository URL, then deploy three Vercel projects from the same repo with `build:p301`, `build:p302`, and `build:p303`. Verify each root URL and provide a submission report with the live link, passcode, repo, and context for each.
