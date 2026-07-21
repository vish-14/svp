import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PremiumDropdown from './PremiumDropdown';

const BookingModal = ({ isOpen, onClose, defaultProgram = "Finance & Accounting" }) => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [program, setProgram] = useState(defaultProgram);

    useEffect(() => {
        setProgram(defaultProgram);
    }, [defaultProgram]);

    const handleClose = () => {
        onClose();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Store info in localStorage
        const leadData = { name, email, phone, program, timestamp: new Date().toISOString() };
        const existingLeads = JSON.parse(localStorage.getItem('leads') || '[]');
        localStorage.setItem('leads', JSON.stringify([...existingLeads, leadData]));

        // Map program names to slugs
        const programMapping = {
            "Finance & Accounting": "finance-accounting",
            "HR Job Training": "hr-training",
            "MNC Experience Training": "mnc-experience"
        };

        const slug = programMapping[program] || "finance-accounting";
        
        handleClose();
        navigate(`/programs/${slug}`);
    };

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
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Apply Now</h2>
                                <p className="text-slate-500 dark:text-slate-400">Join our next batch & transform your career.</p>
                            </div>
                            <button onClick={handleClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Full Name</label>
                                <input 
                                    required
                                    type="text" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your name"
                                    className="w-full px-6 py-4 rounded-lg bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary transition-all text-lg"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
                                <input 
                                    required
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    className="w-full px-6 py-4 rounded-lg bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary transition-all text-lg"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Phone Number</label>
                                <input 
                                    required
                                    type="tel" 
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="+91 00000 00000"
                                    className="w-full px-6 py-4 rounded-lg bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary transition-all text-lg"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Select Program</label>
                                <PremiumDropdown 
                                    options={[
                                        "Finance & Accounting",
                                        "HR Job Training",
                                        "MNC Experience Training"
                                    ]}
                                    value={program}
                                    onChange={setProgram}
                                />
                            </div>

                            <motion.button 
                                type="submit" 
                                whileHover={{ scale: 1.02 }} 
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-[#2563eb] text-white py-4 rounded-lg font-bold text-base mt-2 shadow-lg shadow-blue-900/20 transition-all flex justify-center items-center gap-2"
                            >
                                Submit Application <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                            </motion.button>
                        </form>
                        
                        <p className="text-center text-xs text-slate-400 mt-8 font-medium">
                            By submitting, you agree to our <a href="/terms-conditions" className="text-primary hover:underline">Terms</a> and <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>.
                        </p>
                    </div>
                </motion.div>
            </div>
            )}
        </AnimatePresence>
    );
};

export default BookingModal;
