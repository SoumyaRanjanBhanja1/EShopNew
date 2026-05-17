import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function InvestorsPage() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from('.anim-up', { y: 30, opacity: 0, duration: 1, stagger: 0.15, ease: 'expo.out', delay: 0.2 });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-[#030303] text-white pt-32 pb-20 px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="anim-up mb-20 border-b border-white/10 pb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-4">Investor Relations</p>
          <h1 className="text-4xl md:text-6xl font-light">Financial Performance & Outlook</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Mock Ticker Card */}
          <div className="anim-up bg-white/5 border border-white/10 p-8 rounded-xl backdrop-blur-sm">
            <p className="text-sm text-gray-400 mb-2">NASDAQ: SMSP</p>
            <h2 className="text-5xl font-light">$248.65</h2>
            <p className="text-emerald-400 text-sm mt-2 flex items-center gap-1">
              <span>▲</span> +4.2% (Today)
            </p>
          </div>
          <div className="anim-up bg-white/5 border border-white/10 p-8 rounded-xl backdrop-blur-sm">
            <p className="text-sm text-gray-400 mb-2">Q3 Revenue</p>
            <h2 className="text-5xl font-light">$4.2B</h2>
            <p className="text-emerald-400 text-sm mt-2 flex items-center gap-1">
              <span>▲</span> 18% YoY
            </p>
          </div>
          <div className="anim-up bg-white/5 border border-white/10 p-8 rounded-xl backdrop-blur-sm">
            <p className="text-sm text-gray-400 mb-2">Active Users</p>
            <h2 className="text-5xl font-light">125M</h2>
            <p className="text-gray-400 text-sm mt-2">Across 120 regions</p>
          </div>
        </div>

        <div className="anim-up">
          <h3 className="text-2xl font-light border-b border-white/10 pb-4 mb-6">Recent Reports</h3>
          <ul className="space-y-4">
            {['Q3 2026 Earnings Release', '2025 Annual Report (Form 10-K)', 'Q2 2026 Shareholder Letter'].map((report, idx) => (
              <li key={idx} className="flex justify-between items-center group cursor-pointer p-4 hover:bg-white/5 rounded-lg transition-colors">
                <span className="text-gray-300 group-hover:text-white font-light">{report}</span>
                <span className="text-xs uppercase tracking-widest text-indigo-400">Download PDF</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}