import { defineConfig, envField } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || "https://vksgroup.by",
  base: process.env.BASE_PATH || "/",
  env: {
    schema: {
      PUBLIC_SITE_URL: envField.string({ context: "client", access: "public", default: "https://vksgroup.by" }),
      BASE_PATH: envField.string({ context: "client", access: "public", default: "/" }),
    }
  },
  output: "static",
  compressHTML: true,
  build: {
    inlineStylesheets: "always",
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },

  integrations: [
    tailwind({
      applyBaseStyles: false,
      configFile: "./tailwind.config.mjs",
    }),
    sitemap(),
    mdx(),
  ],
});
