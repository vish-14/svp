import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {

  return (
    <footer className="bg-[#f0f3ff] dark:bg-slate-900 w-full rounded-t-[2rem] mt-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-12 py-16 max-w-7xl mx-auto">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center mb-6">
            <img alt="SV Professionals Logo" className="h-16 w-auto object-contain" src="/images/logo.png" />
          </div>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">Leading vocational training institute dedicated to excellence in finance, accounting, and human resources career development.</p>
          <div className="flex items-center gap-4">
            <img src="https://www.image2url.com/r2/default/images/1783597984794-9a62736e-df3c-42e3-bb53-9a46914971a0.jpg" alt="Certifications Logo" className="h-10 w-auto object-contain mix-blend-multiply dark:mix-blend-normal" />
            <div className="h-8 w-px bg-slate-300 dark:bg-slate-700"></div>
            <a href="https://www.linkedin.com/company/svprofessional" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-700 shadow-sm hover:translate-y-[-2px] transition-transform">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
            </a>
            <a href="https://www.facebook.com/Svprofessionalinstitutions/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-700 shadow-sm hover:translate-y-[-2px] transition-transform">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7.5v4H10v12.42c.642.107 1.309.16 2 .18V13.5z"/></svg>
            </a>
            <a href="https://www.instagram.com/svprofessionals/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-700 shadow-sm hover:translate-y-[-2px] transition-transform">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.405a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/></svg>
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-6">Our Programs</h4>
          <ul className="space-y-3">
            <li><Link className="text-slate-500 hover:text-blue-600 transition-colors text-sm" to="/programs/finance-accounting">Finance & Accounting</Link></li>
            <li><Link className="text-slate-500 hover:text-blue-600 transition-colors text-sm" to="/programs/hr-training">HR Job Training</Link></li>
            <li><Link className="text-slate-500 hover:text-blue-600 transition-colors text-sm" to="/programs/mnc-experience">MNC Experience</Link></li>
            <li><Link className="text-blue-600 font-bold hover:underline transition-colors text-sm" to="/hire-with-us">Hire With Us ↗</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6">Quick Links</h4>
          <ul className="space-y-3">
            <li><Link className="text-slate-500 hover:text-blue-600 transition-colors text-sm" to="/about">About Us</Link></li>
            <li><Link className="text-slate-500 hover:text-blue-600 transition-colors text-sm" to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link className="text-slate-500 hover:text-blue-600 transition-colors text-sm" to="/terms-conditions">Terms & Conditions</Link></li>
            <li><Link className="text-slate-500 hover:text-blue-600 transition-colors text-sm" to="/contact">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6">Contact Info</h4>
          <p className="text-slate-500 text-sm mb-4 flex gap-2"><span className="material-symbols-outlined text-sm">location_on</span> Sai Sadan Apartments, 202, 2nd floor, beside Avanthi Degree & PG College (Honda Showroom Building), Hyderabad, Telangana 500029</p>
          <div className="text-slate-500 text-sm mb-4 flex gap-2">
            <span className="material-symbols-outlined text-sm mt-0.5">phone</span> 
            <div className="flex flex-col gap-1">
              <a href="tel:+918143145145" className="hover:text-blue-600 transition-colors">+91 81431 45145</a>
              <a href="tel:+919885010913" className="hover:text-blue-600 transition-colors">+91 98850 10913</a>
            </div>
          </div>
          <p className="text-slate-500 text-sm mb-6 flex gap-2"><span className="material-symbols-outlined text-sm">mail</span> Svpmnc@gmail.com</p>
        </div>
      </div>
      <div className="border-t border-slate-200/50 py-8 px-12 text-center text-slate-400 text-xs">
        © 2026 SV Professionals · Accounting & Finance Training Institute · Hyderabad, India
      </div>
    </footer>
  );
};

export default Footer;
