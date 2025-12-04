/**
 * Shopping Cart Component
 */
import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { formatPrice } from '../utils/validators';
import './ShoppingCart.css';

export function ShoppingCart() {
  const { cart, loading, error, removeFromCart, updateCartItem } = useContext(CartContext);

  if (!cart) {
    return <div className="shopping-cart"><p>No cart loaded</p></div>;
  }

  if (loading) {
    return <div className="shopping-cart"><p>Loading...</p></div>;
  }

  if (error) {
    return <div className="shopping-cart error"><p>Error: {error}</p></div>;
  }

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      {cart.items && cart.items.length > 0 ? (
        <>
          <div className="cart-items">
            {cart.items.map(item => (
              <div key={item.productId} className="cart-item">
                <div className="item-info">
                  <span>Product ID: {item.productId}</span>
                  <div className="quantity-control">
                    <button onClick={() => updateCartItem(item.productId, item.quantity - 1)}>-</button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateCartItem(item.productId, e.target.value)}
                      min="1"
                    />
                    <button onClick={() => updateCartItem(item.productId, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.productId)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <h3>Total: €{formatPrice(cart.total || 0)}</h3>
          </div>
        </>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
}

export default ShoppingCart;
