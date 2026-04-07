import { Link } from 'react-router-dom';

function Cart({ cart, updateQuantity, removeFromCart }) {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const total = subtotal + tax + shipping;

  const handleCheckout = () => {
    alert(`Checkout successful! Total: $${total.toFixed(2)}\n\nThis is a demo - no actual payment was processed.`);
  };

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <div className="cart-empty">
          <h3>🛒 Your cart is empty</h3>
          <p>Start adding some products to your cart!</p>
          <Link to="/shop" className="back-to-shop">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>🛒 Shopping Cart</h2>
      
      <div className="cart-items">
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-image">
              {item.image}
            </div>
            
            <div className="cart-item-details">
              <h3 className="cart-item-name">{item.name}</h3>
              <div className="cart-item-category">{item.category}</div>
              <div className="cart-item-price">${item.price.toFixed(2)}</div>
            </div>
            
            <div className="cart-item-actions">
              <div className="quantity-controls">
                <button
                  className="quantity-btn"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="quantity-display">{item.quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="cart-summary">
        <h3>Order Summary</h3>
        
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="summary-row">
          <span>Tax (8%):</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        
        <div className="summary-row">
          <span>Shipping:</span>
          <span>
            {shipping === 0 ? (
              <span style={{ color: '#4ecca3' }}>FREE</span>
            ) : (
              `$${shipping.toFixed(2)}`
            )}
          </span>
        </div>
        
        {subtotal < 100 && subtotal > 0 && (
          <div style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.5rem' }}>
            💡 Add ${(100 - subtotal).toFixed(2)} more for free shipping!
          </div>
        )}
        
        <div className="summary-row">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        
        <button className="checkout-btn" onClick={handleCheckout}>
          Proceed to Checkout
        </button>
        
        <Link to="/shop" className="back-to-shop" style={{ display: 'block', textAlign: 'center', marginTop: '1rem' }}>
          ← Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default Cart;
