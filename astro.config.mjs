import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

const isGitHubPages = !!process.env.GITHUB_ACTIONS;

export default defineConfig({
    site: isGitHubPages ? 'https://aviatours365-cpu.github.io' : 'https://vksgroup.by',
    base: isGitHubPages ? '/vks-astro/' : '/',
    output: 'static',
    compressHTML: true,
    build: {
        inlineStylesheets: 'always',
    },

    prefetch: {
        prefetchAll: true,
        defaultStrategy: 'viewport',
    },

    integrations: [
        tailwind({
            applyBaseStyles: false,
            configFile: './tailwind.config.mjs',
        }),
        sitemap(),
        mdx(),
    ],
});
