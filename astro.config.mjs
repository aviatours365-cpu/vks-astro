import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
    site: 'https://vksgroup.by',
    base: '/', // Enable relative paths for file:// protocol support
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
