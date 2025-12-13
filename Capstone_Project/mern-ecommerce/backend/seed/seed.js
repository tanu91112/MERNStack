require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Product = require('../models/Product');
const User = require('../models/User');

const products = [
  {
    name: 'Apple iPhone 15 Pro',
    slug: 'apple-iphone-15-pro',
    description: 'Latest Apple smartphone with A17 Pro chip, titanium design, and advanced camera system.',
    price: 999.99,
    images: ['https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=500'],
    countInStock: 25,
    category: 'Electronics'
  },
  {
    name: 'Samsung Galaxy Watch 6',
    slug: 'samsung-galaxy-watch-6',
    description: 'Smartwatch with health monitoring, fitness tracking, and premium design.',
    price: 299.99,
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500'],
    countInStock: 30,
    category: 'Wearables'
  },
  {
    name: 'MacBook Air M2',
    slug: 'macbook-air-m2',
    description: 'Ultra-thin laptop with M2 chip, 13.6-inch Liquid Retina display, and all-day battery life.',
    price: 1199.99,
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500'],
    countInStock: 15,
    category: 'Computers'
  },
  {
    name: 'Sony WH-1000XM5 Headphones',
    slug: 'sony-wh-1000xm5',
    description: 'Industry-leading noise canceling headphones with premium sound quality.',
    price: 349.99,
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500'],
    countInStock: 20,
    category: 'Audio'
  },
  {
    name: 'Nike Air Max 270',
    slug: 'nike-air-max-270',
    description: 'Comfortable running shoes with responsive cushioning and stylish design.',
    price: 129.99,
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500'],
    countInStock: 40,
    category: 'Footwear'
  },
  {
    name: 'Levis 501 Original Fit Jeans',
    slug: 'levis-501-original-fit',
    description: 'Classic straight fit jeans made from 100% cotton denim.',
    price: 69.99,
    images: ['https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=500'],
    countInStock: 35,
    category: 'Apparel'
  },
  {
    name: 'KitchenAid Stand Mixer',
    slug: 'kitchenaid-stand-mixer',
    description: 'Professional-grade stand mixer with 10 speeds and tilt-head design.',
    price: 379.99,
    images: ['https://images.unsplash.com/photo-1596496050827-50c656b7e34d?auto=format&fit=crop&w=500'],
    countInStock: 12,
    category: 'Home & Kitchen'
  },
  {
    name: 'Dyson V15 Detect Vacuum',
    slug: 'dyson-v15-detect',
    description: 'Cordless vacuum cleaner with laser detection and powerful suction.',
    price: 699.99,
    images: ['https://images.unsplash.com/photo-1600221779596-92e70b0a70f0?auto=format&fit=crop&w=500'],
    countInStock: 8,
    category: 'Home Appliances'
  },
  {
    name: 'Instant Pot Duo 7-in-1',
    slug: 'instant-pot-duo',
    description: 'Multi-cooker that pressure cooks, slow cooks, sautés, steams, and more.',
    price: 89.99,
    images: ['https://images.unsplash.com/photo-1605966260015-095542ecc8cb?auto=format&fit=crop&w=500'],
    countInStock: 50,
    category: 'Home & Kitchen'
  },
  {
    name: 'Fitbit Charge 5',
    slug: 'fitbit-charge-5',
    description: 'Advanced fitness tracker with built-in GPS and stress management tools.',
    price: 179.99,
    images: ['https://images.unsplash.com/photo-1576243345690-4e4b79b63288?auto=format&fit=crop&w=500'],
    countInStock: 25,
    category: 'Wearables'
  },
  {
    name: 'Bose SoundLink Revolve+',
    slug: 'bose-soundlink-revolve-plus',
    description: '360-degree wireless speaker with deep, clear sound in all directions.',
    price: 299.99,
    images: ['https://images.unsplash.com/photo-1613047506058-3c4d45df3e0d?auto=format&fit=crop&w=500'],
    countInStock: 18,
    category: 'Audio'
  },
  {
    name: 'Patagonia Nano Puff Jacket',
    slug: 'patagonia-nano-puff',
    description: 'Lightweight insulated jacket made from recycled materials.',
    price: 199.99,
    images: ['https://images.unsplash.com/photo-1605733513597-a8f8341084e6?auto=format&fit=crop&w=500'],
    countInStock: 22,
    category: 'Outdoor'
  },
  {
    name: 'Kindle Paperwhite',
    slug: 'kindle-paperwhite',
    description: 'Waterproof ebook reader with adjustable warm light and weeks of battery life.',
    price: 139.99,
    images: ['https://images.unsplash.com/photo-1572752492865-eb50fc0b19d1?auto=format&fit=crop&w=500'],
    countInStock: 30,
    category: 'Electronics'
  },
  {
    name: 'Yeti Rambler Tumbler',
    slug: 'yeti-rambler-tumbler',
    description: 'Double-wall vacuum insulated tumbler that keeps drinks cold or hot for hours.',
    price: 34.99,
    images: ['https://images.unsplash.com/photo-1605820485233-01ba151d80d9?auto=format&fit=crop&w=500'],
    countInStock: 100,
    category: 'Drinkware'
  },
  {
    name: 'Allbirds Tree Runners',
    slug: 'allbirds-tree-runners',
    description: 'Comfortable and sustainable slip-on shoes made from eucalyptus tree fiber.',
    price: 98.99,
    images: ['https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=500'],
    countInStock: 28,
    category: 'Footwear'
  },
  {
    name: 'Olaplex Hair Perfector No. 3',
    slug: 'olaplex-hair-perfector',
    description: 'Repairing treatment that strengthens and restores damaged hair.',
    price: 28.99,
    images: ['https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=500'],
    countInStock: 75,
    category: 'Beauty'
  },
  {
    name: 'Hydro Flask Water Bottle',
    slug: 'hydro-flask-water-bottle',
    description: 'Insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours.',
    price: 34.95,
    images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=500'],
    countInStock: 60,
    category: 'Drinkware'
  },
  {
    name: 'GoPro HERO12 Black',
    slug: 'gopro-hero12-black',
    description: 'Action camera with 5.3K video, HyperSmooth 6.0 stabilization, and waterproof design.',
    price: 399.99,
    images: ['https://images.unsplash.com/photo-1516857092478-03bedac30288?auto=format&fit=crop&w=500'],
    countInStock: 15,
    category: 'Cameras'
  }
];

const seed = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    await User.deleteMany();
    await Product.insertMany(products);
    await User.create({ name: 'Admin', email: 'admin@example.com', password: 'admin123', isAdmin: true });
    await User.create({ name: 'Test User', email: 'user@example.com', password: 'user123', isAdmin: false });
    console.log('Data seeded');
    process.exit();
  } catch (err) { console.error(err); process.exit(1); }
};

seed();
