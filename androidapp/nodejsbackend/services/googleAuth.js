const { OAuth2Client } = require('google-auth-library');

class GoogleAuthService {
  constructor() {
    this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
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
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      
      return {
        googleId: payload['sub'],
        email: payload['email'],
        emailVerified: payload['email_verified'],
        fullName: payload['name'],
        givenName: payload['given_name'],
        familyName: payload['family_name'],
        profilePicture: payload['picture'],
        locale: payload['locale']
      };
    } catch (error) {
      console.error('Google token verification failed:', error);
      throw new Error('Invalid Google token');
    }
  }

  /**
   * Generate username from email or name
   * @param {string} email - User's email
   * @param {string} fullName - User's full name
   * @returns {string} Generated username
   */
  generateUsername(email, fullName) {
    // Try using name first, fall back to email prefix
    let username = fullName 
      ? fullName.toLowerCase().replace(/\s+/g, '') 
      : email.split('@')[0];
    
    // Remove special characters and ensure it's at least 3 characters
    username = username.replace(/[^a-zA-Z0-9]/g, '');
    if (username.length < 3) {
      username = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '');
    }
    
    return username;
  }
}

module.exports = new GoogleAuthService();
