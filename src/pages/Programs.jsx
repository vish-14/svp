import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MotionLink = motion(Link);

const programsList = [
  {
    id: 'finance-accounting',
    title: "Certified Finance & Accounts Analyst Program",
    subtitle: "CFAA Masterclass",
    desc: "Masters in Finance & Accounting (IFRS) and SAP FI modules for a successful career in international finance.",
    duration: "2-3 Months",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9Qn5AE4OWnJbB9WzMCOAOpQhnNApk8wXh3KVQYCw8n6HY-efvP1Hl1ireI6VRhdHuZSsTkbZFTvDvoUIk4IfJY-ot4v8oA3K-0McAg-ZaIKw6ah55Z4NZoFBY3JmhKlRs7KT-37UibreTlIOq0FOZ4tKbIXCEJ6CZo4_NRY7EU4mh22eiNF2pvNUMAjEwR0zZBlxbt9CewHScP2oNzz7hpOe6mtx7-W6hsqcg_qfftORnkcNH5ewkYVPD_HbSrp7fM5MlTrlc13k"
  },
  {
    id: 'hr-training',
    title: "Certified HR Specialist Program",
    subtitle: "Payroll & Compliance",
    desc: "In-depth HR training built for working professionals - Talent Acquisition, Payroll, Statutory Compliance, Onboarding, POSH, and live projects.",
    duration: "2-3 Months",
    image: "https://tse4.mm.bing.net/th/id/OIP.qxgTxEJj1EQwJcjz4ij98gHaE8?cb=thfc1falcon&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 'sap-accounting',
    title: "Accounting SAP End User Course for experienced",
    subtitle: "For experienced with Gap & Domain Switch candidates",
    desc: "Master corporate etiquette, advanced communication, and MNC workflows to dominate in Big 4 and global firms.",
    duration: "1 Month",
    image: "https://tse4.mm.bing.net/th/id/OIP.8sCzmUBZNVvfk3GuDuOS5AHaFE?cb=thfc1falcon&rs=1&pid=ImgDetMain&o=7&rm=3"
  }
];

const Programs = () => {
  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen pt-24 pb-24">
      <div className="max-w-[1140px] mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-[#2563EB] font-black tracking-widest text-xs uppercase mb-4 block">Transformative Learning</span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">Professional <span className="text-[#2563EB]">Programs</span></h1>
          <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto">Industry-aligned curricula designed by corporate veterans to bridge the gap between academic degrees and job-readiness.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programsList.map((program, idx) => (
            <motion.div 
              key={program.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group flex flex-col bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 rounded-2xl overflow-hidden transition-all hover:border-[#2563EB]/40 shadow-sm hover:shadow-2xl"
            >
              <div className="h-56 overflow-hidden relative">
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={program.image} alt={program.title} />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-blue-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                  {program.duration}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 leading-tight tracking-tight">{program.title}</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 flex-1">{program.desc}</p>
                <MotionLink 
                  to={`/programs/${program.id}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#2563eb] text-white px-8 py-4 rounded-lg font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 transition-all"
                >
                  View Program Details <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </MotionLink>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Programs;
