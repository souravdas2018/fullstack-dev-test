/**
 * Entry Point - Express App
 * 
 * This file initializes the Express application with essential middleware,
 * routes, and centralized error handling.
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const videoRoutes = require('./routes/video.routes');

const app = express();
const PORT = process.env.PORT || 3020;

// ======================
// Middleware Setup
// ======================

// Enable CORS for all routes
app.use(cors());

// Set security-related HTTP headers
app.use(helmet());

// Log HTTP requests in development-friendly format
app.use(morgan('dev'));

// Parse incoming JSON payloads
app.use(express.json());

// ======================
// API Routes
// ======================

// All video-related routes
app.use('/api/videos', videoRoutes);

// ======================
// Error Handling Middleware
// ======================

/**
 * Centralized error handler
 * Catches any unhandled errors and returns a consistent response
 */
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error for debugging

  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500
    }
  });
});

// ======================
// Start Server
// ======================

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

module.exports = app;
