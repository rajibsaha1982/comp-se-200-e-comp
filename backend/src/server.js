import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import {
  isEmpty,
  capitalize,
  isValidEmail,
  isValidPrice,
  isValidSentenceCase,
  isValidProductDescription,
  isValidQuantity,
  isValidCartItems,
  sanitizeProductName,
  isValidProductStructure
} from './validators/index.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory database
let products = [];
let producers = [];
let carts = {};

// ============== PRODUCTS ENDPOINTS ==============

/**
 * GET /api/products
 * Search products by category, price range, producer, or contents
 */
app.get('/api/products', (req, res) => {
  const { category, minPrice, maxPrice, producer, contents } = req.query;
  
  let results = products;
  
  if (category) {
    results = results.filter(p => p.category && p.category.toLowerCase().includes(category.toLowerCase()));
  }
  
  if (minPrice !== undefined) {
    results = results.filter(p => p.price >= parseFloat(minPrice));
  }
  
  if (maxPrice !== undefined) {
    results = results.filter(p => p.price <= parseFloat(maxPrice));
  }
  
  if (producer) {
    results = results.filter(p => p.producer && p.producer.toLowerCase().includes(producer.toLowerCase()));
  }
  
  if (contents) {
    results = results.filter(p => p.contents && p.contents.toLowerCase().includes(contents.toLowerCase()));
  }
  
  res.json(results);
});

/**
 * GET /api/products/:id
 * Get a single product by ID
 */
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  res.json(product);
});

/**
 * POST /api/products
 * Add a new product (by producer)
 */
app.post('/api/products', (req, res) => {
  const { name, price, producer, category, contents, description } = req.body;
  
  // Validation
  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'Product name is required' });
  }
  
  if (price === undefined || price === null) {
    return res.status(400).json({ error: 'Price is required' });
  }
  
  if (typeof price !== 'number' || price < 0) {
    return res.status(400).json({ error: 'Price must be a positive number' });
  }
  
  // Check if price has max 2 decimal places
  if (!Number.isFinite(price) || price.toString().split('.')[1]?.length > 2) {
    return res.status(400).json({ error: 'Price must have maximum 2 decimal places' });
  }
  
  const product = {
    id: uuidv4(),
    name,
    price: parseFloat(price.toFixed(2)),
    producer: producer || null,
    category: category || null,
    contents: contents || null,
    description: description || null,
    createdAt: new Date().toISOString()
  };
  
  products.push(product);
  res.status(201).json(product);
});

// ============== SHOPPING CART ENDPOINTS ==============

/**
 * POST /api/cart
 * Create a new shopping cart
 */
app.post('/api/cart', (req, res) => {
  const cartId = uuidv4();
  carts[cartId] = {
    id: cartId,
    items: [],
    createdAt: new Date().toISOString()
  };
  
  res.status(201).json(carts[cartId]);
});

/**
 * GET /api/cart/:cartId
 * Get cart details with calculated total
 */
app.get('/api/cart/:cartId', (req, res) => {
  const cart = carts[req.params.cartId];
  
  if (!cart) {
    return res.status(404).json({ error: 'Cart not found' });
  }
  
  // Calculate total price
  const total = cart.items.reduce((sum, item) => {
    const product = products.find(p => p.id === item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);
  
  res.json({
    ...cart,
    total: parseFloat(total.toFixed(2))
  });
});

/**
 * POST /api/cart/:cartId/items
 * Add product to cart
 */
app.post('/api/cart/:cartId/items', (req, res) => {
  const { productId, quantity } = req.body;
  const cart = carts[req.params.cartId];
  
  if (!cart) {
    return res.status(404).json({ error: 'Cart not found' });
  }
  
  if (!productId) {
    return res.status(400).json({ error: 'Product ID is required' });
  }
  
  if (!quantity || quantity < 1) {
    return res.status(400).json({ error: 'Quantity must be at least 1' });
  }
  
  const product = products.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  // Check if product already in cart
  const existingItem = cart.items.find(i => i.productId === productId);
  
  if (existingItem) {
    existingItem.quantity += parseInt(quantity);
  } else {
    cart.items.push({
      productId,
      quantity: parseInt(quantity)
    });
  }
  
  res.json(cart);
});

/**
 * PUT /api/cart/:cartId/items/:productId
 * Update quantity of product in cart
 */
app.put('/api/cart/:cartId/items/:productId', (req, res) => {
  const { quantity } = req.body;
  const cart = carts[req.params.cartId];
  
  if (!cart) {
    return res.status(404).json({ error: 'Cart not found' });
  }
  
  if (quantity === undefined || quantity < 0) {
    return res.status(400).json({ error: 'Quantity must be non-negative' });
  }
  
  const item = cart.items.find(i => i.productId === req.params.productId);
  
  if (!item) {
    return res.status(404).json({ error: 'Product not in cart' });
  }
  
  if (quantity === 0) {
    cart.items = cart.items.filter(i => i.productId !== req.params.productId);
  } else {
    item.quantity = parseInt(quantity);
  }
  
  res.json(cart);
});

/**
 * DELETE /api/cart/:cartId/items/:productId
 * Remove product from cart
 */
app.delete('/api/cart/:cartId/items/:productId', (req, res) => {
  const cart = carts[req.params.cartId];
  
  if (!cart) {
    return res.status(404).json({ error: 'Cart not found' });
  }
  
  cart.items = cart.items.filter(i => i.productId !== req.params.productId);
  
  res.json(cart);
});

// ============== CHECKOUT ENDPOINT ==============

/**
 * POST /api/checkout
 * Initiate checkout (integrates with third-party payment service)
 */
app.post('/api/checkout', (req, res) => {
  const { cartId, userEmail } = req.body;
  
  if (!cartId || !userEmail) {
    return res.status(400).json({ error: 'Cart ID and user email are required' });
  }
  
  const cart = carts[req.params.cartId];
  
  if (!cart) {
    return res.status(404).json({ error: 'Cart not found' });
  }
  
  if (cart.items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }
  
  // Simulate third-party payment service integration
  const checkoutSession = {
    id: uuidv4(),
    cartId,
    userEmail,
    status: 'pending',
    paymentUrl: `https://payment-gateway.example.com/checkout/${uuidv4()}`,
    createdAt: new Date().toISOString()
  };
  
  res.status(201).json(checkoutSession);
});

// ============== PRODUCER ENDPOINTS ==============

/**
 * GET /api/producers
 * Get all producers
 */
app.get('/api/producers', (req, res) => {
  res.json(producers);
});

/**
 * POST /api/producers
 * Register a new producer
 */
app.post('/api/producers', (req, res) => {
  const { name, email, description } = req.body;
  
  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'Producer name is required' });
  }
  
  if (!email || email.trim() === '') {
    return res.status(400).json({ error: 'Producer email is required' });
  }
  
  const producer = {
    id: uuidv4(),
    name,
    email,
    description: description || null,
    createdAt: new Date().toISOString()
  };
  
  producers.push(producer);
  res.status(201).json(producer);
});

// ============== HEALTH CHECK ==============

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
