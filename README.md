# HEX to RGB Conversion API

A RESTful API built with Express.js that converts HEX color codes to RGB format. This project includes comprehensive unit and integration tests, demonstrating best practices in API development and testing.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Usage Examples](#usage-examples)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Features

- Convert HEX color codes to RGB format
- Support for both 3-digit and 6-digit HEX codes
- Support for HEX codes with or without # prefix
- RESTful API with GET and POST methods
- Comprehensive error handling
- Unit tests for conversion logic
- Integration tests for API routes
- Request/response validation

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## Installation

1. Clone or download the project:
```bash
git clone <repository-url>
cd hex-to-rgb-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=3000
NODE_ENV=development
```

## Running the Application

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

You should see the message:
```
Server is running on http://localhost:3000
```

## API Endpoints

### 1. Get API Information

**Endpoint:** `GET /`

**Description:** Returns API information and available endpoints.

**Response:**
```json
{
  "message": "HEX to RGB Conversion API",
  "version": "1.0.0",
  "endpoints": {
    "GET /api/convert/hex-to-rgb": "Convert HEX to RGB (query param)",
    "POST /api/convert/hex-to-rgb": "Convert HEX to RGB (body param)"
  }
}
```

### 2. Convert HEX to RGB (GET)

**Endpoint:** `GET /api/convert/hex-to-rgb`

**Query Parameters:**
- `hex` (required): HEX color code (with or without #)

**Example Request:**
```
GET /api/convert/hex-to-rgb?hex=FF5733
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "hex": "#FF5733",
    "rgb": {
      "r": 255,
      "g": 87,
      "b": 51
    },
    "css": "rgb(255, 87, 51)"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "Invalid hex color code",
  "message": "Please provide a valid hex color code (e.g., FFFFFF or #FFFFFF)"
}
```

### 3. Convert HEX to RGB (POST)

**Endpoint:** `POST /api/convert/hex-to-rgb`

**Request Body:**
```json
{
  "hex": "FFA500"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "hex": "#FFA500",
    "rgb": {
      "r": 255,
      "g": 165,
      "b": 0
    },
    "css": "rgb(255, 165, 0)"
  }
}
```

## Testing

### Run All Tests
```bash
npm test
```

### Run Unit Tests Only
```bash
npm run test:unit
```

### Run Integration Tests Only
```bash
npm run test:integration
```

### Run Tests with Coverage
```bash
npm test -- --coverage
```

### Test Results

The project includes:
- **18 Unit Tests** - Testing the HEX to RGB conversion function
- **10 Integration Tests** - Testing the API routes and error handling

Expected output:
```
PASS  tests/unit/hexToRgb.test.js
PASS  tests/integration/convert.route.test.js

Test Suites: 2 passed, 2 total
Tests:       28 passed, 28 total
```

## Project Structure

```
hex-to-rgb-api/
├── src/
│   ├── utils/
│   │   └── hexToRgb.js          # HEX to RGB conversion logic
│   ├── routes/
│   │   └── convert.js           # API routes
│   └── app.js                   # Express application setup
├── tests/
│   ├── unit/
│   │   └── hexToRgb.test.js     # Unit tests
│   └── integration/
│       └── convert.route.test.js # Integration tests
├── .env                          # Environment variables
├── package.json                  # Project dependencies
└── README.md                     # This file
```

## Usage Examples

### Using cURL

**GET Request:**
```bash
curl "http://localhost:3000/api/convert/hex-to-rgb?hex=FF5733"
```

**POST Request:**
```bash
curl -X POST http://localhost:3000/api/convert/hex-to-rgb \
  -H "Content-Type: application/json" \
  -d '{"hex":"FFA500"}'
```

### Using JavaScript (Fetch API)

**GET Request:**
```javascript
fetch('http://localhost:3000/api/convert/hex-to-rgb?hex=FF5733')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

**POST Request:**
```javascript
fetch('http://localhost:3000/api/convert/hex-to-rgb', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ hex: 'FFA500' })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

### Using Postman

1. Open Postman
2. Create a new GET request
3. Enter URL: `http://localhost:3000/api/convert/hex-to-rgb`
4. Add query parameter: `hex` = `FF5733`
5. Click Send

### Using VS Code REST Client

Create a file `api-tests.http`:

```http
### Convert HEX to RGB
GET http://localhost:3000/api/convert/hex-to-rgb?hex=FF5733

### Convert HEX to RGB - POST
POST http://localhost:3000/api/convert/hex-to-rgb
Content-Type: application/json

{
  "hex": "FFA500"
}
```

## Supported HEX Formats

The API supports various HEX color code formats:

| Format | Example | Description |
|--------|---------|-------------|
| 6-digit | `FF5733` | Standard HEX format |
| 6-digit with # | `#FF5733` | HEX with hash prefix |
| 3-digit | `F0F` | Shorthand format (expands to `FF00FF`) |
| 3-digit with # | `#F0F` | Shorthand with hash prefix |
| Lowercase | `ff5733` | Case insensitive |
| Mixed case | `Ff5733` | Case insensitive |

## Error Handling

The API returns appropriate HTTP status codes and error messages:

### 400 Bad Request

**Missing Parameter:**
```json
{
  "success": false,
  "error": "Missing hex parameter",
  "message": "Please provide a hex color code in the query string"
}
```

**Invalid HEX Code:**
```json
{
  "success": false,
  "error": "Invalid hex color code",
  "message": "Please provide a valid hex color code (e.g., FFFFFF or #FFFFFF)"
}
```

### 404 Not Found

**Unknown Route:**
```json
{
  "success": false,
  "error": "Route not found"
}
```

## Common Color Examples

Test the API with these common colors:

| Color Name | HEX Code | RGB Result |
|------------|----------|------------|
| White | `FFFFFF` | rgb(255, 255, 255) |
| Black | `000000` | rgb(0, 0, 0) |
| Red | `FF0000` | rgb(255, 0, 0) |
| Green | `00FF00` | rgb(0, 255, 0) |
| Blue | `0000FF` | rgb(0, 0, 255) |
| Yellow | `FFFF00` | rgb(255, 255, 0) |
| Orange | `FFA500` | rgb(255, 165, 0) |
| Purple | `800080` | rgb(128, 0, 128) |
| Gray | `808080` | rgb(128, 128, 128) |

## Dependencies

### Production Dependencies
- **express** (^4.18.2): Fast, unopinionated web framework
- **dotenv** (^16.3.1): Environment variable management

### Development Dependencies
- **jest** (^29.6.4): JavaScript testing framework
- **supertest** (^6.3.3): HTTP assertion library
- **nodemon** (^3.0.1): Auto-restart during development

## API Response Format

All successful responses follow this structure:

```json
{
  "success": true,
  "data": {
    "hex": "#RRGGBB",
    "rgb": {
      "r": 0-255,
      "g": 0-255,
      "b": 0-255
    },
    "css": "rgb(r, g, b)"
  }
}
```

All error responses follow this structure:

```json
{
  "success": false,
  "error": "Error type",
  "message": "Detailed error message"
}
```

## Best Practices Demonstrated

This project demonstrates several best practices:

1. **Separation of Concerns**: Business logic separated from route handlers
2. **Error Handling**: Comprehensive validation and error messages
3. **Testing**: Both unit and integration tests with good coverage
4. **Environment Variables**: Configuration through .env file
5. **RESTful Design**: Proper HTTP methods and status codes
6. **Documentation**: Clear API documentation and examples
7. **Code Quality**: Clean, readable, and maintainable code

## Troubleshooting

### Port Already in Use

If you see `Error: listen EADDRINUSE: address already in use :::3000`:

1. Change the PORT in `.env` file to a different number (e.g., 3001)
2. Or kill the process using port 3000:

**Windows:**
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
lsof -ti:3000 | xargs kill -9
```

### Tests Failing

If tests fail:

1. Make sure all dependencies are installed: `npm install`
2. Check Node.js version: `node --version` (should be v14+)
3. Clear Jest cache: `npx jest --clearCache`
4. Run tests in verbose mode: `npm test -- --verbose`

### Cannot Connect to API

1. Verify server is running: Check terminal for "Server is running" message
2. Check correct port: Make sure you're using the port from .env
3. Check URL: Ensure you're using `http://localhost:3000` (not https)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Run tests: `npm test`
5. Commit changes: `git commit -m "Add feature"`
6. Push to branch: `git push origin feature-name`
7. Submit a pull request

## License

This project is licensed under the MIT License.

## Author

Created as a demonstration of REST API development with Express.js, including comprehensive testing and documentation.

## Acknowledgments

- Express.js documentation
- Jest testing framework
- REST API best practices

---

**Need Help?** If you encounter any issues or have questions, please open an issue in the repository or contact the maintainer.

**Version:** 1.0.0  
**Last Updated:** 2024