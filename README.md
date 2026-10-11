# My Porto v2

Personal portfolio built with React 19, TypeScript, and Vite.

## Development

```bash
pnpm install --frozen-lockfile
pnpm dev
```

No environment variables or external database are required.

## Edit portfolio content

All portfolio content lives in `src/data/portfolioContent.ts`:

- `PROFILE_CONTENT`: name, role, introduction, biography, location, email, and CV.
- `PROJECT_CONTENT`, `STACK_CONTENT`, `EDUCATION_CONTENT`, and `CERTIFICATE_CONTENT`: portfolio entries.
- `SETUP_CONTENT`: hardware, operating system, and editor.
- `SOCIAL_CONTENT`: social profile links.
- `UI_CONTENT`: headings, navigation, button labels, empty states, and artwork paths.
- `SEO_CONTENT`: page metadata. Vite injects it into HTML during development and builds.

Components import `PORTFOLIO_CONTENT` directly. Stored browser data and remote data cannot override it. Theme preference is the only value saved in localStorage.

Admin, blog, empty Tools pages, and chatbot features have been removed. Unknown routes redirect to the homepage.

## Commands

- `pnpm dev`: local development server.
- `pnpm build`: production build in `dist/`.
- `pnpm exec tsc --noEmit`: TypeScript check.
- `pnpm check:content`: content and asset checks.
- `pnpm preview`: preview the production build.

## Structure

- `src/components/`: portfolio sections and navigation.
- `src/data/portfolioContent.ts`: the source of portfolio content.
- `src/data/techStackIcons.ts`: technology icon mapping.
- `src/types.ts`: content models.
- `src/contexts/ThemeContext.tsx`: theme preference.
- `public/`: artwork, social image, robots.txt, and sitemap.
