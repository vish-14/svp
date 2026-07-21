const fs = require('fs');

const file = 'src/pages/Home.jsx';
let content = fs.readFileSync(file, 'utf-8');

// The goal is to make the marquee perfectly seamless.
// We will use a cleaner structure: 
// A single flex container with two identical 'track' divs.
// The transition will go from 0 to -50% (exactly half the width).

const logosTrack = `
    <div className="flex items-center gap-24 py-4 pr-24">
      <img className="h-9 w-auto object-contain brightness-110" src="https://equalengineers.com/wp-content/uploads/2018/08/Deloitte-logo-1024x223.png" alt="Deloitte" />
      <img className="h-10 w-auto object-contain" src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" />
      <img className="h-8 w-auto object-contain" src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg" alt="Accenture" />
      <img className="h-9 w-auto object-contain mt-2" src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" />
      <img className="h-8 w-auto object-contain" src="https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg" alt="Infosys" />
      <img className="h-10 w-auto object-contain" src="https://tse2.mm.bing.net/th/id/OIP.P9yyQtAg8rgIRmiJLuL9GwHaD4?w=1536&h=804&rs=1&pid=ImgDetMain&o=7&rm=3" alt="TCS" />
    </div>
`;

const marqueeSectionRegex = /<div className="w-full overflow-hidden \[mask-image:_linear-gradient\(to_right,transparent_0,_black_128px,_black_calc\(100%-128px\),transparent_100%\)\]">([\s\S]*?)<\/div>/;

const newMarqueeMarkup = `<div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
  <div className="flex w-max animate-marquee">
    ${logosTrack}
    ${logosTrack}
  </div>
</div>`;

content = content.replace(marqueeSectionRegex, newMarqueeMarkup);

fs.writeFileSync(file, content, 'utf-8');
console.log('Fixed Marquee Sync and Spacing.');
