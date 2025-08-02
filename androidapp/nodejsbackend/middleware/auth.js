const jwt = require('jsonwebtoken');
const db = require('../config/database');
const deviceValidationService = require('../services/deviceValidation');

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  const deviceId = req.headers['x-device-id'];
  const sessionToken = req.headers['x-session-token'];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }

  if (!deviceId) {
    return res.status(401).json({
      success: false,
      message: 'Device ID required for mobile access'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Verify user still exists and is active
    const [users] = await db.execute(
      'SELECT id, username, email, is_active FROM users WHERE id = ? AND is_active = 1',
      [decoded.userId]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }

    const user = users[0];

    // Validate device is registered and active for this user
    const isDeviceValid = await deviceValidationService.validateDevice(user.id, deviceId);
    if (!isDeviceValid) {
      return res.status(403).json({
        success: false,
        message: 'Device not authorized. Please login again to register this device.',
        errorCode: 'DEVICE_NOT_AUTHORIZED'
      });
    }

    // Validate session if session token is provided
    if (sessionToken) {
      const sessionValidation = await deviceValidationService.validateSession(user.id, sessionToken);
      if (!sessionValidation.isValid) {
        return res.status(401).json({
          success: false,
          message: sessionValidation.reason || 'Invalid session',
          errorCode: 'SESSION_INVALID'
        });
      }
      req.sessionInfo = sessionValidation.session;
    }

    req.user = user;
    req.deviceId = deviceId;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired',
        errorCode: 'TOKEN_EXPIRED'
      });
    }
    
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
  );

  const refreshToken = jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

module.exports = {
  authenticateToken,
  generateTokens
};
