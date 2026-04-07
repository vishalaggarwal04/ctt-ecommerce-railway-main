import { Link } from 'react-router-dom';

function LandingPage() {
    const deploymentId = import.meta.env.VITE_DEPLOYMENT_ID;
    console.log(deploymentId)
  return (
    <div className="landing-container">
      <nav className="landing-nav">
        <div className="landing-nav-content">
          <div className="logo">🎯 CTT App</div>
          <div className="nav-buttons">
            <Link to="/login" className="nav-btn">Login</Link>
            <Link to="/signup" className="nav-btn signup-btn">Sign Up</Link>
          </div>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to CTT App</h1>
          <p className="hero-subtitle">
            Your premier destination for quality products
          </p>
          <p className="hero-description">
            New CTT Explore our curated collection of fashion and lifestyle products.
            From trendy jackets to comfortable jeans, stylish shoes to premium shirts - 
            discover everything you need in one place.
          </p>
          <div className="hero-buttons">
            <Link to="/login" className="hero-btn primary">
              Get Started
            </Link>
            <Link to="/shop" className="hero-btn secondary">
              Browse Products
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="product-showcase">
            <div className="showcase-item">🧥</div>
            <div className="showcase-item">👟</div>
            <div className="showcase-item">👕</div>
            <div className="showcase-item">👖</div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title">Why Choose CTT App?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>Fast Delivery</h3>
            <p>Free shipping on orders over $100</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure Checkout</h3>
            <p>100% secure payment processing</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💎</div>
            <h3>Premium Quality</h3>
            <p>Handpicked products from top brands</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎁</div>
            <h3>Special Offers</h3>
            <p>Exclusive deals and discounts</p>
          </div>
        </div>
      </section>

      <section className="categories-section">
        <h2 className="section-title">Shop by Category</h2>
        <div className="categories-grid">
          <Link to="/shop?category=Jackets" className="category-card">
            <div className="category-icon">🧥</div>
            <h3>Jackets</h3>
          </Link>
          <Link to="/shop?category=Shoes" className="category-card">
            <div className="category-icon">👟</div>
            <h3>Shoes</h3>
          </Link>
          <Link to="/shop?category=T-Shirts" className="category-card">
            <div className="category-icon">👕</div>
            <h3>T-Shirts</h3>
          </Link>
          <Link to="/shop?category=Jeans" className="category-card">
            <div className="category-icon">👖</div>
            <h3>Jeans</h3>
          </Link>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Start Your Shopping Journey</h2>
          <p>Join CTT App community today</p>
          <div className="cta-buttons">
            <Link to="/login" className="cta-btn">
              Login Now
            </Link>
          </div>
          <div className="demo-note">
            <p>🎯 Demo Account: demo@cttapp.com / demo123</p>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>🎯 CTT App</h4>
            <p>Your trusted shopping destination</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <Link to="/shop">Shop</Link>
            <Link to="/login">Login</Link>
          </div>
          <div className="footer-section">
            <h4>Categories</h4>
            <Link to="/shop?category=Jackets">Jackets</Link>
            <Link to="/shop?category=Shoes">Shoes</Link>
            <Link to="/shop?category=T-Shirts">T-Shirts</Link>
            <Link to="/shop?category=Jeans">Jeans</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 CTT App. All rights reserved. | E-Commerce Platform</p>
          <p>&copy; Build Version: {deploymentId}</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
