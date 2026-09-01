import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MotionLink = motion(Link);

import programsData from '../content/programs.json';

const Programs = () => {
  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen pt-24 pb-24">
      <div className="max-w-[1140px] mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-[#2563EB] font-black tracking-widest text-xs uppercase mb-4 block">{programsData.headerSub}</span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">{programsData.headerTitlePrefix}<span className="text-[#2563EB]">{programsData.headerTitleHighlight}</span></h1>
          <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto">{programsData.headerDesc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programsData.programsList.map((program, idx) => (
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
