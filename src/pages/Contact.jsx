import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    if (isFormSubmitted) {
      const timer = setTimeout(() => setIsFormSubmitted(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isFormSubmitted]);
  return (
    <main className="bg-white dark:bg-slate-950 min-h-screen selection:bg-blue-100 selection:text-blue-900">
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-[1140px] mx-auto px-6 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-black tracking-[0.2em] text-[#2563EB] uppercase bg-blue-100/50 dark:bg-blue-900/20 rounded-full">
              Contact Admissions
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
              Start Your <span className="text-[#2563EB]">Transformation</span>.
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto font-medium">
              Have questions about our mentorship or placement record? Our career consultants are ready to help you navigate your professional future.
            </p>
          </motion.div>
        </div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]"></div>
      </section>

      {/* Contact Grid Section */}
      <section className="py-24">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.3fr] gap-16 items-start">
            
            {/* Left: Contact Info & Map */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-blue-200 transition-all group">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 text-[#2563EB] group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">call</span>
                  </div>
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Direct Line</h3>
                  <p className="text-xl font-black text-slate-900 dark:text-white mb-1 tracking-tight">+91 81431 43145</p>
                  <p className="text-xl font-black text-slate-900 dark:text-white mb-1 tracking-tight">+91 98850 10913</p>
                  <p className="text-xs text-slate-500 font-medium font-mono mt-2">Available 9AM - 6PM</p>
                </div>

                <div className="p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-blue-200 transition-all group">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mb-6 text-green-600 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">chat</span>
                  </div>
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">WhatsApp Us</h3>
                  <a href="https://wa.me/918143143145" target="_blank" rel="noreferrer" className="text-xl font-black text-slate-900 dark:text-white mb-1 tracking-tight hover:text-green-600 transition-colors">Chat Support</a>
                  <p className="text-xs text-slate-500 font-medium font-mono">Instant Response</p>
                </div>
              </div>

              <div className="space-y-6">
                 <div className="flex items-center gap-3">
                   <div className="h-[1px] w-8 bg-[#2563EB]"></div>
                   <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Our Location</span>
                 </div>
                 <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800 h-[350px] relative">
                   <iframe 
                     title="SV Professionals Hyderabad"
                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.8272226271033!2d78.44192667516565!3d17.42060038347101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb97475f986427%3A0xc3c518ca801b601e!2sSV%20Professionals!5e0!3m2!1sen!2sin!4v1713531200000!5m2!1sen!2sin" 
                     className="w-full h-full border-0 grayscale opacity-90 contrast-125" 
                     allowFullScreen="" 
                     loading="lazy" 
                     referrerPolicy="no-referrer-when-downgrade"
                   ></iframe>
                   <div className="absolute bottom-6 left-6 right-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-blue-100 dark:border-slate-800 shadow-xl max-w-sm">
                     <div className="flex items-start gap-4">
                       <span className="material-symbols-outlined text-[#2563EB]">location_on</span>
                       <div>
                         <p className="font-black text-slate-900 dark:text-white text-sm">SV Professionals Head Office</p>
                         <p className="text-xs text-slate-500 leading-relaxed font-medium mt-1">
                           Metro Station Building, Himayatnagar,<br/>Hyderabad, Telangana 500038
                         </p>
                       </div>
                     </div>
                   </div>
                 </div>
              </div>
            </motion.div>

            {/* Right: Lead Generation Form */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] border border-slate-100 dark:border-slate-800"
            >
              <div className="mb-10 text-center lg:text-left">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-3">Reserve Your Spot</h2>
                <p className="text-slate-500 font-medium">Fill out the form below and our mentor will call you back within 6 hours.</p>
              </div>

              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsFormSubmitted(true); }}>
                {isFormSubmitted ? (
                  <div className="text-center py-12">
                     <motion.div 
                         initial={{ scale: 0 }} 
                         animate={{ scale: 1 }} 
                         transition={{ type: "spring", bounce: 0.6, duration: 0.8 }}
                         className="w-32 h-32 mx-auto mb-8 relative"
                     >
                         <div className="absolute inset-0 bg-green-400/20 rounded-full blur-2xl animate-pulse"></div>
                         <div className="w-full h-full bg-gradient-to-tr from-green-400 to-green-300 rounded-full shadow-[0_0_40px_rgba(74,222,128,0.4)] border-4 border-white dark:border-slate-800 flex items-center justify-center relative z-10">
                             <span className="material-symbols-outlined text-white text-6xl font-black">check</span>
                         </div>
                     </motion.div>
                     <motion.h3 
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: 0.2 }}
                         className="text-3xl font-black text-slate-900 dark:text-white mb-3"
                     >
                         Inquiry Sent Successfully!
                     </motion.h3>
                     <motion.p 
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: 0.3 }}
                         className="text-slate-500 dark:text-slate-400 font-medium mb-4"
                     >
                         We have received a notification regarding your request. Our support team will get in touch shortly.
                     </motion.p>
                  </div>
                ) : (
                  <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-1">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. John Doe"
                      className="w-full px-5 py-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all font-medium text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-1">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+91 00000 00000"
                      className="w-full px-5 py-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all font-medium text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="name@email.com"
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all font-medium text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-1">Professional Interest</label>
                  <select className="w-full px-5 py-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all font-medium text-slate-900 dark:text-white appearance-none cursor-pointer">
                    <option>Finance & Accounting Masterclass</option>
                    <option>HR Specialist Program</option>
                    <option>SAP FICO Training</option>
                    <option>SAP Accounting End User Course</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-1">Any Questions? (Optional)</label>
                  <textarea 
                    rows="4"
                    placeholder="Tell us about your career goals..."
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all font-medium text-slate-900 dark:text-white resize-none"
                  ></textarea>
                </div>

                <motion.button 
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-5 bg-[#2563EB] text-white rounded-xl font-black text-lg shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-3"
                >
                  Send Inquiry Request
                  <span className="material-symbols-outlined">send</span>
                </motion.button>

                <p className="text-[9px] text-center font-black uppercase tracking-[0.2em] text-slate-400 mt-6">
                   <span className="material-symbols-outlined text-[10px] align-middle mr-1">verified_user</span>
                   100% Privacy Protected • No Spam Policy
                </p>
                </>
                )}
              </form>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Trust & Authority Bar */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex flex-col items-center gap-3">
              <img className="h-5 w-auto object-contain" src="https://tse1.mm.bing.net/th/id/OIP.x8Ug5pA6_Z5YnY18cn9mXwHaBn?rs=1&pid=ImgDetMain&o=7&rm=3" alt="Deloitte" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Ecosystem</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <span className="material-symbols-outlined text-3xl">verified_user</span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">100% Placements</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <span className="material-symbols-outlined text-3xl">workspace_premium</span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">ISO Certified</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <span className="material-symbols-outlined text-3xl">groups</span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Big 4 Mentorship</span>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Contact;
