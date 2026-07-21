import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PremiumDropdown from './PremiumDropdown';

const CorporateModal = ({ isOpen, onClose, defaultInterest = "Talent Sourcing" }) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [interest, setInterest] = useState(defaultInterest);

    useEffect(() => {
        setInterest(defaultInterest);
    }, [defaultInterest]);

    const handleClose = () => {
        onClose();
        setTimeout(() => setIsSubmitted(false), 300);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    useEffect(() => {
        if (isSubmitted) {
            const timer = setTimeout(() => {
                handleClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isSubmitted]);
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                    ></motion.div>
                
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative bg-white dark:bg-slate-900 w-full max-w-lg rounded-[20px] shadow-2xl border border-white/20"
                >
                    <div className="p-8 md:p-10">
                        {isSubmitted ? (
                            <div className="text-center py-10">
                                <motion.div 
                                    initial={{ scale: 0 }} 
                                    animate={{ scale: 1 }} 
                                    transition={{ type: "spring", bounce: 0.6, duration: 0.8 }}
                                    className="w-32 h-32 mx-auto mb-8 relative"
                                >
                                    <div className="absolute inset-0 bg-green-400/20 rounded-full blur-2xl animate-pulse"></div>
                                    <div className="w-full h-full bg-gradient-to-tr from-green-400 to-green-300 rounded-full shadow-[0_0_40px_rgba(74,222,128,0.4)] border-4 border-white flex items-center justify-center relative z-10">
                                        <span className="material-symbols-outlined text-white text-6xl font-black">check</span>
                                    </div>
                                </motion.div>
                                <motion.h2 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-3xl font-black text-slate-900 dark:text-white mb-4"
                                >
                                    Inquiry Submitted!
                                </motion.h2>
                                <motion.p 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-slate-500 dark:text-slate-400 mb-8"
                                >
                                    Our talent team will contact you shortly.
                                </motion.p>
                            </div>
                        ) : (
                            <>
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Connect With Us</h2>
                                <p className="text-slate-500 dark:text-slate-400">Let's build your next high-performing team.</p>
                            </div>
                            <button onClick={handleClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">Company Name</label>
                                    <input 
                                        required
                                        type="text" 
                                        placeholder="e.g. Acme Corp"
                                        className="w-full px-5 py-3 rounded-lg bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">Contact Person</label>
                                    <input 
                                        required
                                        type="text" 
                                        placeholder="Full Name"
                                        className="w-full px-5 py-3 rounded-lg bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
                                <input 
                                    required
                                    type="email" 
                                    placeholder="work@company.com"
                                    className="w-full px-5 py-3 rounded-lg bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">Primary Interest</label>
                                <PremiumDropdown 
                                    options={[
                                        "Talent Sourcing",
                                        "Become a Vendor Partner",
                                        "HR Consulting",
                                        "General Corporate Inquiry"
                                    ]}
                                    value={interest}
                                    onChange={setInterest}
                                />
                            </div>

                            <button type="submit" className="w-full py-4 bg-primary text-white rounded-lg font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all mt-4">
                                Submit Inquiry
                            </button>
                        </form>
                        
                        <p className="text-center text-xs text-slate-400 mt-8 font-medium">
                            We respect your privacy. No spam, ever.
                        </p>
                        </>
                        )}
                    </div>
                </motion.div>
            </div>
            )}
        </AnimatePresence>
    );
};

export default CorporateModal;
