const express = require('express');
const { body, validationResult } = require('express-validator');
const { authenticateToken } = require('../middleware/auth');
const phonePeService = require('../services/phonePeService');
const db = require('../config/database');

const router = express.Router();

/**
 * @desc    Initiate PhonePe payment
 * @route   POST /api/phonepe/initiate
 * @access  Private
 */
router.post('/initiate', [
  authenticateToken,
  body('courseId').isInt().withMessage('Course ID must be a valid integer'),
  body('amount').isFloat({ min: 0.01 }).withMessage('Amount must be greater than 0'),
  body('redirectUrl').optional().isURL().withMessage('Redirect URL must be valid'),
  body('callbackUrl').optional().isURL().withMessage('Callback URL must be valid')
], async (req, res) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { courseId, amount, redirectUrl, callbackUrl } = req.body;
    const userId = req.user.id;

    // Check if course exists and get course details
    const [courseResult] = await db.promise().execute(
      'SELECT * FROM courses WHERE id = ?',
      [courseId]
    );

    if (courseResult.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    const course = courseResult[0];

    // Check if user already enrolled in this course
    const [enrollmentResult] = await db.promise().execute(
      'SELECT * FROM user_courses WHERE user_id = ? AND course_id = ?',
      [userId, courseId]
    );

    if (enrollmentResult.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'You are already enrolled in this course'
      });
    }

    // Generate unique merchant transaction ID
    const merchantTransactionId = `TXN_${userId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create payment record with pending status
    const [paymentResult] = await db.promise().execute(
      `INSERT INTO payments (
        user_id, course_id, amount, payment_method, payment_status,
        phonepe_merchant_transaction_id, payment_gateway
      ) VALUES (?, ?, ?, 'phonepe', 'pending', ?, 'phonepe')`,
      [userId, courseId, amount, merchantTransactionId]
    );

    const paymentId = paymentResult.insertId;

    // Prepare payment data
    const paymentData = {
      merchantTransactionId,
      amount: amount * 100, // Convert to paise
      redirectUrl: redirectUrl || `${process.env.APP_URL}/payment/success`,
      callbackUrl: callbackUrl || `${process.env.API_URL}/api/phonepe/callback`,
      merchantUserId: userId.toString(),
      courseId,
      paymentId
    };

    // Initiate payment with PhonePe
    const paymentResponse = await phonePeService.initiatePayment(paymentData);

    if (!paymentResponse.success) {
      // Update payment status to failed
      await db.promise().execute(
        'UPDATE payments SET payment_status = ? WHERE id = ?',
        ['failed', paymentId]
      );

      return res.status(400).json({
        success: false,
        message: 'Failed to initiate payment',
        error: paymentResponse.message
      });
    }

    // Update payment record with PhonePe transaction ID
    await db.promise().execute(
      'UPDATE payments SET phonepe_transaction_id = ? WHERE id = ?',
      [paymentResponse.data.transactionId, paymentId]
    );

    res.status(200).json({
      success: true,
      message: 'Payment initiated successfully',
      data: {
        paymentId,
        merchantTransactionId,
        paymentUrl: paymentResponse.data.instrumentResponse.redirectInfo.url,
        transactionId: paymentResponse.data.transactionId,
        course: {
          id: course.id,
          title: course.title,
          price: course.price
        }
      }
    });

  } catch (error) {
    console.error('PhonePe payment initiation error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * @desc    PhonePe payment callback
 * @route   POST /api/phonepe/callback
 * @access  Public (called by PhonePe)
 */
router.post('/callback', async (req, res) => {
  try {
    console.log('PhonePe callback received:', req.body);

    const callbackData = req.body;
    
    // Verify callback authenticity
    const isValidCallback = await phonePeService.verifyCallback(callbackData);
    
    if (!isValidCallback) {
      console.error('Invalid PhonePe callback signature');
      return res.status(400).json({
        success: false,
        message: 'Invalid callback signature'
      });
    }

    const { transactionId, merchantTransactionId, amount, code } = callbackData;

    // Find payment record
    const [paymentResult] = await db.promise().execute(
      'SELECT * FROM payments WHERE phonepe_merchant_transaction_id = ?',
      [merchantTransactionId]
    );

    if (paymentResult.length === 0) {
      console.error('Payment record not found for:', merchantTransactionId);
      return res.status(404).json({
        success: false,
        message: 'Payment record not found'
      });
    }

    const payment = paymentResult[0];

    // Verify payment status with PhonePe
    const verificationResult = await phonePeService.verifyPayment(merchantTransactionId);

    if (verificationResult.success && verificationResult.data.state === 'COMPLETED') {
      // Payment successful - update payment record
      await db.promise().execute(
        `UPDATE payments SET 
          payment_status = 'completed',
          phonepe_transaction_id = ?,
          phonepe_response_code = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ?`,
        [transactionId, code, payment.id]
      );

      // Enroll user in course
      await db.promise().execute(
        `INSERT INTO user_courses (user_id, course_id, enrollment_date, progress_percentage)
         VALUES (?, ?, CURRENT_TIMESTAMP, 0)
         ON DUPLICATE KEY UPDATE enrollment_date = VALUES(enrollment_date)`,
        [payment.user_id, payment.course_id]
      );

      console.log(`Payment successful for user ${payment.user_id}, course ${payment.course_id}`);

    } else {
      // Payment failed - update payment record
      await db.promise().execute(
        `UPDATE payments SET 
          payment_status = 'failed',
          phonepe_transaction_id = ?,
          phonepe_response_code = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ?`,
        [transactionId, code, payment.id]
      );

      console.log(`Payment failed for transaction: ${merchantTransactionId}`);
    }

    res.status(200).json({
      success: true,
      message: 'Callback processed successfully'
    });

  } catch (error) {
    console.error('PhonePe callback processing error:', error);
    res.status(500).json({
      success: false,
      message: 'Callback processing failed'
    });
  }
});

/**
 * @desc    Check payment status
 * @route   GET /api/phonepe/status/:merchantTransactionId
 * @access  Private
 */
router.get('/status/:merchantTransactionId', authenticateToken, async (req, res) => {
  try {
    const { merchantTransactionId } = req.params;
    const userId = req.user.id;

    // Find payment record and verify user ownership
    const [paymentResult] = await db.promise().execute(
      'SELECT * FROM payments WHERE phonepe_merchant_transaction_id = ? AND user_id = ?',
      [merchantTransactionId, userId]
    );

    if (paymentResult.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Payment record not found'
      });
    }

    const payment = paymentResult[0];

    // Get latest status from PhonePe
    const statusResult = await phonePeService.verifyPayment(merchantTransactionId);

    if (statusResult.success) {
      // Update local payment status if needed
      const phonePeStatus = statusResult.data.state;
      let localStatus = payment.payment_status;

      if (phonePeStatus === 'COMPLETED' && localStatus !== 'completed') {
        localStatus = 'completed';
        
        // Update payment record
        await db.promise().execute(
          'UPDATE payments SET payment_status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
          [localStatus, payment.id]
        );

        // Enroll user in course if not already enrolled
        await db.promise().execute(
          `INSERT INTO user_courses (user_id, course_id, enrollment_date, progress_percentage)
           VALUES (?, ?, CURRENT_TIMESTAMP, 0)
           ON DUPLICATE KEY UPDATE enrollment_date = VALUES(enrollment_date)`,
          [userId, payment.course_id]
        );
      } else if (phonePeStatus === 'FAILED' && localStatus === 'pending') {
        localStatus = 'failed';
        await db.promise().execute(
          'UPDATE payments SET payment_status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
          [localStatus, payment.id]
        );
      }

      res.status(200).json({
        success: true,
        message: 'Payment status retrieved successfully',
        data: {
          paymentId: payment.id,
          merchantTransactionId,
          amount: payment.amount,
          status: localStatus,
          phonePeStatus: phonePeStatus,
          paymentDate: payment.payment_date,
          courseId: payment.course_id
        }
      });

    } else {
      res.status(400).json({
        success: false,
        message: 'Failed to get payment status',
        error: statusResult.message
      });
    }

  } catch (error) {
    console.error('Payment status check error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * @desc    Get user's payment history
 * @route   GET /api/phonepe/history
 * @access  Private
 */
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Get payment history with course details
    const [payments] = await db.promise().execute(
      `SELECT 
        p.id, p.amount, p.payment_status, p.payment_date,
        p.phonepe_merchant_transaction_id, p.phonepe_transaction_id,
        c.title as course_title, c.description as course_description
      FROM payments p
      JOIN courses c ON p.course_id = c.id
      WHERE p.user_id = ? AND p.payment_gateway = 'phonepe'
      ORDER BY p.payment_date DESC
      LIMIT ? OFFSET ?`,
      [userId, limit, offset]
    );

    // Get total count
    const [countResult] = await db.promise().execute(
      'SELECT COUNT(*) as total FROM payments WHERE user_id = ? AND payment_gateway = ?',
      [userId, 'phonepe']
    );

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      message: 'Payment history retrieved successfully',
      data: {
        payments,
        pagination: {
          currentPage: page,
          totalPages,
          totalRecords: total,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      }
    });

  } catch (error) {
    console.error('Payment history error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
