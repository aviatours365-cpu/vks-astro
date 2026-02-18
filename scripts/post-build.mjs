import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, '../dist');

function processFile(filePath) {
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf-8');

    // --- 1. Strip module scripts (CORS fix for file://) ---
    // Must run FIRST, before path fixes, to avoid fixing paths in scripts we're removing
    content = content.replace(/<script[^>]*type="module"[^>]*>[\s\S]*?<\/script>/g, '');

    // --- 2. Fix ALL asset paths from absolute to relative ---
    content = content.replace(/(src|href)="\/(\.\/)?\/?_astro\//g, '$1="./_astro/');

    // Fix favicon
    content = content.replace(/href="\/favicon/g, 'href="./favicon');

    // Fix any /assets/ references
    content = content.replace(/src="\/assets\//g, 'src="./assets/');

    // --- 3. Convert absolute navigation links to relative ---
    // Only converts to ./page/index.html if the page actually exists in dist/
    // Otherwise points to ./404.html so the user sees the error page
    content = content.replace(/href="\/([a-zA-Z][a-zA-Z0-9_-]*)"/g, (match, pageName) => {
        // Skip _astro and other asset dirs
        if (pageName.startsWith('_')) return match;

        // Check if page exists in dist (either as dir/index.html or as .html)
        const dirPath = path.join(distDir, pageName, 'index.html');
        const filePath = path.join(distDir, `${pageName}.html`);

        if (fs.existsSync(dirPath)) {
            return `href="./${pageName}/index.html"`;
        } else if (fs.existsSync(filePath)) {
            return `href="./${pageName}.html"`;
        } else {
            // Page doesn't exist — link to 404
            return `href="./404.html"`;
        }
    });

    // Convert href="/" (home link) to href="./index.html"
    content = content.replace(/href="\/"/g, 'href="./index.html"');

    fs.writeFileSync(filePath, content);
    console.log(`✓ Fixed paths in ${path.basename(filePath)}`);
}

if (fs.existsSync(distDir)) {
    const files = fs.readdirSync(distDir);
    files.forEach(file => {
        if (file.endsWith('.html')) {
            processFile(path.join(distDir, file));
        }
    });
} else {
    console.error("Dist directory not found!");
}
