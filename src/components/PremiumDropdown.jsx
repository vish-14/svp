import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PremiumDropdown = ({ options, value, onChange, placeholder = "Select an option" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (option) => {
        onChange(option);
        setIsOpen(false);
    };

    return (
        <div className="relative w-full" ref={dropdownRef}>
            {/* Trigger Button */}
            <motion.button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                whileTap={{ scale: 0.995 }}
                className={`w-full flex items-center justify-between px-5 py-3.5 rounded-lg border transition-all duration-300 text-sm font-medium outline-none
                    ${isOpen 
                        ? 'bg-white border-primary ring-4 ring-primary/10 shadow-lg shadow-primary/5' 
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300 focus:bg-white focus:border-primary/50 text-[#0F172A]'
                    }`}
            >
                <span className={value ? 'text-[#0F172A]' : 'text-slate-400'}>
                    {value || placeholder}
                </span>
                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                    className={`material-symbols-outlined text-[20px] transition-colors ${isOpen ? 'text-primary' : 'text-slate-400'}`}
                >
                    expand_more
                </motion.span>
            </motion.button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 5, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                        className="absolute z-[110] w-full mt-2 bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 overflow-y-auto max-h-64 py-2 custom-scrollbar"
                    >
                        {options.map((option, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.03 }}
                                onClick={() => handleSelect(option)}
                                className={`px-5 py-3 text-sm font-medium cursor-pointer transition-all flex items-center justify-between group
                                    ${value === option 
                                        ? 'bg-primary/5 text-primary' 
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-primary'
                                    }`}
                            >
                                <span>{option}</span>
                                {value === option && (
                                    <motion.span 
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="material-symbols-outlined text-[18px]"
                                    >
                                        check
                                    </motion.span>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PremiumDropdown;
