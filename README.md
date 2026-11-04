<div align="center">

# The Untold Story

### Bilingual (English / Arabic RTL) website for a film and video production studio

Marketing website for **The Untold Story**, a full-service film and video production studio working across Egypt and the MENA region. Built with Next.js 16, React 19 and TypeScript, with a custom English / Arabic language switch.

[![Next.js](https://img.shields.io/badge/Next.js-16.2-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2-149ECA?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Lucide](https://img.shields.io/badge/Lucide-icons-F56565?logo=lucide&logoColor=white)](https://lucide.dev)
<br>
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel&logoColor=white)](https://advertising-blond.vercel.app)

**[Live demo](https://advertising-blond.vercel.app)** ·
**[Portfolio](https://new-portfolio-ashy-xi.vercel.app/)** ·
**[LinkedIn](https://www.linkedin.com/in/eslamraafat-dev/)** ·
**[Email](mailto:eslamraafat736@gmail.com)**

<br>

<img src="docs/screenshots/desktop.jpg" alt="The Untold Story home page hero carousel on desktop" width="100%">

</div>

<table>
  <tr>
    <td width="33%"><img src="docs/screenshots/mobile.jpg" alt="Home page on an iPhone 13 viewport"></td>
    <td width="67%"><img src="docs/screenshots/desktop-ar.jpg" alt="Arabic right-to-left version of the home page"></td>
  </tr>
  <tr>
    <td align="center"><sub>Mobile (iPhone 13)</sub></td>
    <td align="center"><sub>Arabic RTL version (language switch in the header)</sub></td>
  </tr>
</table>

---

## Contents

- [Overview](#overview)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Pages](#pages)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Deployment](#deployment)
- [Author](#author)

## Overview

The site presents the studio's services (film, commercials, documentaries, corporate content, TV, podcasts, photography and original IP), its work, team, offices and contact options. Every page is available in English and Arabic, and the layout mirrors to right-to-left when Arabic is selected.

Some sections (sample case studies, blog posts and contact details) still use placeholder content that is meant to be replaced with the studio's real material.

## Features

### Bilingual EN / AR with RTL

- A `LanguageContext` provider holds the current locale and all translations ([`app/lib/data.ts`](app/lib/data.ts)).
- Switching language sets `lang` and `dir` on `<html>`, so the whole layout flips between LTR and RTL. The choice is saved in `localStorage`.
- Arabic text uses the Cairo font and English uses Inter.

### Home page

- Auto-playing hero carousel (changes slide every 5.5 seconds) with previous / next controls and slide indicators.
- Animated statistics counters that start when they scroll into view (`IntersectionObserver`) and format numbers for the active locale.
- Work showcase, awards / recognition strip, services overview and an FAQ accordion.
- Scroll-reveal animations through a small reusable `Reveal` component.

### Other pages

- **Portfolio:** project grid with category filters.
- **Blog:** post cards with tag filters and a newsletter sign-up box.
- **Contact:** a form with a three-step progress indicator, office cards with `mailto:` links. The form is front-end only: it shows a success state and does not send data anywhere yet.

### Editable content (demo)

- `GET /api/ads` serves editable site content (hero text, stats, announcement bar) from [`app/lib/db.json`](app/lib/db.json). The language provider merges it over the built-in translations.
- An unlisted `/dashboard` page shows overview cards, campaigns and leads from the same file, and lets you edit the hero content through `POST /api/ads`. It has no authentication and writes to a local JSON file, so it only works as a local demo (Vercel's file system is read-only).

## Tech stack

| Layer | Tools |
| --- | --- |
| Framework | Next.js 16.2 (App Router), React 19.2 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 (`@tailwindcss/postcss`), CSS custom properties for the brand colours |
| Icons | lucide-react, flag-icons (CDN) |
| Images | `next/image` |
| Fonts | Inter, Cairo (Google Fonts) |
| Data | Route handler (`app/api/ads/route.ts`) reading a JSON file |
| Quality | ESLint 9 (`eslint-config-next`) |
| Hosting | Vercel |

## Pages

| Route | Page |
| --- | --- |
| `/` | Home: hero carousel, stats, work showcase, awards, services, FAQ |
| `/about` | Studio story, values and leadership team |
| `/services` | Production services |
| `/portfolio` | Projects with category filters |
| `/blog` | Articles with tag filters and newsletter box |
| `/contact` | Contact form and office details |
| `/dashboard` | Unlisted content dashboard (local demo only) |

## Project structure

```text
.
├── app/
│   ├── layout.tsx            # root layout: Navbar, Footer, LanguageProvider
│   ├── page.tsx              # home page
│   ├── about/ services/ portfolio/ blog/ contact/ dashboard/
│   ├── api/ads/route.ts      # GET / POST editable content
│   ├── components/           # Navbar, Footer, HeroCarousel, AnimatedStats, AwardsSection,
│   │                         # WorkShowcase, Reveal, LanguageContext
│   ├── lib/
│   │   ├── data.ts           # EN / AR translations and page content
│   │   └── db.json           # editable content used by /api/ads
│   └── globals.css           # Tailwind 4 + theme variables
└── public/                   # logos (black.png, white.png)
```

## Getting started

**Requirements:** Node.js 20.9 or newer and npm.

```bash
git clone https://github.com/Eslamraafat1/Advertising.git
cd Advertising
npm install
npm run dev        # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Deployment

The site is deployed on **Vercel**: [advertising-blond.vercel.app](https://advertising-blond.vercel.app).

## Author

**Eslam Raafat** — Front-End Developer (React / Next.js / TypeScript)

- **Portfolio:** [new-portfolio-ashy-xi.vercel.app](https://new-portfolio-ashy-xi.vercel.app/)
- **LinkedIn:** [linkedin.com/in/eslamraafat-dev](https://www.linkedin.com/in/eslamraafat-dev/)
- **GitHub:** [@Eslamraafat1](https://github.com/Eslamraafat1)
- **Email:** [eslamraafat736@gmail.com](mailto:eslamraafat736@gmail.com)

---

© The Untold Story. Brand name and logo belong to The Untold Story. Code shared for portfolio purposes.
