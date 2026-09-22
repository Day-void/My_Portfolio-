# Day Maringisanwa — Portfolio

**Live site:** https://day-maringisanwa-portfolio.vercel.app/

A personal portfolio built with React and Vite: an animated binary-wave
background, glassmorphic panels, and a vertical icon sidebar (a labelled bottom
bar on phones).

## Features

- Content-driven: all text lives in [`src/data/content.js`](src/data/content.js)
- Working contact form (EmailJS) with a honeypot, per-browser rate limiting and
  email validation
- Respects `prefers-reduced-motion`, keyboard navigation and screen readers
- SEO basics: Open Graph / Twitter cards, JSON-LD, sitemap, robots.txt

## Built with

React 19 · Vite · lucide-react · EmailJS

## Getting started

```bash
npm install
cp .env.example .env   # then fill in your EmailJS keys (see below)
npm run dev
```

Open the local URL Vite prints in your browser.

### Contact form setup

1. Create a free account at [EmailJS](https://dashboard.emailjs.com) and add an
   email service and a template that uses `{{from_name}}`, `{{from_email}}` and
   `{{message}}`.
2. Put the service ID, template ID and public key in `.env`
   (`VITE_EMAILJS_*` — see `.env.example`).
3. In the EmailJS dashboard, restrict the allowed domains to your site and turn
   on reCAPTCHA. The keys ship in the browser bundle, and the in-app rate
   limiter only protects against accidental spam, not a determined one.

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
