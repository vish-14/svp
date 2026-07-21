const fs = require('fs');

const content = fs.readFileSync('src/pages/Home.jsx', 'utf-8');

// split the content by <motion.section blocks
const sections = [];
const regex = /<motion\.section[\s\S]*?<\/motion\.section>/g;
const matches = [...content.matchAll(regex)];

console.log("Matched sections:", matches.length);

const headerPart = content.slice(0, matches[0].index);
const footerPart = content.slice(matches[matches.length - 1].index + matches[matches.length - 1][0].length);

const sectionBlocks = matches.map(m => m[0]);

// Desired Order:
// 0. Hero Section
// 1. Review & Ratings
// 2. Programs Overview
// 7. Awards & Certificates
// 3. How the Program Works
// 6. Trainer / Mentor Section
// 5. Companies Hiring Our Students
// 4. Student Testimonials
// CAMPUS PHOTOS
// 8. FAQ Section
// 9. Final Call-To-Action Section

const newOrderIndices = [0, 1, 2, 7, 3, 6, 5, 4];

const campusPhotosSection = `
<motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.7, ease: "easeOut" }} className="py-24 bg-surface-container-low dark:bg-slate-900 border-y border-outline-variant/10">
<div className="max-w-7xl mx-auto px-6">
  <div className="text-center mb-16">
    <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-on-surface">Campus &amp; Classroom</h2>
    <p className="text-on-surface-variant max-w-2xl mx-auto text-lg leading-relaxed">Experience our state-of-the-art facilities designed for immersive learning and collaborative project building.</p>
  </div>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    <motion.div initial={{ scale: 0.95, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="col-span-2 row-span-2 rounded-3xl overflow-hidden shadow-lg h-64 md:h-[500px]">
      <img className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrioGrLmNShkoGaSSwdzQ84TWKH1LcXpD0L1hivKpX0lZWdM8uulH2hRrOJe1CfzWKtsJlyfUGVhOfQiTmx0idpOCqMqTjJx5Uy9sr07VfZ8kvLMopUGyeZWIwGSKA5bKgJNllsN3g8YnLhtbUMl6bCo57OfczPLyVsLK7TjjdqocwXIulJnfuiHpJmCqbyT9vjJMSBQRvlYu-QJJXQMyFutRSVQsdJ5vsQhWk4RZ8Of2fbS3LsWxPwyLgn2z_0eWTc2Q5f3JzT6U" alt="Main Classroom" />
    </motion.div>
    <motion.div initial={{ scale: 0.95, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }} className="rounded-3xl overflow-hidden shadow-lg h-32 md:h-[242px]">
      <img className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCS6oNpSbOpMegnLYzixMI5SLVJg00pn3Ppw4TCd6qu2eBxTUelCM9mUCl-sg6G3bxUH2vxtPY_3IXbpz9QcTv6qX4MGMwuAaYZhHhCHg8B_AX_2PQzghU3cN5dRW4j0YvO_fvjMDiGwnjga4YfN9-Wf1gtw-PkzvPr8nP0hd7PMoL6S-FYqi19g-siUN6FrlbHir9gd-7ZfljpTuKrjYwPQ8t442ZEARY22aT3ecZsXbhBkLaNT61nVyG22Wyyh8GTykZ63BhCWp8" alt="Campus facility" />
    </motion.div>
    <motion.div initial={{ scale: 0.95, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.7 }} className="rounded-3xl overflow-hidden shadow-lg h-32 md:h-[242px]">
      <img className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQpsZpVpbCs_kvuo4a77D90iTbeZ9_YhXh22kcicK9MIdgtUdDqln14IuYXVPiGFLvIYtenbivDqF5KFq_9KiEVX-zfyo_bNgcPJLZoWApjNmwWWkPfz7hIIdiB4JsvC2h5Svrznukrztp8cqAAFUI-FUbVD4E2oSG9bb3cbDZInxymig4IFZjeCj-XmQTxiER8YCFOxEySH_17gA8rXpWvjxtNradYadZZ3obZNptqy7ke0-qqGIAWtNXmXmHxr3m-YcTCVsla2U" alt="Campus reception" />
    </motion.div>
    <motion.div initial={{ scale: 0.95, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} className="col-span-2 rounded-3xl overflow-hidden shadow-lg h-32 md:h-[242px]">
      <img className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyyQWuqIAeduOI5EqSQA3xkBeFrcJSgYfEhylAuF16vRnS8pz5wz6JSuubUNqwCEyhXsj3s5neXQwehjgD3xY4TEsZyzmWdxdVdqaIDF8xzDJGE8wPqrlPN4jauY-4STeekUaOS3NkvKFgSAIb2VaYNeRdxh0j1Dx0FCE2ZL241YdudKHwtlZlr4R4RaljNPb2vP3vdsNYbCl7t0mi_zKWMRMDE2MEn53Hk-b50z8KRYKDQM4g_Fosm2-YFP3Db9HXRENqb_5Qi1Q" alt="Students sitting" />
    </motion.div>
  </div>
</div>
</motion.section>`;

let newSectionsContent = '';
newOrderIndices.forEach(idx => {
  newSectionsContent += sectionBlocks[idx] + '\n\n';
});

// manually insert campus photos then FAQ then Final CTA
newSectionsContent += campusPhotosSection + '\n\n';
newSectionsContent += sectionBlocks[8] + '\n\n';
newSectionsContent += sectionBlocks[9] + '\n\n';

const newContent = headerPart + newSectionsContent + footerPart;
fs.writeFileSync('src/pages/Home.jsx', newContent, 'utf-8');
console.log("Reordered sections.");
