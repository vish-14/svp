const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');

const files = ['Home.jsx', 'ProgramDetails.jsx', 'About.jsx', 'Contact.jsx'];

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Revert previous partial substitutions
  content = content.replace(/<motion\.section/g, '<section');
  content = content.replace(/<\/motion\.section>/g, '</section>');
  content = content.replace(/initial=\{\{ opacity: 0, y: 40 \}\} whileInView=\{\{ opacity: 1, y: 0 \}\} viewport=\{\{ once: true, amount: 0\.1 \}\} transition=\{\{ duration: 0\.7, ease: "easeOut" \}\}/g, '');
  content = content.replace(/<section\s+/g, '<section '); // normalize space
  
  // Apply generalized regex that covers ANY attributes
  content = content.replace(/<section\s+([^>]+)>/g, 
    '<motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.7, ease: "easeOut" }} $1>'
  );
  content = content.replace(/<\/section>/g, '</motion.section>');

  fs.writeFileSync(filePath, content, 'utf-8');
});

console.log('Animations re-applied');
