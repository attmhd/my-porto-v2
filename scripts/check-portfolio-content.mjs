import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createServer } from "vite";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

const server = await createServer({
  configFile: false,
  server: { middlewareMode: true, hmr: false, ws: false, preTransformRequests: false },
  optimizeDeps: { noDiscovery: true, include: [] },
  appType: "custom",
});

try {
  const content = await server.ssrLoadModule("/src/data/portfolioContent.ts");
  const { TECH_STACK_ICONS } = await server.ssrLoadModule("/src/data/techStackIcons.ts");
  const data = content.PORTFOLIO_CONTENT;
  for (const [field, exportName] of Object.entries({
    userInfo: "PROFILE_CONTENT", projects: "PROJECT_CONTENT",
    techStack: "STACK_CONTENT", education: "EDUCATION_CONTENT",
    certificates: "CERTIFICATE_CONTENT", setup: "SETUP_CONTENT",
  })) {
    assert.equal(data[field], content[exportName], `${field} must use the content file directly`);
  }
  for (const field of ["projects", "education", "certificates"]) {
    const ids = data[field].map((entry) => entry.id);
    assert.equal(new Set(ids).size, ids.length, `${field} IDs must be unique`);
    assert(ids.every(Boolean), `${field} IDs must not be empty`);
  }
  for (const technology of data.techStack) assert(technology.iconName in TECH_STACK_ICONS);
  for (const value of Object.values(data.userInfo)) assert(value.trim());
  assert.equal(new URL(data.userInfo.cvUrl).protocol, "https:");
  for (const social of content.SOCIAL_CONTENT) assert.equal(new URL(social.href).protocol, "https:");
  for (const asset of [content.UI_CONTENT.hero.image, content.UI_CONTENT.projects.image, content.SEO_CONTENT.image]) {
    assert(existsSync(`public${asset}`), `Missing artwork: ${asset}`);
  }
  assert.equal(content.STRUCTURED_DATA.name, data.userInfo.name);
  assert.equal(content.STRUCTURED_DATA.email, data.userInfo.email);
  assert(content.SEO_CONTENT.title.includes(data.userInfo.name));
  const app = readFileSync("src/App.tsx", "utf8");
  assert(!/AdminPage|BlogPage|BlogPostPage|AIChat|path="\/(?:admin|writing)/.test(app));
  assert(!existsSync("src/contexts/PortfolioContext.tsx"));
  assert(!existsSync("src/services/portfolioRepository.ts"));
  const sections = [];
  for (const name of ["Hero", "Projects", "TechStack", "Credentials", "Setup", "Footer"]) {
    const { default: Section } = await server.ssrLoadModule(`/src/components/${name}.tsx`);
    sections.push(React.createElement(Section, { key: name }));
  }
  const homeHtml = renderToStaticMarkup(React.createElement(React.Fragment, null, sections));
  assert(homeHtml.includes(data.userInfo.name));
  assert(homeHtml.includes(data.userInfo.cvUrl));
  assert(homeHtml.includes(data.projects[0].title));
  assert(homeHtml.includes(data.setup.os));
  assert(!homeHtml.includes("Open console"));
  console.log("Portfolio content checks passed: single source, IDs, icons, assets, metadata, and removed legacy routes.");
} finally {
  await server.close();
}
