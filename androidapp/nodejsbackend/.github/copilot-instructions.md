<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Vedic Astro Backend - Copilot Instructions

## Project Overview
This is a Node.js backend API server for a Vedic Astrology mobile application. The server handles user authentication, course enrollment, and payment processing using MySQL database.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL with mysql2 driver
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Environment**: dotenv for configuration

## Key Features
- User registration and login with JWT authentication
- Course management and enrollment tracking
- Payment processing and history tracking
- User profile management
- Secure password handling with bcrypt

## Code Style Guidelines
- Use async/await for database operations
- Always validate input using express-validator
- Include proper error handling with try-catch blocks
- Use meaningful HTTP status codes
- Return consistent JSON response format: `{success: boolean, message: string, data?: object}`
- Include authentication middleware for protected routes
- Use connection pooling for database operations

## Database Schema
- **users**: User account information with authentication
- **courses**: Available astrology courses
- **payments**: Payment records and transaction tracking
- **user_courses**: Enrollment and progress tracking

## Security Considerations
- All passwords are hashed using bcrypt with salt rounds of 12
- JWT tokens expire in 1 hour by default
- Input validation and sanitization on all endpoints
- Protected routes require valid JWT authentication
- CORS configuration for cross-origin requests

## Environment Variables
- Database connection details (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)
- JWT secrets (JWT_SECRET, JWT_REFRESH_SECRET)
- Server configuration (PORT, NODE_ENV)

When working with this codebase:
1. Always use parameterized queries to prevent SQL injection
2. Validate all input data before processing
3. Handle database connection errors gracefully
4. Include appropriate logging for debugging
5. Follow RESTful API conventions for endpoints
