const express = require('express');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const db = require('../config/database');
const { generateTokens } = require('../middleware/auth');
const googleAuthService = require('../services/googleAuth');
const deviceValidationService = require('../services/deviceValidation');

const router = express.Router();

// Register user
router.post('/register', [
  body('username').isLength({ min: 3 }).trim().escape(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('full_name').optional().trim().escape(),
  body('phone').optional().isMobilePhone(),
  body('date_of_birth').optional().isDate(),
  body('deviceId').notEmpty().withMessage('Device ID is required for mobile registration'),
  body('deviceInfo').optional().isObject().withMessage('Device info must be an object')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { username, email, password, full_name, phone, date_of_birth, deviceId, deviceInfo } = req.body;

    // Check if user already exists
    const [existingUsers] = await db.execute(
      'SELECT id FROM users WHERE email = ? OR username = ?',
      [email, username]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'User with this email or username already exists'
      });
    }

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Insert user
    const [result] = await db.execute(
      `INSERT INTO users (username, email, password_hash, full_name, phone, date_of_birth, auth_provider) 
       VALUES (?, ?, ?, ?, ?, ?, 'local')`,
      [username, email, passwordHash, full_name, phone, date_of_birth]
    );

    const userId = result.insertId;

    // Register device for the new user
    const deviceRegistration = await deviceValidationService.registerDevice(
      userId, 
      deviceId, 
      deviceInfo || {}
    );

    if (!deviceRegistration.success) {
      // Rollback user creation if device registration fails
      await db.execute('DELETE FROM users WHERE id = ?', [userId]);
      return res.status(400).json({
        success: false,
        message: deviceRegistration.message
      });
    }

    // Create login session
    const sessionToken = await deviceValidationService.createLoginSession(userId, deviceId);

    const tokens = generateTokens(userId);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: userId,
          username,
          email,
          full_name
        },
        tokens,
        sessionToken,
        deviceRegistered: true
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed'
    });
  }
});

// Login user
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
  body('deviceId').notEmpty().withMessage('Device ID is required for mobile login'),
  body('deviceInfo').optional().isObject().withMessage('Device info must be an object')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { email, password, deviceId, deviceInfo } = req.body;

    // Find user
    const [users] = await db.execute(
      'SELECT id, username, email, password_hash, full_name, profile_picture, auth_provider, is_active FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const user = users[0];

    if (!user.is_active) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated'
      });
    }

    // Check if this is a Google-only account
    if (user.auth_provider === 'google' && !user.password_hash) {
      return res.status(400).json({
        success: false,
        message: 'This account uses Google login. Please use Google sign-in instead.'
      });
    }

    // Verify password for local accounts
    if (user.password_hash) {
      const isValidPassword = await bcrypt.compare(password, user.password_hash);
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }
    } else {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if device is already registered
    let deviceRegistered = await deviceValidationService.validateDevice(user.id, deviceId);
    
    if (!deviceRegistered) {
      // Try to register the device
      const deviceRegistration = await deviceValidationService.registerDevice(
        user.id, 
        deviceId, 
        deviceInfo || {}
      );

      if (!deviceRegistration.success) {
        return res.status(403).json({
          success: false,
          message: deviceRegistration.message,
          errorCode: 'DEVICE_REGISTRATION_FAILED'
        });
      }
      deviceRegistered = true;
    }

    // Create login session
    const sessionToken = await deviceValidationService.createLoginSession(user.id, deviceId);

    const tokens = generateTokens(user.id);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          full_name: user.full_name,
          profile_picture: user.profile_picture,
          auth_provider: user.auth_provider
        },
        tokens,
        sessionToken,
        deviceRegistered
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed'
    });
  }
});

// Logout (client-side token removal, but we can track this for security)
router.post('/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Logout successful'
  });
});

// Google OAuth Login
router.post('/google-login', [
  body('token').notEmpty().withMessage('Google token is required'),
  body('deviceId').notEmpty().withMessage('Device ID is required for mobile login'),
  body('deviceInfo').optional().isObject().withMessage('Device info must be an object')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { token, deviceId, deviceInfo } = req.body;

    // Verify Google token and get user info
    const googleUser = await googleAuthService.verifyIdToken(token);

    if (!googleUser.emailVerified) {
      return res.status(400).json({
        success: false,
        message: 'Google email not verified'
      });
    }

    // Check if user already exists
    const [existingUsers] = await db.execute(
      'SELECT id, username, email, full_name, profile_picture, auth_provider FROM users WHERE email = ? OR google_id = ?',
      [googleUser.email, googleUser.googleId]
    );

    let user;
    let isNewUser = false;

    if (existingUsers.length > 0) {
      // User exists - update Google info if needed
      user = existingUsers[0];
      
      // Update user with latest Google info
      await db.execute(
        `UPDATE users 
         SET google_id = ?, full_name = COALESCE(?, full_name), 
             profile_picture = ?, auth_provider = 'google', 
             updated_at = CURRENT_TIMESTAMP 
         WHERE id = ?`,
        [googleUser.googleId, googleUser.fullName, googleUser.profilePicture, user.id]
      );

      // Update user object with latest info
      user.full_name = googleUser.fullName || user.full_name;
      user.profile_picture = googleUser.profilePicture;
      user.auth_provider = 'google';

    } else {
      // Create new user account
      const username = googleAuthService.generateUsername(googleUser.email, googleUser.fullName);
      
      // Ensure username is unique
      let finalUsername = username;
      let counter = 1;
      while (true) {
        const [existingUsername] = await db.execute(
          'SELECT id FROM users WHERE username = ?',
          [finalUsername]
        );
        
        if (existingUsername.length === 0) break;
        finalUsername = `${username}${counter}`;
        counter++;
      }

      const [result] = await db.execute(
        `INSERT INTO users (username, email, full_name, google_id, profile_picture, auth_provider) 
         VALUES (?, ?, ?, ?, ?, 'google')`,
        [finalUsername, googleUser.email, googleUser.fullName, googleUser.googleId, googleUser.profilePicture]
      );

      user = {
        id: result.insertId,
        username: finalUsername,
        email: googleUser.email,
        full_name: googleUser.fullName,
        profile_picture: googleUser.profilePicture,
        auth_provider: 'google'
      };
      isNewUser = true;
    }

    // Check if device is already registered
    let deviceRegistered = await deviceValidationService.validateDevice(user.id, deviceId);
    
    if (!deviceRegistered) {
      // Try to register the device
      const deviceRegistration = await deviceValidationService.registerDevice(
        user.id, 
        deviceId, 
        deviceInfo || {}
      );

      if (!deviceRegistration.success) {
        // If this is a new user and device registration fails, clean up
        if (isNewUser) {
          await db.execute('DELETE FROM users WHERE id = ?', [user.id]);
        }
        return res.status(403).json({
          success: false,
          message: deviceRegistration.message,
          errorCode: 'DEVICE_REGISTRATION_FAILED'
        });
      }
      deviceRegistered = true;
    }

    // Create login session
    const sessionToken = await deviceValidationService.createLoginSession(user.id, deviceId);

    // Generate JWT tokens
    const tokens = generateTokens(user.id);

    res.json({
      success: true,
      message: isNewUser ? 'Account created and Google login successful' : 'Google login successful',
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          full_name: user.full_name,
          profile_picture: user.profile_picture,
          auth_provider: user.auth_provider
        },
        tokens,
        sessionToken,
        deviceRegistered,
        isNewUser
      }
    });

  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Google login failed'
    });
  }
});

// Device management endpoints

// Get user's registered devices
router.get('/devices', require('../middleware/auth').authenticateToken, async (req, res) => {
  try {
    const [devices] = await db.execute(
      `SELECT device_id, device_name, device_model, os_version, app_version, 
              is_active, last_login, created_at, login_count
       FROM user_devices 
       WHERE user_id = ? 
       ORDER BY last_login DESC`,
      [req.user.id]
    );

    res.json({
      success: true,
      message: 'Devices retrieved successfully',
      data: {
        devices: devices.map(device => ({
          deviceId: device.device_id,
          deviceName: device.device_name || 'Unknown Device',
          deviceModel: device.device_model,
          osVersion: device.os_version,
          appVersion: device.app_version,
          isActive: device.is_active,
          lastLogin: device.last_login,
          registeredAt: device.created_at,
          loginCount: device.login_count
        }))
      }
    });

  } catch (error) {
    console.error('Get devices error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve devices'
    });
  }
});

// Deactivate a device
router.post('/devices/:deviceId/deactivate', require('../middleware/auth').authenticateToken, async (req, res) => {
  try {
    const { deviceId } = req.params;

    // Check if device belongs to the user
    const [devices] = await db.execute(
      'SELECT id FROM user_devices WHERE user_id = ? AND device_id = ?',
      [req.user.id, deviceId]
    );

    if (devices.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Device not found'
      });
    }

    // Don't allow deactivating the current device
    if (req.deviceId === deviceId) {
      return res.status(400).json({
        success: false,
        message: 'Cannot deactivate the current device'
      });
    }

    // Deactivate device and end all sessions
    await db.execute(
      'UPDATE user_devices SET is_active = 0 WHERE user_id = ? AND device_id = ?',
      [req.user.id, deviceId]
    );

    await db.execute(
      'UPDATE login_sessions SET is_active = 0 WHERE user_id = ? AND device_id = ?',
      [req.user.id, deviceId]
    );

    res.json({
      success: true,
      message: 'Device deactivated successfully'
    });

  } catch (error) {
    console.error('Deactivate device error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to deactivate device'
    });
  }
});

// Refresh session token
router.post('/refresh-session', [
  body('deviceId').notEmpty().withMessage('Device ID is required')
], require('../middleware/auth').authenticateToken, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { deviceId } = req.body;

    // Validate device
    const isDeviceValid = await deviceValidationService.validateDevice(req.user.id, deviceId);
    if (!isDeviceValid) {
      return res.status(403).json({
        success: false,
        message: 'Device not authorized',
        errorCode: 'DEVICE_NOT_AUTHORIZED'
      });
    }

    // Create new session
    const sessionToken = await deviceValidationService.createLoginSession(req.user.id, deviceId);

    res.json({
      success: true,
      message: 'Session refreshed successfully',
      data: {
        sessionToken
      }
    });

  } catch (error) {
    console.error('Refresh session error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to refresh session'
    });
  }
});

module.exports = router;
