# Vedic Astro Backend API

A Node.js backend server for the Vedic Astrology mobile application that handles user authentication, course enrollment, and payment processing.

## Features

- **User Management**: Registration, login, profile management
- **Authentication**: JWT-based authentication with refresh tokens
- **Google OAuth**: Sign in with Google account integration
- **Google Play Billing**: In-app purchases and subscription validation
- **Course Management**: View available astrology courses
- **Payment Processing**: Track payments and course enrollments
- **Real-time Notifications**: Google Play webhook support
- **Database**: MySQL with connection pooling
- **Security**: Password hashing, input validation, CORS protection

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL** - Database
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **google-auth-library** - Google OAuth integration
- **googleapis** - Google Play Billing API
- **google-play-billing-validator** - Purchase verification

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
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

4. Edit `.env` file with your database credentials and Google OAuth settings:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=vedic_astro
JWT_SECRET=your_very_secure_jwt_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
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

- **users** - User account information
- **courses** - Available astrology courses  
- **payments** - Payment records and transactions
- **user_courses** - Course enrollment tracking

Sample courses are automatically inserted during database initialization.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)
- `PUT /api/users/change-password` - Change password (protected)
- `GET /api/users/courses` - Get enrolled courses (protected)
- `DELETE /api/users/account` - Deactivate account (protected)

### Payments
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
│   └── payments.js          # Payment processing routes
├── .github/
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
