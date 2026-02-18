import { z } from 'zod';

/**
 * Validated environment variables.
 * Catches misconfiguration at build time, not at runtime.
 * Add new env vars to the schema as the project grows.
 */
const envSchema = z.object({
    SITE_URL: z.string().url().optional(),
});

export const env = envSchema.parse({
    SITE_URL: import.meta.env.SITE_URL,
});
