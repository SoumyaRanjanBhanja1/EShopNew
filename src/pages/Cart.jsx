import { useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { TrashIcon, PlusIcon, MinusIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

gsap.registerPlugin(useGSAP);

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart.items);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated) || localStorage.getItem('token');

  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  itemRefs.current = []; // Reset refs on render

  const addToRefs = (el) => {
    if (el && !itemRefs.current.includes(el)) {
      itemRefs.current.push(el);
    }
  };

  const total = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const formattedTotal = total.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Entry Animations
  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from('.cart-header', { y: -30, opacity: 0, duration: 0.8, ease: 'expo.out' })
      .from('.cart-item', { 
        x: -50, 
        opacity: 0, 
        duration: 0.6, 
        stagger: 0.1, 
        ease: 'power3.out' 
      }, '-=0.4')
      .from('.cart-summary', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4');
      
  }, { scope: containerRef, dependencies: [] }); // Run once on mount

  // Smooth Exit Animation before Redux Dispatch
  const handleRemove = (id, index) => {
    const el = itemRefs.current[index];
    gsap.to(el, {
      opacity: 0,
      x: 100,
      scale: 0.9,
      height: 0,
      padding: 0,
      margin: 0,
      duration: 0.4,
      ease: 'power3.in',
      onComplete: () => {
        dispatch(removeFromCart(id));
      }
    });
  };

  const handleQuantity = (id, currentQty, delta) => {
    const newQty = currentQty + delta;
    if (newQty > 0) {
      dispatch(updateQuantity({ _id: id, quantity: newQty }));
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      alert('⚠️ Please log in to proceed with your order.');
      navigate('/login');
      return;
    }
    navigate('/order');
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-[#030303] text-white pt-32 pb-20 px-6 relative overflow-hidden font-sans"
    >
      {/* Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="cart-header border-b border-white/10 pb-6 mb-10 flex items-center justify-between">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight flex items-center gap-4">
            <ShoppingBagIcon className="w-10 h-10 text-indigo-400" />
            Your Cart
          </h1>
          <span className="text-gray-500 font-mono text-sm tracking-widest uppercase">
            {cartItems.length} Item{cartItems.length !== 1 && 's'}
          </span>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-70">
            <ShoppingBagIcon className="w-24 h-24 text-gray-700 mb-6" />
            <p className="text-xl text-gray-400 font-light tracking-wide">Your cart is entirely empty.</p>
            <button 
              onClick={() => navigate('/')}
              className="mt-8 px-6 py-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-300"
            >
              Discover Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <div
                  key={item._id}
                  ref={addToRefs}
                  className="cart-item group relative flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md hover:bg-white/10 transition-colors overflow-hidden"
                >
                  <div className="flex items-center w-full sm:w-auto">
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-white/10 flex-shrink-0">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="ml-6 text-left">
                      <h2 className="text-xl font-medium text-white tracking-wide">{item.name}</h2>
                      <p className="text-sm text-gray-400 mt-1 uppercase tracking-widest">{item.category || 'Premium'}</p>
                      <p className="text-lg text-indigo-300 font-light mt-2">₹{item.price.toLocaleString('en-IN')}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto mt-6 sm:mt-0 gap-6">
                    {/* Sleek Quantity Selector */}
                    <div className="flex items-center gap-4 bg-black/40 rounded-full px-2 py-1 border border-white/10">
                      <button 
                        onClick={() => handleQuantity(item._id, item.quantity, -1)}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <MinusIcon className="w-4 h-4" />
                      </button>
                      <span className="w-6 text-center font-mono">{item.quantity}</span>
                      <button 
                        onClick={() => handleQuantity(item._id, item.quantity, 1)}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <PlusIcon className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Trash Button */}
                    <button
                      onClick={() => handleRemove(item._id, index)}
                      className="p-3 text-gray-500 hover:text-pink-500 hover:bg-pink-500/10 rounded-full transition-all duration-300"
                      title="Remove Item"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Checkout Summary */}
            <div className="cart-summary">
              <div className="sticky top-32 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
                <h3 className="text-lg font-medium tracking-wide uppercase text-gray-300 mb-6 border-b border-white/10 pb-4">
                  Order Summary
                </h3>
                
                <div className="space-y-4 mb-8 text-gray-400 font-light">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-white">₹{formattedTotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span className="text-indigo-400">Complimentary</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-8 border-t border-white/10 pt-6">
                  <span className="text-xl font-medium text-white">Total</span>
                  <span className="text-2xl font-light text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                    ₹{formattedTotal}
                  </span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="group relative w-full overflow-hidden rounded-xl bg-white text-black font-semibold tracking-widest py-4 hover:scale-[1.02] transition-transform duration-300 active:scale-95"
                >
                  <span className="relative z-10 uppercase">Secure Checkout</span>
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                <p className="text-center text-xs text-gray-600 mt-6 font-light">
                  Taxes and additional fees are calculated at checkout.
                </p>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}