const fs = require('fs');

const cssFile = 'src/index.css';
let css = fs.readFileSync(cssFile, 'utf-8');
if (!css.includes('marquee')) {
  css += `
@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}

.animate-marquee {
  animation: marquee 20s linear infinite;
}
`;
  fs.writeFileSync(cssFile, css, 'utf-8');
  console.log('Added marquee CSS');
}

const file = 'src/pages/Home.jsx';
let content = fs.readFileSync(file, 'utf-8');

const regex = /<div className="flex items-center gap-16 pr-16 justify-around">([\s\S]*?)<\/div>/g;

const colorfulLogos = `
      <img className="h-7 md:h-9 object-contain drop-shadow-sm hover:scale-105 transition-transform" src="https://upload.wikimedia.org/wikipedia/commons/5/56/Deloitte.svg" alt="Deloitte" />
      <img className="h-8 md:h-10 object-contain drop-shadow-sm hover:scale-105 transition-transform" src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" />
      <img className="h-7 md:h-9 object-contain drop-shadow-sm hover:scale-105 transition-transform" src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg" alt="Accenture" />
      <img className="h-8 md:h-10 object-contain drop-shadow-sm hover:scale-105 transition-transform mt-2" src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" />
      <img className="h-7 md:h-9 object-contain drop-shadow-sm hover:scale-105 transition-transform" src="https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg" alt="Infosys" />
      <img className="h-8 md:h-10 object-contain drop-shadow-sm hover:scale-105 transition-transform" src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg" alt="TCS" />
`;

// There are two identical blocks to replace since we duplicated them. 
content = content.replace(regex, '<div className="flex items-center gap-16 pr-16 justify-around">' + colorfulLogos + '</div>');

// Ensure opacity is 100 on the marquee container, not opacity-90
content = content.replace('animate-marquee items-center gap-16 opacity-90', 'animate-marquee items-center gap-16');

fs.writeFileSync(file, content, 'utf-8');
console.log('Replaced company images to COLOR');
