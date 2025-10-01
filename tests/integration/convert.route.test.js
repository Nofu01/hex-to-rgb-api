const request = require('supertest');
const app = require('../../src/app');

describe('Convert Route Integration Tests', () => {
  
  describe('GET /api/convert/hex-to-rgb', () => {
    
    test('should convert valid hex code successfully', async () => {
      const response = await request(app)
        .get('/api/convert/hex-to-rgb')
        .query({ hex: 'FF5733' });
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.rgb).toEqual({ r: 255, g: 87, b: 51 });
      expect(response.body.data.hex).toBe('#FF5733');
      expect(response.body.data.css).toBe('rgb(255, 87, 51)');
    });
    
    test('should handle hex code with # prefix', async () => {
      const response = await request(app)
        .get('/api/convert/hex-to-rgb')
        .query({ hex: '#FFFFFF' });
      
      expect(response.status).toBe(200);
      expect(response.body.data.rgb).toEqual({ r: 255, g: 255, b: 255 });
    });
    
    test('should return 400 for missing hex parameter', async () => {
      const response = await request(app)
        .get('/api/convert/hex-to-rgb');
      
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Missing hex parameter');
    });
    
    test('should return 400 for invalid hex code', async () => {
      const response = await request(app)
        .get('/api/convert/hex-to-rgb')
        .query({ hex: 'INVALID' });
      
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Invalid hex color code');
    });
    
    test('should handle shorthand hex codes', async () => {
      const response = await request(app)
        .get('/api/convert/hex-to-rgb')
        .query({ hex: 'F0F' });
      
      expect(response.status).toBe(200);
      expect(response.body.data.rgb).toEqual({ r: 255, g: 0, b: 255 });
    });
  });
  
  describe('POST /api/convert/hex-to-rgb', () => {
    
    test('should convert valid hex code from body', async () => {
      const response = await request(app)
        .post('/api/convert/hex-to-rgb')
        .send({ hex: '00FF00' })
        .set('Content-Type', 'application/json');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.rgb).toEqual({ r: 0, g: 255, b: 0 });
    });
    
    test('should return 400 for missing hex in body', async () => {
      const response = await request(app)
        .post('/api/convert/hex-to-rgb')
        .send({})
        .set('Content-Type', 'application/json');
      
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });
  
  describe('GET /', () => {
    test('should return API documentation', async () => {
      const response = await request(app).get('/');
      
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('HEX to RGB Conversion API');
      expect(response.body.endpoints).toBeDefined();
    });
  });
  
  describe('404 Error handling', () => {
    test('should return 404 for unknown routes', async () => {
      const response = await request(app).get('/unknown-route');
      
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Route not found');
    });
  });
});



