# Northline Works — three Protogen case studies

Three connected, fictional manufacturing experiences for P301, P302, and P303. Open the landing page to enter each case study, or visit `/p301/`, `/p302/`, and `/p303/` directly.

| Case | Experience | Main interaction |
| --- | --- | --- |
| P301 | Plant operations dashboard | Filter a shift or cell and acknowledge an exception |
| P302 | Interactive quality data story | Compare lines and switch between rate and count |
| P303 | Mobile downtime log | Record and review a downtime event |

## Run locally

```sh
npm install
npm run dev
```

`npm run build` produces the portfolio in the Vercel-ready `dist` directory with no external dependencies. For three separate Vercel projects from this one repository, select **Other** as the framework, set output directory to `dist`, and use `npm run build:p301`, `npm run build:p302`, or `npm run build:p303` respectively. Each resulting site's root URL opens the named case study directly. The other routes remain available for context.

Run `npm test` for the data, filtering, and mobile validation checks. The core interactions should also be checked in a browser at desktop and phone widths before each submission. See [context/TESTING.md](context/TESTING.md) for the verification record.

## Review notes

All data and names are invented. Dashboard acknowledgements and mobile downtime entries are saved in the current browser with `localStorage`; they are demo records, not shared production data. Use **Reset demo** to restore the starting state. No account, API key, or backend is required. The experience works offline once its static assets have loaded, though browser persistence may vary in private browsing.

The cohort asks for password protection before submission. This demo includes a simple browser gate using the cohort guide's sample password `protogen2026`; approval lasts for the browser session. Because the password ships in public frontend code, this gate is for cohort review convenience, not protection of sensitive information. Use Vercel's server-side Deployment Protection if stronger access control is needed.

The briefs were written before implementation and document the user, scenario, flows, design decisions, and acceptance checks. See [BRIEF.md](BRIEF.md), [PLAN.md](PLAN.md), [case-studies/P301/BRIEF.md](case-studies/P301/BRIEF.md), [case-studies/P302/BRIEF.md](case-studies/P302/BRIEF.md), and [case-studies/P303/BRIEF.md](case-studies/P303/BRIEF.md). Context and implementation notes live under [context/](context/).

## Structure

`index.html` is the reviewer entry point. `p301/`, `p302/`, and `p303/` hold the three standalone pages. `src/` contains shared styles, data, and behavior. `case-studies/` contains the individual briefs. `context/` gives AI tools the project background and working decisions.

## License

MIT — see [LICENSE](LICENSE).
