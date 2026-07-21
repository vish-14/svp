const fs = require('fs');

const file = 'src/pages/Home.jsx';
let content = fs.readFileSync(file, 'utf-8');

const regex = /<div className="grid grid-cols-2 md:grid-cols-4 gap-8">([\s\S]*?)<\/div>\n<\/div>\n<\/motion.section>/;

const newCertificatesBlock = `<div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

<div className="border border-outline-variant/20 rounded-2xl p-6 flex flex-col items-center justify-center bg-white shadow-sm hover:shadow-xl hover:-translate-y-2 ring-1 ring-outline-variant/10 transition-all duration-300 group">
  <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
    <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-cyan-500">MSME</span>
  </div>
  <span className="text-xs uppercase font-bold tracking-[0.2em] text-slate-500 text-center">Certified</span>
</div>

<div className="border border-outline-variant/20 rounded-2xl p-6 flex flex-col items-center justify-center bg-white shadow-sm hover:shadow-xl hover:-translate-y-2 ring-1 ring-outline-variant/10 transition-all duration-300 group">
  <div className="w-20 h-20 rounded-full border-[5px] border-indigo-600 border-dashed flex items-center justify-center bg-indigo-50 mb-3 group-hover:rotate-12 transition-transform">
    <span className="text-xl font-bold text-indigo-700">ISO</span>
  </div>
  <span className="text-xs uppercase font-bold tracking-[0.2em] text-slate-500 text-center">9001:2015</span>
</div>

<div className="border border-outline-variant/20 rounded-2xl p-6 flex flex-col items-center justify-center bg-white shadow-sm hover:shadow-xl hover:-translate-y-2 ring-1 ring-outline-variant/10 transition-all duration-300 group">
  <div className="w-20 h-20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
    <span className="text-[2.5rem] leading-none font-bold text-[#008bd2] drop-shadow-sm">SAP</span>
  </div>
  <span className="text-xs uppercase font-bold tracking-[0.2em] text-slate-500 text-center">Partner</span>
</div>

<div className="border border-outline-variant/20 rounded-2xl p-6 flex flex-col items-center justify-center bg-white shadow-sm hover:shadow-xl hover:-translate-y-2 ring-1 ring-outline-variant/10 transition-all duration-300 group">
  <div className="w-20 h-20 rounded-xl bg-amber-50 flex items-center justify-center mb-3 shadow-inner group-hover:scale-110 transition-transform">
    <span className="text-3xl font-serif font-black text-amber-500">Tally</span>
  </div>
  <span className="text-xs uppercase font-bold tracking-[0.2em] text-slate-500 text-center">Authorized</span>
</div>

</div>
</div>
</motion.section>`;

content = content.replace(regex, newCertificatesBlock);

fs.writeFileSync(file, content, 'utf-8');
console.log('Replaced Certificate Images with Colorful Code Variants!');
