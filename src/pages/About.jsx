import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import aboutData from '../content/about.json';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <main className="bg-white dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 selection:bg-blue-100 selection:text-blue-900">
      
      {/* Hero Section - Refined for "Wonderful" feel */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-[1140px] mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-black tracking-[0.2em] text-[#2563EB] uppercase bg-blue-100/50 dark:bg-blue-900/20 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse"></span>
              Established 2017
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white mb-8 leading-[1.05]">
              Architecting <br/>
              <span className="text-[#2563EB]">{aboutData.heroHighlight}</span> of Tomorrow.
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl font-medium">
              {aboutData.heroSubtitle}
            </p>
          </motion.div>
        </div>
        
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/5 -skew-x-12 translate-x-20 hidden lg:block"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]"></div>
      </section>

      {/* The Genesis Section - Restructured for narrative flow */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
        className="py-24 bg-white dark:bg-slate-950"
      >
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr,0.9fr] gap-16 items-start">
            
            <motion.div variants={itemVariants} className="space-y-10">
              <div>
                <h2 className="text-[#2563EB] font-black tracking-widest text-xs uppercase mb-4">{aboutData.genesisTitle}</h2>
                <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-[1.1] mb-8 italic">
                  {aboutData.genesisQuote}
                </h3>
                
                <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  <p>
                    That question first sparked in the mind of <span className="text-slate-900 dark:text-white font-bold underline decoration-blue-500/30 underline-offset-4">Mr. Pochampally Sudheer Reddy</span>, a seasoned finance professional with 15+ years of hands-on experience in Big 4 companies like <span className="font-bold">Deloitte</span>, and global giants like <span className="font-bold">Amazon, IBM, and Accenture</span>.
                  </p>
                  <p>
                    Having walked the corporate corridors himself, Sudheer witnessed a painful reality firsthand - thousands of talented graduates with degrees in hand but no direction, no practical skills, and no pathway to a meaningful career.
                  </p>
                  
                  <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border-l-[6px] border-[#2563EB] shadow-sm">
                    <p className="font-bold text-slate-900 dark:text-white">
                      He didn't just see a problem. He decided to become the solution.
                    </p>
                    <div className="mt-4 text-base space-y-4 text-slate-700 dark:text-slate-300">
                      <p>
                        In 2016, Mr. Pochampally Sudheer Reddy founded SV Professionals in Hyderabad - not as just another training institute, but as a career transformation ecosystem - a place where struggling graduates could walk in with uncertainty and walk out with confidence, skills, and a job offer from a top MNC.
                      </p>
                      <h4 className="font-black text-slate-900 dark:text-white mt-2">A Vision That Found Its Army</h4>
                      <p>
                        What began as one man's mission soon became a shared calling. The vision of SV Professionals deeply resonated with three exceptional professionals who brought their own corporate expertise and unwavering passion to the table:
                      </p>
                      <ul className="list-none space-y-3 mt-3">
                        <li className="flex items-start gap-3">
                          <span className="text-2xl">🔹</span>
                          <div>
                            <strong>Mr. Boya Konda Reddy (MBA, M.Com | 15+ Years Top MNC Experience)</strong> - A master in accounting & finance operations, Konda Reddy saw the same gap between textbook knowledge and real-world readiness. His conviction in Sudheer's mission was instant: "If we train them the way corporates need them, they won't just get jobs - they'll build careers."
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-2xl">🔹</span>
                          <div>
                            <strong>Mr. Kandula Praveen Reddy (MBA, CMA | 15+ Years Top MNC Experience)</strong> - With deep expertise in cost management and financial strategy, Praveen brought a structured, curriculum-driven approach to training. His focus: making every module mirror real MNC work environments.
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-2xl">🔹</span>
                          <div>
                            <strong>Mr. Kommera Ravi Varun Reddy (B.Tech, Certified HR Professional | 10+ years Corporate Industry Experience)</strong> - Bringing a unique blend of technology and human resources, Ravi Varun expanded this into a consulting wing connecting candidates to leading industries. He became the bridge between technical training and placement strategy, ensuring students were interview-ready, corporate-ready, and life-ready.
                          </div>
                        </li>
                      </ul>
                      <p className="mt-4 font-semibold">
                        Together, these four visionaries formed the bedrock of SV Professionals - united by a single mission:
                      </p>
                      <blockquote className="mt-2 italic font-bold">"No graduate should be left behind. Every student deserves a real shot at a real career."</blockquote>
                    </div>
                  </div>
                </div>

                <div className="pt-10">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-6 font-mono">Corporate DNA Inspired By</p>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-8 lg:gap-12 items-center group">
                    <img className="h-4 md:h-5 w-auto object-contain" src="https://tse1.mm.bing.net/th/id/OIP.x8Ug5pA6_Z5YnY18cn9mXwHaBn?rs=1&pid=ImgDetMain&o=7&rm=3" alt="Deloitte" />
                    <img className="h-5 md:h-7 w-auto object-contain" src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" />
                    <img className="h-6 md:h-8 w-auto object-contain" src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" />
                    <img className="h-7 md:h-9 w-auto object-contain" src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg" alt="Accenture" />
                    <img className="h-9 md:h-11 w-auto object-contain" src="https://latestlogo.com/wp-content/uploads/2024/01/tata-consultancy-services-logo.png" alt="TCS" />
                    <img className="h-6 md:h-8 w-auto object-contain" src="https://thewealthmosaic.s3.amazonaws.com/media/Logo_Genpact_June_2019.png" alt="Genpact" />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="relative sticky top-32">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-100 dark:border-slate-800">
                <img 
                  alt="Founder Mr. Pochampally Sudheer Reddy" 
                  className="w-full h-full object-cover" 
                  src="/images/sudheer_reddy.png" 
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl max-w-[280px] border border-slate-100 dark:border-slate-800 hidden md:block">
                <div className="w-10 h-10 bg-[#2563EB] rounded-2xl flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-white text-xl">format_quote</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 font-bold italic text-base leading-relaxed">
                  {aboutData.founderQuote}
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </motion.section>

      {/* Leadership Team - More structured Grid for Better Alignment */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950/50">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[#2563EB] font-black tracking-widest text-xs uppercase mb-4">{aboutData.teamTitle}</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">{aboutData.teamSubtitle}</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg font-medium">
              {aboutData.teamDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {aboutData.teamMembers.map((member, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 transition-all hover:shadow-[0_24px_48px_-12px_rgba(37,99,235,0.12)] hover:-translate-y-1"
              >
                <div className="aspect-[1/1.1] overflow-hidden relative">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                </div>
                <div className="p-8 pb-10 text-center">
                  <h4 className="text-xl font-black text-slate-900 dark:text-white mb-1">{member.name}</h4>
                  <p className="text-[#2563EB] font-black text-xs uppercase tracking-widest mb-3">{member.role}</p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-mono">{member.creds}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision - Refined Side-by-Side */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            
            <div className="space-y-6">
              <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-[#2563EB]">
                <span className="material-symbols-outlined text-3xl">rocket_launch</span>
              </div>
              <h3 className="text-4xl font-black tracking-tight">Our Mission</h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                To empower every aspiring professional - fresh graduates or career pivoters - with industry-relevant skills, real-world corporate training, and guaranteed placement support that transforms potential into performance.
              </p>
            </div>

            <div className="space-y-6">
              <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-900 dark:text-white">
                <span className="material-symbols-outlined text-3xl">visibility</span>
              </div>
              <h3 className="text-4xl font-black tracking-tight">Our Vision</h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                To be India's most trusted career transformation institute - where education meets employability, classroom lessons translate to boardroom confidence, and no student is left without a clear career path.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Core Values - Equal Height Grid */}
      <section className="py-24 bg-slate-900 dark:bg-slate-900 rounded-[4rem] mx-4 md:mx-8">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[#2563EB] font-black tracking-widest text-xs uppercase mb-4">Core Values</h2>
            <h3 className="text-4xl font-black text-white">What Defines Us</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { icon: "award_star", title: "Excellence", text: "Training by corporate pros, not teachers." },
              { icon: "handshake", title: "Commitment", text: "Responsibility until placement success." },
              { icon: "lightbulb", title: "Innovation", text: "Real-time MNC-aligned curriculum." },
              { icon: "favorite", title: "Empathy", text: "We understand the graduate struggle." },
              { icon: "trending_up", title: "Results", text: "6,900+ MNC placements and counting." }
            ].map((value, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -8 }}
                className="flex flex-col h-full bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 hover:border-blue-500/30 transition-all group"
              >
                <div className="w-12 h-12 bg-[#2563EB]/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl text-[#2563EB]">{value.icon}</span>
                </div>
                <h4 className="text-lg font-black text-white mb-3">{value.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed mt-auto">{value.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Strip */}
      <section className="py-24 mb-16">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 p-12 md:p-16 bg-[#2563EB] rounded-[3rem] text-white shadow-2xl shadow-blue-500/30 overflow-hidden relative">
            <div className="relative z-10 text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-black mb-4">Start Your Career Journey Today</h2>
              <p className="text-blue-100 text-lg font-medium opacity-90">Join 6,900+ successful professionals at India's most trusted institute.</p>
            </div>
            <div className="relative z-10 shrink-0">
              <Link to="/contact">
                <motion.button 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.98 }} 
                  className="px-10 py-4 bg-white text-[#2563EB] rounded-xl font-black text-lg shadow-xl shadow-black/10 hover:bg-slate-50 transition-all"
                >
                  Contact Admissions
                </motion.button>
              </Link>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default About;
