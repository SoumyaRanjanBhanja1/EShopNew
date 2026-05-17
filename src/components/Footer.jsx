import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  EnvelopeIcon,
  LinkIcon,
  PlayCircleIcon,
  DevicePhoneMobileIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

// Register GSAP Plugins
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Footer({ isAdmin = false }) {
  const footerRef = useRef(null);

  useGSAP(() => {
    // Elegant Scroll Reveal Animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 90%', // Triggers when footer is slightly visible
        toggleActions: 'play none none reverse',
      },
    });

    // Staggered reveal for footer columns
    tl.from('.footer-column', {
      y: 50,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: 'expo.out',
    })
    // Line and copyright fade in
    .from('.footer-divider', {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 1,
      ease: 'power3.inOut',
    }, '-=0.8')
    .from('.footer-bottom-text', {
      opacity: 0,
      y: 10,
      duration: 1,
      ease: 'power2.out',
    }, '-=0.4');

  }, { scope: footerRef });

  return (
    <footer
      ref={footerRef}
      // Fixed: Removed hardcoded h-[440px] to allow content to flow on mobile
      className="relative bg-[#030303] text-white min-h-[440px] pt-24 pb-8 px-6 mt-20 overflow-hidden"
    >
      {/* Subtle Premium Background Glows */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
        
        {/* Column 1: Brand & Ethos */}
        <div className="footer-column lg:col-span-4 flex flex-col justify-between">
          <div>
            <h3 className="text-3xl font-light tracking-[0.25em] uppercase text-white mb-6 flex items-center gap-2">
              Smart<span className="font-bold">Shop</span>
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm font-light tracking-wide">
              Elevating the art of digital commerce. Experience curated excellence, unparalleled quality, and seamless global delivery.
            </p>
          </div>
          
          {/* Mobile App Prompts */}
          <div className="mt-10">
            <p className="text-xs text-gray-500 uppercase tracking-[0.15em] mb-4">Experience the App</p>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-lg hover:bg-white/5 hover:border-white/30 transition-all duration-300 backdrop-blur-md">
                {/* Fixed: h-2 to h-5 to prevent squished icon */}
                <DevicePhoneMobileIcon className="w-5 h-5 text-gray-300" />
                <div className="text-left">
                  <p className="text-[10px] text-gray-400 leading-none">Download on the</p>
                  <p className="text-sm font-semibold text-gray-200">App Store</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Column 2: Curation / Shop */}
        <div className="footer-column lg:col-span-2">
          <h4 className="text-xs font-semibold text-gray-100 uppercase tracking-[0.15em] mb-6">Collections</h4>
          <ul className="space-y-4 text-sm text-gray-400 font-light">
            {['New Arrivals', 'Premium Electronics', 'Luxury Wearables', 'Smart Home', 'Gift Cards'].map((item, idx) => (
              <li key={idx}>
                <a href="/NewArrivals" className="hover:text-white transition-colors duration-300 relative group inline-block">
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full opacity-50"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Corporate */}
        <div className="footer-column lg:col-span-3">
          <h4 className="text-xs font-semibold text-gray-100 uppercase tracking-[0.15em] mb-6">Maison</h4>
          <ul className="space-y-4 text-sm text-gray-400 font-light">
            {[
              ...(isAdmin ? [{ name: 'Executive Dashboard', link: '/admin' }] : []),
              { name: 'Our Story', link: '/About' },
              { name: 'Careers at SmartShop', link: '/careers' },
              { name: 'Investor Relations', link: '/Investors' },
              { name: 'Press & Media', link: '/press' },
            ].map((item, idx) => (
              <li key={idx}>
                <a href={item.link} className="hover:text-white transition-colors duration-300 relative group inline-block">
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full opacity-50"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Premium Support & Connect */}
        <div className="footer-column lg:col-span-3">
          <h4 className="text-xs font-semibold text-gray-100 uppercase tracking-[0.15em] mb-6 flex items-center gap-2">
            <SparklesIcon className="w-4 h-4 text-indigo-400" /> Concierge Services
          </h4>
          <ul className="space-y-4 text-sm text-gray-400 font-light mb-8">
            <li><a href="/support" className="hover:text-white transition-colors">24/7 Client Assistance</a></li>
            <li><a href="/orders" className="hover:text-white transition-colors">Track Your Order</a></li>
            <li><a href="/returns" className="hover:text-white transition-colors">Returns & Exchanges</a></li>
            <li><a href="/help" className="hover:text-white transition-colors">Privacy & Legal</a></li>
          </ul>

          {/* Social Icons */}
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-[0.15em] mb-4">Connect</p>
            <div className="flex space-x-6">
              <a
                href="mailto:soumyabhanja113@gmail.com"
                className="text-gray-500 hover:text-white transition-colors duration-300"
                title="Client Email"
              >
                <EnvelopeIcon className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/soumya-ranjan-bhanja-270644247"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors duration-300"
                title="LinkedIn"
              >
                <LinkIcon className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com/@odiagirl134?si=_KxOF_Oi_zsTuJrn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors duration-300"
                title="YouTube"
              >
                <PlayCircleIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Legal / Copyright Section */}
      <div className="relative z-10 max-w-7xl mx-auto mt-10">
        <div className="footer-divider w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="footer-bottom-text flex flex-col md:flex-row items-center justify-between text-[11px] text-gray-500 tracking-[0.1em] pt-8 uppercase gap-4 md:gap-0">
          <p className="md:mt-[-20px] text-center md:text-left">© {new Date().getFullYear()} SmartShop. All rights reserved by Soumya Ranjan Bhanja.</p>
          <div className="flex gap-4 md:gap-6 md:mt-[-20px] flex-wrap justify-center">
            <a href="/terms" className="hover:text-white transition">Terms of Service</a>
            <a href="/privacy" className="hover:text-white transition">Privacy Policy</a>
            <a href="/cookies" className="hover:text-white transition">Cookie Preferences</a>
          </div>
        </div>
      </div>
    </footer>
  );
}