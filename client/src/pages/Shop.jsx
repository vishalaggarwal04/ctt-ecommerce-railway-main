import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

function Shop({ user, addToCart }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const navigate = useNavigate();

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category));
    return ['all', ...Array.from(cats)];
  }, []);

  // Filter and search products
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Price range filter
    if (selectedPriceRange !== 'all') {
      const [min, max] = selectedPriceRange.split('-').map(Number);
      filtered = filtered.filter(product => {
        if (max) {
          return product.price >= min && product.price <= max;
        }
        return product.price >= min;
      });
    }

    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return sorted;
  }, [searchQuery, selectedCategory, selectedPriceRange, sortBy]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled automatically via useMemo
  };

  const handleAddToCart = (product) => {
    if (!user) {
      // User not logged in - prompt to login
      const shouldLogin = window.confirm(
        `Please login to add items to cart.\n\nWould you like to login now?`
      );
      if (shouldLogin) {
        navigate('/login');
      }
    } else {
      // User is logged in - add to cart
      addToCart(product);
      alert(`${product.name} added to cart!`);
    }
  };

  return (
    <div className="home-container">
      {/* Login prompt banner for non-logged in users */}
      {!user && (
        <div className="login-banner">
          <div className="login-banner-content">
            <p>
              👋 <strong>Welcome!</strong> You're browsing as a guest.
              <button onClick={() => navigate('/login')} className="banner-login-btn">
                Login
              </button>
              to add items to cart and checkout.
            </p>
          </div>
        </div>
      )}

      {/* Search Section */}
      <div className="search-section">
        <h2>🔍 Find Your Perfect Product</h2>

        <form onSubmit={handleSearch}>
          <div className="search-box">
            <input
              type="text"
              className="search-input"
              placeholder="Search products by name, category, or brand..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-btn">
              Search
            </button>
          </div>
        </form>

        {/* Filters */}
        <div className="filters">
          <select
            className="filter-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>

          <select
            className="filter-select"
            value={selectedPriceRange}
            onChange={(e) => setSelectedPriceRange(e.target.value)}
          >
            <option value="all">All Prices</option>
            <option value="0-25">Under $25</option>
            <option value="25-50">$25 - $50</option>
            <option value="50-75">$50 - $75</option>
            <option value="75-100">$75 - $100</option>
            <option value="100">Over $100</option>
          </select>

          <select
            className="filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        <div className="search-results">
          {filteredProducts.length === 0 ? (
            <p>No products found matching your criteria. Try adjusting your filters.</p>
          ) : (
            <p>
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              {searchQuery && ` for "${searchQuery}"`}
              {selectedCategory !== 'all' && ` in ${selectedCategory}`}
            </p>
          )}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 && (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Shop;
