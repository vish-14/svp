const fs = require('fs');
const path = require('path');

const newLogoUrl = 'https://www.image2url.com/r2/default/images/1776418387458-d6ffda5d-566a-43ec-89f6-e52d56a67246.png';

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Specific replacement for Navbar Logo
  content = content.replace(/(<img[^>]*alt="SV Professionals Logo"[^>]*src=")[^"]*"/g, `$1${newLogoUrl}"`);
  content = content.replace(/(<img[^>]*src=")[^"]*("[^>]*alt="SV Professionals Logo")/g, `$1${newLogoUrl}$2`);

  // Specific replacement for Footer Logo
  // In footer it was alt="Logo"
  // Let's check context. Usually footer logo is inside <footer>
  const footerStart = content.lastIndexOf('<footer');
  if (footerStart !== -1) {
    let footerContent = content.substring(footerStart);
    footerContent = footerContent.replace(/(<img[^>]*alt="Logo"[^>]*src=")[^"]*"/g, `$1${newLogoUrl}"`);
    footerContent = footerContent.replace(/(<img[^>]*src=")[^"]*("[^>]*alt="Logo")/g, `$1${newLogoUrl}$2`);
    content = content.substring(0, footerStart) + footerContent;
  }

  fs.writeFileSync(filePath, content, 'utf-8');
}

// Files to update
const pagesDir = path.join('src', 'pages');
const pages = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));

pages.forEach(p => {
  replaceInFile(path.join(pagesDir, p));
});

// Update index.html favicon
let indexHtml = fs.readFileSync('index.html', 'utf-8');
indexHtml = indexHtml.replace(/<link rel="icon" type="image\/svg\+xml" href="[^"]*" \/>/, `<link rel="icon" type="image/png" href="${newLogoUrl}" />`);
// Also check for existing favicon link if I already changed it once
indexHtml = indexHtml.replace(/<link rel="icon" type="image\/png" href="[^"]*" \/>/, `<link rel="icon" type="image/png" href="${newLogoUrl}" />`);
fs.writeFileSync('index.html', indexHtml, 'utf-8');

console.log('Logo and favicon replacement complete.');
