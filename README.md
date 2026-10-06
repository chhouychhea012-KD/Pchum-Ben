# Pchum Ben Festival 2026 — Frontend MVP

A Khmer-first, bilingual, frontend-only Pchum Ben companion built with Next.js, React, TypeScript, Material UI, Zustand, Day.js and Zod.

## Features

- Cambodia-timezone festival countdown and Kan Ben day detection
- Complete 15-day Kan Ben timeline
- Festival calendar with public holidays and personal events
- Homecoming planner: exact date or N days before Pchum Ben
- Homecoming countdown and journey details
- Personal schedule CRUD
- Preparation checklist CRUD, reordering and readiness score
- Pagoda visit planner CRUD
- Khmer / English switching and optional Khmer numerals
- Light / dark theme
- Local profile
- LocalStorage persistence, SessionStorage UI state, cookies for preferences
- Backup export/import and data reset
- Responsive desktop/tablet/mobile navigation
- Unit tests for core business logic

## Run

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Verify

```bash
npm test
npm run build
```

All personal data stays in the current browser. No backend, database, authentication, Firebase or Supabase is used.
