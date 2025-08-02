const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2/promise');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const authRoutes = require('./routes/auth');
const paymentRoutes = require('./routes/payments');
const userRoutes = require('./routes/users');
const googlePlayRoutes = require('./routes/googlePlay');

// Database connection
const db = require('./config/database');
const googlePlayBillingService = require('./services/googlePlayBilling');

// Test database connection
async function testDatabaseConnection() {
  try {
    const connection = await db.getConnection();
    console.log('✅ Database connected successfully');
    
    // Initialize database if connected
    if (db.initializeDatabase) {
      await db.initializeDatabase();
    }
    
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.log('⚠️  Server running without database functionality');
    console.log('💡 Please configure MySQL and update .env to enable database features');
    return false;
  }
}

// Initialize Google Play Billing service
async function initializeGooglePlayBilling() {
  try {
    await googlePlayBillingService.initialize();
  } catch (error) {
    console.error('⚠️  Google Play Billing initialization failed:', error.message);
  }
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/billing', googlePlayRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Vedic Astro Backend Server is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
  await testDatabaseConnection();
  await initializeGooglePlayBilling();
});

module.exports = app;
