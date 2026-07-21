import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto prose dark:prose-invert">
            <h1 className="text-5xl font-black mb-12">Privacy Policy</h1>
            <p className="text-lg opacity-70 mb-8 font-medium">Last Updated: April 2026</p>
            
            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
                <p>At SV Professionals, we collect information that you provide directly to us when you register for a course, fill out an inquiry form, or communicate with our career counselors. This may include your name, email address, phone number, academic background, and work experience.</p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
                <p>We use the collected information to:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Provide educational services and career counseling.</li>
                    <li>Process your enrollment and manage your student account.</li>
                    <li>Connect you with potential employers for placement opportunities.</li>
                    <li>Send relevant updates about new batches, seminars, and hiring drives.</li>
                    <li>Improve our website and training programs.</li>
                </ul>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">3. Data Sharing with Employers</h2>
                <p>By enrolling in our placement-assisted programs, you consent to us sharing your professional profile and resume with our verified hiring partners and MNCs for the purpose of job matching and interview scheduling.</p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
                <p>We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is 100% secure.</p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">5. Your Rights</h2>
                <p>You have the right to access, correct, or delete your personal data. If you wish to opt-out of our communication or placement services, please contact us at privacy@svprofessionals.com.</p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">6. Contact Us</h2>
                <p>If you have any questions regarding this Privacy Policy, please reach out to our administration office at Himayatnagar, Hyderabad.</p>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
