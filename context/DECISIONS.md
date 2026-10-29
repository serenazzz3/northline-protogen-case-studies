# Working decisions

## 2026-10-28 — Initial planning

- Choose manufacturing because a single setting can support a director dashboard, a quality improvement story, and a supervisor's mobile log without making any one case generic.
- Use a single repository with three direct routes and separate briefs; the user requested one GitHub repository link for Vercel.
- Use fictional data and browser-local actions so every core flow can be reviewed without accounts or external services.
- Use a static Vite build to keep Vercel deployment simple and make direct-route testing straightforward.

## 2026-10-28 — Requirements refinement

- The cohort's Vercel guide asks for a password gate before submission. Use its sample review passcode and session persistence, with a clear disclosure that browser-side gating does not secure confidential data.
- The linked Primeritus repository is a separate financial-services proof of concept, not an automated grading tool. Learn from its descriptive README, structure, tests, and commit history without copying its domain or client-specific information.
- Use dependency-free static builds instead of Vite to reduce deployment risk. Three build targets make one repository deployable as three individual Vercel projects.
- Test data calculations, filtering, and mobile validation directly; verify complete flows and responsive layouts in the browser.
