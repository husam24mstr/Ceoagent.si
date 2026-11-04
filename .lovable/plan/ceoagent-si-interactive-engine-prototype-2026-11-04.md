# CeoAgent.si interactive engine prototype

## Experience
- Make all eight homepage engines links to their own `/engines/<engine>` pages, preserving the executive dark design.
- Give each engine a distinct accent, executive summary, two-column explanation, and architectural flow diagram.
- Add a Simulation Console with engine-specific scenarios and editable inputs. Running it progresses through ingestion, predictive modeling, and executive briefing before revealing a Recharts report and tailored simulated recommendations.
- Support reruns, input validation, accessible loading states, mobile layouts, and a Back to Dashboard link.
- Clearly mark reports as simulated prototype data; no real analysis, account requirement, or external service is added.

## Technical approach
- Reuse TanStack Router, shared Button variants, and Framer Motion; add one dynamic engine route with unknown-engine handling and engine-specific metadata.
- Keep engine definitions and deterministic simulation calculations in shared modules, and the console in a focused component.
- Define engine accent tokens and the requested dark background in global CSS. Extend the existing router-derived sitemap to include all eight engine URLs.
- Add focused simulation/routing tests, then verify navigation and completed simulations on desktop and mobile.