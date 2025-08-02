const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all courses
router.get('/courses', async (req, res) => {
  try {
    const [courses] = await db.execute(
      'SELECT id, course_name, description, price, duration_weeks FROM courses WHERE is_active = 1'
    );

    res.json({
      success: true,
      data: { courses }
    });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch courses'
    });
  }
});

// Create payment record
router.post('/create', authenticateToken, [
  body('course_id').isInt({ min: 1 }),
  body('amount').isFloat({ min: 0 }),
  body('payment_method').isIn(['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'upi', 'google_play']),
  body('transaction_id').optional().trim()
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

    const { course_id, amount, payment_method, transaction_id, payment_gateway } = req.body;
    const user_id = req.user.id;

    // Verify course exists and get its price
    const [courses] = await db.execute(
      'SELECT id, course_name, price FROM courses WHERE id = ? AND is_active = 1',
      [course_id]
    );

    if (courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    const course = courses[0];

    // Verify amount matches course price
    if (parseFloat(amount) !== parseFloat(course.price)) {
      return res.status(400).json({
        success: false,
        message: 'Amount does not match course price'
      });
    }

    // Check if user already has an active payment for this course
    const [existingPayments] = await db.execute(
      'SELECT id FROM payments WHERE user_id = ? AND course_id = ? AND payment_status IN ("pending", "completed")',
      [user_id, course_id]
    );

    if (existingPayments.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Payment already exists for this course'
      });
    }

    // Create payment record
    const [paymentResult] = await db.execute(
      `INSERT INTO payments (user_id, course_id, amount, payment_method, transaction_id, payment_gateway, payment_status) 
       VALUES (?, ?, ?, ?, ?, ?, 'pending')`,
      [user_id, course_id, amount, payment_method, transaction_id, payment_gateway]
    );

    res.status(201).json({
      success: true,
      message: 'Payment record created successfully',
      data: {
        payment_id: paymentResult.insertId,
        course_name: course.course_name,
        amount: amount,
        status: 'pending'
      }
    });

  } catch (error) {
    console.error('Create payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create payment record'
    });
  }
});

// Update payment status
router.put('/update/:paymentId', authenticateToken, [
  body('payment_status').isIn(['pending', 'completed', 'failed', 'refunded']),
  body('transaction_id').optional().trim(),
  body('google_play_order_id').optional().trim()
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

    const { paymentId } = req.params;
    const { payment_status, transaction_id, google_play_order_id } = req.body;
    const user_id = req.user.id;

    // Verify payment belongs to user
    const [payments] = await db.execute(
      'SELECT id, course_id, payment_status FROM payments WHERE id = ? AND user_id = ?',
      [paymentId, user_id]
    );

    if (payments.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    const payment = payments[0];

    // Update payment status
    await db.execute(
      `UPDATE payments 
       SET payment_status = ?, 
           transaction_id = COALESCE(?, transaction_id),
           google_play_order_id = COALESCE(?, google_play_order_id),
           updated_at = CURRENT_TIMESTAMP 
       WHERE id = ?`,
      [payment_status, transaction_id, google_play_order_id, paymentId]
    );

    // If payment is completed, enroll user in course
    if (payment_status === 'completed' && payment.payment_status !== 'completed') {
      await db.execute(
        `INSERT INTO user_courses (user_id, course_id, status) 
         VALUES (?, ?, 'enrolled') 
         ON DUPLICATE KEY UPDATE status = 'enrolled', enrollment_date = CURRENT_TIMESTAMP`,
        [user_id, payment.course_id]
      );
    }

    res.json({
      success: true,
      message: 'Payment status updated successfully',
      data: {
        payment_id: paymentId,
        status: payment_status
      }
    });

  } catch (error) {
    console.error('Update payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update payment status'
    });
  }
});

// Get user's payment history
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const user_id = req.user.id;

    const [payments] = await db.execute(`
      SELECT 
        p.id,
        p.amount,
        p.payment_method,
        p.payment_status,
        p.transaction_id,
        p.payment_date,
        p.created_at,
        c.course_name,
        c.description as course_description
      FROM payments p
      JOIN courses c ON p.course_id = c.id
      WHERE p.user_id = ?
      ORDER BY p.created_at DESC
    `, [user_id]);

    res.json({
      success: true,
      data: { payments }
    });

  } catch (error) {
    console.error('Get payment history error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payment history'
    });
  }
});

// Get payment details
router.get('/:paymentId', authenticateToken, async (req, res) => {
  try {
    const { paymentId } = req.params;
    const user_id = req.user.id;

    const [payments] = await db.execute(`
      SELECT 
        p.*,
        c.course_name,
        c.description as course_description,
        c.duration_weeks
      FROM payments p
      JOIN courses c ON p.course_id = c.id
      WHERE p.id = ? AND p.user_id = ?
    `, [paymentId, user_id]);

    if (payments.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    res.json({
      success: true,
      data: { payment: payments[0] }
    });

  } catch (error) {
    console.error('Get payment details error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payment details'
    });
  }
});

module.exports = router;
