const fs = require('fs');

let content = fs.readFileSync('src/pages/Home.jsx', 'utf-8');

// 1. Remove grayscale from mentors
content = content.replace(/grayscale group-hover:grayscale-0 transition-all/g, 'transition-all duration-500');

// 2. Add marquee to Companies
// Find the exact block: <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-10 opacity-50">...</div>
const oldCompaniesRegex = /<div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-10 opacity-50">([\s\S]*?)<\/div>/;
const match = content.match(oldCompaniesRegex);

if (match) {
  const images = match[1].trim();
  // We duplicate images to make it scroll smoothly without gaps
  const doubledImages = images + '\n' + images;
  
  const newMarquee = `
<div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
  <motion.div 
    className="flex items-center justify-center md:justify-start gap-16 animate-infinite-scroll opacity-90"
    animate={{ x: [0, -1035] }}
    transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
    style={{ paddingLeft: "4rem", width: "max-content" }}
  >
    ${doubledImages}
  </motion.div>
</div>
`;
  content = content.replace(oldCompaniesRegex, newMarquee);
}

// 3. Enhance Mentor hover states
content = content.replace(/hover:scale-105/g, 'group-hover:-translate-y-4 shadow-xl group-hover:shadow-primary/50');
content = content.replace(/ring-2 ring-primary ring-offset-4 ring-offset-surface-container-low group-hover:scale-105 transition-transform/g, 
                          'ring-2 ring-primary ring-offset-4 ring-offset-surface-container-low transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-[0_20px_40px_-5px_rgba(37,99,235,0.4)]');

content = content.replace(/ring-2 ring-outline-variant group-hover:ring-primary transition-all/g, 
                          'ring-2 ring-outline-variant group-hover:ring-primary transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-[0_20px_40px_-5px_rgba(37,99,235,0.4)]');

fs.writeFileSync('src/pages/Home.jsx', content, 'utf-8');
console.log('tweaks applied.');
