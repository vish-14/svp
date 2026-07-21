const fs = require('fs');

let content = fs.readFileSync('src/pages/Home.jsx', 'utf-8');

// 1. Fix Google, Facebook, JD
content = content.replace('src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"', 'src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg"');
content = content.replace('src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg"', 'src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/facebook/facebook-original.svg"');
content = content.replace('<div className="h-8 w-8 rounded-full bg-[#f26522] flex items-center justify-center text-white font-black shadow-inner">JD</div>', '<img className="h-8 w-8 object-contain" src="https://www.justdial.com/favicon.ico" alt="JustDial" />');


// 2. Fix Certificates (Authorized & Certified)
// Replace the block of code starting at line 225 up to 251.

const oldCertsBlock = /<div className="grid grid-cols-2 lg:grid-cols-4 gap-8">([\s\S]*?)<\/div>\n<\/div>\n<\/motion.section>/;

const newCertsBlock = `<div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

<div className="border border-outline-variant/20 rounded-2xl p-6 flex flex-col items-center justify-center bg-white shadow-sm hover:shadow-xl hover:-translate-y-2 ring-1 ring-outline-variant/10 transition-all duration-300 group max-h-52">
  <img className="h-20 object-contain mb-4 group-hover:scale-110 transition-transform" src="https://upload.wikimedia.org/wikipedia/commons/c/cf/MSME_Logo.png" alt="MSME Certified" />
  <span className="text-xs uppercase font-bold tracking-[0.2em] text-slate-500 text-center">Certified</span>
</div>

<div className="border border-outline-variant/20 rounded-2xl p-6 flex flex-col items-center justify-center bg-white shadow-sm hover:shadow-xl hover:-translate-y-2 ring-1 ring-outline-variant/10 transition-all duration-300 group max-h-52">
  <img className="h-20 object-contain mb-4 group-hover:rotate-6 transition-transform" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/ISO_Logo_%28Red_square%29.svg/512px-ISO_Logo_%28Red_square%29.svg.png" alt="ISO 9001:2015" />
  <span className="text-xs uppercase font-bold tracking-[0.2em] text-slate-500 text-center">9001:2015</span>
</div>

<div className="border border-outline-variant/20 rounded-2xl p-6 flex flex-col items-center justify-center bg-white shadow-sm hover:shadow-xl hover:-translate-y-2 ring-1 ring-outline-variant/10 transition-all duration-300 group max-h-52">
  <img className="h-16 object-contain mb-6 mt-2 group-hover:scale-110 transition-transform drop-shadow-sm" src="https://www.vectorlogo.zone/logos/sap/sap-ar21.svg" alt="SAP Partner" />
  <span className="text-xs uppercase font-bold tracking-[0.2em] text-slate-500 text-center">Partner</span>
</div>

<div className="border border-outline-variant/20 rounded-2xl p-6 flex flex-col items-center justify-center bg-white shadow-sm hover:shadow-xl hover:-translate-y-2 ring-1 ring-outline-variant/10 transition-all duration-300 group max-h-52">
  <img className="h-16 object-contain mb-4 group-hover:scale-110 transition-transform drop-shadow-[0_4px_4px_rgba(0,0,0,0.1)]" src="https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Tally_Solutions_Logo.svg/512px-Tally_Solutions_Logo.svg.png" alt="Tally Authorized" />
  <span className="text-xs uppercase font-bold tracking-[0.2em] text-slate-500 text-center">Authorized</span>
</div>

</div>
</div>
</motion.section>`;

content = content.replace(oldCertsBlock, newCertsBlock);

fs.writeFileSync('src/pages/Home.jsx', content, 'utf-8');
console.log('Fixed real logos');
