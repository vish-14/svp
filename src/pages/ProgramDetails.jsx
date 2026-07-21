import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import BookingModal from '../components/BookingModal';

const programsData = {
  'finance-accounting': {
    id: 'finance-accounting',
    title: "Certified Finance & Accounts Analyst Program",
    heroTitle: "Master Accounting & Finance at Corporate Standards",
    tagline: "\"Exclusively for Accounting & Finance Background Graduates\"",
    subtitle: "Certified Finance & Accounts Analyst Program",
    category: "High Demand Career",
    heroDescription: "Industry-aligned training across Core Accounting(B2B), Core Finance(B2C), SAP FICO, Advanced Excel, Tally & Personality Development - designed to make you job-ready from day one.",
    duration: "2-3 Months",
    salary: "3-15 LPA",
    stats: [
      { label: "Duration", value: "2-3 Months" },
      { label: "Placement Rate", value: "95%" },
      { label: "Average CTC", value: "3-15 LPA" },
      { label: "Hiring Partners", value: "50+" }
    ],
    outcomes: "Roles: AP Analyst, AR Analyst, R2R Specialist, Finance Analyst, IB Associate, SAP FI Consultant, AML/KYC Analyst",
    nextBatch: "06 May 2026",
    slots: "Morning & Evening slots | Weekday",
    seats: "Limited Seats Available",
    eligibility: "B.Com / B.Com (H), M.Com, BBA Finance, MBA Finance, CA / CMA / CS Intermediate, ICWA Candidates, CFA Aspirants. Prior work experience is not mandatory.",
    highlights: [
      { icon: 'verified', label: 'DURATION', val: '2 to 3 Months - Weekday Batches', desc: 'Live sessions + Recorded access' },
      { icon: 'payments', label: 'SALARY OUTCOMES', val: '3-15 LPA', desc: 'Roles: AP Analyst, AR Analyst, R2R, Investment Banking Analyst, Financial Administrator, Investment Planner and more.' },
      { icon: 'handshake', label: 'PLACEMENT SUPPORT', val: 'Dedicated Placement Cell + Resume & Interview Prep', desc: '50+ Corporate Hiring Partners' },
      { icon: 'workspace_premium', label: 'CERTIFICATION', val: 'Industry-Recognised Completion Certificate', desc: 'Recognised by top MNCs & GCCs' },
      { icon: 'computer', label: 'TECHNICAL TOOLS', val: 'SAP FI End-User · Advanced Excel · Tally Prime', desc: 'Hands-on practical sessions' }
    ],
    curriculum: [
      {
        moduleTitle: "Core Accounting",
        icon: "menu_book",
        items: [
          { title: "Accounts Payable (P2P)", desc: "Invoice processing, vendor management, three-way matching, payment runs, aging reports - full Procure-to-Pay cycle." },
          { title: "Accounts Receivable (O2C)", desc: "Customer invoicing, collections, cash application, deductions management - complete Order-to-Cash lifecycle." },
          { title: "Record to Report (R2R)", desc: "Month-end close, journal entries, reconciliations, variance analysis, statutory reporting." },
          { title: "General Ledger & Chart of Accounts", desc: "GL maintenance, intercompany transactions, trial balance, GAAP & Ind AS fundamentals." },
          { title: "Company Accounts", desc: "Preparation of final accounts, holding company accounts, amalgamation, absorption entries." },
          { title: "Company Law Essentials", desc: "Companies Act 2013 - incorporation, MOA, AOA, directors, meetings, statutory compliance fundamentals." }
        ]
      },
      {
        moduleTitle: "Core Finance",
        icon: "trending_up",
        items: [
          { title: "Financial Statement Analysis", desc: "Balance Sheet, P&L, Cash Flow analysis, financial ratios, profitability, liquidity and business performance." },
          { title: "Corporate Finance", desc: "Capital budgeting, WACC, working capital, budgeting, forecasting and financial decision making." },
          { title: "Financial Planning & Analysis (FP&A)", desc: "Budgeting, forecasting, variance analysis, KPI reporting and management dashboards." },
          { title: "Investment & Financial Markets", desc: "Equity, debt, mutual funds, derivatives, money markets and capital markets." },
          { title: "Treasury & Cash Management", desc: "Cash flow forecasting, liquidity management, banking operations and forex fundamentals." },
          { title: "Corporate Finance & Compliance", desc: "Company accounts, M&A basics, financial due diligence and corporate governance." }
        ]
      },
      {
        moduleTitle: "Technical Tools",
        icon: "computer",
        items: [
          { title: "SAP FI End User", desc: "GL, AP, AR, asset accounting, cost centre reporting - hands-on SAP navigation for corporate finance roles." },
          { title: "Advanced Excel", desc: "VLOOKUP, pivot tables, macros, data validation, financial modelling templates, dashboard creation." },
          { title: "Tally Prime", desc: "GST-enabled accounting, payroll, inventory, tax reports, TDS - end-to-end Tally for SME environments." }
        ]
      },
      {
        moduleTitle: "Soft Skills & Career",
        icon: "psychology",
        items: [
          { title: "Personality Development", desc: "Confidence building, business communication, grooming, professional etiquette for corporate environments." },
          { title: "Resume & LinkedIn Mastery", desc: "ATS-optimised resume writing, LinkedIn profile building, personal branding for finance roles." },
          { title: "Interview Skills Training", desc: "Mock interviews, HR + technical rounds, GD practice, industry-specific Q&A preparation." },
          { title: "Job-Ready Capstone", desc: "End-to-end case studies, live project simulations, corporate scenario handling, group assignments." }
        ]
      }
    ],
    trainers: [
      { name: "Sudheer Reddy", role: "IFRS Certified (ACCA)", exp: "15+ Yrs", bio: "IFRS Certified (ACCA) with 15+ years of experience.", image: "/images/sudheer_reddy.png" },
      { name: "Praveen Reddy", role: "SAP Expert", exp: "15+ Yrs", bio: "SAP expert with 15+ years of experience.", image: "/images/praveen_reddy.png" },
      { name: "Konda Reddy", role: "AP(P2P)", exp: "15+ Yrs", bio: "AP(P2P) with 15+ years of experience.", image: "/images/konda_reddy.png" },
      { name: "Ali Abid", role: "Softskills Expert", exp: "15+ Yrs", bio: "Softskills Expert with 15+ years of experience.", image: "/images/ali_abid.png" },
      { name: "Varun Reddy", role: "HR Expert", exp: "10+ Yrs", bio: "HR Expert with 10+ years of experience.", image: "/images/ravi_varun_reddy.png" },
      { name: "Viraja", role: "Expert from IBM & Wells Fargo", exp: "6+ Yrs", bio: "Expert from IBM & Wells Fargo with 6+ years of experience." }
    ],
    faqs: [
      { q: "What are the eligibility criteria for this program?", a: "This program is exclusively for graduates with a background in Accounting or Finance - B.Com, M.Com, BBA (Finance), MBA (Finance), CA/CMA/CS Intermediate candidates, and ICWA aspirants. A strong interest in corporate finance and accounting is essential. Prior work experience is NOT required." },
      { q: "What is the duration of the program?", a: "The program runs for 2 to 3 months. Weekday batches (Mon-Fri) only. All sessions are live instructor-led with recordings available for revision." },
      { q: "What roles can I apply for after completing the training?", a: "After completing this program, you are eligible for roles such as: AP Analyst, AR Analyst, R2R Accountant, General Ledger Accountant, Finance Analyst, Investment Banking Analyst, KYC/AML Analyst, SAP FI Consultant (End User), Accounts Executive, and more - across MNCs, GCCs, and BFSI firms." },
      { q: "Does SV Professionals guarantee placement?", a: "We have a 95% placement record and a dedicated placement cell that actively connects students with our 50+ hiring partners. We provide resume building, LinkedIn optimisation, mock interviews, referral letters, and exclusive job drives. While we cannot legally guarantee placements, our track record speaks for itself." },
      { q: "Is SAP FI certification included?", a: "The program includes SAP FI End User training with hands-on practice on a live SAP system covering GL, AP, AR, and asset accounting modules. You will receive an SV Professionals completion certificate for SAP FI. Official SAP certification exams are separate and optional - we guide you through the process." },
      { q: "What is covered under Personality Development and Interview Skills?", a: "This module covers English communication for corporate environments, business email writing, presentation skills, body language and grooming, mock HR and technical interviews, group discussion (GD) practice, salary negotiation skills, and LinkedIn personal branding. We conduct multiple full-length mock interview rounds before placement drives." },
      { q: "What is the difference between Accounting modules and Finance modules?", a: "Accounting modules (AP, AR, R2R, P2P, O2C) focus on day-to-day transactional and reporting functions essential for BPO/GCC/shared services roles. Finance modules (Investment Banking, Financial Markets, M&A, AML/KYC) target analyst and advisory roles in banks, NBFCs, and financial services firms. You get training in BOTH - making you versatile across the industry." },
      { q: "Can I join if I am a working professional?", a: "Absolutely. We offer flexible batch timings designed for working professionals who want to upskill and transition into higher-paying finance roles. All sessions are recorded so you never miss a class." },
      { q: "Is the training online or offline?", a: "We offer both modes. Classroom training is available at our Hyderabad centre with hands-on tool access. Online live sessions are available for outstation students with the same curriculum, assignments, and placement support." }
    ],
    testimonials: [
      { name: "Aishwarya Kulkarni", role: "R2R Analyst, Genpact · B.Com Graduate", text: "The R2R and SAP FI modules were exceptional. I landed an Accountant role at Genpact within 3 weeks of completing the program. The mock interviews were extremely helpful - they asked almost the same questions!", stars: 5 },
      { name: "Rohan Verma", role: "Equity Analyst, Motilal Oswal · M.Com", text: "I had zero finance knowledge when I joined after my M.Com. The Investment Banking module opened a completely new world for me. I now work as a Junior Equity Analyst. Worth every rupee!", stars: 5 },
      { name: "Sneha Mukherjee", role: "KYC Analyst, HSBC · MBA Finance", text: "The AML & KYC training helped me crack a compliance role at HSBC in my first attempt. The trainers were real bankers - they knew exactly what interviewers look for. Amazing placement support!", stars: 5 },
      { name: "Deepak Pillai", role: "Finance Executive, TCS BPO · BBA Finance", text: "The Advanced Excel and Tally Prime modules saved me in technical rounds. I was placed at TCS within 6 weeks. The personality development sessions completely changed how I carry myself in interviews.", stars: 5 },
      { name: "Pooja Joshi", role: "AR Analyst, WNS Global · B.Com (H)", text: "After 2 years of struggling with my B.Com degree, SV Professionals gave me clarity and confidence. The AP & AR training with real case studies made me industry-ready in just 6 months. Placed at WNS!", stars: 5 },
      { name: "Kiran Tiwari", role: "M&A Analyst, Deloitte USI · CA Inter", text: "The M&A and financial instruments curriculum is top-tier. It's what Big 4 firms actually want candidates to know. The trainers brought real deal experience from their careers. Highly recommend!", stars: 5 }
    ],
    cta: {
      title: "Start Your Corporate Finance Career Today",
      desc: "Limited seats per batch. Applications are reviewed on a rolling basis. Take the first step toward a 3-15 LPA career in Accounting & Finance.",
      btn1: "Book Free Counselling Session",
      btn2: "Check Upcoming Batches"
    }
  },
  'hr-training': {
    id: 'hr-training',
    title: "Certified HR Specialist Program",
    heroTitle: "Launch Your HR Career with Real-World Expertise",
    tagline: "\"Learn from practitioners. Work on real cases. Get placed with confidence.\"",
    subtitle: "Launch Your HR Career with Real-World Expertise",
    category: "Corporate Professional",
    heroDescription: "Comprehensive, hands-on HR training built for working professionals - from talent acquisition to compliance, with live projects and job-ready skills.",
    duration: "2-3 Months",
    salary: "3-8 LPA",
    stats: [
      { label: "Duration", value: "2-3 Months" },
      { label: "Avg Salary Potential", value: "3-8 LPA" },
      { label: "Students Placed", value: "200+" },
      { label: "Hiring Partners", value: "50+" }
    ],
    outcomes: "Roles: HR Executive, Payroll Specialist, Talent Acquisition, HR Generalist, Statutory Compliance Analyst",
    nextBatch: "Rolling Admissions",
    slots: "Weekday Batches",
    seats: "Limited Seats Available",
    eligibility: "Open to ALL Graduates - Any Stream, Any Background (Arts, Commerce, Science, Engineering, BBA, MBA, BCom). Everyone is welcome.",
    highlights: [
      { icon: 'schedule', label: 'DURATION', val: '2-3 Months', desc: 'Intensive weekday batches. Flexible timings designed for working professionals and fresh graduates alike.' },
      { icon: 'payments', label: 'SALARY OUTCOMES', val: '3 LPA - 8 LPA', desc: 'Our alumni are placed across top MNCs and startups with competitive HR packages. Freshers to experienced professionals - we get you the right package.' },
      { icon: 'handshake', label: 'PLACEMENT SUPPORT', val: '100% Assisted', desc: 'Dedicated placement cell, mock interviews, resume crafting, LinkedIn optimization, and direct referrals to 50+ partner companies.' },
      { icon: 'clinical_notes', label: 'TRAINING STYLE', val: 'Live Projects', desc: 'Real-time HR case studies, role plays, and live assignments - not just theory. Work on actual HR scenarios from day one.' },
      { icon: 'workspace_premium', label: 'CERTIFICATION', val: 'Industry Certified', desc: 'Receive a recognized certification from SV Professionals upon completion, validating your expertise for employers.' },
      { icon: 'group', label: 'BATCH SIZE', val: 'Small Batches', desc: 'Limited seats per batch to ensure personalized mentoring, individual attention, and a quality learning environment for every student.' }
    ],
    curriculum: [
      {
        moduleTitle: "HR Core Operations",
        icon: "engineering",
        items: [
          { title: "Talent Acquisition & Recruitment", desc: "End-to-end recruitment lifecycle, sourcing strategies, JD writing, screening & selection with live project." },
          { title: "Onboarding & Induction", desc: "Complete joining formalities, induction planning, employee handbook design, and onboarding standard workflows." },
          { title: "HR Case Studies & Role Play", desc: "Practical real-time HR scenarios, group role plays, and conflict resolution simulations from actual corporate cases." }
        ]
      },
      {
        moduleTitle: "Payroll & Compliance",
        icon: "gavel",
        items: [
          { title: "Payroll Management - End to End", desc: "CTC structuring, salary breakup, payslip generation, gratuity computation, and payroll software handling." },
          { title: "HR Policies & Compliance", desc: "Leave policy, standing orders, Shops & Establishment Act compliance, and corporate calendar design." },
          { title: "Labour Laws & Statutory Overview", desc: "Detailed corporate legal workflows for Provident Fund (PF), Employee State Insurance (ESI), and TDS deductions." },
          { title: "Grievance Redressal & POSH Act", desc: "Employee grievance handling, ICC formation guidelines, inquiry procedures, case files, and POSH compliance." }
        ]
      },
      {
        moduleTitle: "Technical & Data Skills",
        icon: "computer",
        items: [
          { title: "Advanced Excel for HR", desc: "VLOOKUP, pivot tables, HR MIS reports, attrition dashboards, payroll sheets, and workforce analytics." }
        ]
      },
      {
        moduleTitle: "Soft Skills & Career Readiness",
        icon: "psychology",
        items: [
          { title: "Personality Development", desc: "Confidence building, leadership mindset, emotional intelligence, and corporate culture alignment." },
          { title: "Business Communication & Etiquette", desc: "Corporate email writing standards, business reporting, professional verbal interactions, and body language." },
          { title: "Interview Skills & Job Readiness", desc: "Mock HR interviews, ATS-optimised resume building, LinkedIn personal branding, and job application strategies." },
          { title: "Offboarding & Full Settlement", desc: "Resignation workflows, exit interviews, and complete Full & Final (F&F) settlement procedures." }
        ]
      }
    ],
    trainers: [
      { name: "Sunita K.", role: "Senior HR Consultant", exp: "18 Yrs", bio: "Expert in Talent Acquisition, HR Policy, and Compliance. 18 years of corporate consulting and training experience." },
      { name: "Ravi Prakash", role: "Payroll & Labour Law Expert", exp: "15 Yrs", bio: "Specialist in Payroll, Statutory, Labour Laws and statutory compliance (PF, ESI, TDS)." },
      { name: "Archana M.", role: "HR Generalist Specialist", exp: "12 Yrs", bio: "Expert in Onboarding, Employee Grievance, and HR Operations workflow management." },
      { name: "Vijay N.", role: "Soft Skills & Interview Coach", exp: "10 Yrs", bio: "Personality development expert specializing in public speaking, corporate training, and leadership prep." }
    ],
    faqs: [
      { q: "Can I join if I'm from a non-HR background?", a: "Absolutely. Our program is designed for ALL graduates - BCom, BA, BSc, B.Tech, BBA, MBA - regardless of your previous field. We start from fundamentals and build you up to job-ready level." },
      { q: "What is the total course fee?", a: "Course fees are competitive and vary by batch and mode (online/offline). We also offer EMI options and early bird discounts. Contact our admissions team for the current fee structure." },
      { q: "Is this program available online or offline?", a: "We offer both classroom training (Hyderabad) and live online classes. Online students also get access to recorded sessions, live doubt-clearing calls, and the same placement support as classroom students." },
      { q: "What kind of placement support is provided?", a: "Our dedicated placement team provides resume building, LinkedIn optimization, mock interviews, company referrals, interview scheduling, and ongoing follow-up until you are placed. We work with 50+ active hiring partners." },
      { q: "What certificate will I receive upon completion?", a: "You will receive an industry-recognized certificate from SV Professionals, acknowledged by our placement partners. It validates your expertise in core HR functions including payroll, recruitment, compliance, and HR operations." },
      { q: "How is this program different from other HR courses?", a: "Unlike theory-heavy programs, every module at SV Professionals includes live projects, real-time case studies, and role plays. Our trainers are working HR professionals, not just academics. Our 2-3 month intensive format is built to make you job-ready fast." },
      { q: "Is Advanced Excel knowledge required before joining?", a: "No prior Excel knowledge is required. Our Advanced Excel for HR module starts from scratch and takes you through all the functions an HR professional needs - payroll sheets, MIS reports, attrition trackers, and dashboards." },
      { q: "What batch timings are available?", a: "We offer morning and evening weekday batches to accommodate working professionals, college students, and job seekers. Batch timings are confirmed at the time of enrollment based on your preference." }
    ],
    testimonials: [
      { name: "Priya Sharma", role: "HR Executive, Infosys BPM · BSc Graduate", text: "I was from a science background with no HR knowledge. After SV Professionals training, I got placed as an HR Executive at a leading IT firm within 2 months. The payroll and recruitment modules were incredibly detailed and practical.", stars: 5 },
      { name: "Ramesh D.", role: "HR Generalist, Capgemini · BCom Graduate", text: "The POSH Act and compliance sessions were eye-opening. Got a 40% salary hike after this certification. Highly recommend for anyone wanting to shift to HR.", stars: 5 },
      { name: "Kavitha R.", role: "Talent Acquisition Specialist, Deloitte · BA Graduate", text: "The Advanced Excel for HR and MIS reporting module helped me stand out in interviews. The mock interview sessions and resume guidance were spot-on. I was placed before my batch even completed!", stars: 5 }
    ],
    cta: {
      title: "Ready to Build Your HR Career?",
      desc: "Join the next batch at SV Professionals and transform your career with India's most practical HR training program. Seats are limited - enroll today.",
      btn1: "Book Free Counselling Session",
      btn2: "Check Upcoming Batches"
    }
  },
  'sap-accounting': {
    id: 'sap-accounting',
    title: "Accounting SAP End User Course for experienced",
    heroTitle: "Struggling to Return to Your Core Accounting Career? We Guide You Back.",
    tagline: "\"🏆 Industry-Aligned · Job-Oriented · MNC-Ready\"",
    subtitle: "For experienced with Gap & Domain Switch candidates",
    category: "Corporate Excellence",
    heroDescription: "Are you a B.Com, MBA (Finance) or accounting graduate working in a different domain? SV Professionals transforms your profile with real-time experience, SAP training & placement support - so you can walk into an MNC with confidence.",
    duration: "1 Month",
    salary: "4-15 LPA",
    stats: [
      { label: "Duration", value: "1 Month" },
      { label: "Avg Salary Outcome", value: "4-15 LPA" },
      { label: "Placement Rate", value: "100%" },
      { label: "Students Placed", value: "500+" }
    ],
    outcomes: "Roles: Accounts Payable (AP) Analyst, Accounts Receivable (AR) Analyst, General Ledger (GL) Analyst, Fixed Assets Specialist, Inter-Company Accountant",
    nextBatch: "Rolling Admissions",
    slots: "Intensive weekday batches",
    seats: "Limited",
    eligibility: "Open to B.Com / B.Com (Hons), MBA - Finance, M.Com, BBA - Finance, CA Inter / CMA Inter, or any Accounting Background Graduate.",
    eligibilityTags: [
      "B.Com / B.Com (Hons)",
      "MBA - Finance",
      "M.Com",
      "BBA - Finance",
      "CA Inter / CMA Inter",
      "Any Accounting Background"
    ],
    methodology: {
      label: "Learning Approach",
      title: "Learn → Practice → Perform",
      desc: "Our three-phase model ensures you don't just learn theory - you simulate real corporate workflows before you even attend your first interview.",
      steps: [
        { num: "01", icon: "menu_book", title: "Learn", desc: "Conceptual training by industry practitioners covering AP, AR, P2P, O2C, R2R, Fixed Assets, Inter-Company Accounting, and SAP Fi end-user navigation - aligned to current MNC workflows." },
        { num: "02", icon: "settings", title: "Practice", desc: "Hands-on simulations in SAP, Advanced Excel, and Tally. Real business transaction scenarios mirroring what top companies use - you practise on live-like systems, not slides." },
        { num: "03", icon: "rocket_launch", title: "Perform", desc: "Mock interviews, technical rounds, resume workshops, and placement drives. By the time you sit for an interview, you've already \"done the job\" in our simulated environment." }
      ]
    },
    highlights: [
      { icon: 'schedule', label: 'PROGRAM DURATION', val: '1 Month', desc: 'Intensive weekday batches designed for working professionals and fresh graduates.' },
      { icon: 'payments', label: 'SALARY OUTCOMES', val: '4-15 LPA', desc: 'Entry to mid-level MNC placements across top global GCCs and shared services.' },
      { icon: 'handshake', label: 'PLACEMENT SUPPORT', val: '100% Assisted', desc: 'Resume crafting, mock interviews, LinkedIn profile design, and direct recruitment drives.' }
    ],
    curriculum: [
      {
        moduleTitle: "Module 01: Procure-to-Pay (P2P)",
        icon: "payments",
        items: [
          { title: "Vendor Management", desc: "Sourcing, registration, compliance, and maintaining vendor databases." },
          { title: "Invoice Processing", desc: "Three-way matching, verification, posting, and sorting invoices." },
          { title: "TDS & GST", desc: "Computing Tax Deducted at Source (TDS) and Goods and Services Tax (GST) allocations." },
          { title: "Payment Reconciliation", desc: "Reconciling bank accounts and credit cards to ensure accurate transactions." }
        ]
      },
      {
        moduleTitle: "Module 02: Order-to-Cash (O2C)",
        icon: "shopping_cart",
        items: [
          { title: "Customer Master", desc: "Setting up customer files, establishing credit limits, and updating contact details." },
          { title: "Billing & Invoicing", desc: "Generating and sending customer invoices promptly and accurately." },
          { title: "Cash Application", desc: "Recording received payments against specific accounts receivable entries." },
          { title: "Credit & Disputes", desc: "Evaluating customer creditworthiness and resolving billing discrepancies." }
        ]
      },
      {
        moduleTitle: "Module 03: Record-to-Report (R2R)",
        icon: "description",
        items: [
          { title: "Journal Entries", desc: "Recording business financial transactions in general ledger accounts." },
          { title: "GL Accounting", desc: "Reviewing and managing account balances, and organizing accounts." },
          { title: "Month-End Close", desc: "Balancing ledger sheets and prepping documentation at each period end." },
          { title: "Financial Reports", desc: "Producing balance sheets, profit & loss, and cash flow reports." }
        ]
      },
      {
        moduleTitle: "Module 04: Fixed Assets Management",
        icon: "account_balance",
        items: [
          { title: "Capitalisation", desc: "Determining criteria and recording acquired assets on the balance sheet." },
          { title: "Depreciation", desc: "Calculating asset depreciation over its useful lifespan." },
          { title: "Asset Register", desc: "Maintaining an up-to-date log of physical assets, locations, and values." },
          { title: "Disposal & Transfer", desc: "Recording asset sales, retirements, or internal division transfers." }
        ]
      },
      {
        moduleTitle: "Module 05: Inter-Company Accounting",
        icon: "sync_alt",
        items: [
          { title: "IC Transactions", desc: "Processing cross-entity trades, service fees, or loans." },
          { title: "Elimination Entries", desc: "Removing duplicate internal sales/costs on group consolidation." },
          { title: "Cross-Company Posting", desc: "Posting dual-sided accounts in different subsidiary ledgers." },
          { title: "Reconciliation", desc: "Regularly matching cross-entity balances to ensure a net zero balance." }
        ]
      },
      {
        moduleTitle: "Module 06: SAP Fi End-User Training",
        icon: "computer",
        items: [
          { title: "SAP Navigation", desc: "Using general ledger, accounts payable, and accounts receivable in SAP ERP." },
          { title: "AP / AR / R2R in SAP", desc: "Posting vendor invoices, customer bills, and close entries directly in SAP." },
          { title: "FA Module", desc: "Managing capital assets, depreciations, and fixed asset reports in SAP." },
          { title: "Corporate Simulations", desc: "Hands-on real-world transaction scenarios in a simulated corporate environment." }
        ]
      },
      {
        moduleTitle: "Technical Tools You'll Master",
        icon: "build",
        items: [
          { title: "SAP Fi", desc: "End-User Level navigation and transaction posting in SAP ERP." },
          { title: "Advanced Excel", desc: "Mastering pivot tables, VLOOKUP, and business MIS reporting templates." },
          { title: "Tally Prime", desc: "Configuring GST, managing payroll, and handling tax compliance." },
          { title: "Interview Prep", desc: "Preparing with mock HR + technical rounds and soft skills training." }
        ]
      }
    ],
    trainers: [
      { name: "Ramesh Kumar", role: "P2P & O2C Specialist", exp: "12+ Yrs", bio: "Former Accounts Payable Lead at a Fortune 500 Shared Services Centre. Expert in SAP AP/AR modules and GST compliance." },
      { name: "Priya Sharma", role: "R2R & GL Expert", exp: "10+ Yrs", bio: "Senior Financial Analyst with Big 4 outsourcing experience. Specialises in month-end close, financial reporting, and inter-company reconciliations." },
      { name: "Vijay Naidu", role: "SAP Fi Consultant", exp: "8+ Yrs", bio: "Certified SAP Fi consultant with implementation and training experience across multiple MNC rollouts." }
    ],
    faqs: [
      { q: "Who is this program designed for?", a: "This program is exclusively for graduates with an Accounting & Finance background - B.Com, M.Com, MBA (Finance), BBA (Finance), CA Inter, CMA Inter, or equivalent." },
      { q: "Do I need prior SAP experience?", a: "Absolutely not. We start SAP training from scratch. Our end-user level SAP Fi training is designed for beginners and progressively moves into real-time corporate simulations." },
      { q: "What does \"100% Placement Support\" mean exactly?", a: "It means we stay with you until you're placed. This includes profile building, resume crafting, interview preparation (technical + HR), and direct connections to our hiring partners." },
      { q: "Is this suitable if I have a career gap?", a: "Yes - in fact, most of our students come with career gaps ranging from 1 to 5 years. Our program specifically addresses how to position your gap positively and present a credible, job-ready profile." },
      { q: "What salary can I expect after the program?", a: "Depending on your experience, location, and the company, our graduates typically secure roles in the ₹3.5-8 LPA range. Entry-level roles start around ₹3.5-5 LPA." },
      { q: "What are the batch timings?", a: "We offer flexible batch timings including weekday morning and evening batches, so working professionals can enroll without disrupting other commitments." },
      { q: "Will I get a certificate after completion?", a: "Yes. Upon successful completion of the program, you will receive an industry-recognised course completion certificate from SV Professionals." },
      { q: "How is this different from online YouTube tutorials?", a: "We offer live, interactive sessions with industry practitioners, access to real SAP systems for hands-on practice, personalised feedback, mock interviews, and an active placement network." }
    ],
    testimonials: [
      { name: "Anusha Patel", role: "AP Analyst, Genpact · Hyderabad", text: "I had a 3-year gap after my B.Com and was working in retail. SV Professionals gave me the SAP training and confidence I needed. I'm now an AP Analyst at Genpact earning ₹5.8 LPA.", stars: 5 },
      { name: "Suresh Kumar", role: "GL Analyst, Wipro BPS · Bangalore", text: "After my MBA Finance, I got stuck in sales. The R2R module and mock interview coaching at SV Professionals made all the difference. Got placed in Wipro BPS within 3 weeks.", stars: 5 },
      { name: "Meena Reddy", role: "O2C Associate, Accenture · Hyderabad", text: "The hands-on SAP simulations were exactly what interviewers asked about. I walked in knowing the system. Placed as an O2C Associate at Accenture - I couldn't be happier.", stars: 5 }
    ],
    cta: {
      title: "Your Accounting Career Restart Begins Today",
      desc: "Join 500+ accounting graduates who found their path back to core finance roles through SV Professionals.",
      btn1: "Get Callback",
      btn2: "Talk to Admissions"
    }
  }
};

const ProgramDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const program = programsData[id] || programsData['finance-accounting'];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [selectedCurrTab, setSelectedCurrTab] = useState('Core Accounting');
  const curriculumContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openModules, setOpenModules] = useState([0]);

  const toggleModule = (index) => {
    if (openModules.includes(index)) {
      setOpenModules(openModules.filter(item => item !== index));
    } else {
      setOpenModules([...openModules, index]);
    }
  };

  const { scrollYProgress } = useScroll({
    target: curriculumContainerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const outcomesData = {
    'finance-accounting': {
      points: [
        { title: "Dedicated Placement Cell", desc: "Personalised job referrals, walk-in drives, direct recruiter introductions.", icon: "verified_user" },
        { title: "Resume & Profile Building", desc: "ATS-optimised resumes and LinkedIn coaching by HR professionals.", icon: "description" },
        { title: "50+ Hiring Partners", desc: "Pre-placement talks, exclusive job listings, priority referrals to partner companies.", icon: "handshake" },
        { title: "Industry Certificate", desc: "Recognised certification boosting your profile on job portals and LinkedIn.", icon: "workspace_premium" },
        { title: "Alumni Network Access", desc: "Lifetime access to SV Professionals alumni community for referrals and mentorship.", icon: "group" }
      ],
      salaryTitle: "4-15 LPA",
      salaries: [
        { role: "AP / AR Analyst", pay: "₹3-4.5 LPA" },
        { role: "R2R / GL Accountant", pay: "₹3.5-5.5 LPA" },
        { role: "Finance Analyst", pay: "₹4-6 LPA" },
        { role: "IB / Research Associate", pay: "₹5-9 LPA" },
        { role: "SAP FI Consultant (Entry)", pay: "₹4-7 LPA" },
        { role: "AML / KYC Analyst", pay: "₹3.5-5 LPA" }
      ]
    },
    'hr-training': {
      points: [
        { title: "Placement Support", desc: "Dedicated placement cell, mock interviews, and recruiter connections.", icon: "verified_user" },
        { title: "Resume & LinkedIn Prep", desc: "LinkedIn optimization, resume formatting for HR ATS filters.", icon: "description" },
        { title: "50+ Hiring Partners", desc: "Exclusive tie-ups with MNCs and startups looking for HR specialists.", icon: "handshake" },
        { title: "Industry Certification", desc: "Standardized certification valid across major corporate hubs.", icon: "workspace_premium" },
        { title: "Mock HR Rounds", desc: "Live role-playing and mock panel rounds with senior HR directors.", icon: "groups" }
      ],
      salaryTitle: "3-8 LPA",
      salaries: [
        { role: "HR Executive", pay: "₹3.5-5 LPA" },
        { role: "Payroll Specialist", pay: "₹4-6 LPA" },
        { role: "Talent Acquisition", pay: "₹4-6.5 LPA" },
        { role: "HR Generalist", pay: "₹4.5-8 LPA" }
      ]
    },
    'sap-accounting': {
      stats: [
        { num: "500+", label: "Students Placed" },
        { num: "₹6.2L", label: "Avg. Salary Achieved" },
        { num: "85+", label: "Hiring Companies" },
        { num: "30", label: "Days Avg. to Placement" }
      ],
      companies: [
        "Accenture", "Infosys BPM", "Wipro BPS", "Genpact", "EXL Service", "Capgemini", "Deloitte SSC", "TCS BPS", "HCL BPS", "Mphasis", "WNS Global", "ITC Infotech", "Conduent", "& many more →"
      ]
    }
  };

  const hrTestimonialVideos = [
    { id: 1, driveId: "1qiDY58QL0n_N665gcNFA1LqS2O9WHle_", src: "https://drive.google.com/file/d/1qiDY58QL0n_N665gcNFA1LqS2O9WHle_/preview" },
    { id: 2, driveId: "198pnMsjAs81r3HXuBeUSi8159yat1MZb", src: "https://drive.google.com/file/d/198pnMsjAs81r3HXuBeUSi8159yat1MZb/preview" },
    { id: 3, driveId: "1g0wwRASoNUZ8JtMoeE15a6Sq5C-3Up7a", src: "https://drive.google.com/file/d/1g0wwRASoNUZ8JtMoeE15a6Sq5C-3Up7a/preview" },
    { id: 4, driveId: "1iKtTXGtVnqd4kmR_tvMa2JDjd0mKz-HJ", src: "https://drive.google.com/file/d/1iKtTXGtVnqd4kmR_tvMa2JDjd0mKz-HJ/preview" },
    { id: 5, driveId: "1Hj-FMZeNka7l4DFB_Hg29iZk4EgG5dsJ", src: "https://drive.google.com/file/d/1Hj-FMZeNka7l4DFB_Hg29iZk4EgG5dsJ/preview" },
    { id: 6, driveId: "1Gh9_W3tNN-wtfXjxwtrQwxNMNiIIJXsI", src: "https://drive.google.com/file/d/1Gh9_W3tNN-wtfXjxwtrQwxNMNiIIJXsI/preview" },
    { id: 7, driveId: "1vxzK9mbCIB5YO-OkyH6MXI5BiIQRcH17", src: "https://drive.google.com/file/d/1vxzK9mbCIB5YO-OkyH6MXI5BiIQRcH17/preview" },
    { id: 8, driveId: "1jAmCwTmAcEXDElHwajyFRPBk7AtwEyb2", src: "https://drive.google.com/file/d/1jAmCwTmAcEXDElHwajyFRPBk7AtwEyb2/preview" },
    { id: 9, driveId: "1XNOszq70HbtpFQ9EijPUL3R0hVrmMNHv", src: "https://drive.google.com/file/d/1XNOszq70HbtpFQ9EijPUL3R0hVrmMNHv/preview" }
  ];

  const financeTestimonialVideos = [
    { id: 1, driveId: "1Pp0zrmB1CrddHRSadZ7Mt7UlxKZn0uvv", src: "https://drive.google.com/file/d/1Pp0zrmB1CrddHRSadZ7Mt7UlxKZn0uvv/preview" },
    { id: 2, driveId: "16KlTtu69eWM4e0voQ7WBdN9KZ178P4pI", src: "https://drive.google.com/file/d/16KlTtu69eWM4e0voQ7WBdN9KZ178P4pI/preview" },
    { id: 3, driveId: "1QCPKS3P6CUjQ2SVQLpS4b66lm_RN_opU", src: "https://drive.google.com/file/d/1QCPKS3P6CUjQ2SVQLpS4b66lm_RN_opU/preview" },
    { id: 4, driveId: "14rPVyu75UMLyXkxYg3O4JpnlmAoA7wuG", src: "https://drive.google.com/file/d/14rPVyu75UMLyXkxYg3O4JpnlmAoA7wuG/preview" },
    { id: 5, driveId: "1NjuN_vs8HFjamb3fygQLbSM0ofImpj39", src: "https://drive.google.com/file/d/1NjuN_vs8HFjamb3fygQLbSM0ofImpj39/preview" },
    { id: 6, driveId: "1RBiiXs4RLJwNZS-Ibygbn5IiSajYWSoN", src: "https://drive.google.com/file/d/1RBiiXs4RLJwNZS-Ibygbn5IiSajYWSoN/preview" },
    { id: 7, driveId: "1lGRn2jYkRFFgIeVaJBV4ZNtJD_CC8NSE", src: "https://drive.google.com/file/d/1lGRn2jYkRFFgIeVaJBV4ZNtJD_CC8NSE/preview" },
    { id: 8, driveId: "1Jt_KzhDmg4AMKt6BGfU9gnk2Z_uaNSxZ", src: "https://drive.google.com/file/d/1Jt_KzhDmg4AMKt6BGfU9gnk2Z_uaNSxZ/preview" },
    { id: 9, driveId: "13cdey_GhV6xi4ceb69bPsBNOkprF7tm2", src: "https://drive.google.com/file/d/13cdey_GhV6xi4ceb69bPsBNOkprF7tm2/preview" },
    { id: 10, driveId: "125L3qEDIsfuDFBSrljIE9DBqPZGbdxmF", src: "https://drive.google.com/file/d/125L3qEDIsfuDFBSrljIE9DBqPZGbdxmF/preview" },
    { id: 11, driveId: "16bR32Dq4JTYnW-rvkBqn9mMEB46yLNQX", src: "https://drive.google.com/file/d/16bR32Dq4JTYnW-rvkBqn9mMEB46yLNQX/preview" },
    { id: 12, driveId: "1Igvd8p0qzDBt3ElSPJBkcNpeHj4Nl3NO", src: "https://drive.google.com/file/d/1Igvd8p0qzDBt3ElSPJBkcNpeHj4Nl3NO/preview" },
    { id: 13, driveId: "1MIvPESQxb2Jm_qvChVrBAn2XItY39iqi", src: "https://drive.google.com/file/d/1MIvPESQxb2Jm_qvChVrBAn2XItY39iqi/preview" },
    { id: 14, driveId: "11kF2psEGlRmHtV8kF5MCo-JCvsNr16tZ", src: "https://drive.google.com/file/d/11kF2psEGlRmHtV8kF5MCo-JCvsNr16tZ/preview" },
    { id: 15, driveId: "1-slHHlo6BBSJG1cznUKUfIhZqaQIByt8", src: "https://drive.google.com/file/d/1-slHHlo6BBSJG1cznUKUfIhZqaQIByt8/preview" },
    { id: 16, driveId: "1NUKDYlW1z9zs5zL_vYV2M6LmBN7_Hvx4", src: "https://drive.google.com/file/d/1NUKDYlW1z9zs5zL_vYV2M6LmBN7_Hvx4/preview" },
    { id: 17, driveId: "1h6fedMtVRzvoz0nOx0QTEi9bkvedZkco", src: "https://drive.google.com/file/d/1h6fedMtVRzvoz0nOx0QTEi9bkvedZkco/preview" },
    { id: 18, driveId: "1Tv5szOmDz0novov7VYMVwGArKZXYF2W1", src: "https://drive.google.com/file/d/1Tv5szOmDz0novov7VYMVwGArKZXYF2W1/preview" },
    { id: 19, driveId: "1a7hLL6568fN4OVVxd4pao9qEd4Jd3uir", src: "https://drive.google.com/file/d/1a7hLL6568fN4OVVxd4pao9qEd4Jd3uir/preview" }
  ];

  const activeOutcomes = outcomesData[program.id] || outcomesData['finance-accounting'];
  const isLightHighlights = true;

  // Technical tools helper for SAP accounting layout
  const technicalModule = (program.curriculum || []).find(c => c.moduleTitle && c.moduleTitle.toLowerCase().includes('technical')) || { items: [] };
  const technicalTools = technicalModule.items || [];

  const [activeVideoIdx, setActiveVideoIdx] = useState(null);
  const carouselRef = useRef(null);
  const [videoSecondsLeft, setVideoSecondsLeft] = useState(0);
  const VIDEO_DURATION_SEC = 5 * 60; // 5 minutes per video before auto-advance

  const currentVideos = program.id === 'hr-training' ? hrTestimonialVideos : (program.id === 'finance-accounting' ? financeTestimonialVideos : null);

  useEffect(() => {
    if (activeVideoIdx === null || !currentVideos) return;
    const container = carouselRef.current;
    const el = container?.children[activeVideoIdx];
    if (container && el) {
      const containerRect = container.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const scrollLeft = container.scrollLeft + (elRect.left - containerRect.left) - (containerRect.width - elRect.width) / 2;
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
    
    setVideoSecondsLeft(VIDEO_DURATION_SEC);
    const tick = setInterval(() => {
      setVideoSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(tick);
          setActiveVideoIdx(cur => (cur + 1) % currentVideos.length);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(tick);
  }, [activeVideoIdx, currentVideos]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (isFormSubmitted) {
      const timer = setTimeout(() => setIsFormSubmitted(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isFormSubmitted]);

  if (!program) return null;

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen selection:bg-blue-100 selection:text-blue-900">
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} defaultProgram={program.title} />
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-16 md:pb-24 overflow-hidden bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-[1140px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr,0.8fr] gap-16 items-center">
            
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-black tracking-[0.2em] text-[#2563EB] uppercase bg-blue-100/50 dark:bg-blue-900/20 rounded-full">
                {program.category}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.15]">
                {program.heroTitle || program.title}
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl font-medium mb-4">
                {program.heroDescription}
              </p>
              {program.tagline && (
                <p className="text-base text-slate-400 dark:text-slate-500 italic mb-8 font-medium">
                  {program.tagline}
                </p>
              )}
              {program.id === 'hr-training' && (
                <div className="text-sm text-slate-600 dark:text-slate-300 font-semibold mb-6">
                  12 Core HR Modules · Practical Training · Personality Development · Technical Skills
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-slate-200 dark:border-slate-800">
                {program.stats ? (
                  program.stats.map((s, idx) => (
                    <div key={idx} className="flex flex-col justify-between h-full space-y-1">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-tight min-h-[32px] flex items-end">
                        {s.label}
                      </p>
                      <p className="text-xl font-black text-[#2563EB] leading-none">
                        {s.value}
                      </p>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="space-y-1">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">Duration</p>
                      <p className="text-xl font-bold text-slate-900 dark:text-white">{program.duration}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">Salary Potential</p>
                      <p className="text-xl font-bold text-slate-900 dark:text-white">{program.salary}</p>
                    </div>
                    <div className="space-y-1 hidden md:block">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">Next Batch</p>
                      <p className="text-xl font-bold text-slate-900 dark:text-white">{program.nextBatch}</p>
                    </div>
                  </>
                )}
              </div>

              <div className="flex flex-wrap gap-4 mt-10">
                <motion.button 
                  onClick={() => setIsModalOpen(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto bg-[#2563eb] text-white px-8 py-4 rounded-lg font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 transition-all"
                >
                  Book a free demo <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </motion.button>
                <button className="w-full sm:w-auto justify-center bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 px-8 py-4 rounded-lg font-black text-sm hover:bg-slate-50 transition-all flex items-center gap-2">
                  <span className="material-symbols-outlined">download</span> Download Brochure
                </button>
              </div>
              {program.id === 'hr-training' && (
                <div className="mt-6 max-w-[720px]">
                  <div className="rounded-2xl bg-white border border-blue-100 p-5">
                    <p className="font-semibold text-slate-900">Open to ALL Graduates — Any Stream, Any Background</p>
                    <p className="text-sm text-slate-600 mt-1">Arts · Commerce · Science · Engineering · BBA · MBA · BCom — Everyone is welcome</p>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Lead Capture Form */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] border border-slate-100 dark:border-slate-800">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Book Free Consultation</h3>
              <p className="text-slate-500 text-sm mb-8 font-medium">Talk to our experts about fee structure and batch timings.</p>
              
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsFormSubmitted(true); }}>
                {isFormSubmitted ? (
                  <div className="text-center py-6">
                     <motion.div 
                         initial={{ scale: 0 }} 
                         animate={{ scale: 1 }} 
                         transition={{ type: "spring", bounce: 0.6, duration: 0.8 }}
                         className="w-24 h-24 mx-auto mb-4 relative"
                     >
                         <div className="absolute inset-0 bg-green-400/20 rounded-full blur-2xl animate-pulse"></div>
                         <div className="w-full h-full bg-gradient-to-tr from-green-400 to-green-300 rounded-full shadow-[0_0_40px_rgba(74,222,128,0.4)] border-4 border-white dark:border-slate-800 flex items-center justify-center relative z-10">
                             <span className="material-symbols-outlined text-white text-5xl font-black">check</span>
                         </div>
                     </motion.div>
                     <motion.h3 
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: 0.2 }}
                         className="text-xl font-black text-slate-900 dark:text-white mb-2"
                     >
                         Booking Confirmed!
                     </motion.h3>
                     <motion.p 
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: 0.3 }}
                         className="text-slate-500 text-sm font-medium mb-6"
                     >
                         Expect a call from our admission team soon.
                     </motion.p>
                  </div>
                ) : (
                  <>
                <input required className="w-full px-5 py-3.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium" placeholder="Full Name" type="text" />
                <input required className="w-full px-5 py-3.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium" placeholder="Phone Number" type="tel" />
                <input required className="w-full px-5 py-3.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium" placeholder="Email Address" type="email" />
                <select className="w-full px-5 py-3.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium appearance-none cursor-pointer">
                  <option>Morning Session (9AM - 1PM)</option>
                  <option>Evening Session (6PM - 9PM)</option>
                </select>
                <motion.button 
                  type="submit" 
                  whileHover={{ scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }} 
                  className="w-full bg-[#2563eb] text-white py-4 rounded-lg font-bold text-base mt-2 shadow-lg shadow-blue-900/20 transition-all flex justify-center items-center gap-2"
                >
                  Submit Application <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </motion.button>
                </>
                )}
              </form>
            </motion.div>

          </div>
        </div>
        <div className="absolute top-0 right-0 w-[50%] h-full bg-blue-500/5 -skew-x-12 translate-x-32 -z-10"></div>
      </section>

      {/* Who Can Join - placed right below hero and above highlights */}
      {(program.id === 'finance-accounting' || program.id === 'sap-accounting') && (
        <section className="py-12 bg-slate-50 dark:bg-slate-900">
          <div className="max-w-[1140px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div className="md:col-span-3">
                <span className="text-xs font-black uppercase tracking-[0.25em] text-[#2563EB] mb-4 block">Eligibility Check</span>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Who Can Join?</h3>
                <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-blue-100 dark:border-slate-800">
                  <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                    {program.eligibility}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Program Highlights (inserted below hero) */}
      {!isLightHighlights && (
        <section className="py-20 bg-[#071226] text-white">
          <div className="max-w-[1140px] mx-auto px-6">
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-black text-amber-200 mb-2">Program Highlights</h2>
              <p className="text-slate-300 max-w-2xl mx-auto">Key program features at a glance</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {program.highlights && program.highlights.map((h, i) => (
                <div key={i} className="relative p-8 rounded-2xl bg-[#0e2737]/80 border border-slate-800 shadow-sm overflow-hidden">
                  <div className="absolute left-6 top-0 w-24 h-1 bg-amber-400 rounded-full -translate-y-2"></div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#071226] rounded-lg flex items-center justify-center text-amber-300 shadow-inner">
                      <span className="material-symbols-outlined">{h.icon || 'verified'}</span>
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-300 mb-2">{h.label}</p>
                      <h4 className="text-2xl font-black text-white mb-2">{h.val}</h4>
                      <p className="text-slate-300 text-sm">{h.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {isLightHighlights && (
        <section className="py-24 bg-white dark:bg-slate-950">
          <div className="max-w-[1140px] mx-auto px-6">
            <div className="mb-16 text-center">
              <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Program Highlights</h3>
              <p className="text-slate-600 max-w-2xl mx-auto mt-3">Key program features at a glance</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {program.highlights.map((h, i) => (
                <div key={i} className="p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between">
                  <div>
                    <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-8 text-[#2563EB] group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-3xl">{h.icon}</span>
                    </div>
                    
                    {/* Small uppercase label */}
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2563EB] mb-2 block">
                      {h.label || h.title}
                    </span>
                    
                    {/* Big bold text value */}
                    {h.val && (
                      <h4 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-3 tracking-tight leading-tight">
                        {h.val}
                      </h4>
                    )}
                  </div>
                  
                  {/* Description paragraph */}
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium text-sm mt-3">
                    {h.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sample Certificate Section (Light Theme) */}
      {isLightHighlights && ['finance-accounting', 'hr-training', 'sap-accounting'].includes(program.id) && (
        <section className="py-24 bg-white dark:bg-slate-950">
          <div className="max-w-[1140px] mx-auto px-6">
            <div className="mb-12 text-center">
              <span className="text-xs font-black uppercase tracking-[0.25em] text-[#2563EB] mb-4 block">Certification</span>
              <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Sample Certificate</h3>
              <p className="text-slate-600 max-w-2xl mx-auto mt-3">Receive an industry-recognized certificate upon successful completion of the program.</p>
            </div>
            <div className="max-w-4xl mx-auto flex justify-center">
              <div className="p-4 md:p-6 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-2xl">
                <img 
                  src={
                    program.id === 'finance-accounting' ? "/images/finance_certificate.jpg" : 
                    program.id === 'hr-training' ? "/images/hr_certificate.jpg" : 
                    "/images/sap_certificate.jpg"
                  }
                  alt={`${program.title} Sample Certificate`}
                  className="w-full h-auto rounded-xl shadow-sm"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Trainers - for finance-accounting, show after Career Outcomes */}
      {program.id === 'finance-accounting' && (
        <section className="py-24">
          <div className="max-w-[1140px] mx-auto px-6">
            <div className="mb-16 text-center">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Our Expert Trainers</h2>
              <p className="text-slate-500 font-medium max-w-xl mx-auto text-lg leading-relaxed">15+ years of corporate HR experience. Real practitioners, not just teachers.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              {program.trainers.map((t, i) => (
                <div key={i} className="w-full md:w-[calc(33.333%-1.35rem)] min-w-[280px] max-w-[360px] group p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 text-center hover:-translate-y-2 transition-all">
                  {t.image ? (
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-6 border-[3px] border-blue-50 group-hover:border-[#2563EB] transition-colors bg-white shadow-sm">
                      <img src={t.image} alt={t.name} className="w-full h-full object-cover object-top rounded-full bg-slate-50" />
                    </div>
                  ) : (
                    <div className="w-24 h-24 mx-auto rounded-full bg-blue-50 flex items-center justify-center font-black text-4xl text-blue-600 mb-6 group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-[44px]">person</span>
                    </div>
                  )}
                  <h4 className="text-xl font-black text-slate-900 dark:text-white mb-1">{t.name}</h4>
                  <p className="text-blue-600 text-xs font-black uppercase tracking-[0.2em] mb-4">{t.role}</p>
                  <div className="h-[1px] w-12 bg-slate-200 dark:bg-slate-800 mx-auto mb-4"></div>
                  <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-4">Experience: {t.exp}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{t.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Who Can Join - moved below hero (replaces eligibilityTags banner) */}
      {(program.id !== 'finance-accounting' && program.id !== 'sap-accounting') && (
        <section className="py-12 bg-slate-50 dark:bg-slate-900">
          <div className="max-w-[1140px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div className="md:col-span-3">
                <span className="text-xs font-black uppercase tracking-[0.25em] text-[#2563EB] mb-4 block">Eligibility Check</span>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Who Can Join?</h3>
                <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-blue-100 dark:border-slate-800">
                  <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                    {program.eligibility}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Program Highlights */}
      {!isLightHighlights && (
        <section className="py-24">
          <div className="max-w-[1140px] mx-auto px-6">
            <div className="mb-16 text-center">
              <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Program Highlights</h3>
              <p className="text-slate-600 max-w-2xl mx-auto mt-3">Key program features at a glance</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {program.highlights.map((h, i) => (
                <div key={i} className="p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between">
                  <div>
                    <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-8 text-[#2563EB] group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-3xl">{h.icon}</span>
                    </div>
                    
                    {/* Small uppercase label */}
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2563EB] mb-2 block">
                      {h.label || h.title}
                    </span>
                    
                    {/* Big bold text value */}
                    {h.val && (
                      <h4 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-3 tracking-tight leading-tight">
                        {h.val}
                      </h4>
                    )}
                  </div>
                  
                  {/* Description paragraph */}
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium text-sm mt-3">
                    {h.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sample Certificate Section (Dark Theme) */}
      {!isLightHighlights && ['finance-accounting', 'hr-training', 'sap-accounting'].includes(program.id) && (
        <section className="py-24 bg-white dark:bg-slate-950">
          <div className="max-w-[1140px] mx-auto px-6">
            <div className="mb-12 text-center">
              <span className="text-xs font-black uppercase tracking-[0.25em] text-[#2563EB] mb-4 block">Certification</span>
              <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Sample Certificate</h3>
              <p className="text-slate-600 max-w-2xl mx-auto mt-3">Receive an industry-recognized certificate upon successful completion of the program.</p>
            </div>
            <div className="max-w-4xl mx-auto flex justify-center">
              <div className="p-4 md:p-6 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-2xl">
                <img 
                  src={
                    program.id === 'finance-accounting' ? "/images/finance_certificate.jpg" : 
                    program.id === 'hr-training' ? "/images/hr_certificate.jpg" : 
                    "/images/sap_certificate.jpg"
                  }
                  alt={`${program.title} Sample Certificate`}
                  className="w-full h-auto rounded-xl shadow-sm"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Methodology / Learning Approach Section */}
      {program.methodology && (
        <section className="py-24 bg-slate-50 dark:bg-slate-900/10 border-y border-slate-100 dark:border-slate-800">
          <div className="max-w-[1140px] mx-auto px-6">
            <div className="mb-16 text-center lg:text-left">
              <span className="text-xs font-black uppercase tracking-[0.25em] text-[#2563EB] mb-4 block">
                {program.methodology.label}
              </span>
              <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                {program.methodology.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl text-base leading-relaxed">
                {program.methodology.desc}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {program.methodology.steps.map((step, idx) => (
                <div key={idx} className="group p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all relative overflow-hidden flex flex-col justify-between min-h-[300px]">
                  <div className="absolute top-4 right-6 text-7xl font-black text-slate-100 dark:text-slate-950/20 select-none group-hover:scale-110 transition-transform">
                    {step.num}
                  </div>
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-8 text-[#2563EB]">
                      <span className="material-symbols-outlined text-3xl">{step.icon}</span>
                    </div>
                    <h4 className="text-xl font-black text-slate-900 dark:text-white mb-4">{step.title}</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Finance - Comprehensive Curriculum Section (tabs + cards) */}
      {program.id === 'finance-accounting' && (
        <section className="py-24 bg-slate-50 text-slate-900">
          <div className="max-w-[1140px] mx-auto px-6">
            <div className="mb-8">
              <span className="text-xs font-black uppercase tracking-[0.25em] text-[#2563EB] mb-4 block">WHAT YOU'LL LEARN</span>
              <h3 className="text-4xl md:text-5xl font-black text-slate-900">Comprehensive Curriculum Across 6 Core Domains</h3>
              <p className="text-slate-600 max-w-2xl mt-4">All modules are built to corporate standards, directly mapped to real job roles in leading MNCs, GCCs, and financial institutions.</p>
            </div>

            <div className="flex flex-wrap gap-4 items-center mt-6">
              {['Core Accounting','Core Finance','Technical Tools','Soft Skills & Career'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedCurrTab(tab)}
                  className={`px-4 py-2 rounded-md border ${selectedCurrTab === tab ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200'} font-semibold transition`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {(() => {
                const key = selectedCurrTab.toLowerCase();
                const module = (program.curriculum || []).find(m => m.moduleTitle && m.moduleTitle.toLowerCase() === key) || (program.curriculum || [])[0];
                const items = (module && module.items) || [];
                return items.map((it, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 text-[#2563EB]">
                      <span className="material-symbols-outlined">{module.icon || 'menu_book'}</span>
                    </div>
                    <h4 className="text-lg font-black text-slate-900 mb-2">{it.title}</h4>
                    <p className="text-sm text-slate-600">{it.desc}</p>
                  </div>
                ));
              })()}
            </div>
          </div>
        </section>
      )}

      {/* Eligibility & Curriculum Section (hidden on finance-accounting; kept for other programs) */}
      {program.id !== 'finance-accounting' && (program.id === 'sap-accounting' ? (
        <section className="py-24 bg-slate-50 text-slate-900">
          <div className="max-w-[1140px] mx-auto px-6">
            <div className="mb-8">
              <span className="text-xs font-black uppercase tracking-[0.25em] text-[#2563EB] mb-4 block">Core Modules</span>
              <h3 className="text-4xl font-black text-slate-900">6 Pillars of Corporate Accounting</h3>
              <p className="text-slate-600 max-w-2xl mt-4">Every module maps directly to job descriptions in Shared Service Centres, MNCs, and Big 4 outsourcing arms.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {program.curriculum.slice(0,6).map((module, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <div className="text-xs font-black uppercase tracking-[0.2em] text-[#2563EB] mb-3">Module {String(idx+1).padStart(2,'0')}</div>
                  <h4 className="text-lg font-black text-slate-900 mb-2">{module.moduleTitle}</h4>
                  <p className="text-sm text-slate-600 mb-4">{module.items && module.items[0] && module.items[0].desc ? module.items[0].desc : ''}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {module.items.map((it, j) => (
                      <span key={j} className="text-xs bg-blue-50 border border-blue-100 text-[#2563EB] rounded px-3 py-1 font-semibold">{it.title}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <div className="text-xs font-black uppercase tracking-[0.25em] text-[#2563EB] mb-4">Technical Tools You'll Master</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {technicalTools.map((tool, tIdx) => {
                  const isLast = tIdx === technicalTools.length - 1 && technicalTools.length % 3 !== 0;
                  return (
                    <div
                      key={tIdx}
                      className={`p-6 rounded-xl bg-white border border-slate-200 text-center ${isLast ? 'md:col-start-2' : ''}`}
                    >
                      <div className="text-sm font-black text-slate-900 mb-1">{tool.title}</div>
                      <div className="text-xs text-slate-600">{tool.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      ) : program.id === 'hr-training' ? (
        <section className="py-20 bg-slate-50 text-slate-900">
          <div className="max-w-[1140px] mx-auto px-6">
            <div className="mb-10 text-center">
              <h3 className="text-4xl font-black text-slate-900">Complete Curriculum</h3>
              <p className="text-slate-600 max-w-2xl mx-auto mt-3">12 Core HR Modules · Practical Training · Personality Development · Technical Skills</p>
            </div>

            

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {program.curriculum.flatMap(m => m.items.map(it => ({ ...it, icon: m.icon }))).slice(0,9).map((it, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-white border border-slate-100 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-md flex items-center justify-center text-[#2563EB]">
                      <span className="material-symbols-outlined">{it.icon || 'menu_book'}</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-slate-900 mb-2">{it.title}</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">{it.desc}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {it.title.split(/\s+/).slice(0,2).map((t,i)=>(
                          <span key={i} className="text-[11px] bg-blue-50 text-[#2563EB] px-3 py-1 rounded-full border border-blue-100">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="py-24 bg-slate-50 dark:bg-slate-900/50 relative overflow-visible">
          <div className="max-w-[1140px] mx-auto px-6">
            <div className="grid grid-cols-1 gap-16 items-start relative overflow-visible">

                {/* Right Column: Dynamic Collapsible Curriculum Modules */}
                <div className="w-full flex flex-col items-center lg:items-start text-center lg:text-left">
                  <span className="text-xs font-black uppercase tracking-[0.25em] text-[#2563EB] mb-4 block">Level-By-Level Syllabus</span>
                  <h4 className="text-4xl font-black text-slate-900 dark:text-white mb-10">Complete Curriculum</h4>
                  <div className="w-full space-y-4 text-left">
                    {program.curriculum.map((module, modIdx) => {
                      const isOpen = openModules.includes(modIdx);
                      return (
                        <div 
                          key={modIdx} 
                          className="border border-slate-100 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 overflow-hidden shadow-sm transition-all hover:border-blue-200"
                        >
                          {/* Module Accordion Header */}
                          <button 
                            onClick={() => toggleModule(modIdx)}
                            className="w-full px-8 py-6 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all text-left outline-none"
                          >
                            <div className="flex items-center gap-4">
                              <span className="material-symbols-outlined text-[#2563EB] text-2xl">
                                {module.icon || 'menu_book'}
                              </span>
                              <h5 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                                {module.moduleTitle}
                              </h5>
                              <span className="px-3 py-1 rounded-full bg-blue-100/50 dark:bg-blue-900/30 text-[#2563EB] text-[10px] font-black uppercase tracking-wider">
                                {module.items.length} Modules
                              </span>
                            </div>
                            <span className={`material-symbols-outlined text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#2563EB]' : ''}`}>
                              expand_more
                            </span>
                          </button>

                          {/* Module Collapsible Body */}
                          <div className={`transition-all duration-300 ${isOpen ? 'max-h-[2000px] border-t border-slate-100 dark:border-slate-800 p-8 space-y-4' : 'max-h-0 overflow-hidden'}`}>
                            {module.items.map((item, itemIdx) => (
                              <div key={itemIdx} className="group p-6 rounded-xl bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100/50 dark:border-slate-800/50 hover:border-blue-100 transition-all flex items-start gap-6">
                                <span className="text-2xl font-black text-blue-200 dark:text-blue-900/60 group-hover:text-blue-500 transition-colors shrink-0">
                                  {itemIdx + 1 < 10 ? `0${itemIdx + 1}` : itemIdx + 1}
                                </span>
                                <div>
                                  <h6 className="text-base font-black text-slate-900 dark:text-white mb-1.5 leading-snug">
                                    {item.title}
                                  </h6>
                                  <p className="text-slate-500 dark:text-slate-400 text-xs font-medium leading-relaxed">
                                    {item.desc}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

            </div>
          </div>
        </section>
      ))}

      {/* Trainers - render before Career Outcomes for non-finance programs */}
      {program.id !== 'finance-accounting' && (
        <section className="py-24">
          <div className="max-w-[1140px] mx-auto px-6">
            <div className="mb-16 text-center">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Our Expert Trainers</h2>
              <p className="text-slate-500 font-medium max-w-xl mx-auto text-lg leading-relaxed">15+ years of corporate HR experience. Real practitioners, not just teachers.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              {program.trainers.map((t, i) => (
                <div key={i} className="w-full md:w-[calc(33.333%-1.35rem)] min-w-[280px] max-w-[360px] group p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 text-center hover:-translate-y-2 transition-all">
                  <div className="w-24 h-24 mx-auto rounded-full bg-blue-100 flex items-center justify-center font-black text-3xl text-blue-600 mb-6 group-hover:bg-[#2563EB] group-hover:text-white transition-colors uppercase">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h4 className="text-xl font-black text-slate-900 dark:text-white mb-1">{t.name}</h4>
                  <p className="text-blue-600 text-xs font-black uppercase tracking-[0.2em] mb-4">{t.role}</p>
                  <div className="h-[1px] w-12 bg-slate-200 dark:bg-slate-800 mx-auto mb-4"></div>
                  <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-4">Experience: {t.exp}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{t.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      

      {/* Partners Marquee */}
      {program.id !== 'sap-accounting' && (
        <motion.section 
          initial={{ opacity: 0, y: 40 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, amount: 0.1 }} 
          transition={{ duration: 0.7, ease: "easeOut" }} 
          className="py-20 bg-slate-50 dark:bg-slate-900/20 overflow-hidden border-y border-slate-100 dark:border-slate-800"
        >
          <div className="w-full text-center">
            <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-2">Our Placement Partners</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-8">50+ companies actively hiring our certified HR professionals</p>
            
            <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="flex w-max animate-marquee py-4">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-center gap-24 pr-24">
                    {program.id === 'hr-training' ? (
                      <>
                        <img className="h-6 md:h-8 w-auto object-contain dark:brightness-125" src="https://alexahire.in/wp-content/uploads/2024/05/genpact-logo.jpg" alt="Genpact" />
                        <div className="flex items-center gap-2">
                          <img className="h-6 md:h-8 w-auto object-contain dark:brightness-125" src="https://logo.clearbit.com/cortiva.com" alt="Cortiva" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'block'; }} />
                          <span className="hidden text-xl font-bold text-slate-500 whitespace-nowrap">Cortiva</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <img className="h-6 md:h-8 w-auto object-contain dark:brightness-125" src="https://logo.clearbit.com/movate.com" alt="Movate" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'block'; }} />
                          <span className="hidden text-xl font-bold text-slate-500 whitespace-nowrap">Movate</span>
                        </div>
                        <img className="h-4 md:h-5 w-auto object-contain dark:brightness-125" src="https://tse1.mm.bing.net/th/id/OIP.x8Ug5pA6_Z5YnY18cn9mXwHaBn?rs=1&pid=ImgDetMain&o=7&rm=3" alt="Deloitte" />
                        <div className="flex items-center gap-2">
                          <img className="h-6 md:h-8 w-auto object-contain dark:brightness-125" src="https://logo.clearbit.com/oremuscorp.com" alt="Oremus" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'block'; }} />
                          <span className="hidden text-xl font-bold text-slate-500 whitespace-nowrap">Oremus</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <img className="h-6 md:h-8 w-auto object-contain dark:brightness-125" src="https://logo.clearbit.com/shaktihormann.com" alt="Shakti Harmann" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'block'; }} />
                          <span className="hidden text-xl font-bold text-slate-500 whitespace-nowrap">Shakti Harmann</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <img className="h-6 md:h-8 w-auto object-contain dark:brightness-125" src="https://logo.clearbit.com/cielhr.com" alt="Ciel HR" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'block'; }} />
                          <span className="hidden text-xl font-bold text-slate-500 whitespace-nowrap">Ciel HR</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <img className="h-6 md:h-8 w-auto object-contain dark:brightness-125" src="https://logo.clearbit.com/cogenteservices.com" alt="Cogent Data" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'block'; }} />
                          <span className="hidden text-xl font-bold text-slate-500 whitespace-nowrap">Cogent Data</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <img className="h-4 md:h-5 w-auto object-contain dark:brightness-125" src="https://tse1.mm.bing.net/th/id/OIP.x8Ug5pA6_Z5YnY18cn9mXwHaBn?rs=1&pid=ImgDetMain&o=7&rm=3" alt="Deloitte" />
                        <img className="h-6 md:h-8 w-auto object-contain dark:brightness-125" src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" />
                        <img className="h-8 md:h-10 w-auto object-contain dark:brightness-125" src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg" alt="Accenture" />
                        <img className="h-10 md:h-12 w-auto object-contain dark:brightness-125" src="https://latestlogo.com/wp-content/uploads/2024/01/tata-consultancy-services-logo.png" alt="TCS" />
                        <img className="h-5 md:h-7 w-auto object-contain dark:brightness-125" src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" />
                        <img className="h-8 md:h-10 w-auto object-contain dark:brightness-125" src="https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg" alt="Infosys" />
                        <img className="h-6 md:h-8 w-auto object-contain dark:brightness-125" src="https://alexahire.in/wp-content/uploads/2024/05/genpact-logo.jpg" alt="Genpact" />
                        <img className="h-8 md:h-10 w-auto object-contain dark:brightness-125" src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Capgemini_201x_logo.svg" alt="Capgemini" />
                        <img className="h-8 md:h-10 w-auto object-contain dark:brightness-125" src="https://upload.wikimedia.org/wikipedia/commons/4/43/Cognizant_logo_2022.svg" alt="Cognizant" />
                        <img className="h-10 md:h-12 w-auto object-contain dark:brightness-125" src="https://upload.wikimedia.org/wikipedia/commons/a/aa/HSBC_logo_%282018%29.svg" alt="HSBC" />
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {currentVideos && (
        <section className="py-24">
          <div className="max-w-[1140px] mx-auto px-6">
            <h2 className="text-4xl font-black text-center mb-16">Stories of Transformation</h2>
            
            <div className="flex justify-between items-center mb-4 px-1">
              <button
                onClick={() => setActiveVideoIdx(prev => prev === null ? 0 : (prev - 1 + currentVideos.length) % currentVideos.length)}
                className="flex items-center gap-1 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors disabled:opacity-30"
                disabled={activeVideoIdx === null}
              >
                <span className="material-symbols-outlined text-[18px]">chevron_left</span> Prev
              </button>
              {activeVideoIdx !== null && (
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                  {activeVideoIdx + 1} / {currentVideos.length}
                </span>
              )}
              <button
                onClick={() => setActiveVideoIdx(prev => prev === null ? 0 : (prev + 1) % currentVideos.length)}
                className="flex items-center gap-1 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors"
              >
                Next <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>

            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden w-full"
            >
              {currentVideos.map((vid, idx) => {
                const isActive = activeVideoIdx === idx;
                const progress = isActive ? ((VIDEO_DURATION_SEC - videoSecondsLeft) / VIDEO_DURATION_SEC) * 100 : 0;
                return (
                  <div
                    key={vid.id}
                    className={`rounded-2xl overflow-hidden shadow-lg border w-[300px] shrink-0 snap-center bg-black transition-all duration-300 ${isActive ? 'border-blue-500 shadow-blue-500/30 scale-[1.02]' : 'border-slate-100'}`}
                  >
                    <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
                      {isActive ? (
                        <iframe
                          src={`${vid.src}?autoplay=1`}
                          className="absolute inset-0 w-full h-full bg-black"
                          allow="autoplay"
                          title={`Student Testimonial ${idx + 1}`}
                        />
                      ) : (
                        <>
                          <img
                            src={`https://drive.google.com/thumbnail?id=${vid.driveId}&sz=w400`}
                            alt={`Student testimonial ${idx + 1}`}
                            className="absolute inset-0 w-full h-full object-cover"
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
        </section>
      )}

      {/* Student Success Stories */}
      <section className="py-24">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Student Success Stories</h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto text-lg leading-relaxed">Real outcomes from our graduates now working in top MNCs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {program.testimonials.map((t, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all h-full flex flex-col">
                <div className="flex gap-1 mb-6">
                  {[...Array(t.stars)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-yellow-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed italic mb-8 flex-1 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-slate-50 dark:border-slate-800">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center font-black text-blue-600 text-xs">
                    {t.name[0]}
                  </div>
                  <div>
                    <h5 className="font-black text-slate-900 dark:text-white text-sm">{t.name}</h5>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-12 text-center">Program FAQs</h2>
          <div className="space-y-4">
            {program.faqs.map((f, i) => (
              <details key={i} className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <summary className="list-none p-6 flex justify-between items-center cursor-pointer font-black text-lg text-slate-900 dark:text-white select-none">
                  {f.q}
                  <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                </summary>
                <div className="px-6 pb-6 text-slate-500 font-medium leading-relaxed">
                  {f.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-6">
        <div className="max-w-[980px] mx-auto px-4">
          <div className="bg-gradient-to-r from-[#2563EB] to-[#1E40AF] rounded-3xl p-6 md:p-10 text-center relative overflow-hidden shadow-2xl ring-1 ring-white/10">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-3 tracking-tight">
                {program.cta?.title || `Ready to Master ${program.title}?`}
              </h2>
              <p className="text-white/90 text-base md:text-lg font-medium mb-6 max-w-2xl mx-auto">
                {program.cta?.desc || "Take the first step toward a global career. Limited seats for upcoming batch."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-white text-[#1E40AF] px-8 md:px-10 py-3 md:py-4 rounded-full font-extrabold text-sm md:text-base hover:shadow-xl transform transition duration-200 w-full sm:w-auto"
                >
                  {program.cta?.btn1 || "Book Free Counselling Session"}
                </button>
                <button 
                  onClick={() => navigate('/contact')} 
                  className="bg-white/10 text-white border border-white/25 px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold text-sm md:text-base hover:bg-white/20 backdrop-blur-sm transition w-full sm:w-auto"
                >
                  {"Contact us"}
                </button>
              </div>
            </div>
            {/* Visual Accents */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="w-full h-full opacity-10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stopColor="#60a5fa" /><stop offset="1" stopColor="#1e3a8a" /></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)" /></svg>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ProgramDetails;
