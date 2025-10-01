
require('dotenv').config();
const express = require('express');
const convertRoutes = require('./routes/convert');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'HEX to RGB Conversion API',
    version: '1.0.0',
    endpoints: {
      'GET /api/convert/hex-to-rgb': 'Convert HEX to RGB (query param)',
      'POST /api/convert/hex-to-rgb': 'Convert HEX to RGB (body param)'
    },
    examples: {
      get: '/api/convert/hex-to-rgb?hex=FF5733',
      post: 'POST /api/convert/hex-to-rgb with body: { "hex": "FF5733" }'
    }
  });
});

app.use('/api/convert', convertRoutes);

// Error handling middleware
app.use((req, res) => {
  res.status(404).json({

    
    success: false,
    error: 'Route not found'
  });
});

// Start server only if not in test mode
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;