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
import NewArrivals from '../components/NewArrivals';

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading, error } = useSelector(state => state.products);
  const products = Array.isArray(items) ? items : [];

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

  const categories = useMemo(
    () => [...new Set(products.map(p => p.category).filter(Boolean))],
    [products]
  );
  const brands = useMemo(
    () => [...new Set(products.map(p => p.brand).filter(Boolean))],
    [products]
  );

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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white">
      {/* Hero Carousel */}
      <div className="bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500">
        <Carousel />
      </div>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex-1 px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto w-full"
      >
        <div className="grid ml-[-10px] grid-cols-1 lg:grid-cols-4 gap-8">
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

          {/* Products Section */}
          <div className="lg:col-span-3 space-y-10">
            {/* Category Slider */}
            {categories.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400">
                  🔖 Shop by Category
                </h2>
                <Swiper
                  modules={[Autoplay, Navigation]}
                  spaceBetween={16}
                  slidesPerView={3}
                  navigation
                  autoplay={{ delay: 2500, disableOnInteraction: false }}
                  breakpoints={{
                    640: { slidesPerView: 4 },
                    1024: { slidesPerView: 6 },
                  }}
                >
                  {categories.map((cat, idx) => (
                    <SwiperSlide key={idx}>
                      <div
                        onClick={() => setSelectedCategories([cat])}
                        className="cursor-pointer bg-white/10 hover:bg-white/20 transition rounded-lg p-4 text-center shadow-md"
                      >
                        <span className="block text-lg font-semibold">{cat}</span>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}

            {/* Featured Products */}
            {!loading && filteredProducts.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-blue-400 to-purple-400">
                  🌟 Featured Products
                </h2>
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
                  {filteredProducts.slice(0, 6).map(product => (
                    <SwiperSlide key={product._id}>
                      <ProductCard
                        product={product}
                        onAdd={() => handleAddToCart(product)}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}

            {/* All Products Grid */}
            {!loading && filteredProducts.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-400 to-indigo-400">
                  📦 All Products
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-16">
                  {filteredProducts.map(product => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      onAdd={() => handleAddToCart(product)}
                    />
                  ))}
                </div>
              </div>
            )}

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
          </div>
        </div>
        <div className="mt-[40px]">
          <NewArrivals />
        </div>
      </motion.main>

      {/* Floating Cart + Footer */}
      <FloatingCart />
      <Footer />
    </div>
  );
}