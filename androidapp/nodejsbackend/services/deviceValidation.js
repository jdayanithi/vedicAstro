const db = require('../config/database');
const crypto = require('crypto');

class DeviceValidationService {
  
  /**
   * Register or update device information for a user
   * @param {number} userId - User ID
   * @param {Object} deviceInfo - Device information from Android
   * @returns {Object} Device registration result
   */
  async registerDevice(userId, deviceInfo) {
    try {
      const {
        deviceId,
        deviceName,
        deviceModel,
        deviceBrand,
        androidVersion,
        appVersion,
        fcmToken
      } = deviceInfo;

      // Check if device is already registered for this user
      const [existingDevices] = await db.execute(
        'SELECT id, is_active, login_count FROM user_devices WHERE user_id = ? AND device_id = ?',
        [userId, deviceId]
      );

      if (existingDevices.length > 0) {
        // Update existing device
        const device = existingDevices[0];
        await db.execute(
          `UPDATE user_devices 
           SET device_name = COALESCE(?, device_name),
               device_model = COALESCE(?, device_model),
               device_brand = COALESCE(?, device_brand),
               android_version = COALESCE(?, android_version),
               app_version = COALESCE(?, app_version),
               fcm_token = COALESCE(?, fcm_token),
               is_active = 1,
               last_login = CURRENT_TIMESTAMP,
               login_count = login_count + 1
           WHERE user_id = ? AND device_id = ?`,
          [deviceName, deviceModel, deviceBrand, androidVersion, appVersion, fcmToken, userId, deviceId]
        );

        return {
          deviceRegistered: true,
          isNewDevice: false,
          loginCount: device.login_count + 1,
          wasInactive: device.is_active === 0
        };
      } else {
        // Check if user already has an active device (STRICT POLICY: NO REPLACEMENT)
        const [userDevices] = await db.execute(
          'SELECT device_id, device_name FROM user_devices WHERE user_id = ? AND is_active = 1',
          [userId]
        );

        if (userDevices.length > 0) {
          const existingDevice = userDevices[0];
          throw new Error(`You already have an active device registered (${existingDevice.device_name || existingDevice.device_id}). Please logout from your current device first before registering a new device.`);
        }

        // Register new device (only allowed if no active devices)
        await db.execute(
          `INSERT INTO user_devices 
           (user_id, device_id, device_name, device_model, device_brand, android_version, app_version, fcm_token)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [userId, deviceId, deviceName || 'Unknown Device', deviceModel, deviceBrand, androidVersion, appVersion, fcmToken]
        );

        return {
          deviceRegistered: true,
          isNewDevice: true,
          loginCount: 1,
          wasInactive: false
        };
      }
    } catch (error) {
      console.error('Device registration error:', error);
      throw error;
    }
  }

  /**
   * Validate if device is authorized for user
   * @param {number} userId - User ID
   * @param {string} deviceId - Device ID
   * @returns {boolean} Device validation result
   */
  async validateDevice(userId, deviceId) {
    try {
      const [devices] = await db.execute(
        'SELECT id, is_active FROM user_devices WHERE user_id = ? AND device_id = ? AND is_active = 1',
        [userId, deviceId]
      );

      return devices.length > 0;
    } catch (error) {
      console.error('Device validation error:', error);
      return false;
    }
  }

  /**
   * Create login session
   * @param {number} userId - User ID
   * @param {string} deviceId - Device ID
   * @param {string} jwtTokenId - JWT token identifier
   * @param {Object} sessionInfo - Session information (IP, user agent, etc.)
   * @returns {string} Session token
   */
  async createLoginSession(userId, deviceId, jwtTokenId, sessionInfo = {}) {
    try {
      const sessionToken = crypto.randomBytes(32).toString('hex');
      const { ipAddress, userAgent, locationCountry, locationCity } = sessionInfo;

      await db.execute(
        `INSERT INTO login_sessions 
         (user_id, device_id, session_token, jwt_token_id, ip_address, user_agent, location_country, location_city)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [userId, deviceId, sessionToken, jwtTokenId, ipAddress, userAgent, locationCountry, locationCity]
      );

      return sessionToken;
    } catch (error) {
      console.error('Create login session error:', error);
      throw error;
    }
  }

  /**
   * Validate login session
   * @param {number} userId - User ID
   * @param {string} sessionToken - Session token
   * @returns {Object} Session validation result
   */
  async validateSession(userId, sessionToken) {
    try {
      const [sessions] = await db.execute(
        `SELECT ls.*, ud.device_id, ud.device_name 
         FROM login_sessions ls
         JOIN user_devices ud ON ls.device_id = ud.device_id AND ls.user_id = ud.user_id
         WHERE ls.user_id = ? AND ls.session_token = ? AND ls.is_active = 1`,
        [userId, sessionToken]
      );

      if (sessions.length === 0) {
        return { isValid: false, reason: 'Invalid or expired session' };
      }

      const session = sessions[0];
      
      // Check if session is too old (7 days)
      const sessionAge = Date.now() - new Date(session.login_time).getTime();
      const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

      if (sessionAge > maxAge) {
        // Deactivate old session
        await this.deactivateSession(userId, sessionToken);
        return { isValid: false, reason: 'Session expired' };
      }

      // Update last activity
      await db.execute(
        'UPDATE login_sessions SET last_activity = CURRENT_TIMESTAMP WHERE id = ?',
        [session.id]
      );

      return {
        isValid: true,
        session: session,
        deviceInfo: {
          deviceId: session.device_id,
          deviceName: session.device_name
        }
      };
    } catch (error) {
      console.error('Session validation error:', error);
      return { isValid: false, reason: 'Validation error' };
    }
  }

  /**
   * Deactivate login session
   * @param {number} userId - User ID
   * @param {string} sessionToken - Session token
   */
  async deactivateSession(userId, sessionToken) {
    try {
      await db.execute(
        `UPDATE login_sessions 
         SET is_active = 0, logout_time = CURRENT_TIMESTAMP 
         WHERE user_id = ? AND session_token = ?`,
        [userId, sessionToken]
      );
    } catch (error) {
      console.error('Deactivate session error:', error);
    }
  }

  /**
   * Get user's registered devices
   * @param {number} userId - User ID
   * @returns {Array} List of user devices
   */
  async getUserDevices(userId) {
    try {
      const [devices] = await db.execute(
        `SELECT id, device_id, device_name, device_model, device_brand, 
                android_version, app_version, is_active, first_login, 
                last_login, login_count
         FROM user_devices 
         WHERE user_id = ? 
         ORDER BY last_login DESC`,
        [userId]
      );

      return devices;
    } catch (error) {
      console.error('Get user devices error:', error);
      return [];
    }
  }

  /**
   * Deactivate a user device
   * @param {number} userId - User ID
   * @param {string} deviceId - Device ID to deactivate
   */
  async deactivateDevice(userId, deviceId) {
    try {
      // Deactivate device
      await db.execute(
        'UPDATE user_devices SET is_active = 0 WHERE user_id = ? AND device_id = ?',
        [userId, deviceId]
      );

      // Deactivate all sessions for this device
      await db.execute(
        `UPDATE login_sessions 
         SET is_active = 0, logout_time = CURRENT_TIMESTAMP 
         WHERE user_id = ? AND device_id = ?`,
        [userId, deviceId]
      );

      return { success: true };
    } catch (error) {
      console.error('Deactivate device error:', error);
      throw error;
    }
  }

  /**
   * Generate device fingerprint for additional security
   * @param {Object} deviceInfo - Device information
   * @returns {string} Device fingerprint
   */
  generateDeviceFingerprint(deviceInfo) {
    const {
      deviceId,
      deviceModel,
      deviceBrand,
      androidVersion,
      screenWidth,
      screenHeight,
      density
    } = deviceInfo;

    const fingerprintData = `${deviceId}-${deviceModel}-${deviceBrand}-${androidVersion}-${screenWidth}x${screenHeight}-${density}`;
    return crypto.createHash('sha256').update(fingerprintData).digest('hex');
  }

  /**
   * Check for suspicious login patterns
   * @param {number} userId - User ID
   * @param {string} deviceId - Device ID
   * @param {string} ipAddress - Current IP address
   * @returns {Object} Security check result
   */
  async checkSuspiciousActivity(userId, deviceId, ipAddress) {
    try {
      // Check for multiple rapid login attempts
      const [recentLogins] = await db.execute(
        `SELECT COUNT(*) as login_attempts 
         FROM login_sessions 
         WHERE user_id = ? AND device_id = ? 
         AND login_time > DATE_SUB(NOW(), INTERVAL 1 HOUR)`,
        [userId, deviceId]
      );

      if (recentLogins[0].login_attempts > 5) {
        return {
          isSuspicious: true,
          reason: 'Too many login attempts',
          action: 'rate_limit'
        };
      }

      // Check for logins from different locations
      const [locationCheck] = await db.execute(
        `SELECT DISTINCT ip_address, location_country 
         FROM login_sessions 
         WHERE user_id = ? AND device_id = ? 
         AND login_time > DATE_SUB(NOW(), INTERVAL 24 HOUR)
         LIMIT 5`,
        [userId, deviceId]
      );

      if (locationCheck.length > 3) {
        return {
          isSuspicious: true,
          reason: 'Multiple locations detected',
          action: 'verify_identity'
        };
      }

      return { isSuspicious: false };
    } catch (error) {
      console.error('Security check error:', error);
      return { isSuspicious: false };
    }
  }

  /**
   * Remove device completely (for logout)
   * @param {number} userId - User ID
   * @param {string} deviceId - Device ID
   * @returns {boolean} Removal success
   */
  async removeDevice(userId, deviceId) {
    try {
      // Remove device completely
      await db.execute(
        'DELETE FROM user_devices WHERE user_id = ? AND device_id = ?',
        [userId, deviceId]
      );

      // Remove all sessions for this device
      await db.execute(
        'DELETE FROM login_sessions WHERE user_id = ? AND device_id = ?',
        [userId, deviceId]
      );

      return true;
    } catch (error) {
      console.error('Device removal error:', error);
      throw error;
    }
  }
}

module.exports = new DeviceValidationService();
