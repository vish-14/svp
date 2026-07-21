const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'designs');
const componentsDir = path.join(__dirname, 'src', 'components');
const pagesDir = path.join(__dirname, 'src', 'pages');

if (!fs.existsSync(pagesDir)) fs.mkdirSync(pagesDir, { recursive: true });
if (!fs.existsSync(componentsDir)) fs.mkdirSync(componentsDir, { recursive: true });

const filesToConvert = [
  { file: 'SV_Professionals_Home.html', component: 'Home' },
  { file: 'Program_Details_Template.html', component: 'ProgramDetails' },
  { file: 'About_SV_Professionals.html', component: 'About' },
  { file: 'Contact_Us.html', component: 'Contact' }
];

function convertToJSX(html) {
  // Extract body content
  let bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/);
  if (!bodyMatch) return '';
  let bodyContent = bodyMatch[1];

  // Basic conversions
  bodyContent = bodyContent.replace(/class=/g, 'className=');
  bodyContent = bodyContent.replace(/for=/g, 'htmlFor=');
  bodyContent = bodyContent.replace(/<!--[\s\S]*?-->/g, ''); // remove comments
  bodyContent = bodyContent.replace(/<img(.*?)>/g, (match, p1) => {
    if (p1.endsWith('/')) return match;
    return `<img${p1} />`;
  });
  bodyContent = bodyContent.replace(/<input(.*?)>/g, (match, p1) => {
    if (p1.endsWith('/')) return match;
    return `<input${p1} />`;
  });
  bodyContent = bodyContent.replace(/<br>/g, '<br />');
  bodyContent = bodyContent.replace(/<hr(.*?)>/g, (match, p1) => {
    if (p1.endsWith('/')) return match;
    return `<hr${p1} />`;
  });
  // Handle some specific missing enclosures (like style attribute to object)
  bodyContent = bodyContent.replace(/style="([^"]*)"/g, (match, p1) => {
    let styles = p1.split(';').filter(s => s.trim()).map(s => {
      let [key, value] = s.split(':');
      if (!key || !value) return '';
      // camelCase key
      key = key.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      value = value.trim();
      return `'${key}': '${value}'`;
    }).join(', ');
    return `style={{${styles}}}`;
  });

  return bodyContent;
}

filesToConvert.forEach(item => {
  const filePath = path.join(srcDir, item.file);
  const htmlDoc = fs.readFileSync(filePath, 'utf-8');
  
  let jsxContent = convertToJSX(htmlDoc);

  let template = `import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ${item.component} = () => {
  return (
    <>
      ${jsxContent}
    </>
  );
};

export default ${item.component};
`;
  
  fs.writeFileSync(path.join(pagesDir, `${item.component}.jsx`), template, 'utf-8');
});

console.log('Conversion complete');
