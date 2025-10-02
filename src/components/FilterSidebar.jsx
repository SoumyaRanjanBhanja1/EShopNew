import { motion } from 'framer-motion';

export default function FilterSidebar({
  categories,
  brands,
  selectedCategories,
  setSelectedCategories,
  selectedBrands,
  setSelectedBrands,
  priceRange,
  setPriceRange,
  sortOption,
  setSortOption,
  searchQuery,
  setSearchQuery,
  onClearAll,
}) {
  const toggleCategory = (cat) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleBrand = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 shadow-lg h-fit sticky top-6"
      aria-label="Product filters"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">
          Filters
        </h2>
        <button
          onClick={onClearAll}
          className="text-xs px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded-md transition"
        >
          Clear all
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2 text-indigo-200">Search</label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full px-3 py-2 rounded-lg bg-white/20 text-white placeholder-indigo-200/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2 text-indigo-200">Categories</h3>
        <div className="max-h-40 overflow-auto pr-2 space-y-1">
          {categories.map(cat => (
            <label key={cat} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="accent-blue-400"
              />
              <span>{cat}</span>
            </label>
          ))}
          {categories.length === 0 && (
            <p className="text-indigo-300 text-sm">No categories available.</p>
          )}
        </div>
      </div>

      {/* Brands */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2 text-indigo-200">Brands</h3>
        <div className="max-h-40 overflow-auto pr-2 space-y-1">
          {brands.map(brand => (
            <label key={brand} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="accent-purple-400"
              />
              <span>{brand}</span>
            </label>
          ))}
          {brands.length === 0 && (
            <p className="text-indigo-300 text-sm">No brands available.</p>
          )}
        </div>
      </div>

      {/* Price */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2 text-indigo-200">
          Price range (₹{priceRange[0]} - ₹{priceRange[1]})
        </h3>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="50000"
            step="500"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([Number(e.target.value), Math.max(Number(e.target.value), priceRange[1])])}
            className="w-full accent-pink-400"
            aria-label="Minimum price"
          />
          <input
            type="range"
            min="0"
            max="50000"
            step="500"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([Math.min(priceRange[0], Number(e.target.value)), Number(e.target.value)])}
            className="w-full accent-pink-400"
            aria-label="Maximum price"
          />
        </div>
      </div>

      {/* Sort */}
      <div className="mb-2">
        <h3 className="font-semibold mb-2 text-indigo-200">Sort by</h3>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Sort products"
        >
          <option value="">Default</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
          <option value="newest">Newest First</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>
    </motion.aside>
  );
}