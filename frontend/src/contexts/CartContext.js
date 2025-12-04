/**
 * Shopping Cart Context for React
 */
import React, { createContext, useState, useCallback } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createCart = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/cart`, {
        method: 'POST'
      });
      const data = await response.json();
      setCart(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const getCart = useCallback(async (cartId) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/cart/${cartId}`);
      const data = await response.json();
      setCart(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addToCart = useCallback(async (productId, quantity) => {
    if (!cart) return;
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/cart/${cart.id}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity: parseInt(quantity) })
      });
      const data = await response.json();
      setCart(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [cart]);

  const updateCartItem = useCallback(async (productId, quantity) => {
    if (!cart) return;
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/cart/${cart.id}/items/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: parseInt(quantity) })
      });
      const data = await response.json();
      setCart(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [cart]);

  const removeFromCart = useCallback(async (productId) => {
    if (!cart) return;
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/cart/${cart.id}/items/${productId}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      setCart(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [cart]);

  const value = {
    cart,
    loading,
    error,
    createCart,
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
