const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');
const files = ['Home.jsx', 'ProgramDetails.jsx', 'About.jsx', 'Contact.jsx'];

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Replace <button> with <motion.button>
  content = content.replace(/<button([^>]*)>/g, '<motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}$1>');
  content = content.replace(/<\/button>/g, '</motion.button>');
  
  // Clean up any double motion (if some were already motion)
  content = content.replace(/<motion\.motion\.button/g, '<motion.button');
  content = content.replace(/<\/motion\.motion\.button>/g, '</motion.button>');

  // Add floating animation to hero images (like the ones with aspect-[4/5] or large images)
  // Let's just target images that have 'object-cover' and aren't in small avatars
  content = content.replace(/<img(.*?)class(?:Name)?="([^"]*object-cover[^"]*)"([^>]*)>/g, (match, prefix, classNames, suffix) => {
    // Avoid avatars (h-12 w-12 etc)
    if (classNames.includes('w-12') || classNames.includes('h-32')) return match; 
    
    // Convert to motion.img
    return `<motion.img${prefix}className="${classNames}"${suffix} initial={{ scale: 1.1, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} />`;
  });

  fs.writeFileSync(filePath, content, 'utf-8');
});

console.log('Button and Image animations enhanced.');
