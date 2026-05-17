import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AboutUs() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from('.hero-text', { y: 100, opacity: 0, duration: 1.2, stagger: 0.2, ease: 'expo.out' })
      .from('.hero-divider', { scaleX: 0, duration: 1, ease: 'power3.inOut' }, '-=0.5');

    gsap.utils.toArray('.scroll-fade').forEach((el) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 85%' },
        y: 40, opacity: 0, duration: 1, ease: 'power3.out',
      });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-[#030303] text-white pt-32 pb-20 px-6 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="mb-24">
          <h1 className="hero-text text-5xl md:text-7xl font-light tracking-tight mb-6">
            Redefining <br/><span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Commerce.</span>
          </h1>
          <p className="hero-text text-lg md:text-xl text-gray-400 max-w-2xl font-light leading-relaxed">
            SmartShop isn't just a marketplace. It's a curated ecosystem designed for those who demand excellence in every digital interaction.
          </p>
          <div className="hero-divider w-full h-[1px] bg-white/10 mt-16 transform origin-left"></div>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24 scroll-fade">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 mb-4">Our Mission</h2>
            <h3 className="text-3xl font-light leading-tight">Bridging the gap between desire and delivery with uncompromising quality.</h3>
          </div>
          <div className="text-gray-400 font-light leading-relaxed space-y-6">
            <p>Founded on the principles of design and efficiency, SmartShop Global operates at the intersection of technology and lifestyle. We believe that buying online should feel as premium as unboxing a luxury timepiece.</p>
            <p>From our global fulfillment centers to our bespoke digital storefront, every pixel and package is optimized for delight.</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-white/10 py-12 scroll-fade">
          {[
            { value: '50M+', label: 'Global Clients' },
            { value: '120', label: 'Countries Served' },
            { value: '99.9%', label: 'Uptime' },
            { value: 'Zero', label: 'Carbon Footprint' },
          ].map((stat, idx) => (
            <div key={idx} className="text-center md:text-left">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-xs uppercase tracking-[0.1em] text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}