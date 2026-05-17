import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function LegalPage({ title = "Legal Information" }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from('.legal-content', { y: 20, opacity: 0, duration: 1, ease: 'power2.out', delay: 0.2 });
  }, { scope: containerRef, dependencies: [title] });

  return (
    <div ref={containerRef} className="min-h-screen bg-[#030303] text-gray-300 pt-32 pb-20 px-6 font-sans">
      <div className="max-w-3xl mx-auto legal-content">
        <h1 className="text-4xl md:text-5xl font-light text-white mb-4">{title}</h1>
        <p className="text-sm text-gray-500 tracking-wider uppercase mb-12 border-b border-white/10 pb-6">Last Updated: October 2026</p>
        
        <div className="space-y-8 font-light leading-relaxed">
          <section>
            <h2 className="text-xl text-white font-normal mb-4">1. Introduction</h2>
            <p>Welcome to SmartShop Global. These terms dictate the rules and regulations for the use of our digital platforms. By accessing this website, we assume you accept these conditions in full.</p>
          </section>
          <section>
            <h2 className="text-xl text-white font-normal mb-4">2. Data & Privacy</h2>
            <p>Your privacy is our paramount concern. We employ end-to-end encryption and adhere to global GDPR standards. We do not sell your personal data to third parties. Information collected is solely used to enhance your bespoke shopping experience.</p>
          </section>
          <section>
            <h2 className="text-xl text-white font-normal mb-4">3. User Obligations</h2>
            <p>As a user of our premium services, you agree to maintain the confidentiality of your account credentials. Any malicious activity, scraping, or disruption of our services will result in immediate termination of your access.</p>
          </section>
          <p className="text-sm text-gray-500 mt-12 pt-8 border-t border-white/10">For full legal inquiries, contact legal@smartshop.global.</p>
        </div>
      </div>
    </div>
  );
}