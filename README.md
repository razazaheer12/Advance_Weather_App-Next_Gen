<div align="center">

# ⛅ WeatherFlow

**A premium, minimal, app-like weather experience for the web.**

Search any city, follow the hour-by-hour story of the day, keep your favorite places one tap away — and keep reading the forecast even when your connection drops.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-000000?logo=vercel&logoColor=white)](https://weather-flow-web-app.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-000000?logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![PWA](https://img.shields.io/badge/PWA-installable-5A0FC8?logo=pwa&logoColor=white)](https://web.dev/learn/pwa)
[![Strict Build](https://img.shields.io/badge/build-type--checked%20%2B%20linted-brightgreen)](#-quality-gates)

🔗 **Live demo:** [weather-flow-web-app.vercel.app/](https://weather-flow-web-app.vercel.app/) · 📦 **Source:** [github.com/razazaheer12/weather-flow-app](https://github.com/razazaheer12/weather-flow-app)

<img width="958" height="411" alt="image" src="https://github.com/user-attachments/assets/bb78b5cb-25da-4ea3-af4e-86137179a62c" />
<img width="571" height="440" alt="image" src="https://github.com/user-attachments/assets/4c18ab79-7c0b-4659-8a3d-6727e9081593" />
<img width="294" height="440" alt="image" src="https://github.com/user-attachments/assets/d904eae1-992d-41c4-92f9-ba532322256a" />


</div>

---

## ✨ Features

### 🌦️ Core weather experience
- **Search-first flow** — a friendly onboarding gate, then a clean empty state. No forced default city, no noise.
- **Hero card** — condition icon, current temperature, feels-like, and a **true daily High/Low** derived from the day's 3-hourly forecast buckets (not the instantaneous API snapshot).
- **Hourly strip** — the next 8 forecast slots with precipitation probability, horizontally snap-scrollable.
- **5-day forecast** — daily rows with min/max **temperature range bars**, normalized across the week.
- **Details grid** — humidity, wind, visibility, pressure, and sunrise/sunset in the *city's local time*.
- **Temperature trend chart** — a 24-hour area chart, lazy-loaded so it never touches the initial bundle.
- **Honest error states** — typed errors (`city not found`, `network`, `api`) mapped to friendly, actionable copy with one-tap retry.

### 💾 Personalization (100% local — no accounts, no backend)
- **Favorite cities** — heart any city; snapshot chips stay on the dashboard with per-city weather and a bulk refresh.
- **Recent searches** — last 8 cities, deduped, one tap to revisit.
- **Unit system** — `°C / °F` toggle that also converts wind (`km/h ↔ mph`) and visibility (`km ↔ mi`), persisted across sessions.
- **Theming** — Light / Dark / System via `next-themes`, persisted, with a fully tokenized oklch palette.

### 📲 PWA & offline-first
- **Installable** — web app manifest with a generated icon set (`192`, `512`, **maskable**, `apple-touch-icon`, multi-size `favicon.ico`); installed apps launch standalone with the WeatherFlow icon.
- **Install prompt** — a tasteful "Install WeatherFlow" card; dismissing it is respected for 7 days.
- **Versioned service worker** — network-first navigations, cache-first immutable assets, network-first API with stamped cache fallback, and a **"new version ready → Reload"** update flow (`SKIP_WAITING`, no mid-session hijack).
- **Offline indicator** — "You're offline · Showing last updated weather · \<timestamp\>" banner.
- **Cached weather presentation** — successful lookups are cached locally; offline searches for known cities restore real cached data with its original timestamp instead of failing.

### 🎨 Design, motion & accessibility
- **Weather-responsive ambience** — subtle condition- and day/night-aware background gradients that never compromise text contrast.
- **Layout-matched skeletons** and fade/scale micro-interactions, with `prefers-reduced-motion` respected.
- **Accessible by default** — semantic roles, `aria-pressed`/`aria-live`, labeled icon buttons, visible focus rings, and a zoom-friendly viewport (no `user-scalable=false`).

---

## 🧰 Tech Stack

| Layer        | Technology |
| ------------ | ---------- |
| Framework    | **Next.js 14** (App Router, static prerender) |
| Language     | **TypeScript 5** (strict) |
| UI           | **React 18**, Tailwind CSS **v4** (CSS-first `@theme` tokens, oklch), Geist fonts |
| Components   | Radix UI primitives + shadcn-style `button` / `card` / `input` |
| Icons        | `lucide-react` (crisp condition mapping, no bitmap weather icons) |
| Charts       | `recharts` (loaded via `next/dynamic`, `ssr: false`) |
| Theming      | `next-themes` (class strategy) |
| State        | `useSyncExternalStore` + module-level persistent stores (`localStorage`) |
| Offline/PWA  | Hand-rolled service worker (`public/sw.js`) + Web App Manifest |
| Data         | [OpenWeatherMap](https://openweathermap.org) Current + 5-day/3-hourly APIs |
| Tooling      | pnpm, ESLint (`next/core-web-vitals`), `tsc --noEmit` |

---

## 🏗️ Architecture

```
├── app/
│   ├── globals.css           # Tailwind v4 design tokens (light + dark), keyframes
│   ├── layout.tsx            # Metadata, PWA meta, ThemeProvider, viewport
│   ├── offline/page.tsx      # Last-resort offline fallback page
│   └── page.tsx              # Shell: onboarding gate → search / dashboard / errors
├── components/
│   ├── ui/                   # button, card, input primitives
│   ├── weather-dashboard.tsx # Hero + hourly + daily + chart + details composition
│   ├── hourly-forecast.tsx   # 8-slot snap-scroll strip
│   ├── daily-forecast.tsx    # 5-day rows with normalized range bars
│   ├── temperature-chart.tsx # Lazy recharts area chart
│   ├── weather-details.tsx   # Metric grid (unit-aware)
│   ├── favorites-bar.tsx     # One-tap favorite chips
│   ├── favorites-list.tsx    # Manageable favorites with snapshots
│   ├── recent-searches.tsx   # Recent city chips
│   ├── search-bar.tsx        # Search + geolocation pin
│   ├── offline-indicator.tsx # Offline / stale-data banner
│   ├── pwa-install-prompt.tsx# Install card with dismissal cooldown
│   ├── update-notification.tsx # SW update toast
│   ├── weather-ambience.tsx  # Condition-aware background layer
│   ├── units-toggle.tsx      # °C / °F segmented control
│   ├── theme-toggle.tsx      # Light / Dark / System segmented control
│   └── onboarding-screen.tsx # First-run welcome gate
├── hooks/
│   ├── use-weather.ts        # Race-guarded fetch + cache fallback + staleSince
│   ├── use-favorites.ts      # Persistent favorites store
│   ├── use-recent-searches.ts# Persistent recents (max 8)
│   ├── use-settings.ts       # Units preference store
│   ├── use-onboarding.ts     # First-run gate state
│   └── use-pwa.ts            # SW registration, install prompt, update flow, online status
├── lib/
│   ├── weather.ts            # OWM client, typed WeatherError, friendly copy
│   ├── forecast.ts           # Hourly/daily derivations from 3-hourly buckets
│   ├── units.ts              # Render-time °C/°F, km/h/mph, km/mi conversion
│   ├── weather-cache.ts      # Pruned localStorage cache + timestamps
│   ├── storage.ts            # Safe JSON + createPersistentStore primitive
│   └── settings.ts           # Settings store definition
└── public/
    ├── sw.js                 # Versioned caches + caching strategies
    ├── manifest.json         # WeatherFlow manifest (any + maskable icons)
    └── icon-*.png, favicon.ico, apple-touch-icon.png
```

### Data flow

```
Search / pin / favorite chip
        │
        ▼
useWeather (request-ID race guard)
        │
        ├─ lib/weather.ts ──▶ OpenWeatherMap (current + forecast)
        │        │
        │        ▼
        │   lib/forecast.ts  ──▶ hourly slice · daily buckets · high/low · pop
        │
        ├─ success (live) ──▶ render + write lib/weather-cache.ts (timestamped)
        ├─ success (SW cache, x-weatherflow-cached-at) ──▶ render + stale banner
        └─ network failure ──▶ localStorage cache hit? ──▶ render cached + banner
                                  └─ miss ──▶ typed ErrorState + retry
```

### Service worker strategies

| Request type                  | Strategy                                            | Cache    |
| ----------------------------- | --------------------------------------------------- | -------- |
| Navigations                   | Network-first → cached shell → `/offline`           | static   |
| `/_next/static/*`, icons      | Cache-first (content-hashed / immutable)            | static   |
| OpenWeatherMap API            | Network-first; fallback serves cache stamped with `x-weatherflow-cached-at` | runtime |
| Cross-origin subresources     | Network-only, fail silent                           | —        |

Cache names are versioned (`weatherflow-v1-*`); activating workers purge older versions, and new deploys surface through the update toast instead of hijacking open tabs.

### Local storage keys

| Key                              | Purpose                          |
| -------------------------------- | -------------------------------- |
| `weatherflow:onboarding-complete`| First-run gate                   |
| `weather-app-favorites`          | Favorite cities + snapshots      |
| `weatherflow-recent-searches`    | Recent cities (max 8)            |
| `weatherflow:weather-cache`      | Timestamped weather snapshots (pruned to 12) |
| `weatherflow:settings`           | Unit preference                  |
| `weatherflow:install-dismissed-at` | Install-prompt cooldown        |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18.17
- **pnpm** (recommended) — `npm i -g pnpm`
- A free **OpenWeatherMap API key** — [openweathermap.org/api](https://openweathermap.org/api)

### Setup

```bash
# 1. Clone
git clone https://github.com/razazaheer12/weather-flow-app
cd weather-flow-app

# 2. Install dependencies
pnpm install

# 3. Configure environment
cp .env.example .env.local
#    then paste your key:  NEXT_PUBLIC_WEATHER_API_KEY=your_openweathermap_api_key

# 4. Run
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

### Environment variables

| Variable                     | Required | Description                          |
| ---------------------------- | -------- | ------------------------------------ |
| `NEXT_PUBLIC_WEATHER_API_KEY`| ✅       | OpenWeatherMap API key (inlined at build time) |

> 🔐 The key is never hardcoded in source. `.env.local` is git-ignored; `.env.example` ships as the template.

---

## 📜 Scripts & Quality Gates

| Command          | What it does                                        |
| ---------------- | --------------------------------------------------- |
| `pnpm dev`       | Start the dev server                                |
| `pnpm build`     | Production build — **type-checks and lints** (strict, no escapes) |
| `pnpm start`     | Serve the production build                          |
| `pnpm lint`      | ESLint (`next/core-web-vitals`)                     |
| `npx tsc --noEmit` | Full strict type-check                            |

Every build runs TypeScript validation and ESLint — warnings and errors fail the build.

---

## ⚡ Performance

- **112 kB** first-load JS on `/` (16.3 kB route-specific).
- Recharts is code-split behind `next/dynamic` (`ssr: false`) with a skeleton placeholder.
- All routes prerender as static content; the service worker serves repeat visits from cache.
- Zero backend: the browser talks to OpenWeatherMap directly; personalization lives in `localStorage`.

---

## 📲 PWA Testing Checklist

1. **Install** — Chrome: install icon in the address bar → custom "Install WeatherFlow" prompt → installed app opens standalone with the WeatherFlow icon.
2. **Offline** — DevTools → Network → Offline → reload: the shell loads from cache and the banner shows *You're offline · Showing last updated weather · \<time\>*; searching a previously viewed city restores cached data.
3. **Updates** — bump `VERSION` in `public/sw.js`, reload twice → "A new version of WeatherFlow is ready" → **Reload** swaps workers and purges old caches.

---

## ☁️ Deployment (Vercel)

1. Push this repository to GitHub.
2. **Vercel → New Project → Import** the repo (framework preset: Next.js).
3. Add the environment variable `NEXT_PUBLIC_WEATHER_API_KEY` (project settings → Environment Variables).
4. Deploy — the manifest, icons, and service worker are served from `public/` automatically.

> Because `NEXT_PUBLIC_*` values are inlined at build time, set the variable **before** building (or trigger a redeploy after changing it).

---

## 🤝 Contributing

Issues and pull requests are welcome. Keep changes focused, run `pnpm lint`, `npx tsc --noEmit`, and `pnpm build` before submitting, and preserve the project's rules of the road: no fake weather data, no accounts or backend, personalization stays in `localStorage`, and geolocation only on explicit user action.

---

## 👤 Author

**Raza Zaheer** — [github.com/razazaheer12](https://github.com/razazaheer12)

Built as a phased evolution from a monolithic weather demo into WeatherFlow: audit → core UX → favorites & recents → premium dashboard → PWA & offline → settings, accessibility & polish → final QA.

---

<div align="center">

**Weather data by [OpenWeatherMap](https://openweathermap.org)** · Hosted on [Vercel](https://vercel.com)

</div>
