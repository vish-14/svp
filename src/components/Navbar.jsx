import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import BookingModal from './BookingModal';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const isActive = (path) => location.pathname === path;

  const NavLink = ({ to, children }) => (
    <Link
      className={`${isActive(to) ? 'text-blue-700 dark:text-blue-400 font-bold border-b-2 border-blue-700' : 'text-slate-600 dark:text-slate-400 font-medium hover:text-blue-600'} transition-all duration-300`}
      to={to}
      onClick={() => setIsOpen(false)}
    >
      {children}
    </Link>
  );

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="sticky top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-[24px] border-b border-blue-900/10 shadow-sm"
      >
        <nav className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto w-full">
          <Link to="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
            <img alt="SV Professionals Logo" className="h-12 md:h-14 w-auto object-contain" src="/images/logo.png" />
            <span className="text-xl md:text-2xl font-black tracking-tighter text-blue-900 dark:text-blue-50 leading-none">SV PROFESSIONALS</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/programs">Programs</NavLink>
            <NavLink to="/about">About Us</NavLink>
            <NavLink to="/hire-with-us">Hire with Us</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <motion.button
              onClick={() => setIsBookingOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#2563EB] text-white px-6 py-2.5 rounded-full font-semibold transition-transform hover:bg-blue-700 shadow-lg shadow-blue-500/20"
            >
              Apply Now
            </motion.button>
          </div>

          {/* Mobile Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="material-symbols-outlined">{isOpen ? 'close' : 'menu'}</span>
          </motion.button>
        </nav>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white dark:bg-slate-900 border-b border-blue-100 overflow-hidden"
            >
              <div className="flex flex-col gap-6 px-8 py-8 items-center">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/programs">Programs</NavLink>
                <NavLink to="/about">About Us</NavLink>
                <NavLink to="/hire-with-us">Hire with Us</NavLink>
                <NavLink to="/contact">Contact</NavLink>
                <motion.button
                  onClick={() => { setIsBookingOpen(true); setIsOpen(false); }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-[#2563EB] text-white px-6 py-3 rounded-full font-semibold shadow-lg shadow-blue-500/20"
                >
                  Apply Now
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
};

export default Navbar;
