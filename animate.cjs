const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');

const files = ['Home.jsx', 'ProgramDetails.jsx', 'About.jsx', 'Contact.jsx'];

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Basic replacement: turning <section> into <motion.section>
  // Add animation props
  content = content.replace(/<section (className="[^"]*")>/g, 
    '<motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.7, ease: "easeOut" }} $1>'
  );
  content = content.replace(/<\/section>/g, '</motion.section>');

  // Make header appear sliding down
  content = content.replace(/<header (className="[^"]*")>/g, 
    '<motion.header initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }} $1>'
  );
  content = content.replace(/<\/header>/g, '</motion.header>');
  
  // Stagger children inside grid or flex optionally, or we can just keep sections animated for now, which already gives a very nice feel.
  
  fs.writeFileSync(filePath, content, 'utf-8');
});

console.log('Animations applied');
