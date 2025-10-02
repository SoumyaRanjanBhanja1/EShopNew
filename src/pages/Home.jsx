import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productSlice';
import { addToCart } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import Carousel from '../components/Carousel';
import FloatingCart from '../components/FloatingCart';
import FilterSidebar from '../components/FilterSidebar';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading, error } = useSelector(state => state.products);
  const products = Array.isArray(items) ? items : [];

  // Filter + sort states
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [sortOption, setSortOption] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate('/login');
  };

  // Unique categories & brands
  const categories = useMemo(
    () => [...new Set(products.map(p => p.category).filter(Boolean))],
    [products]
  );
  const brands = useMemo(
    () => [...new Set(products.map(p => p.brand).filter(Boolean))],
    [products]
  );

  // Filter + sort
  const filteredProducts = useMemo(() => {
    let list = products.filter(p => {
      const matchCategory = selectedCategories.length ? selectedCategories.includes(p.category) : true;
      const matchBrand = selectedBrands.length ? selectedBrands.includes(p.brand) : true;
      const matchPrice = typeof p.price === 'number' && p.price >= priceRange[0] && p.price <= priceRange[1];
      const matchSearch = searchQuery
        ? `${p.name} ${p.description} ${p.brand} ${p.category}`.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchCategory && matchBrand && matchPrice && matchSearch;
    });

    switch (sortOption) {
      case 'lowToHigh':
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case 'highToLow':
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        list = [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'rating':
        list = [...list].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      default:
        break;
    }
    return list;
  }, [products, selectedCategories, selectedBrands, priceRange, sortOption, searchQuery]);

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, 50000]);
    setSortOption('');
    setSearchQuery('');
  };

  return (
    <>
      {/* Hero Carousel */}
      <div className="bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 mb-[-40px]">
        <Carousel className="ml-[-40px] mr-[-40px]" />
      </div>

      {/* Main Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white px-4 sm:px-6 lg:px-8 py-8"
      >
        <div className="max-w-7xl ml-[-20px] mt-[10px] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <FilterSidebar
            categories={categories}
            brands={brands}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            sortOption={sortOption}
            setSortOption={setSortOption}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onClearAll={clearAllFilters}
          />

          {/* Products */}
          <div className="lg:col-span-3">
            <motion.h1
              initial={{ y: -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-3xl ml-[280px] sm:text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
            >
              🛍️ Products
            </motion.h1>

            {/* Active filters badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedCategories.map(c => (
                <span key={c} className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-sm">
                  {c}
                </span>
              ))}
              {selectedBrands.map(b => (
                <span key={b} className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-sm">
                  {b}
                </span>
              ))}
              {(priceRange[0] !== 0 || priceRange[1] !== 50000) && (
                <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-sm">
                  ₹{priceRange[0]} - ₹{priceRange[1]}
                </span>
              )}
              {searchQuery && (
                <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-sm">
                  “{searchQuery}”
                </span>
              )}
            </div>

            {/* States */}
            {error && (
              <p className="text-center text-red-400 text-sm mb-4">
                Something went wrong while loading products.
              </p>
            )}
            {loading && (
              <p className="text-center text-indigo-300 text-lg">Loading products...</p>
            )}
            {!loading && filteredProducts.length === 0 && (
              <p className="text-center text-red-400 text-lg">No products match your filters.</p>
            )}

            {/* Product Carousel */}
            {!loading && filteredProducts.length > 0 && (
              <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={24}
                slidesPerView={1}
                pagination={{ clickable: true }}
                navigation
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                breakpoints={{
                  640: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                className="pb-10"
              >
                {filteredProducts.map(product => (
                  <SwiperSlide key={product._id}>
                    <ProductCard
                      product={product}
                      onAdd={() => handleAddToCart(product)}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
      </motion.div>

      {/* Floating Cart + Footer */}
      <div className="mt-[-60px]">
        <FloatingCart />
        <Footer />
      </div>
    </>
  );
}