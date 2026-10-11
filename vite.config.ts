import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { PROFILE_CONTENT, SEO_CONTENT, STRUCTURED_DATA } from "./src/data/portfolioContent";

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export default defineConfig({
  server: { port: 3000, host: "0.0.0.0" },
  plugins: [
    react(),
    {
      name: "portfolio-content-metadata",
      transformIndexHtml: {
        order: "pre",
        handler(html) {
          const values: Record<string, string> = {
            TITLE: SEO_CONTENT.title,
            DESCRIPTION: SEO_CONTENT.description,
            KEYWORDS: SEO_CONTENT.keywords,
            SOCIAL_DESCRIPTION: SEO_CONTENT.socialDescription,
            NAME: PROFILE_CONTENT.name,
            SITE_URL: SEO_CONTENT.siteUrl,
            IMAGE_PATH: SEO_CONTENT.image,
            IMAGE_URL: `${SEO_CONTENT.siteUrl}${SEO_CONTENT.image}`,
            LOCALE: SEO_CONTENT.locale,
          };
          return html
            .replace(/%PORTFOLIO_([A-Z_]+)%/g, (token, key) =>
              key === "STRUCTURED_DATA"
                ? JSON.stringify(STRUCTURED_DATA).replace(/</g, "\\u003c")
                : key in values ? escapeHtml(values[key]) : token,
            );
        },
      },
    },
  ],
  resolve: { alias: { "@": path.resolve(import.meta.dirname, "src") } },
});
