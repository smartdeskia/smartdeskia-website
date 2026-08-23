# SmartDeskia

Premium responsive marketing website for SmartDeskia, an AI-powered front-desk platform for local businesses. The experience includes dynamic industry examples, a simulated booking workflow, dashboard preview, Sofia chat, and request-a-call flows.

## Tech stack

- React 19 and TypeScript
- Next.js-compatible App Router through Vinext
- Vite 8
- Cloudflare Workers and OpenAI Sites hosting configuration
- Plain CSS with responsive `rem` and `clamp()` typography

## Project structure

```text
app/                 Routes, root layout, and informational page shell
components/          Reusable interface and interactive components
sections/            Homepage content sections
data/                Typed industry and activity content
styles/              Global, section, enhancement, and route styles
public/              Static images, icons, favicon, and social preview
worker/              Cloudflare Worker entry point
db/ and drizzle/     Optional database foundation supplied by the host starter
.openai/              Sites hosting configuration
```

## Installation

Node.js 22.13 or later is required. The repository uses pnpm.

```bash
pnpm install
```

## Development

```bash
pnpm dev
```

The development server prints the local preview URL when it starts.

## Production build

```bash
pnpm build
pnpm start
```

## Environment variables

Copy `.env.example` to `.env.local` and configure only the values required by the deployment.

- `NEXT_PUBLIC_REQUEST_FORM_URL` — optional public endpoint for Request a Call submissions. Without it, the form remains a visual placeholder.

Never commit private API keys or credentials. Client-exposed variables must not contain secrets.

## Key components

- `Header` — desktop dropdown navigation and accessible scroll-locking mobile menu.
- `IndustriesSection` — renders industry tabs from `data/industries.ts`.
- `LiveActivityStrip` — rotating simulated conversation feed.
- `PhoneJourney` — animated incoming call, typed booking conversation, and SMS confirmation.
- `DashboardPreview` — universal dashboard with a dental example scenario.
- `SofiaChat` — glowing launcher and self-contained chat panel.
- `RequestCallModal` — reusable request form modal.
- `Footer` — platform, industry, product, company, and legal navigation.

## Routes

- `/` — SmartDeskia marketing website
- `/dental`, `/salon`, `/trades`, `/legal`, `/restaurant` — industry examples
- `/login`, `/contact` — product placeholders
- `/privacy`, `/terms`, `/cookies` — legal placeholders awaiting approved content

## Deployment

The project is configured for OpenAI Sites and Cloudflare Workers through `.openai/hosting.json`, `vite.config.ts`, and `worker/index.ts`. Use the existing Sites publishing workflow for hosted releases.

## Handoff notes

- Conversations, dashboard data, forms, and activity feeds are demonstrations; connect them to approved production services before launch.
- Legal pages intentionally contain placeholder notices rather than fabricated policy text.
- Dental is represented by the `/dental` route and is the most developed vertical example.
