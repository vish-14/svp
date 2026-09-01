import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import BookingModal from '../components/BookingModal';
import PremiumDropdown from '../components/PremiumDropdown';
import homeData from '../content/home.json';

const Home = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showVideo2, setShowVideo2] = useState(false);
  const [showVideo3, setShowVideo3] = useState(false);
  const [playingVideos, setPlayingVideos] = useState({});
  const togglePlayVideo = (id, videoEl) => {
    setPlayingVideos(prev => ({ ...prev, [id]: true }));
    if (videoEl) videoEl.play().catch(err => console.log('playback failed', err));
  };

  // ── Testimonial video auto-advance carousel ──────────────────────────────
  const testimonialVideos = [
    { id: 1, driveId: "1BszVnnNWymoWCyeXC2MkhImIVlgjsJWB", src: "/videos/video1.mp4" },
    { id: 2, driveId: "1TPmCYU8mWtpHCj61sI-m4RDBTADAOtbO", src: "/videos/video2.mp4" },
    { id: 3, driveId: "1qm9FXmJ0elQYuvmhHTSPOft1EJtei9_V", src: "/videos/video3.mp4" },
    { id: 4, driveId: "1G4tmf-MU-k0jUZElo3LC0QNl3Q0B_TDG", src: "/videos/reality_after_graduation.mp4" },
    { id: 5, driveId: "1PR1SAKh8j3NnyeNsZN6XpICTc9ZtcnP8", src: "/videos/video1.mp4" },
    { id: 6, driveId: "1i-T2g2nSzTfnM9ChtzQIRd69JY9PvJW6", src: "/videos/video2.mp4" },
    { id: 7, driveId: "1xMjkE3hKnpOyh19WaGjAwpIP65rYVp_x", src: "/videos/video3.mp4" },
  ];
  const [activeVideoIdx, setActiveVideoIdx] = useState(null);
  const carouselRef = useRef(null);
  const testimonialVideoRefs = useRef({});

  const [videoSecondsLeft, setVideoSecondsLeft] = useState(0);
  const VIDEO_DURATION_SEC = 5 * 60; // 5 minutes per video before auto-advance

  useEffect(() => {
    if (activeVideoIdx === null) return;
    // Scroll active card into view horizontally without affecting window vertical scroll
    const container = carouselRef.current;
    const el = container?.children[activeVideoIdx];
    if (container && el) {
      const containerRect = container.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const scrollLeft = container.scrollLeft + (elRect.left - containerRect.left) - (containerRect.width - elRect.width) / 2;
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
    const activeVideo = testimonialVideoRefs.current[activeVideoIdx];
    if (activeVideo) {
      activeVideo.currentTime = 0;
      activeVideo.play().catch(() => { });
    }
    // Start countdown timer for auto-advance
    setVideoSecondsLeft(VIDEO_DURATION_SEC);
    const tick = setInterval(() => {
      setVideoSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(tick);
          setActiveVideoIdx(cur => (cur + 1) % testimonialVideos.length);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(tick);
  }, [activeVideoIdx]);
  // ─────────────────────────────────────────────────────────────────────────
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("Finance & Accounting");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Store info in localStorage
    const leadData = { name, phone, program: selectedProgram, timestamp: new Date().toISOString() };
    const existingLeads = JSON.parse(localStorage.getItem('leads') || '[]');
    localStorage.setItem('leads', JSON.stringify([...existingLeads, leadData]));

    // Map program names to slugs
    const programMapping = {
      "Finance & Accounting": "finance-accounting",
      "HR Job Training": "hr-training",
      "MNC Experience": "mnc-experience"
    };

    const slug = programMapping[selectedProgram] || "finance-accounting";
    navigate(`/programs/${slug}`);
  };

  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <>
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />


      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="bg-[#F8FAFC] pt-12 md:pt-20 pb-16 md:pb-24 overflow-hidden border-b border-slate-200">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1.6fr,1.4fr] gap-10 lg:gap-16 items-start">

            {/* Left Column: Content */}
            <div className="flex flex-col items-start pt-4">
              <h1 className="text-3xl md:text-4xl lg:text-[42px] font-black text-[#0F172A] leading-[1.2] mb-3 tracking-tight">
                {homeData.heroTitlePrefix}<span className="text-[#2563eb]">{homeData.heroTitleHighlight}</span>
              </h1>
              <p className="text-base md:text-[17px] text-slate-600 leading-relaxed max-w-xl mb-6 font-medium">
                {homeData.heroSubtitle}
              </p>

              {/* Stats Strip */}
              <div className="grid grid-cols-2 gap-y-6 gap-x-4 sm:flex sm:items-center sm:gap-6 mb-8 pb-8 border-b border-slate-200 w-full lg:w-auto">
                {homeData.stats.map((stat, index) => (
                  <React.Fragment key={index}>
                    <div className="flex flex-col">
                      <span className="text-2xl sm:text-xl font-black text-[#0F172A] leading-none">{stat.value}</span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1.5">{stat.label}</span>
                    </div>
                    {index < homeData.stats.length - 1 && (
                      <div className="hidden sm:block w-[1px] h-8 bg-slate-200"></div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto mt-2">
                <motion.button
                  onClick={() => setIsModalOpen(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto bg-[#2563eb] text-white px-8 py-4 rounded-lg font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 transition-all"
                >
                  Apply Now <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </motion.button>
                <Link
                  to="/contact"
                  className="w-full sm:w-auto bg-white border-2 border-slate-200 text-[#0F172A] px-8 py-4 rounded-lg font-bold text-base flex items-center justify-center gap-2 hover:border-[#1E40AF] hover:text-[#1E40AF] transition-all text-center group"
                >
                  Talk to Counsellor <span className="material-symbols-outlined text-[20px] text-slate-400 group-hover:text-[#1E40AF]">call</span>
                </Link>
              </div>
              <p className="mt-4 text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
                {homeData.trustProofText}
              </p>
            </div>

            {/* Right Column: Form */}
            <div className="w-full mt-6 lg:mt-0">
              <div className="bg-white p-7 md:p-8 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 max-w-[420px] mx-auto lg:ml-auto lg:mr-0 relative">

                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-blue-800 rounded-t-2xl"></div>

                <div className="mb-6">
                  <h3 className="text-2xl font-black text-[#0F172A] mb-1.5 tracking-tight">Book Free Counselling</h3>
                  <p className="text-slate-500 text-sm font-medium">Get a call from our expert mentors.</p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1.5 ml-1">Full Name</label>
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-[#1E40AF]/20 focus:border-[#1E40AF] transition-all text-[#0F172A] text-sm font-medium outline-none placeholder:text-slate-400"
                      placeholder="Enter your full name"
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1.5 ml-1">Phone Number</label>
                    <input
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-[#1E40AF]/20 focus:border-[#1E40AF] transition-all text-[#0F172A] text-sm font-medium outline-none placeholder:text-slate-400"
                      placeholder="+91 00000 00000"
                      type="tel"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1.5 ml-1">Program of Interest</label>
                    <PremiumDropdown
                      options={[
                        "Finance & Accounting",
                        "HR Job Training",
                        "MNC Experience"
                      ]}
                      value={selectedProgram}
                      onChange={setSelectedProgram}
                    />
                  </div>

                  <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full bg-[#2563eb] text-white py-4 rounded-lg font-bold text-base mt-2 shadow-lg shadow-blue-900/20 transition-all flex justify-center items-center gap-2">
                    Get Started <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </motion.button>

                  <p className="text-center text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-5 flex items-center justify-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px]">lock</span> 100% Secure & Confidential
                  </p>
                </form>
              </div>
            </div>

          </div>

          {/* Integrated Trust Proof Strip */}
          <div className="mt-12 md:mt-16 pt-8 border-t border-slate-200/60 max-w-[1140px] mx-auto">
            <p className="text-center text-[9px] uppercase font-black tracking-[0.25em] text-slate-400 mb-6 font-inter">
              Trusted by students across platforms
            </p>
            <div className="flex flex-row flex-wrap items-center justify-center gap-x-12 gap-y-6 md:gap-16">

              <div className="flex items-center gap-3.5">
                <img className="h-5 w-5 object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg" alt="Google" />
                <span className="text-[15px] font-extrabold text-[#0F172A] font-inter">Google</span>
                <div className="flex text-[#F59E0B] gap-0.5">
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                </div>
                <span className="text-[14px] font-bold text-slate-600 font-inter">4.9/5</span>
              </div>

              <div className="hidden md:block w-[1.5px] h-5 bg-[#E2E8F0]"></div>

              <div className="flex items-center gap-3.5">
                <img className="h-5 w-5 object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/facebook/facebook-original.svg" alt="Facebook" />
                <span className="text-[15px] font-extrabold text-[#0F172A] font-inter">Facebook</span>
                <div className="flex text-[#F59E0B] gap-0.5">
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                </div>
                <span className="text-[14px] font-bold text-slate-600 font-inter">4.9/5</span>
              </div>

              <div className="hidden md:block w-[1.5px] h-5 bg-[#E2E8F0]"></div>

              <div className="flex items-center gap-3.5">
                <img className="h-5 w-5 object-contain" src="https://www.justdial.com/favicon.ico" alt="JustDial" />
                <span className="text-[15px] font-extrabold text-[#0F172A] font-inter">JustDial</span>
                <div className="flex text-[#F59E0B] gap-0.5">
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                </div>
                <span className="text-[14px] font-bold text-slate-600 font-inter whitespace-nowrap">4.9/5</span>
              </div>

            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        ref={scrollRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 md:py-24 bg-white"
        id="programs"
      >
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="mb-14 text-center lg:text-left">
            <h2 className="text-[36px] md:text-[44px] font-black text-[#0F172A] leading-tight mb-4 tracking-tighter">Master In-Demand Programs</h2>
            <p className="text-slate-500 max-w-2xl text-lg font-medium leading-relaxed">Fast-track your career with practical training designed by industry pioneers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Program 1 */}
            <div className="sticky top-24 md:static z-10 group bg-white border border-slate-100 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col relative mt-12 md:mt-0">
              <div className="p-6 pb-0 flex justify-between items-start min-h-[140px] relative">
                <div className="mt-2">
                  <div className="text-[#2563EB] font-black text-xs uppercase tracking-widest mb-1">SV Professionals</div>
                  <div className="text-[#1E40AF] font-black text-lg tracking-tight leading-tight max-w-[150px]">Certified Finance & Accounts Analyst Program</div>
                </div>
                <motion.div
                  style={{ y: y1 }}
                  className="w-32 h-48 absolute -top-12 right-2 z-20 pointer-events-none"
                >
                  <img className="w-full h-full object-contain object-bottom transition-transform duration-500 group-hover:scale-110" src="/images/first_box.png" alt="FAP Program Student" />
                </motion.div>
              </div>

              <div className="px-6 py-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-wider">For freshers</span>
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-wider">2-3 Months</span>
              </div>

              <div className="px-6 pb-6 flex-1 flex flex-col">
                <div className="space-y-3.5 mb-6 mt-2">

                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-blue-600 text-[18px] bg-blue-50 p-1.5 rounded-lg shrink-0">groups</span>
                    <span className="text-xs font-bold text-slate-600 leading-tight">For Accounting & Finance Background Graduates</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-blue-600 text-[18px] bg-blue-50 p-1.5 rounded-lg shrink-0">school</span>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-600 leading-tight">Eligibility Check</span>
                      <span className="text-[10px] text-slate-400 font-extrabold uppercase mt-0.5 tracking-wider">B.Com/B.Com(H), M.Com, BBA/MBA Finance, CA/CMA/CS, ICWA & CFA</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-blue-600 text-[18px] bg-blue-50 p-1.5 rounded-lg shrink-0">workspace_premium</span>
                    <span className="text-xs font-bold text-slate-600 leading-tight">SAP FICO (End User), Advanced Excel, Tally & Core Finance Training</span>
                  </div>
                </div>

                <div className="mt-auto space-y-4">
                  <div className="flex items-center justify-between text-xs py-3 border-t border-slate-50">
                    <div className="flex flex-col">
                      <span className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Batch Starts</span>
                      <span className="text-[#0F172A] font-black text-sm">24th August 2026 (Afternoon)</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-orange-500 font-black italic">
                      <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
                      Limited Seats
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    <button onClick={() => setIsModalOpen(true)} className="w-full bg-[#2563EB] text-white font-black py-4 rounded-lg text-sm transition-all hover:bg-blue-700 active:scale-95 shadow-lg shadow-blue-500/10">
                      Request Callback
                    </button>
                    <Link to="/programs/finance-accounting" className="w-full border border-blue-100 text-[#2563EB] font-black py-3 rounded-lg text-sm text-center hover:bg-blue-50 transition-all">
                      Know More
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Program 2 */}
            <div className="sticky top-32 md:static z-20 group bg-white border border-slate-100 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col relative mt-12 md:mt-0">
              <div className="p-6 pb-0 flex justify-between items-start min-h-[140px] relative">
                <div className="mt-2">
                  <div className="text-[#2563EB] font-black text-xs uppercase tracking-widest mb-1">SV Professionals</div>
                  <div className="text-[#1E40AF] font-black text-lg tracking-tight leading-tight max-w-[150px]">Certified HR Specialist Program</div>
                </div>
                <motion.div
                  style={{ y: y2 }}
                  className="w-32 h-48 absolute -top-12 right-2 z-20 pointer-events-none"
                >
                  <img className="w-full h-full object-contain object-bottom scale-[0.98] transition-transform duration-500 group-hover:scale-[0.86]" src="/images/hr_professional.png" alt="HRM Program Professional" />
                </motion.div>
              </div>

              <div className="px-6 py-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-wider">For fresher + experienced</span>
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-wider">2-3 Months</span>
              </div>

              <div className="px-6 pb-6 flex-1 flex flex-col">
                <div className="space-y-3.5 mb-6 mt-2">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-blue-600 text-[18px] bg-blue-50 p-1.5 rounded-lg shrink-0">business_center</span>
                    <span className="text-xs font-black text-[#0F172A] leading-tight">Internship + HR Generalist Certification</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-blue-600 text-[18px] bg-blue-50 p-1.5 rounded-lg shrink-0">groups</span>
                    <span className="text-xs font-bold text-slate-600 leading-tight">For Freshers & Experienced Candidates</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-blue-600 text-[18px] bg-blue-50 p-1.5 rounded-lg shrink-0">school</span>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-600 leading-tight">Open to All Graduates</span>
                      <span className="text-[10px] text-slate-400 font-extrabold uppercase mt-0.5 tracking-wider">MBA (HR), B.Tech, BBA, B.Sc, B.Com & Others</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-blue-600 text-[18px] bg-blue-50 p-1.5 rounded-lg shrink-0">workspace_premium</span>
                    <span className="text-xs font-bold text-slate-600 leading-tight">Corporate Training & Industry-Recognized Curriculum</span>
                  </div>
                </div>

                <div className="mt-auto space-y-4">
                  <div className="flex items-center justify-between text-xs py-3 border-t border-slate-50">
                    <div className="flex flex-col">
                      <span className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Admission</span>
                      <span className="text-[#0F172A] font-black text-sm">Open Now</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-orange-500 font-black italic">
                      <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
                      Fast Filling
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    <button onClick={() => setIsModalOpen(true)} className="w-full bg-[#2563EB] text-white font-black py-4 rounded-lg text-sm transition-all hover:bg-blue-700 active:scale-95 shadow-lg shadow-blue-500/10">
                      Request Callback
                    </button>
                    <Link to="/programs/hr-training" className="w-full border border-blue-100 text-[#2563EB] font-black py-3 rounded-lg text-sm text-center hover:bg-blue-50 transition-all">
                      Know More
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Program 3 */}
            <div className="sticky top-40 md:static z-30 group bg-white border border-slate-100 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col relative mt-12 md:mt-0">
              <div className="p-6 pb-0 flex justify-between items-start min-h-[140px] relative">
                <div className="mt-2">
                  <div className="text-[#2563EB] font-black text-xs uppercase tracking-widest mb-1">SV Professionals</div>
                  <div className="text-[#1E40AF] font-black text-lg tracking-tight leading-tight max-w-[150px]">Accounting SAP End User Course for experienced</div>
                </div>
                <motion.div
                  style={{ y: y3 }}
                  className="w-32 h-48 absolute -top-12 right-2 z-20 pointer-events-none"
                >
                  <img className="w-full h-full object-contain object-bottom scale-[1.10] origin-bottom transition-transform duration-500 group-hover:scale-[1.35]" src="/images/third_box.png" alt="MRM Program Student" />
                </motion.div>
              </div>

              <div className="px-6 py-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-[10px] font-black uppercase tracking-wider">For experienced with Gap & Domain Switch candidates</span>
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-wider">1 Month</span>
              </div>

              <div className="px-6 pb-6 flex-1 flex flex-col">
                <div className="space-y-3.5 mb-6 mt-2">

                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-blue-600 text-[18px] bg-blue-50 p-1.5 rounded-lg shrink-0">groups</span>
                    <span className="text-xs font-bold text-slate-600 leading-tight">For Accounting Background Graduates with Gaps</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-blue-600 text-[18px] bg-blue-50 p-1.5 rounded-lg shrink-0">school</span>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-600 leading-tight">Eligibility Check</span>
                      <span className="text-[10px] text-slate-400 font-extrabold uppercase mt-0.5 tracking-wider">B.Com/B.Com(Hons), MBA Finance, M.Com, BBA, CA/CMA Inter</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-blue-600 text-[18px] bg-blue-50 p-1.5 rounded-lg shrink-0">workspace_premium</span>
                    <span className="text-xs font-bold text-slate-600 leading-tight">Learn → Practice → Perform 3-Phase Model (AP, AR, P2P, O2C, R2R)</span>
                  </div>
                </div>

                <div className="mt-auto space-y-4">
                  <div className="flex items-center justify-between text-xs py-3 border-t border-slate-50">
                    <div className="flex flex-col">
                      <span className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Admission</span>
                      <span className="text-[#0F172A] font-black text-sm">Open For 2026</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-orange-500 font-black italic">
                      <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
                      Apply Soon
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    <button onClick={() => setIsModalOpen(true)} className="w-full bg-[#2563EB] text-white font-black py-4 rounded-lg text-sm transition-all hover:bg-blue-700 active:scale-95 shadow-lg shadow-blue-500/10">
                      Request Callback
                    </button>
                    <Link to="/programs/sap-accounting" className="w-full border border-blue-100 text-[#2563EB] font-black py-3 rounded-lg text-sm text-center hover:bg-blue-50 transition-all">
                      Know More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="py-12 md:py-16 bg-white border-y border-slate-100">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Authorized & Certified</h2>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:flex md:flex-row items-stretch justify-items-center justify-between md:gap-0">

            {/* MSME */}
            <div className="flex flex-col items-center justify-center flex-1 group">
              <div className="h-14 flex items-center justify-center mb-3">
                <img className="h-11 w-auto object-contain md:grayscale md:opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" src="https://syprosmartautomation.com/logos/msme-logo.png" alt="MSME" />
              </div>
              <span className="text-[9px] font-black uppercase tracking-[0.15em] text-[#64748B]">MSME Certified</span>
            </div>

            <div className="hidden md:block w-[1px] h-10 self-center bg-[#E2E8F0]"></div>

            {/* ISO */}
            <div className="flex flex-col items-center justify-center flex-1 group">
              <div className="h-14 flex items-center justify-center mb-3">
                <img className="h-12 w-auto object-contain md:grayscale md:opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" src="https://isofocus.co.id/wp-content/uploads/2024/03/iso-9001-2015-qms-removebg-preview.png" alt="ISO" />
              </div>
              <span className="text-[9px] font-black uppercase tracking-[0.15em] text-[#64748B]">ISO 9001:2015</span>
            </div>

            <div className="hidden md:block w-[1px] h-10 self-center bg-[#E2E8F0]"></div>

            {/* SAP */}
            <div className="flex flex-col items-center justify-center flex-1 group">
              <div className="h-14 flex items-center justify-center mb-3">
                <img className="h-8 w-auto object-contain md:grayscale md:opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" src="https://companieslogo.com/img/orig/SAP_BIG-323a7da5.png?t=1633439411" alt="SAP" />
              </div>
              <span className="text-[9px] font-black uppercase tracking-[0.15em] text-[#64748B]">SAP Certified Trainers</span>
            </div>

            <div className="hidden md:block w-[1px] h-10 self-center bg-[#E2E8F0]"></div>

            {/* Advanced Excel */}
            <div className="flex flex-col items-center justify-center flex-1 group">
              <div className="h-14 flex items-center justify-center mb-3">
                <img className="h-10 w-auto object-contain md:grayscale md:opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" src="https://www.image2url.com/r2/default/images/1779270684366-17fcdd8f-85ec-4cea-ba9e-8a7bdcf4ec96.png" alt="Microsoft Excel" />
              </div>
              <span className="text-[9px] font-black uppercase tracking-[0.15em] text-[#64748B]">ADV Excel Certified Trainers</span>
            </div>

            <div className="hidden md:block w-[1px] h-10 self-center bg-[#E2E8F0]"></div>

            {/* IAF Certified */}
            <div className="flex flex-col items-center justify-center flex-1 group">
              <div className="h-14 flex items-center justify-center mb-3">
                <img className="h-10 w-auto object-contain md:grayscale md:opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" src="https://www.image2url.com/r2/default/images/1779270916595-dc3c8448-6c68-4988-ba16-58d24c4163b5.png" alt="IAF" />
              </div>
              <span className="text-[9px] font-black uppercase tracking-[0.15em] text-[#64748B]">IAF Certified</span>
            </div>

            <div className="hidden md:block w-[1px] h-10 self-center bg-[#E2E8F0]"></div>

            {/* SV Professionals */}
            <div className="flex flex-col items-center justify-center flex-1 group">
              <div className="h-14 flex items-center justify-center mb-3">
                <img className="h-12 w-auto object-contain md:grayscale md:opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" src="https://www.image2url.com/r2/default/images/1783597984794-9a62736e-df3c-42e3-bb53-9a46914971a0.jpg" alt="SV Professionals" />
              </div>
              <span className="text-[9px] font-black uppercase tracking-[0.15em] text-[#64748B]">SV Professionals</span>
            </div>

          </div>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="py-20 bg-white">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div>
              <h2 className="text-[32px] md:text-[36px] font-black text-[#0F172A] leading-tight mb-8 tracking-tight">Four Steps to Your <span className="text-[#2563EB]">Dream Career</span></h2>

              <div className="relative space-y-6">
                {/* Continuous Vertical Line - Engineered Centering */}
                <div className="absolute left-[15.5px] top-2 bottom-2 w-[1px] bg-[#E5E7EB]"></div>

                {/* Step 1 */}
                <div className="flex gap-5 items-start relative">
                  <div className="w-8 h-8 shrink-0 rounded-[4px] bg-[#2563EB] text-white flex items-center justify-center font-black text-[12px] z-10">01</div>
                  <div>
                    <h4 className="text-[17px] font-black text-[#0F172A] mb-0.5 leading-tight tracking-tight">Enrollment & Assessment</h4>
                    <p className="text-[#64748B] text-[13.5px] leading-[1.5] max-w-sm line-clamp-2">We evaluate your goals and align you with the right specialization program.</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-5 items-start relative">
                  <div className="w-8 h-8 shrink-0 rounded-[4px] bg-[#2563EB] text-white flex items-center justify-center font-black text-[12px] z-10">02</div>
                  <div>
                    <h4 className="text-[17px] font-black text-[#0F172A] mb-0.5 leading-tight tracking-tight">Practical Learn-By-Doing</h4>
                    <p className="text-[#64748B] text-[13.5px] leading-[1.5] max-w-sm line-clamp-2">Intensive skill-building through industry software and expert-led modules.</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-5 items-start relative">
                  <div className="w-8 h-8 shrink-0 rounded-[4px] bg-[#2563EB] text-white flex items-center justify-center font-black text-[12px] z-10">03</div>
                  <div>
                    <h4 className="text-[17px] font-black text-[#0F172A] mb-0.5 leading-tight tracking-tight">Live Capstone Projects</h4>
                    <p className="text-[#64748B] text-[13.5px] leading-[1.5] max-w-sm line-clamp-2">Apply your learning to real-world business scenarios to build your portfolio.</p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex gap-5 items-start relative">
                  <div className="w-8 h-8 shrink-0 rounded-[4px] bg-[#2563EB] text-white flex items-center justify-center font-black text-[12px] z-10">04</div>
                  <div>
                    <h4 className="text-[17px] font-black text-[#0F172A] mb-0.5 leading-tight tracking-tight">Placement & Onboarding</h4>
                    <p className="text-[#64748B] text-[13.5px] leading-[1.5] max-w-sm line-clamp-2">Direct interview opportunities with our hiring network and success workshops.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group p-4 border border-slate-100 rounded-lg bg-slate-50/50">
              <div className="rounded-md overflow-hidden aspect-video relative shadow-xl shadow-blue-900/5 border border-[#E2E8F0] bg-black">
                <iframe 
                  src="https://drive.google.com/file/d/1tPKYaQMFAc1eRLCfXaZlWpzNznOi1QNo/preview" 
                  width="100%" 
                  height="100%" 
                  allow="autoplay"
                  className="absolute inset-0 w-full h-full border-0"
                ></iframe>
              </div>
            </div>

          </div>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.7, ease: "easeOut" }} className="py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Learn from the Best</h2>
            <p className="text-on-surface-variant">Our mentors are industry leaders with decades of combined experience.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-12 sm:gap-8 lg:gap-y-16 mt-8">
            <div className="text-center group">
              <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden mb-4 p-1 bg-white shadow-xl ring-2 ring-primary ring-offset-4 ring-offset-surface-container-low group-group-hover:-translate-y-4 shadow-xl group-hover:shadow-primary/50 transition-transform">
                <motion.img className="w-full h-full object-cover object-top rounded-2xl transition-all duration-500" alt="Sudheer Reddy" src="/images/sudheer_reddy.png" initial={{ scale: 1.1, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} />
              </div>
              <div className="text-[12px] md:text-[13px] font-bold text-on-surface leading-tight px-1">POCHAMPALLY SUDHEER REDDY</div>
              <div className="text-[10px] md:text-[11px] text-primary font-bold uppercase tracking-wider mt-1 leading-tight">FOUNDER & CHAIRMAN</div>
            </div>
            <div className="text-center group">
              <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden mb-4 p-1 bg-white shadow-xl ring-2 ring-outline-variant group-hover:ring-primary transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-[0_20px_40px_-5px_rgba(37,99,235,0.4)]">
                <motion.img className="w-full h-full object-cover object-top rounded-2xl transition-all duration-500" alt="Konda Reddy" src="/images/konda_reddy.png" initial={{ scale: 1.1, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} />
              </div>
              <div className="text-[12px] md:text-[13px] font-bold text-on-surface leading-tight px-1">BOYA KONDA REDDY</div>
              <div className="text-[10px] md:text-[11px] text-slate-500 font-bold uppercase tracking-wider mt-1 leading-tight">CO-FOUNDER & MANAGING DIRECTOR</div>
            </div>
            <div className="text-center group">
              <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden mb-4 p-1 bg-white shadow-xl ring-2 ring-outline-variant group-hover:ring-primary transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-[0_20px_40px_-5px_rgba(37,99,235,0.4)]">
                <motion.img className="w-full h-full object-cover object-top rounded-2xl transition-all duration-500" alt="Praveen Reddy" src="/images/praveen_reddy.png" initial={{ scale: 1.1, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} />
              </div>
              <div className="text-[12px] md:text-[13px] font-bold text-on-surface leading-tight px-1">KANDULA PRAVEEN REDDY</div>
              <div className="text-[10px] md:text-[11px] text-slate-500 font-bold uppercase tracking-wider mt-1 leading-tight">EXECUTIVE DIRECTOR</div>
            </div>
            <div className="text-center group">
              <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden mb-4 p-1 bg-white shadow-xl ring-2 ring-outline-variant group-hover:ring-primary transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-[0_20px_40px_-5px_rgba(37,99,235,0.4)]">
                <motion.img className="w-full h-full object-cover object-top rounded-2xl transition-all duration-500" alt="Ravi Varun Reddy" src="/images/ravi_varun_reddy.png" initial={{ scale: 1.1, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} />
              </div>
              <div className="text-[12px] md:text-[13px] font-bold text-on-surface leading-tight px-1">KOMMERA RAVI VARUN REDDY</div>
              <div className="text-[10px] md:text-[11px] text-slate-500 font-bold uppercase tracking-wider mt-1 leading-tight">DIRECTOR AND CEO</div>
            </div>
            <div className="text-center group">
              <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden mb-4 p-1 bg-white shadow-xl ring-2 ring-outline-variant group-hover:ring-primary transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-[0_20px_40px_-5px_rgba(37,99,235,0.4)]">
                <motion.img className="w-full h-full object-cover object-top rounded-2xl transition-all duration-500" alt="Ali Abid" src="/images/ali_abid.png" initial={{ scale: 1.1, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} />
              </div>
              <div className="text-[12px] md:text-[13px] font-bold text-on-surface leading-tight px-1">MIR MOMIN ALI ABID</div>
              <div className="text-[10px] md:text-[11px] text-slate-500 font-bold uppercase tracking-wider mt-1 leading-tight">CORPORATE SOFT SKILLS TRAINER</div>
              <div className="text-[9px] sm:text-[10px] text-slate-400 font-medium mt-0.5">(HSBC)</div>
            </div>
            <div className="text-center group">
              <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden mb-4 p-1 bg-white shadow-xl ring-2 ring-outline-variant group-hover:ring-primary transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-[0_20px_40px_-5px_rgba(37,99,235,0.4)]">
                <motion.img className="w-full h-full object-cover object-top rounded-2xl transition-all duration-500" alt="Kiran Kumar" src="/images/kiran_kumar.png" initial={{ scale: 1.1, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} />
              </div>
              <div className="text-[12px] md:text-[13px] font-bold text-on-surface leading-tight px-1">DAMERA KIRAN</div>
              <div className="text-[10px] md:text-[11px] text-slate-500 font-bold uppercase tracking-wider mt-1 leading-tight">CORPORATE SOFT SKILLS TRAINER</div>
              <div className="text-[9px] sm:text-[10px] text-slate-400 font-medium mt-0.5">(RAMAKRISHNA MATH)</div>
            </div>
            <div className="text-center group">
              <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden mb-4 p-1 bg-white shadow-xl ring-2 ring-outline-variant group-hover:ring-primary transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-[0_20px_40px_-5px_rgba(37,99,235,0.4)]">
                <motion.img className="w-full h-full object-cover object-top rounded-2xl transition-all duration-500" alt="GEETHIKA" src="/images/geethika.png" initial={{ scale: 1.1, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} />
              </div>
              <div className="text-[12px] md:text-[13px] font-bold text-on-surface leading-tight px-1">GEETHIKA KNADALA</div>
              <div className="text-[10px] md:text-[11px] text-slate-500 font-bold uppercase tracking-wider mt-1 leading-tight">HR EXPERT</div>
            </div>

            {/* VIRAJA */}
            <div className="text-center group">
              <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden mb-4 p-1 bg-white shadow-xl ring-2 ring-outline-variant group-hover:ring-primary transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-[0_20px_40px_-5px_rgba(37,99,235,0.4)]">
                <motion.img className="w-full h-full object-cover object-top rounded-2xl transition-all duration-500 grayscale opacity-80" alt="VIRAJA" src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" initial={{ scale: 1.1, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} />
              </div>
              <div className="font-bold text-on-surface">VIRAJA</div>
              <div className="text-[10px] sm:text-[11px] text-slate-500 font-semibold mt-1 uppercase tracking-wider leading-tight">FINANCE EXPERT</div>
              <div className="text-[9px] sm:text-[10px] text-slate-400 font-medium mt-0.5">(ACCA CERTIFIED)</div>
            </div>

            {/* RAJESH */}
            <div className="text-center group">
              <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden mb-4 p-1 bg-white shadow-xl ring-2 ring-outline-variant group-hover:ring-primary transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-[0_20px_40px_-5px_rgba(37,99,235,0.4)]">
                <motion.img className="w-full h-full object-cover object-top rounded-2xl transition-all duration-500 grayscale opacity-80" alt="RAJESH" src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" initial={{ scale: 1.1, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} />
              </div>
              <div className="font-bold text-on-surface">RAJESH</div>
              <div className="text-[10px] sm:text-[11px] text-slate-500 font-semibold mt-1 uppercase tracking-wider leading-tight">ADVANCED EXCEL EXPERT</div>
              <div className="text-[9px] sm:text-[10px] text-slate-400 font-medium mt-0.5">(IBM)</div>
            </div>

            {/* SAI */}
            <div className="text-center group">
              <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden mb-4 p-1 bg-white shadow-xl ring-2 ring-outline-variant group-hover:ring-primary transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-[0_20px_40px_-5px_rgba(37,99,235,0.4)]">
                <motion.img className="w-full h-full object-cover object-top rounded-2xl transition-all duration-500 grayscale opacity-80" alt="SAI" src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" initial={{ scale: 1.1, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} />
              </div>
              <div className="font-bold text-on-surface">SAI</div>
              <div className="text-[10px] sm:text-[11px] text-slate-500 font-semibold mt-1 uppercase tracking-wider leading-tight">O2C EXPERT</div>
              <div className="text-[9px] sm:text-[10px] text-slate-400 font-medium mt-0.5">(TECH MAHINDRA)</div>
            </div>

            {/* JITHENDER */}
            <div className="text-center group">
              <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden mb-4 p-1 bg-white shadow-xl ring-2 ring-outline-variant group-hover:ring-primary transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-[0_20px_40px_-5px_rgba(37,99,235,0.4)]">
                <motion.img className="w-full h-full object-cover object-top rounded-2xl transition-all duration-500 grayscale opacity-80" alt="JITHENDER" src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" initial={{ scale: 1.1, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} />
              </div>
              <div className="font-bold text-on-surface">JITHENDER</div>
              <div className="text-[10px] sm:text-[11px] text-slate-500 font-semibold mt-1 uppercase tracking-wider leading-tight">R2R EXPERT</div>
              <div className="text-[9px] sm:text-[10px] text-slate-400 font-medium mt-0.5">(GENPACT)</div>
            </div>

            {/* RAJESWARI */}
            <div className="text-center group">
              <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden mb-4 p-1 bg-white shadow-xl ring-2 ring-outline-variant group-hover:ring-primary transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-[0_20px_40px_-5px_rgba(37,99,235,0.4)]">
                <motion.img className="w-full h-full object-cover object-top rounded-2xl transition-all duration-500 grayscale opacity-80" alt="RAJESWARI" src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" initial={{ scale: 1.1, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} />
              </div>
              <div className="font-bold text-on-surface">RAJESWARI</div>
              <div className="text-[10px] sm:text-[11px] text-slate-500 font-semibold mt-1 uppercase tracking-wider leading-tight">HR EXPERT</div>
            </div>

            {/* BHARGAVI */}
            <div className="text-center group col-span-2 sm:col-span-3 lg:col-span-6">
              <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden mb-4 p-1 bg-white shadow-xl ring-2 ring-outline-variant group-hover:ring-primary transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-[0_20px_40px_-5px_rgba(37,99,235,0.4)]">
                <motion.img className="w-full h-full object-cover object-top rounded-2xl transition-all duration-500 grayscale opacity-80" alt="BHARGAVI" src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" initial={{ scale: 1.1, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} />
              </div>
              <div className="font-bold text-on-surface">BHARGAVI</div>
              <div className="text-[10px] sm:text-[11px] text-slate-500 font-semibold mt-1 uppercase tracking-wider leading-tight">AP(BILLING) EXPERT</div>
            </div>
          </div>
        </div>
      </motion.section><motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.7, ease: "easeOut" }} className="py-20 bg-slate-50 overflow-hidden border-y border-slate-100">
        <div className="w-full text-center">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Our Placement Partners</h4>
          <p className="text-sm text-slate-500 font-medium mb-8">50+ companies actively hiring our certified HR professionals</p>

          <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex w-max animate-marquee py-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center gap-24 pr-24">
                  <img className="h-4 md:h-5 w-auto object-contain" src="https://tse1.mm.bing.net/th/id/OIP.x8Ug5pA6_Z5YnY18cn9mXwHaBn?rs=1&pid=ImgDetMain&o=7&rm=3" alt="Deloitte" />
                  <img className="h-6 md:h-8 w-auto object-contain" src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" />
                  <img className="h-8 md:h-10 w-auto object-contain" src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg" alt="Accenture" />
                  <img className="h-10 md:h-12 w-auto object-contain" src="https://latestlogo.com/wp-content/uploads/2024/01/tata-consultancy-services-logo.png" alt="TCS" />
                  <img className="h-5 md:h-7 w-auto object-contain" src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" />
                  <img className="h-8 md:h-10 w-auto object-contain" src="https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg" alt="Infosys" />
                  <img className="h-6 md:h-8 w-auto object-contain" src="https://alexahire.in/wp-content/uploads/2024/05/genpact-logo.jpg" alt="Genpact" />
                  <img className="h-8 md:h-10 w-auto object-contain" src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Capgemini_201x_logo.svg" alt="Capgemini" />
                  <img className="h-8 md:h-10 w-auto object-contain" src="https://upload.wikimedia.org/wikipedia/commons/4/43/Cognizant_logo_2022.svg" alt="Cognizant" />
                  <img className="h-10 md:h-12 w-auto object-contain" src="https://upload.wikimedia.org/wikipedia/commons/a/aa/HSBC_logo_%282018%29.svg" alt="HSBC" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.7, ease: "easeOut" }} className="py-24">
        <div className="max-w-[1140px] mx-auto px-6">
          <h2 className="text-4xl font-black text-center mb-16">Stories of Transformation</h2>

          {/* Prev / Next nav */}
          <div className="flex justify-between items-center mb-4 px-1">
            <button
              onClick={() => setActiveVideoIdx(prev => prev === null ? 0 : (prev - 1 + testimonialVideos.length) % testimonialVideos.length)}
              className="flex items-center gap-1 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors disabled:opacity-30"
              disabled={activeVideoIdx === null}
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span> Prev
            </button>
            {activeVideoIdx !== null && (
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                {activeVideoIdx + 1} / {testimonialVideos.length}
              </span>
            )}
            <button
              onClick={() => setActiveVideoIdx(prev => prev === null ? 0 : (prev + 1) % testimonialVideos.length)}
              className="flex items-center gap-1 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors"
            >
              Next <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>

          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden w-full"
          >
            {testimonialVideos.map((vid, idx) => {
              const isActive = activeVideoIdx === idx;
              const progress = isActive ? ((VIDEO_DURATION_SEC - videoSecondsLeft) / VIDEO_DURATION_SEC) * 100 : 0;
              return (
                <div
                  key={vid.id}
                  className={`rounded-2xl overflow-hidden shadow-lg border w-[300px] shrink-0 snap-center bg-black transition-all duration-300 ${isActive ? 'border-blue-500 shadow-blue-500/30 scale-[1.02]' : 'border-slate-100'
                    }`}
                >
                  <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
                    {isActive ? (
                      /* ── Active: native video player for instant play on first tap ── */
                      <video
                        key={vid.src}
                        ref={(node) => {
                          if (node) {
                            testimonialVideoRefs.current[idx] = node;
                          }
                        }}
                        src={vid.src}
                        className="absolute inset-0 w-full h-full bg-black"
                        controls
                        autoPlay
                        playsInline
                        preload="metadata"
                        title={`Student Testimonial ${idx + 1}`}
                      />
                    ) : (
                      /* ── Inactive: thumbnail + play button ── */
                      <>
                        <video
                          src={`${vid.src}#t=0.001`}
                          className="absolute inset-0 w-full h-full object-cover"
                          preload="metadata"
                          muted
                          playsInline
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                        <div
                          className="absolute inset-0 flex items-center justify-center cursor-pointer group z-10"
                          onClick={() => setActiveVideoIdx(idx)}
                        >
                          <div
                            className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-blue-500/60"
                            style={{ background: 'linear-gradient(135deg, #2563EB, #1d4ed8)' }}
                          >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  {/* Progress bar – only visible on active card */}
                  {isActive && (
                    <div className="h-1 bg-slate-800 w-full">
                      <div
                        className="h-1 bg-blue-500 transition-all duration-1000 ease-linear"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>


      <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.7, ease: "easeOut" }} className="py-24 bg-surface-container-low dark:bg-slate-900 border-y border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-on-surface">Campus &amp; Classroom</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto text-lg leading-relaxed">Experience our state-of-the-art facilities designed for immersive learning and collaborative project building.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Top row original 5 images */}
            <motion.div initial={{ scale: 0.95, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="col-span-2 row-span-2 rounded-3xl overflow-hidden shadow-lg h-full min-h-[300px] md:min-h-[500px]">
              <img className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" src="/images/campus/campus_main.jpg" alt="Main Classroom" />
            </motion.div>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }} className="col-span-2 rounded-3xl overflow-hidden shadow-lg h-auto bg-white flex items-center justify-center p-2">
              <img className="w-full h-auto object-contain rounded-xl hover:scale-105 transition-transform duration-700" src="/images/campus/new_gallery_photo.jpg" alt="Campus facility" />
            </motion.div>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} className="rounded-3xl overflow-hidden shadow-lg h-32 md:h-[242px]">
              <img className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" src="/images/campus/campus_4.jpg" alt="Discussion area" />
            </motion.div>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.9 }} className="rounded-3xl overflow-hidden shadow-lg h-32 md:h-[242px]">
              <img className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" src="/images/campus/campus_3.jpg" alt="Modern learning labs" />
            </motion.div>
            
            {/* The image requested to be fully visible */}
            <motion.div initial={{ scale: 0.95, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 1.0 }} className="col-span-2 md:col-span-4 rounded-3xl overflow-hidden shadow-lg h-64 md:h-[500px] bg-slate-50 dark:bg-slate-800 flex items-center justify-center p-2">
              <img className="max-w-full max-h-full object-contain rounded-2xl shadow-sm hover:scale-[1.02] transition-transform duration-700" src="/images/campus/new_campus_1.jpg" alt="New campus facility 1" />
            </motion.div>
            
            {/* Remaining new images taking half width each */}
            <motion.div initial={{ scale: 0.95, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 1.1 }} className="col-span-1 md:col-span-2 rounded-3xl overflow-hidden shadow-lg h-40 md:h-[300px]">
              <img className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" src="/images/campus/new_campus_2.jpg" alt="New campus facility 2" />
            </motion.div>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 1.2 }} className="col-span-1 md:col-span-2 rounded-3xl overflow-hidden shadow-lg h-40 md:h-[300px]">
              <img className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" src="/images/campus/new_campus_3.jpg" alt="New campus facility 3" />
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.7, ease: "easeOut" }} className="py-24 bg-surface">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-black text-center mb-16">Got Questions?</h2>
          <div className="space-y-4">
            <details className="group bg-surface-container-lowest rounded-xl border border-outline-variant/10 shadow-sm" open="">
              <summary className="list-none p-6 flex justify-between items-center cursor-pointer font-bold text-lg select-none">
                Is placement guaranteed after the course?
                <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <div className="px-6 pb-6 text-on-surface-variant leading-relaxed">
                While we don't use the word "guaranteed" for legal reasons, we have a 99% placement record and over 50+ hiring partners. We provide unlimited interview opportunities until you land a job.
              </div>
            </details>
            <details className="group bg-surface-container-lowest rounded-xl border border-outline-variant/10 shadow-sm">
              <summary className="list-none p-6 flex justify-between items-center cursor-pointer font-bold text-lg select-none">
                What are the eligibility criteria?
                <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <div className="px-6 pb-6 text-on-surface-variant leading-relaxed">
                Any graduate (B.Com, BBA, B.Sc, B.A, etc.) or post-graduate looking to start a career in Finance or HR can apply. Even final year students are eligible.
              </div>
            </details>
            <details className="group bg-surface-container-lowest rounded-xl border border-outline-variant/10 shadow-sm">
              <summary className="list-none p-6 flex justify-between items-center cursor-pointer font-bold text-lg select-none">
                How long are the sessions daily?
                <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <div className="px-6 pb-6 text-on-surface-variant leading-relaxed">
                The programs run for 2 months, with approximately 4-5 hours of intensive practical training daily, including lab sessions.
              </div>
            </details>
            <details className="group bg-surface-container-lowest rounded-xl border border-outline-variant/10 shadow-sm">
              <summary className="list-none p-6 flex justify-between items-center cursor-pointer font-bold text-lg select-none">
                Can I pay the fees in installments?
                <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <div className="px-6 pb-6 text-on-surface-variant leading-relaxed">
                Yes, we offer flexible EMI options and installment plans to make the professional education accessible to everyone.
              </div>
            </details>
          </div>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.7, ease: "easeOut" }} className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8">Start Your Career Transformation Today</h2>
          <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto">Join 6,900+ successful professionals. Book a free career counseling session now.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.button
              onClick={() => setIsModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="bg-white text-primary px-10 py-5 rounded-full font-bold text-xl hover:shadow-2xl transition-all"
            >
              Apply Now
            </motion.button>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-white text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-white/10 transition-all flex items-center justify-center"
            >
              Talk to Counsellor
            </Link>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default Home;
