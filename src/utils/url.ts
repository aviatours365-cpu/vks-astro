/**
 * Resolves an internal path using the configured Astro base URL.
 * Handles both development (base="/") and GitHub Pages (base="/vks-astro/").
 *
 * @example url('/kontakty') → '/kontakty' (local) or '/vks-astro/kontakty' (GitHub Pages)
 * @example url('/') → '/' (local) or '/vks-astro/' (GitHub Pages)
 */
export function url(path: string): string {
    const base = import.meta.env.BASE_URL;
    // Remove trailing slash from base (unless base is just "/")
    const normalizedBase = base === '/' ? '' : base.replace(/\/$/, '');
    // Ensure path starts with /
    const normalizedPath = path.startsWith('/') ? path : '/' + path;
    return normalizedBase + normalizedPath;
}
