import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, '../dist');

function processFile(filePath) {
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf-8');

    // --- 1. Convert module scripts to defer + wrap in IIFE ---
    // Module scripts have their own scope; defer scripts share global scope.
    // Wrap content in IIFE to prevent "Identifier already declared" errors.
    content = content.replace(
        /<script([^>]*) type="module"([^>]*)>([\s\S]*?)<\/script>/g,
        (match, pre, post, body) => {
            const wrapped = body.trim() ? `(function(){${body}})();` : body;
            return `<script${pre} defer${post}>${wrapped}</script>`;
        }
    );

    // --- 2. Fix ALL asset paths from absolute to relative ---
    // Covers src=, href=, and url() in inline CSS
    content = content.replace(/(src|href)="\/(\.\/)?\/??_astro\//g, '$1="./_astro/');
    content = content.replace(/url\(\/(\.\/)?_astro\//g, 'url(./_astro/');

    // Fix favicon
    content = content.replace(/href="\/favicon/g, 'href="./favicon');

    // Fix any /assets/ references
    content = content.replace(/src="\/assets\//g, 'src="./assets/');

    // --- 3. Convert absolute navigation links to relative ---
    content = content.replace(/href="\/([a-zA-Z][a-zA-Z0-9_-]*)"/g, (match, pageName) => {
        if (pageName.startsWith('_')) return match;

        const dirPath = path.join(distDir, pageName, 'index.html');
        const htmlPath = path.join(distDir, `${pageName}.html`);

        if (fs.existsSync(dirPath)) {
            return `href="./${pageName}/index.html"`;
        } else if (fs.existsSync(htmlPath)) {
            return `href="./${pageName}.html"`;
        } else {
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
