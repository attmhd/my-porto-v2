# My Porto v2

Portfolio website built with React, Vite, and TypeScript.

## Quick start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy env template:
   ```bash
   cp .env.example .env
   ```
3. Run locally:
   ```bash
   npm run dev
   ```

## Supabase setup

1. Create a Supabase project.
2. Fill `.env`:
   ```env
   VITE_SUPABASE_URL=...
   VITE_SUPABASE_ANON_KEY=...
   VITE_SUPABASE_PORTFOLIO_TABLE=portfolio_state
   VITE_SUPABASE_PORTFOLIO_ROW_ID=current
   ```
3. Run the SQL in `supabase/migrations/0001_portfolio_state.sql`.

The app will use Supabase when credentials are present, and fall back to localStorage otherwise.

## Structure

- `src/components` - reusable UI components
- `src/pages` - route-level pages
- `src/data` - shared content and portfolio models
- `src/services` - API and persistence layers
- `src/contexts` - React providers
- `src/hooks` - custom hooks

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
