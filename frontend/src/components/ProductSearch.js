/**
 * Product Search Component
 */
import React, { useState, useEffect } from 'react';
import { isValidPrice } from '../utils/validators';
import './ProductSearch.css';

export function ProductSearch({ onSelect }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filter states
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [producer, setProducer] = useState('');
  const [contents, setContents] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/products`);
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const params = new URLSearchParams();
      if (category) params.append('category', category);
      if (minPrice && isValidPrice(parseFloat(minPrice))) params.append('minPrice', minPrice);
      if (maxPrice && isValidPrice(parseFloat(maxPrice))) params.append('maxPrice', maxPrice);
      if (producer) params.append('producer', producer);
      if (contents) params.append('contents', contents);

      const url = `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/products${params.toString() ? '?' + params.toString() : ''}`;
      const response = await fetch(url);
      const data = await response.json();
      setFilteredProducts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
    setProducer('');
    setContents('');
    setFilteredProducts(products);
  };

  if (loading && products.length === 0) {
    return <div className="product-search"><p>Loading products...</p></div>;
  }

  return (
    <div className="product-search">
      <h2>Search Products</h2>
      
      <form onSubmit={handleSearch} className="search-form">
        <div className="form-group">
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g., Vegetables"
          />
        </div>

        <div className="form-group">
          <label>Min Price:</label>
          <input
            type="number"
            step="0.01"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="0.00"
          />
        </div>

        <div className="form-group">
          <label>Max Price:</label>
          <input
            type="number"
            step="0.01"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="999.99"
          />
        </div>

        <div className="form-group">
          <label>Producer:</label>
          <input
            type="text"
            value={producer}
            onChange={(e) => setProducer(e.target.value)}
            placeholder="e.g., Farm XYZ"
          />
        </div>

        <div className="form-group">
          <label>Contents:</label>
          <input
            type="text"
            value={contents}
            onChange={(e) => setContents(e.target.value)}
            placeholder="e.g., Organic"
          />
        </div>

        <div className="button-group">
          <button type="submit">Search</button>
          <button type="button" onClick={handleReset}>Reset</button>
        </div>
      </form>

      {error && <div className="error-message">{error}</div>}

      <div className="products-list">
        <h3>Results: {filteredProducts.length} products found</h3>
        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <h4>{product.name}</h4>
                <p className="price">€{product.price.toFixed(2)}</p>
                {product.category && <p className="category">{product.category}</p>}
                {product.producer && <p className="producer">By: {product.producer}</p>}
                {product.contents && <p className="contents">{product.contents}</p>}
                {product.description && <p className="description">{product.description}</p>}
                <button onClick={() => onSelect && onSelect(product)}>Add to Cart</button>
              </div>
            ))}
          </div>
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
}

export default ProductSearch;
