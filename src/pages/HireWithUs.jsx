import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CorporateModal from '../components/CorporateModal';
import hireData from '../content/hire.json';

const HireWithUs = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalInterest, setModalInterest] = useState("Talent Sourcing");

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="relative py-24 bg-surface dark:bg-slate-900 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-from),transparent_40%)] from-primary/5 opacity-50"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="max-w-3xl">
                        <motion.span 
                             initial={{ opacity: 0, x: -20 }}
                             animate={{ opacity: 1, x: 0 }}
                             className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest mb-6"
                        >
                            {hireData.heroLabel}
                        </motion.span>
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-black text-on-surface mb-8 leading-[1.1]"
                        >
                            {hireData.heroTitlePrefix}<span className="text-primary italic">{hireData.heroTitleHighlight}</span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-on-surface-variant mb-12 leading-relaxed"
                        >
                            {hireData.heroSubtitle}
                        </motion.p>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap gap-6"
                        >
                            <button onClick={() => {setModalInterest('Talent Sourcing'); setIsModalOpen(true);}} className="bg-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:shadow-primary/20 transition-all flex items-center gap-2">
                                {hireData.heroBtnText} <span className="material-symbols-outlined text-sm">north_east</span>
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Grid */}
            <section className="py-20 border-y border-outline-variant/10 bg-surface-container-lowest">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                        {hireData.stats.map((stat, idx) => (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                key={idx} 
                                className="text-center md:text-left"
                            >
                                <div className="text-4xl md:text-5xl font-black text-primary mb-3">{stat.value}</div>
                                <div className="text-sm font-medium text-on-surface-variant leading-tight">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Domains Section */}
            <section className="py-24 bg-surface">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-sm font-black text-primary uppercase tracking-[0.3em] mb-4">{hireData.domainsTitle}</h2>
                        <h3 className="text-4xl font-black mb-6">{hireData.domainsSubtitle}</h3>
                        <p className="text-on-surface-variant max-w-2xl mx-auto text-lg leading-relaxed">
                            {hireData.domainsDesc}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {hireData.domains.map((domain, idx) => (
                            <motion.div 
                                whileHover={{ y: -10 }}
                                key={idx} 
                                className="p-8 rounded-3xl bg-surface-container shadow-sm border border-outline-variant/10"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                                    <span className="material-symbols-outlined text-3xl font-bold">{domain.icon}</span>
                                </div>
                                <h4 className="text-2xl font-bold mb-6 text-on-surface">{domain.title}</h4>
                                <ul className="space-y-4">
                                    {domain.skills.map((skill, sIdx) => (
                                        <li key={sIdx} className="flex items-center gap-3 text-on-surface-variant">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Differentiator Strip */}
            <section className="py-24 bg-primary text-white overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-sm font-black text-white/60 uppercase tracking-[0.3em] mb-4">{hireData.diffLabel}</h2>
                        <h3 className="text-5xl font-black mb-8">{hireData.diffTitle}</h3>
                        <p className="text-white/80 max-w-2xl mx-auto text-lg">
                            {hireData.diffDesc}
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {hireData.differentiators.map((item, idx) => (
                            <div key={idx} className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10">
                                <span className="material-symbols-outlined text-4xl text-white/40 mb-6 flex">{item.icon}</span>
                                <h4 className="text-2xl font-bold mb-4">{item.title}</h4>
                                <p className="text-white/70 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-24 bg-surface">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-black mb-6">{hireData.stepsTitle}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                        {/* Connection Line (Wavy) */}
                        <div className="hidden md:block absolute top-[2.5rem] left-[12%] right-[12%] h-12 -translate-y-1/2 z-0 pointer-events-none">
                            <svg width="100%" height="100%" viewBox="0 0 100 20" preserveAspectRatio="none" className="stroke-[#2563EB]/40" fill="none" strokeWidth="2">
                                <path d="M 0 10 Q 16.6 0, 33.3 10 T 66.6 10 T 100 10" vectorEffect="non-scaling-stroke" strokeDasharray="4 4" />
                            </svg>
                            <div className="absolute top-[25%] left-[16.6%] -translate-x-1/2 -translate-y-1/2 text-[#2563EB] bg-[#F8FAFC] rounded-full flex items-center justify-center p-0.5">
                                <span className="material-symbols-outlined text-[12px] font-black">arrow_forward_ios</span>
                            </div>
                            <div className="absolute top-[75%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-[#2563EB] bg-[#F8FAFC] rounded-full flex items-center justify-center p-0.5">
                                <span className="material-symbols-outlined text-[12px] font-black">arrow_forward_ios</span>
                            </div>
                            <div className="absolute top-[25%] left-[83.3%] -translate-x-1/2 -translate-y-1/2 text-[#2563EB] bg-[#F8FAFC] rounded-full flex items-center justify-center p-0.5">
                                <span className="material-symbols-outlined text-[12px] font-black">arrow_forward_ios</span>
                            </div>
                        </div>
                        
                        {hireData.steps.map((item, idx) => (
                            <div key={idx} className="relative z-10 text-center">
                                <div className={`w-20 h-20 rounded-full ${idx % 2 === 0 ? 'bg-[#2563EB] text-blue-50' : 'bg-surface-container text-primary'} flex items-center justify-center text-2xl font-black border-4 border-white shadow-xl mx-auto mb-8 transition-transform hover:scale-110 cursor-default`}>
                                    {item.step}
                                </div>
                                <h4 className="text-xl font-bold mb-4 text-on-surface">{item.title}</h4>
                                <p className="text-on-surface-variant">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Vendorship Section */}
            <section className="py-24 bg-surface-container-lowest">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="bg-white dark:bg-slate-800 rounded-[3rem] p-12 md:p-20 shadow-2xl border border-outline-variant/10 flex flex-col md:flex-row gap-16 items-center">
                        <div className="flex-1">
                            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">{hireData.vendorTitle}</h2>
                            <p className="text-lg text-on-surface-variant mb-12 leading-relaxed">
                                {hireData.vendorDesc}
                            </p>
                            <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-12 mt-8">
                                {hireData.vendorPoints.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 font-bold text-on-surface">
                                        <span className="material-symbols-outlined text-primary text-sm font-black">check_circle</span>
                                        {item}
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => {setModalInterest('Become a Vendor Partner'); setIsModalOpen(true);}} className="bg-primary text-white px-10 py-5 rounded-full font-bold text-xl hover:shadow-2xl transition-all">
                                {hireData.vendorBtnText}
                            </button>
                        </div>
                        <div className="w-full md:w-1/2">
                            <div className="grid grid-cols-1 gap-6">
                                {hireData.testimonials.map((testimonial, idx) => (
                                    <div key={idx} className="p-8 rounded-3xl bg-surface shadow-sm border border-outline-variant/10">
                                        <p className="text-lg italic text-on-surface-variant mb-6">{testimonial.text}</p>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">{testimonial.initial}</div>
                                            <div>
                                                <div className="font-bold">{testimonial.name}</div>
                                                <div className="text-xs text-on-surface-variant uppercase tracking-wider">{testimonial.role}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 bg-primary text-white text-center pb-32">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">{hireData.ctaTitle}</h2>
                    <p className="text-xl text-white/80 mb-12">{hireData.ctaDesc}</p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button onClick={() => {setModalInterest('Talent Sourcing'); setIsModalOpen(true);}} className="bg-white text-primary px-10 py-5 rounded-full font-black text-xl hover:shadow-2xl transition-all">{hireData.ctaBtn1}</button>
                        <button onClick={() => {setModalInterest('Become a Vendor Partner'); setIsModalOpen(true);}} className="bg-transparent border-2 border-white text-white px-10 py-5 rounded-full font-black text-xl hover:bg-white/10 transition-all">{hireData.ctaBtn2}</button>
                    </div>
                </div>
            </section>
            <CorporateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} defaultInterest={modalInterest} />
        </div>
    );
};

export default HireWithUs;
