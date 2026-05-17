import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SparklesIcon, ArrowRightIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

// Register GSAP Plugins
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function NewArrivals({ products }) {
  const sectionRef = useRef(null);

  // Premium Dummy Data (Fallback if no products passed)
  const displayProducts = products || [
    {
      _id: '1',
      name: 'Aura Sync Headphones',
      category: 'Audio',
      price: 1000,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
    },
    {
      _id: '2',
      name: 'Titanium Smartwatch Series 9',
      category: 'Wearables',
      price: 10000,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop',
    },
    {
      _id: '3',
      name: 'Minimalist Mechanical Keyboard',
      category: 'Accessories',
      price: 12500,
      image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800&auto=format&fit=crop',
    },
    {
      _id: '4',
      name: 'Visionary AR Glasses',
      category: 'Innovation',
      price: 5000,
      image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?q=80&w=800&auto=format&fit=crop',
    }
  ];

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%', // Reveal when section is 20% into the viewport
        toggleActions: 'play none none reverse',
      },
    });

    // Animate Header
    tl.from('.arrival-header', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    })
    // Stagger animate product cards
    .from('.arrival-card', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'expo.out',
    }, '-=0.4');

  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className="relative py-24 px-6  bg-[#030303] text-white overflow-hidden font-sans"
    >
      {/* Background Ambient Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute top-10 left-1/4 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="arrival-header flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="flex items-center gap-2 text-indigo-400 text-sm uppercase tracking-[0.2em] font-semibold mb-3">
              <SparklesIcon className="w-4 h-4" /> Just Dropped
            </p>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white">
              New <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Arrivals</span>
            </h2>
          </div>
          
          <button className="group flex items-center gap-2 text-sm uppercase tracking-widest text-gray-400 hover:text-white transition-colors duration-300">
            View All Collection
            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayProducts.slice(0, 4).map((product) => (
            <div 
              key={product._id} 
              className="arrival-card group relative flex flex-col bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-colors duration-500 cursor-pointer overflow-hidden backdrop-blur-sm"
            >
              {/* Product Image Container */}
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#0a0a0a] mb-6">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out opacity-80 group-hover:opacity-100"
                />
                
                {/* NEW Badge */}
                <div className="absolute top-3 left-3 bg-indigo-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-md">
                  New
                </div>

                {/* Quick Add Overlay Button */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-sm font-semibold tracking-wide hover:scale-105 transition-transform">
                    <ShoppingBagIcon className="w-4 h-4" /> Quick Add
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col flex-grow">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">
                  {product.category}
                </p>
                <h3 className="text-lg font-light text-gray-200 group-hover:text-white transition-colors line-clamp-1 mb-2">
                  {product.name}
                </h3>
                <p className="text-indigo-300 font-medium mt-auto">
                  ₹{product.price.toLocaleString('en-IN')}
                </p>
              </div>

              {/* Hover Glow Border Effect */}
              <div className="absolute inset-0 border border-indigo-500/0 group-hover:border-indigo-500/50 rounded-2xl transition-colors duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}