const { OAuth2Client } = require('google-auth-library');

class GoogleAuthService {
  constructor() {
    this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  /**
   * Initialize the Google Auth service
   */
  async initialize() {
    if (!process.env.GOOGLE_CLIENT_ID) {
      console.warn('⚠️  Google Client ID not configured. Google login will be disabled.');
      return false;
    }
    console.log('✅ Google Auth service initialized');
    return true;
  }

  /**
   * Verify Google ID token and extract user information
   * @param {string} token - Google ID token from client
   * @returns {Object} User information from Google
   */
  async verifyIdToken(token) {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
      });

      const payload = ticket.getPayload();
      
      if (!payload) {
        throw new Error('Invalid Google token payload');
      }

      return {
        googleId: payload.sub,
        email: payload.email,
        emailVerified: payload.email_verified || false,
        fullName: payload.name,
        firstName: payload.given_name,
        lastName: payload.family_name,
        profilePicture: payload.picture,
        locale: payload.locale
      };
    } catch (error) {
      console.error('Google token verification failed:', error);
      throw new Error('Invalid Google token');
    }
  }

  /**
   * Generate a unique username from email and name
   * @param {string} email - User's email
   * @param {string} fullName - User's full name
   * @returns {string} Generated username
   */
  generateUsername(email, fullName) {
    // Try to use name first, fallback to email prefix
    let baseUsername;
    
    if (fullName) {
      // Remove spaces and special characters, convert to lowercase
      baseUsername = fullName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '')
        .substring(0, 15);
    } else {
      // Use email prefix
      baseUsername = email
        .split('@')[0]
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '')
        .substring(0, 15);
    }

    // Ensure minimum length
    if (baseUsername.length < 3) {
      baseUsername = 'user' + baseUsername;
    }

    return baseUsername;
  }

  /**
   * Validate Google client configuration
   * @returns {boolean} True if properly configured
   */
  isConfigured() {
    return !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
  }

  /**
   * Get Google OAuth URL for web-based login (optional)
   * @param {string} redirectUri - Redirect URI after login
   * @returns {string} Google OAuth URL
   */
  getAuthUrl(redirectUri) {
    const oauth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      redirectUri
    );

    const scopes = [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile'
    ];

    return oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent'
    });
  }

  /**
   * Exchange authorization code for tokens (for web-based flow)
   * @param {string} code - Authorization code from Google
   * @param {string} redirectUri - Redirect URI used in auth
   * @returns {Object} Token information
   */
  async exchangeCodeForTokens(code, redirectUri) {
    const oauth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      redirectUri
    );

    try {
      const { tokens } = await oauth2Client.getToken(code);
      return tokens;
    } catch (error) {
      console.error('Token exchange failed:', error);
      throw new Error('Failed to exchange authorization code');
    }
  }
}

module.exports = new GoogleAuthService();
