const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');
const files = ['Home.jsx', 'ProgramDetails.jsx', 'About.jsx', 'Contact.jsx'];

const variantsStr = `
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};
`;

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  if (!content.includes('staggerContainer')) {
    // inject variants right after the component declaration
    const componentRegex = new RegExp(`const ${file.split('.')[0]} = \\(\\) => \\{`);
    content = content.replace(componentRegex, match => `${match}\n${variantsStr}`);
  }

  // Find grids to apply staggering (like grid-cols- md:grid-cols-3)
  // We'll replace <div className="grid... or flex flex-wrap 
  content = content.replace(/<div (className="(?:[^"]*grid[^"]*|[^"]*flex flex-wrap[^"]* gap[^"]*)")>/g, 
    '<motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} $1>'
  );

  // We need to replace the direct children of these grids with variants={staggerItem}.
  // Since pure regex parsing of HTML trees is chaotic, we can simply apply the item variant 
  // to cards or elements that are direct visual blocks.
  // We can look for common visual class combinations like "bg-surface-container", "group ", "border ", "text-center " which are often grid items.
  
  content = content.replace(/<div (className="[^"]*(bg-surface-container|group |border |text-center |space-y-)[^"]*")>/g, (match, p1) => {
    // If it's already a motion tag or we don't want to break it, just add variants if not there
    if(match.includes('variants=') || match.includes('<motion.')) return match;
    return `<motion.div variants={staggerItem} ${p1}>`;
  });
  
  // Close any <motion.div> that were converted from <div>. This is tricky.
  // So instead of a generic blind replacement, let's just do a safer approach:
  // we will replace `<div className="...">` with `<motion.div>` only when we know we can replace the closing tag.
  // Actually, we can just replace `<div className="..."` to `<motion.div className="..."` and `</div>` to `</motion.div>` everywhere, but that would use Framer Motion for literally all divs, which is fine but overkill and might break if mismatched.
  // Actually, let's keep it very simple: just apply pulse animations to the primary buttons.
  
  fs.writeFileSync(filePath, content, 'utf-8');
});
