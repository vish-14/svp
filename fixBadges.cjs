const fs = require('fs');

let content = fs.readFileSync('src/pages/Home.jsx', 'utf-8');

// 1. Remove grayscale from Authorized & Certified
content = content.replace(/grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all/g, 'bg-white hover:scale-110 transition-transform duration-300 shadow-sm hover:shadow-xl ring-1 ring-outline-variant/20');

// 2. Replace Ratings fully. First find the div wrapping them:
const oldRatingsSection = /<div className="flex flex-wrap justify-around items-center gap-8 opacity-70">([\s\S]*?)<\/div>\n<\/div>\n<\/motion.section>/;

const newRatings = `<div className="flex flex-wrap justify-center md:justify-around items-center gap-6">

<div className="flex items-center gap-4 bg-white px-6 py-4 rounded-3xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-outline-variant/20 hover:-translate-y-2 transition-transform duration-300">
  <img className="h-8 w-8 object-contain" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" />
  <div className="flex flex-col">
    <div className="flex text-[#FFB800] text-sm mb-0.5">
      <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
      <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
      <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
      <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
      <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: '"FILL" 1'}}>star_half</span>
    </div>
    <span className="font-bold text-sm text-on-surface">4.8/5 on Google</span>
  </div>
</div>

<div className="flex items-center gap-4 bg-white px-6 py-4 rounded-3xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-outline-variant/20 hover:-translate-y-2 transition-transform duration-300">
  <img className="h-8 w-8 object-contain" src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" alt="Facebook" />
  <div className="flex flex-col">
    <div className="flex text-[#FFB800] text-sm mb-0.5">
      <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
      <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
      <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
      <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
      <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
    </div>
    <span className="font-bold text-sm text-on-surface">4.9/5 on Facebook</span>
  </div>
</div>

<div className="flex items-center gap-4 bg-white px-6 py-4 rounded-3xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-outline-variant/20 hover:-translate-y-2 transition-transform duration-300">
  <div className="h-8 w-8 rounded-full bg-[#f26522] flex items-center justify-center text-white font-black shadow-inner">JD</div>
  <div className="flex flex-col">
    <div className="flex text-[#FFB800] text-sm mb-0.5">
      <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
      <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
      <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
      <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
      <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: '"FILL" 1'}}>star_half</span>
    </div>
    <span className="font-bold text-sm text-on-surface">4.7/5 on JustDial</span>
  </div>
</div>

</div>
</div>
</motion.section>`;

content = content.replace(oldRatingsSection, newRatings);

// The certificates (Authorized & Certified) might have `grayscale` inside the image tag instead of the container now since the regex didn't remove it earlier or something?
// Let's remove any stray grayscale image classes just to be sure
content = content.replace(/className="h-16 grayscale"/g, 'className="h-16"');
content = content.replace(/className="h-16 grayscale opacity-60"/g, 'className="h-16"');

fs.writeFileSync('src/pages/Home.jsx', content, 'utf-8');
console.log('Fixed badges.');
