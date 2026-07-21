const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');

const files = ['Home.jsx', 'ProgramDetails.jsx', 'About.jsx', 'Contact.jsx'];

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // A regex that matches entire <a>...</a> blocks
  // to avoid breaking external links.
  content = content.replace(/<a([^>]*)href="([^"]+)"([^>]*)>([\s\S]*?)<\/a>/g, (match, p1, href, p3, innerHtml) => {
    let toPath = '/';
    if (href.includes('program') || href.includes('#programs')) toPath = '/programs';
    if (href.includes('about')) toPath = '/about';
    if (href.includes('contact')) toPath = '/contact';
    
    // Check if external link
    if (href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel') || href.includes('wa.me')) {
      return match; // return original
    }
    
    return `<Link${p1}to="${toPath}"${p3}>${innerHtml}</Link>`;
  });
  
  fs.writeFileSync(filePath, content, 'utf-8');
});

console.log('Links updated carefully');
