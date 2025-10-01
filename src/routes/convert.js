const express = require('express');
const router = express.Router();
const hexToRgb = require('../utils/hexToRgb');

/**
 * GET /api/convert/hex-to-rgb?hex=FFFFFF
 * Converts HEX color to RGB
 */
router.get('/hex-to-rgb', (req, res) => {
  const { hex } = req.query;
  
  // Validate input
  if (!hex) {
    return res.status(400).json({
      success: false,
      error: 'Missing hex parameter',
      message: 'Please provide a hex color code in the query string'
    });
  }
  
  // Convert hex to RGB
  const rgb = hexToRgb(hex);
  
  // Check if conversion was successful
  if (!rgb) {
    return res.status(400).json({
      success: false,
      error: 'Invalid hex color code',
      message: 'Please provide a valid hex color code (e.g., FFFFFF or #FFFFFF)'
    });
  }
  
  // Return successful response
  res.json({
    success: true,
    data: {
      hex: hex.startsWith('#') ? hex : `#${hex}`,
      rgb: rgb,
      css: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
    }
  });
});

/**
 * POST /api/convert/hex-to-rgb
 * Converts HEX color to RGB (body version)
 */
router.post('/hex-to-rgb', (req, res) => {
  const { hex } = req.body;
  
  if (!hex) {
    return res.status(400).json({
      success: false,
      error: 'Missing hex parameter',
      message: 'Please provide a hex color code in the request body'
    });
  }
  
  const rgb = hexToRgb(hex);
  
  if (!rgb) {
    return res.status(400).json({
      success: false,
      error: 'Invalid hex color code',
      message: 'Please provide a valid hex color code (e.g., FFFFFF or #FFFFFF)'
    });
  }
  
  res.json({
    success: true,
    data: {
      hex: hex.startsWith('#') ? hex : `#${hex}`,
      rgb: rgb,
      css: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
    }
  });
});

module.exports = router;