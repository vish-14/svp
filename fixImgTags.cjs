const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');
const files = ['Home.jsx', 'ProgramDetails.jsx', 'About.jsx', 'Contact.jsx'];

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Fix the invalid syntax `"/ initial=` or `" / initial=`
  content = content.replace(/"\/\s*initial=/g, '" initial=');
  content = content.replace(/" \/\s*initial=/g, '" initial=');
  
  fs.writeFileSync(filePath, content, 'utf-8');
});

console.log('Fixed img tags');
