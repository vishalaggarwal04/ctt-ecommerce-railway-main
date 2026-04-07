function ProductCard({ product, addToCart }) {
  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        {product.image}
      </div>
      
      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        
        <div className="product-rating">
          <span className="stars">
            {'⭐'.repeat(Math.floor(product.rating))}
          </span>
          <span className="rating-count">
            ({product.reviews} reviews)
          </span>
        </div>
        
        <div className="product-footer">
          <span className="product-price">${product.price}</span>
          <button onClick={handleAddToCart} className="add-to-cart-btn">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
