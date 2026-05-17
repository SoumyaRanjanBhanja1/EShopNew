import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Register the GSAP plugin
gsap.registerPlugin(useGSAP);

export default function NotFound() {
  const containerRef = useRef(null);
  const numberRef = useRef(null);
  const contentRef = useRef(null);
  const buttonRef = useRef(null);

  useGSAP(() => {
    // 1. Initial Load Timeline
    const tl = gsap.timeline();

    tl.from(numberRef.current, {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: 'power4.out',
    })
      .from(
        contentRef.current.children,
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        },
        '-=0.8'
      )
      .from(
        buttonRef.current,
        {
          scale: 0.8,
          opacity: 0,
          duration: 0.6,
          ease: 'back.out(1.7)',
        },
        '-=0.4'
      );

    // 2. Continuous Floating Animation for 404
    gsap.to(numberRef.current, {
      y: '+=20', // Float up and down by 20px
      duration: 2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    // 3. Interactive Mouse Parallax Effect
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      // Calculate mouse position relative to the center of the screen
      const xPos = (clientX / window.innerWidth - 0.5) * 50; 
      const yPos = (clientY / window.innerHeight - 0.5) * 50;

      gsap.to(numberRef.current, {
        x: xPos,
        y: yPos,
        rotationX: -yPos / 2, // Slight 3D tilt
        rotationY: xPos / 2,
        duration: 1.5,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-white overflow-hidden perspective-1000"
    >
      {/* Background Ambient Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Giant 404 Text */}
      <div
        ref={numberRef}
        className="relative z-10 text-[12rem] md:text-[18rem] lg:text-[22rem] font-black leading-none tracking-tighter select-none"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 drop-shadow-[0_0_40px_rgba(168,85,247,0.4)]">
          404
        </span>
      </div>

      {/* Content Section */}
      <div ref={contentRef} className="relative z-10 text-center mt-4 space-y-4 px-4">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-100">
          Looks like you're lost in space.
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto">
          The page you are looking for has vanished into the digital void, or maybe it never existed at all.
        </p>
      </div>

      {/* Call to Action Button */}
      <div className="relative z-10 mt-10">
        <Link
          ref={buttonRef}
          to="/"
          className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 ease-in-out rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-105 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] overflow-hidden backdrop-blur-sm"
        >
          <span className="relative z-10 flex items-center gap-2">
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Take Me Home
          </span>
          {/* Subtle gradient hover effect inside button */}
          <div className="absolute inset-0 z-0 h-full w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 transition-opacity duration-300 group-hover:opacity-20"></div>
        </Link>
      </div>
    </div>
  );
}