import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Shop from './pages/Shop';
import Cart from './pages/Cart';

function AppContent({ user, onLogin, onLogout, cart, addToCart, updateQuantity, removeFromCart, getCartItemCount }) {
  const deploymentId = import.meta.env.VITE_DEPLOYMENT_ID;
  const location = useLocation();
  console.log(deploymentId)

  // Show header only on shop and cart pages
  const showHeader = ['/shop', '/cart'].includes(location.pathname);

  return (
    <>
      {showHeader && (
        <Header user={user} onLogout={onLogout} cartCount={getCartItemCount()} />
      )}
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Login Page */}
        <Route
          path="/login"
          element={
            user ? <Navigate to="/shop" /> : <Login onLogin={onLogin} />
          }
        />

        {/* Shop Page - PUBLIC (No login required to browse) */}
        <Route
          path="/shop"
          element={<Shop user={user} addToCart={addToCart} />}
        />

        {/* Cart Page - PROTECTED (Login required) */}
        <Route
          path="/cart"
          element={
            user ? (
              <Cart
                cart={cart}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  // Check if user is logged in (from localStorage)
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
  };

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);

      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <Router>
      <div className="app">
        <AppContent
          user={user}
          onLogin={handleLogin}
          onLogout={handleLogout}
          cart={cart}
          addToCart={addToCart}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          getCartItemCount={getCartItemCount}
        />
      </div>
    </Router>
  );
}

export default App;
