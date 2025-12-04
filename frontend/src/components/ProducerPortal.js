/**
 * Producer Portal Component
 */
import React, { useState } from 'react';
import { isValidEmail, isValidPrice, isValidProductName } from '../utils/validators';
import './ProducerPortal.css';

export function ProducerPortal() {
  const [activeTab, setActiveTab] = useState('add-product');
  const [products, setProducts] = useState([]);
  const [producers, setProducers] = useState([]);

  // Product form state
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    producer: '',
    category: '',
    contents: '',
    description: ''
  });

  // Producer form state
  const [producerForm, setProducerForm] = useState({
    name: '',
    email: '',
    description: ''
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProductForm(prev => ({ ...prev, [name]: value }));
  };

  const handleProducerChange = (e) => {
    const { name, value } = e.target;
    setProducerForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setMessage('');

    // Validate inputs
    if (!isValidProductName(productForm.name)) {
      setMessage('Product name is required');
      return;
    }

    if (!productForm.price || !isValidPrice(parseFloat(productForm.price))) {
      setMessage('Valid price with max 2 decimal places is required');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...productForm,
          price: parseFloat(productForm.price)
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to add product');
      }

      const newProduct = await response.json();
      setProducts([...products, newProduct]);
      setProductForm({
        name: '',
        price: '',
        producer: '',
        category: '',
        contents: '',
        description: ''
      });
      setMessage('Product added successfully!');
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterProducer = async (e) => {
    e.preventDefault();
    setMessage('');

    // Validate inputs
    if (!isValidProductName(producerForm.name)) {
      setMessage('Producer name is required');
      return;
    }

    if (!isValidEmail(producerForm.email)) {
      setMessage('Valid email is required');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/producers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producerForm)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to register producer');
      }

      const newProducer = await response.json();
      setProducers([...producers, newProducer]);
      setProducerForm({
        name: '',
        email: '',
        description: ''
      });
      setMessage('Producer registered successfully!');
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="producer-portal">
      <h1>Producer Portal</h1>

      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'add-product' ? 'active' : ''}`}
          onClick={() => setActiveTab('add-product')}
        >
          Add Product
        </button>
        <button
          className={`tab-button ${activeTab === 'register' ? 'active' : ''}`}
          onClick={() => setActiveTab('register')}
        >
          Register Producer
        </button>
      </div>

      {message && <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>{message}</div>}

      {activeTab === 'add-product' && (
        <div className="form-container">
          <h2>Add New Product</h2>
          <form onSubmit={handleAddProduct} className="producer-form">
            <div className="form-group">
              <label>Product Name *</label>
              <input
                type="text"
                name="name"
                value={productForm.name}
                onChange={handleProductChange}
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="form-group">
              <label>Price (EUR) *</label>
              <input
                type="number"
                name="price"
                step="0.01"
                value={productForm.price}
                onChange={handleProductChange}
                placeholder="0.00"
                required
              />
            </div>

            <div className="form-group">
              <label>Producer Name</label>
              <input
                type="text"
                name="producer"
                value={productForm.producer}
                onChange={handleProductChange}
                placeholder="Your business name (optional)"
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                name="category"
                value={productForm.category}
                onChange={handleProductChange}
                placeholder="e.g., Vegetables, Dairy (optional)"
              />
            </div>

            <div className="form-group">
              <label>Contents</label>
              <input
                type="text"
                name="contents"
                value={productForm.contents}
                onChange={handleProductChange}
                placeholder="e.g., Organic, GMO-free (optional)"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={productForm.description}
                onChange={handleProductChange}
                placeholder="Product description (optional)"
                rows="4"
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Product'}
            </button>
          </form>
        </div>
      )}

      {activeTab === 'register' && (
        <div className="form-container">
          <h2>Register as Producer</h2>
          <form onSubmit={handleRegisterProducer} className="producer-form">
            <div className="form-group">
              <label>Business Name *</label>
              <input
                type="text"
                name="name"
                value={producerForm.name}
                onChange={handleProducerChange}
                placeholder="Your business name"
                required
              />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={producerForm.email}
                onChange={handleProducerChange}
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Business Description</label>
              <textarea
                name="description"
                value={producerForm.description}
                onChange={handleProducerChange}
                placeholder="Tell us about your business (optional)"
                rows="4"
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ProducerPortal;
