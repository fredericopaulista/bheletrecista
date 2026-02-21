const fs = require('fs');
const path = require('path');

const projectDir = __dirname;

function getAllHtmlFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllHtmlFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (file.endsWith('.html')) {
                arrayOfFiles.push(path.join(dirPath, file));
            }
        }
    });

    return arrayOfFiles;
}

const htmlFiles = getAllHtmlFiles(projectDir);

const brokenLinks = [];
let totalLinks = 0;

htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');

    // Simple regex to match href attributes
    const regex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/gi;
    let match;

    while ((match = regex.exec(content)) !== null) {
        let href = match[2];
        totalLinks++;

        // Ignore external or non-navigational links
        if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('whatsapp:')) {
            continue;
        }

        // Just hash link (same page)
        if (href.startsWith('#')) {
            continue;
        }

        // Strip hash from internal link e.g. /page.html#section
        let cleanHref = href.split('#')[0];

        if (cleanHref === '') continue; // Was just a hash

        let targetPath;
        if (cleanHref.startsWith('/')) {
            // Absolute path from project root
            targetPath = path.join(projectDir, cleanHref);
        } else {
            // Relative path from current file
            targetPath = path.join(path.dirname(file), cleanHref);
        }

        if (!fs.existsSync(targetPath)) {
            // Check if it's missing index.html for a directory
            if (!targetPath.endsWith('.html') && fs.existsSync(targetPath) && fs.statSync(targetPath).isDirectory()) {
                if (!fs.existsSync(path.join(targetPath, 'index.html'))) {
                    brokenLinks.push({ file: file.replace(projectDir, ''), href, reason: 'Directory exists but missing index.html' });
                }
            } else {
                brokenLinks.push({ file: file.replace(projectDir, ''), href, reason: 'File does not exist' });
            }
        }
    }
});

console.log(`Scanned ${htmlFiles.length} HTML files.`);
console.log(`Found ${totalLinks} total <a href="..."> links.`);

if (brokenLinks.length === 0) {
    console.log("SUCCESS: No broken internal links found!");
} else {
    console.log(`\nERROR: Found ${brokenLinks.length} broken links:`);

    // Group by broken href for easier fixing
    const grouped = {};
    brokenLinks.forEach(b => {
        if (!grouped[b.href]) grouped[b.href] = [];
        grouped[b.href].push(b.file);
    });

    for (let href in grouped) {
        console.log(`\nBroken Link: "${href}"`);
        console.log(`Found in:`);
        // unique files
        const uniqueFiles = [...new Set(grouped[href])];
        uniqueFiles.forEach(f => console.log(`  - ${f}`));
    }
}
