import { defineMiddleware } from 'astro:middleware';

/**
 * Global middleware — Security headers.
 * Applied to every response from the Astro server.
 */
export const onRequest = defineMiddleware(async (_context, next) => {
    const response = await next();

    // Security headers
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

    return response;
});
