import { Link } from 'react-router-dom';

function Header({ user, onLogout, cartCount }) {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          🎯 CTT App
        </Link>

        <nav className="nav-links">
          <Link to="/shop">Shop</Link>
          {user && (
            <Link to="/cart">
              Cart {cartCount > 0 && <span>({cartCount})</span>}
            </Link>
          )}
        </nav>

        <div className="user-info">
          {user ? (
            <>
              <span>Welcome, {user.name}!</span>
              <button onClick={onLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="header-login-btn">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
