const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');

const files = ['Home.jsx', 'ProgramDetails.jsx', 'About.jsx', 'Contact.jsx'];

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Fix fontVariationSettings
  content = content.replace(/'fontVariationSettings': ''FILL' 1'/g, "'fontVariationSettings': '\"FILL\" 1'");
  
  // Fix background image quotes
  // e.g. 'backgroundImage': 'url('https...')' -> 'backgroundImage': 'url(\\'https...\\')'
  content = content.replace(/'backgroundImage':\s*'url\('([^']+)'/g, "'backgroundImage': 'url(\\'$1\\'");
  
  fs.writeFileSync(filePath, content, 'utf-8');
});

console.log('Fixes applied');
