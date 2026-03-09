import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Astro 5 Content Layer — Collection Definitions.
 * Uses glob loader (replaces legacy type-based collections).
 */
const services = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/services" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    full: z.string().default(""),
    icon: z.string(),
    order: z.number().default(0),
  }),
});

const legal = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/legal" }),
  schema: z.object({
    title: z.string(),
    lastUpdated: z.coerce.date().optional(),
  }),
});

const solutions = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/solutions" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string(),
    order: z.number().default(0),
    features: z.array(z.string()),
  }),
});

export const collections = { services, legal, solutions };
