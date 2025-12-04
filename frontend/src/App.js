/**
 * Main React Application
 */
import React, { useState, useEffect } from 'react';
import { CartProvider, CartContext } from './contexts/CartContext';
import ProductSearch from './components/ProductSearch';
import ShoppingCart from './components/ShoppingCart';
import ProducerPortal from './components/ProducerPortal';
import './App.css';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('store');
  const cartContext = React.useContext(CartContext);

  useEffect(() => {
    // Create a cart when the app loads
    if (!cartContext.cart) {
      cartContext.createCart();
    }
  }, [cartContext]);

  const handleProductSelect = (product) => {
    if (cartContext.cart) {
      cartContext.addToCart(product.id, 1);
      alert(`Added "${product.name}" to cart!`);
    }
  };

  const handleCheckout = async () => {
    if (!cartContext.cart || !cartContext.cart.items.length) {
      alert('Cart is empty!');
      return;
    }

    const userEmail = prompt('Enter your email for checkout:');
    if (!userEmail) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartId: cartContext.cart.id,
          userEmail: userEmail
        })
      });

      if (!response.ok) {
        throw new Error('Checkout failed');
      }

      const checkoutSession = await response.json();
      alert(`Redirecting to payment: ${checkoutSession.paymentUrl}`);
      // In a real app, redirect to checkoutSession.paymentUrl
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🍕 Food Station</h1>
        <nav className="nav">
          <button
            className={`nav-button ${currentPage === 'store' ? 'active' : ''}`}
            onClick={() => setCurrentPage('store')}
          >
            Store
          </button>
          <button
            className={`nav-button ${currentPage === 'cart' ? 'active' : ''}`}
            onClick={() => setCurrentPage('cart')}
          >
            🛒 Cart {cartContext.cart?.items?.length ? `(${cartContext.cart.items.length})` : ''}
          </button>
          <button
            className={`nav-button ${currentPage === 'portal' ? 'active' : ''}`}
            onClick={() => setCurrentPage('portal')}
          >
            Producer Portal
          </button>
        </nav>
      </header>

      <main className="app-main">
        {currentPage === 'store' && (
          <div className="page">
            <ProductSearch onSelect={handleProductSelect} />
          </div>
        )}

        {currentPage === 'cart' && (
          <div className="page">
            <ShoppingCart />
            {cartContext.cart?.items?.length > 0 && (
              <div className="checkout-section">
                <button className="checkout-button" onClick={handleCheckout}>
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        )}

        {currentPage === 'portal' && (
          <div className="page">
            <ProducerPortal />
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>&copy; 2024 Food Station. All rights reserved.</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
