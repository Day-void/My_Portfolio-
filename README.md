# Day Maringisanwa — Portfolio

**Live site:** https://day-maringisanwa-portfolio.vercel.app/

A personal portfolio built with React and Vite: an animated binary-wave
background, glassmorphic panels, and a vertical icon sidebar (a labelled bottom
bar on phones).

## Features

- Content-driven: all text lives in [`src/data/content.js`](src/data/content.js)
- Working contact form (Resend, via a Vercel serverless function) with a
  server-side honeypot, per-browser rate limiting and email validation
- Respects `prefers-reduced-motion`, keyboard navigation and screen readers
- SEO basics: Open Graph / Twitter cards, JSON-LD, sitemap, robots.txt, and
  crawler-visible fallback content inside `#root` for scrapers that don't run
  JavaScript

## Built with

React 19 · Vite · lucide-react · Resend

## Getting started

```bash
npm install
cp .env.example .env   # then fill in your Resend API key (see below)
npm run dev
```

Open the local URL Vite prints in your browser.

### Contact form setup

1. Create a free account at [Resend](https://resend.com) and generate an API
   key from [resend.com/api-keys](https://resend.com/api-keys).
2. Put the key in `.env` as `RESEND_API_KEY` (see `.env.example`) — this must
   **not** be prefixed with `VITE_`, since anything prefixed that way ships
   inside the client bundle and becomes publicly visible. `RESEND_API_KEY` is
   read server-side only, inside `api/contact.js`.
3. Until you verify your own sending domain in Resend, the `from` address
   stays `onboarding@resend.dev`, which can only deliver to the email address
   your Resend account itself is registered under. Make sure that's
   `maringisanwaday@gmail.com`, or messages will silently fail to arrive.
4. In Vercel, add `RESEND_API_KEY` under Project Settings → Environment
   Variables (Production and Preview), then redeploy.

## Scripts

| Command           | What it does                     |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start the dev server             |
| `npm run build`   | Production build into `dist/`    |
| `npm run preview` | Preview the production build     |
| `npm run lint`    | Lint the source with ESLint      |

## Project structure

```
src/
  components/   Sidebar, Hero, panels, footer, background canvas
  data/         content.js — all editable text and links
  hooks/        useBinaryWave, useOnScreen, useActiveSection, useTypewriter, useRateLimiter
  utils/        emailValidation.js
public/         CV, favicon, profile photo, og-image.jpg, robots.txt, sitemap.xml
```

If you move to a custom domain, update the URL in `index.html` (canonical, Open
Graph, Twitter, JSON-LD), `public/robots.txt` and `public/sitemap.xml`.
