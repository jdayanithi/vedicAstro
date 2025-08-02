const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user_id = req.user.id;

    const [users] = await db.execute(`
      SELECT 
        id, username, email, full_name, phone, date_of_birth, 
        profile_picture, auth_provider, created_at
      FROM users 
      WHERE id = ? AND is_active = 1
    `, [user_id]);

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: { user: users[0] }
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user profile'
    });
  }
});

// Update user profile
router.put('/profile', authenticateToken, [
  body('full_name').optional().trim().escape(),
  body('phone').optional().isMobilePhone(),
  body('date_of_birth').optional().isDate()
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

    const user_id = req.user.id;
    const { full_name, phone, date_of_birth } = req.body;

    await db.execute(
      `UPDATE users 
       SET full_name = COALESCE(?, full_name), 
           phone = COALESCE(?, phone), 
           date_of_birth = COALESCE(?, date_of_birth),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [full_name, phone, date_of_birth, user_id]
    );

    // Fetch updated user data
    const [users] = await db.execute(
      'SELECT id, username, email, full_name, phone, date_of_birth, profile_picture, auth_provider FROM users WHERE id = ?',
      [user_id]
    );

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: { user: users[0] }
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile'
    });
  }
});

// Change password
router.put('/change-password', authenticateToken, [
  body('current_password').notEmpty(),
  body('new_password').isLength({ min: 6 })
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

    const user_id = req.user.id;
    const { current_password, new_password } = req.body;

    // Get current password hash
    const [users] = await db.execute(
      'SELECT password_hash FROM users WHERE id = ?',
      [user_id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(current_password, users[0].password_hash);
    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Hash new password
    const saltRounds = 12;
    const newPasswordHash = await bcrypt.hash(new_password, saltRounds);

    // Update password
    await db.execute(
      'UPDATE users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [newPasswordHash, user_id]
    );

    res.json({
      success: true,
      message: 'Password changed successfully'
    });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to change password'
    });
  }
});

// Get user's enrolled courses
router.get('/courses', authenticateToken, async (req, res) => {
  try {
    const user_id = req.user.id;

    const [courses] = await db.execute(`
      SELECT 
        uc.id as enrollment_id,
        uc.enrollment_date,
        uc.completion_date,
        uc.status,
        uc.progress_percentage,
        c.id as course_id,
        c.course_name,
        c.description,
        c.price,
        c.duration_weeks,
        p.payment_date,
        p.payment_status
      FROM user_courses uc
      JOIN courses c ON uc.course_id = c.id
      LEFT JOIN payments p ON p.user_id = uc.user_id AND p.course_id = uc.course_id AND p.payment_status = 'completed'
      WHERE uc.user_id = ?
      ORDER BY uc.enrollment_date DESC
    `, [user_id]);

    res.json({
      success: true,
      data: { courses }
    });

  } catch (error) {
    console.error('Get user courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch enrolled courses'
    });
  }
});

// Deactivate account
router.delete('/account', authenticateToken, [
  body('password').notEmpty()
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

    const user_id = req.user.id;
    const { password } = req.body;

    // Verify password
    const [users] = await db.execute(
      'SELECT password_hash FROM users WHERE id = ?',
      [user_id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const isValidPassword = await bcrypt.compare(password, users[0].password_hash);
    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        message: 'Password is incorrect'
      });
    }

    // Deactivate account
    await db.execute(
      'UPDATE users SET is_active = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [user_id]
    );

    res.json({
      success: true,
      message: 'Account deactivated successfully'
    });

  } catch (error) {
    console.error('Deactivate account error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to deactivate account'
    });
  }
});

module.exports = router;
