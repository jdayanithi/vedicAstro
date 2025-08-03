# Vedic Astro Backend API

A Node.js backend server for the Vedic Astrology mobile application with user authentication, strict device security, Google OAuth integration, and PhonePe payment gateway.

## Features

- **User Management**: Registration, login, profile management
- **Device Security**: Strict single-device policy with explicit logout requirement
- **Authentication**: JWT-based authentication with device validation
- **Google OAuth**: Sign in with Google account integration
- **PhonePe Payments**: Indian payment gateway integration with UPI, cards, and wallets
- **Course Management**: View and enroll in astrology courses
- **Payment Processing**: Secure payment handling with checksum verification
- **Database**: MySQL with optimized schema for payments and device tracking
- **Security**: Password hashing, input validation, CORS protection, device authorization

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL** - Database with connection pooling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **google-auth-library** - Google OAuth integration
- **axios** - HTTP client for PhonePe API calls
- **crypto** - Checksum generation for PhonePe security

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- Google Cloud Project (for OAuth)
- PhonePe Merchant Account
- npm or yarn

### Installation

1. Clone the repository and navigate to the backend directory:
```bash
cd androidapp/nodejsbackend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Edit `.env` file with your database credentials, Google OAuth, and PhonePe settings:
```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=admin
DB_NAME=ldml_db

# JWT Configuration
JWT_SECRET=your_very_secure_jwt_secret_key

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# PhonePe Payment Gateway
PHONEPE_MERCHANT_ID=your_phonepe_merchant_id
PHONEPE_SALT_KEY=your_phonepe_salt_key
PHONEPE_SALT_INDEX=1
PHONEPE_API_URL=https://api-preprod.phonepe.com/apis/pg-sandbox
PHONEPE_ENVIRONMENT=sandbox

# App URLs
APP_URL=http://localhost:3000
API_URL=http://localhost:3000
```

5. Start the server:
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000` by default.

## Database Setup

The application will automatically create the required database and tables on first run. The database includes:

- **users** - User account information with device tracking
- **user_devices** - Single device registration per user
- **courses** - Available astrology courses  
- **payments** - Payment records with PhonePe transaction details
- **user_courses** - Course enrollment tracking

Sample courses are automatically inserted during database initialization.

## Device Security

This backend implements a **strict single-device policy**:

- Each user can register only **ONE mobile device**
- No automatic device replacement - users must explicitly logout first
- Device information is completely removed on logout
- New device registration requires previous device to be logged out
- All API calls require device validation

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user with device
- `POST /api/auth/login` - User login with device registration
- `POST /api/auth/google-login` - Google OAuth login with device registration
- `POST /api/auth/logout` - User logout with device removal

### Users
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)
- `PUT /api/users/change-password` - Change password (protected)
- `GET /api/users/courses` - Get enrolled courses (protected)
- `DELETE /api/users/account` - Deactivate account (protected)

### PhonePe Payments
- `POST /api/phonepe/initiate` - Initiate payment for course (protected)
- `POST /api/phonepe/callback` - PhonePe webhook callback (public)
- `GET /api/phonepe/status/:merchantTransactionId` - Check payment status (protected)
- `GET /api/phonepe/history` - Get payment history (protected)

### General Payments
- `GET /api/payments/courses` - Get available courses
- `POST /api/payments/create` - Create payment record (protected)
- `PUT /api/payments/update/:paymentId` - Update payment status (protected)
- `GET /api/payments/history` - Get payment history (protected)
- `GET /api/payments/:paymentId` - Get payment details (protected)

### Health Check
- `GET /api/health` - Server health status

## Request/Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    // Validation errors (if applicable)
  ]
}
```

## Authentication

Protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

Tokens expire in 1 hour by default. Use the refresh token to get new access tokens.

## Development

### Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with auto-restart
- `npm test` - Run tests (not implemented yet)

### Project Structure

```
nodejsbackend/
├── config/
│   └── database.js          # Database configuration and initialization
├── middleware/
│   └── auth.js              # JWT authentication middleware
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── users.js             # User management routes
│   ├── payments.js          # Payment processing routes
│   └── phonePePayments.js   # PhonePe payment integration
├── services/
│   ├── deviceValidation.js  # Device security service
│   ├── googleAuth.js        # Google OAuth integration
│   └── phonePeService.js    # PhonePe API integration
├── .env.example             # Environment variables template
├── server.js                # Main server file
└── package.json             # Dependencies and scripts
```

## Documentation

- **[API Documentation](./API_DOCUMENTATION.md)** - Complete API reference
- **[PhonePe Integration Guide](./PHONEPE_INTEGRATION_GUIDE.md)** - PhonePe setup and usage
- **[Device Authentication Guide](./DEVICE_AUTHENTICATION_GUIDE.md)** - Device security implementation  
- **[One Device Implementation](./ONE_DEVICE_IMPLEMENTATION.md)** - Strict device policy details

## Production Deployment

### Environment Setup
1. Set `NODE_ENV=production`
2. Use production PhonePe credentials
3. Configure HTTPS with valid SSL certificate
4. Set up proper database with replication
5. Configure reverse proxy (nginx) for load balancing

### Security Checklist
- [ ] Environment variables secured
- [ ] Database credentials rotated
- [ ] HTTPS certificate installed
- [ ] PhonePe webhook URLs whitelisted
- [ ] CORS origins configured
- [ ] Rate limiting implemented
- [ ] Logging configured

## Support

For development support:
- Check API documentation for endpoint details
- Review PhonePe integration guide for payment setup
- Verify device authentication configuration
- Test with sandbox credentials before production

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License

This project is licensed under the ISC License.
│   └── copilot-instructions.md  # Copilot AI instructions
├── server.js                # Main application entry point
├── package.json            # Dependencies and scripts
├── .env.example            # Environment variables template
└── README.md               # This file
```

## Security Features

- Password hashing with bcrypt (12 salt rounds)
- JWT token authentication
- Input validation and sanitization
- SQL injection prevention with parameterized queries
- CORS configuration
- Environment variable protection

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

ISC License
