# Xavathon Landing Page

Premium, fully responsive Next.js landing page for the college hackathon **Xavathon** with a dark futuristic theme, motion-led UI, and Google Sheets registration support.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- Framer Motion
- React Hook Form

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

Create `.env.local` from `.env.example` and configure:

```bash
NEXT_PUBLIC_GOOGLE_FORM_URL=https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true
```

Registrations are collected via an official Google Form embed for reliability and simplicity.

## Deployment

Deploy on Vercel with the same environment variable configured in the project settings.

Suggested production checklist:

- Set `NEXT_PUBLIC_GOOGLE_FORM_URL`
- Replace placeholder contact and social links in `lib/site-content.ts`
- Update metadata domain in `app/layout.tsx` if your final URL changes
- Review event copy, dates, and prize details before launch
