const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const googlePlayBillingService = require('../services/googlePlayBilling');

const router = express.Router();

// Verify and process Google Play purchase
router.post('/google-play/verify-purchase', authenticateToken, [
  body('productId').notEmpty().withMessage('Product ID is required'),
  body('purchaseToken').notEmpty().withMessage('Purchase token is required'),
  body('courseId').isInt({ min: 1 }).withMessage('Valid course ID is required'),
  body('isSubscription').optional().isBoolean()
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

    const { productId, purchaseToken, courseId, isSubscription = false } = req.body;
    const user_id = req.user.id;

    // Check if this purchase has already been processed
    const [existingPurchases] = await db.execute(
      'SELECT id FROM payments WHERE google_play_purchase_token = ? AND payment_status = "completed"',
      [purchaseToken]
    );

    if (existingPurchases.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Purchase has already been processed'
      });
    }

    // Verify course exists and get its price
    const [courses] = await db.execute(
      'SELECT id, course_name, price FROM courses WHERE id = ? AND is_active = 1',
      [courseId]
    );

    if (courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    const course = courses[0];

    // Verify purchase with Google Play
    let verificationResult;
    try {
      if (isSubscription) {
        verificationResult = await googlePlayBillingService.verifySubscription(productId, purchaseToken);
      } else {
        verificationResult = await googlePlayBillingService.verifyPurchase(productId, purchaseToken);
      }
    } catch (error) {
      console.error('Google Play verification failed:', error);
      return res.status(400).json({
        success: false,
        message: 'Invalid purchase token or verification failed',
        error: error.message
      });
    }

    if (!verificationResult.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Purchase verification failed'
      });
    }

    // Calculate subscription dates if applicable
    let subscriptionStartDate = null;
    let subscriptionEndDate = null;
    if (isSubscription && verificationResult.startTimeMillis && verificationResult.expiryTimeMillis) {
      subscriptionStartDate = new Date(parseInt(verificationResult.startTimeMillis));
      subscriptionEndDate = new Date(parseInt(verificationResult.expiryTimeMillis));
    }

    // Create payment record
    const [paymentResult] = await db.execute(
      `INSERT INTO payments (
        user_id, course_id, amount, payment_method, payment_status, 
        transaction_id, payment_gateway, google_play_purchase_token, 
        google_play_product_id, google_play_order_id, is_subscription,
        subscription_start_date, subscription_end_date
      ) VALUES (?, ?, ?, 'google_play', 'completed', ?, 'google_play', ?, ?, ?, ?, ?, ?)`,
      [
        user_id, courseId, course.price, verificationResult.orderId,
        purchaseToken, productId, verificationResult.orderId,
        isSubscription ? 1 : 0, subscriptionStartDate, subscriptionEndDate
      ]
    );

    // Enroll user in course
    await db.execute(
      `INSERT INTO user_courses (user_id, course_id, status) 
       VALUES (?, ?, 'enrolled') 
       ON DUPLICATE KEY UPDATE status = 'enrolled', enrollment_date = CURRENT_TIMESTAMP`,
      [user_id, courseId]
    );

    // Acknowledge the purchase with Google Play (if not already acknowledged)
    try {
      if (verificationResult.acknowledgmentState === 'Yet to be acknowledged') {
        if (isSubscription) {
          await googlePlayBillingService.acknowledgeSubscription(productId, purchaseToken);
        } else {
          await googlePlayBillingService.acknowledgePurchase(productId, purchaseToken);
        }
        console.log('✅ Purchase acknowledged with Google Play');
      }
    } catch (ackError) {
      console.error('⚠️  Purchase acknowledgment failed:', ackError.message);
      // Continue even if acknowledgment fails - the purchase is still valid
    }

    res.status(201).json({
      success: true,
      message: 'Purchase verified and processed successfully',
      data: {
        payment_id: paymentResult.insertId,
        course_name: course.course_name,
        amount: course.price,
        status: 'completed',
        google_play_order_id: verificationResult.orderId,
        is_subscription: isSubscription,
        subscription_start_date: subscriptionStartDate,
        subscription_end_date: subscriptionEndDate,
        verification_details: verificationResult
      }
    });

  } catch (error) {
    console.error('Google Play purchase verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify Google Play purchase'
    });
  }
});

// Get user's Google Play subscription status
router.get('/google-play/subscription-status/:courseId', authenticateToken, async (req, res) => {
  try {
    const { courseId } = req.params;
    const user_id = req.user.id;

    const [subscriptions] = await db.execute(`
      SELECT 
        p.*,
        c.course_name,
        c.description as course_description
      FROM payments p
      JOIN courses c ON p.course_id = c.id
      WHERE p.user_id = ? AND p.course_id = ? AND p.is_subscription = 1
      ORDER BY p.created_at DESC
      LIMIT 1
    `, [user_id, courseId]);

    if (subscriptions.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No subscription found for this course'
      });
    }

    const subscription = subscriptions[0];
    const now = new Date();
    const isActive = subscription.subscription_end_date && new Date(subscription.subscription_end_date) > now;

    res.json({
      success: true,
      data: {
        subscription: {
          ...subscription,
          is_active: isActive,
          days_remaining: isActive ? 
            Math.ceil((new Date(subscription.subscription_end_date) - now) / (1000 * 60 * 60 * 24)) : 0
        }
      }
    });

  } catch (error) {
    console.error('Get subscription status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch subscription status'
    });
  }
});

// Check subscription renewal status with Google Play
router.post('/google-play/check-subscription', authenticateToken, [
  body('subscriptionId').notEmpty().withMessage('Subscription ID is required'),
  body('purchaseToken').notEmpty().withMessage('Purchase token is required')
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

    const { subscriptionId, purchaseToken } = req.body;
    const user_id = req.user.id;

    // Verify current subscription status with Google Play
    const verificationResult = await googlePlayBillingService.verifySubscription(subscriptionId, purchaseToken);

    if (!verificationResult.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Subscription verification failed'
      });
    }

    // Update local subscription record
    const subscriptionEndDate = new Date(parseInt(verificationResult.expiryTimeMillis));
    
    await db.execute(
      `UPDATE payments 
       SET subscription_end_date = ?, updated_at = CURRENT_TIMESTAMP,
           payment_status = CASE 
             WHEN ? > NOW() THEN 'completed'
             ELSE 'refunded'
           END
       WHERE user_id = ? AND google_play_purchase_token = ?`,
      [subscriptionEndDate, subscriptionEndDate, user_id, purchaseToken]
    );

    const isActive = subscriptionEndDate > new Date();

    res.json({
      success: true,
      message: 'Subscription status updated',
      data: {
        is_active: isActive,
        expires_at: subscriptionEndDate,
        auto_renewing: verificationResult.autoRenewing,
        payment_state: verificationResult.paymentState,
        verification_details: verificationResult
      }
    });

  } catch (error) {
    console.error('Check subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check subscription status'
    });
  }
});

// Handle Google Play webhooks (Real-time Developer Notifications)
router.post('/google-play/webhook', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message || !message.data) {
      return res.status(400).json({
        success: false,
        message: 'Invalid webhook payload'
      });
    }

    // Decode the base64 message
    const decodedData = JSON.parse(Buffer.from(message.data, 'base64').toString());
    
    console.log('📱 Google Play webhook received:', decodedData);

    // Handle different notification types
    switch (decodedData.notificationType) {
      case 1: // SUBSCRIPTION_RECOVERED
      case 2: // SUBSCRIPTION_RENEWED
      case 4: // SUBSCRIPTION_PURCHASED
        await handleSubscriptionEvent(decodedData, 'active');
        break;
      
      case 3: // SUBSCRIPTION_CANCELED
      case 12: // SUBSCRIPTION_EXPIRED
        await handleSubscriptionEvent(decodedData, 'expired');
        break;
      
      case 13: // SUBSCRIPTION_ON_HOLD
        await handleSubscriptionEvent(decodedData, 'on_hold');
        break;
      
      default:
        console.log('Unhandled notification type:', decodedData.notificationType);
    }

    res.status(200).json({ success: true });

  } catch (error) {
    console.error('Google Play webhook error:', error);
    res.status(500).json({
      success: false,
      message: 'Webhook processing failed'
    });
  }
});

// Helper function to handle subscription events
async function handleSubscriptionEvent(eventData, status) {
  try {
    const { subscriptionNotification } = eventData;
    if (!subscriptionNotification) return;

    const purchaseToken = subscriptionNotification.purchaseToken;
    
    // Update payment status in database
    await db.execute(
      `UPDATE payments 
       SET payment_status = CASE 
         WHEN ? = 'active' THEN 'completed'
         WHEN ? = 'expired' THEN 'refunded'  
         ELSE payment_status
       END,
       updated_at = CURRENT_TIMESTAMP
       WHERE google_play_purchase_token = ?`,
      [status, status, purchaseToken]
    );

    console.log(`✅ Updated subscription status to ${status} for token: ${purchaseToken}`);
  } catch (error) {
    console.error('Error handling subscription event:', error);
  }
}

module.exports = router;
