# Repository Guidelines

## Project Structure & Module Organization

This is a React 19, TypeScript, and Vite portfolio. `src/App.tsx` defines routes; `src/components/` holds UI sections. All portfolio data, display copy, links, artwork paths, and SEO metadata belong in `src/data/portfolioContent.ts`. Shared content models live in `src/types.ts`; icon mapping lives in `src/data/techStackIcons.ts`. `src/contexts/ThemeContext.tsx` stores theme preference. Static assets, `robots.txt`, and the sitemap live in `public/`.

## Build, Test, and Development Commands

- `pnpm install --frozen-lockfile` installs dependencies from `pnpm-lock.yaml`.
- `pnpm dev` starts the local Vite server.
- `pnpm build` creates the production site in `dist/`.
- `pnpm preview` serves that build locally for a final browser check.
- `pnpm exec tsc --noEmit` checks TypeScript separately; the Vite build does not run this check.
- `pnpm check:content` checks the single content source, entry IDs, icon mappings, links, and artwork paths.

Use the pnpm commands documented in `README.md` and commit `pnpm-lock.yaml` when dependencies change.

## Coding Style & Naming Conventions

Follow the existing two-space indentation, double quotes, semicolons, and functional React components. Name component and page files in PascalCase (`Projects.tsx`), hooks with a `use` prefix (`useBlogPosts.ts`), and functions and variables in camelCase. Keep shared types in `src/types.ts` or beside the feature that owns them. Use the existing CSS in `src/styles.css` and established utility classes. There is no configured formatter or lint command; match nearby code when editing.

## Testing Guidelines

No automated test framework or coverage threshold is configured. For each change, run `pnpm build` and `pnpm exec tsc --noEmit`, then check affected routes in the browser. Run `pnpm check:content` for profile content changes. Verify responsive layouts for UI changes and content display for data changes. If adding tests, use descriptive `*.test.ts` or `*.test.tsx` names beside the relevant source and document the new command in `package.json`.

## Commit & Pull Request Guidelines

Recent commits mix short imperative summaries (`Improve mobile navigation behavior and layout`) with scoped prefixes (`feat: ...`, `fix: ...`). Keep subjects concise and state the outcome. Pull requests should describe the change, list checks performed, link relevant issues, and include before/after screenshots for visual changes.

## Configuration & Security

The portfolio uses static content and requires no environment variables or external database. Keep `.env` and secrets out of commits. Never add browser-exposed API secrets.
