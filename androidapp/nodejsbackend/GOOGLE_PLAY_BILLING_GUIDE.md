# Google Play Billing Integration Guide

This guide walks you through integrating Google Play Billing for in-app purchases and subscriptions in your Vedic Astrology app.

## Overview

The integration supports:
- ✅ **One-time purchases** for individual courses
- ✅ **Subscriptions** for premium access
- ✅ **Purchase verification** with Google Play servers
- ✅ **Real-time notifications** for subscription changes
- ✅ **Automatic enrollment** after successful purchase
- ✅ **Webhook support** for subscription lifecycle events

## Prerequisites

1. **Google Play Console Account** with app uploaded
2. **Google Cloud Project** linked to Play Console
3. **Service Account** with proper permissions
4. **MySQL Database** configured and running
5. **SSL Certificate** for production webhook endpoints

## Step-by-Step Setup

### 1. Google Play Console Configuration

#### Create Products
1. Go to **Google Play Console** → Your App → **Monetize** → **Products**
2. Create in-app products for each course:
   ```
   Product ID: course_basic_vedic_astrology
   Name: Basic Vedic Astrology Course
   Price: $9.99
   ```
3. Create subscriptions for premium access:
   ```
   Subscription ID: premium_monthly
   Name: Premium Monthly Access
   Price: $19.99/month
   ```

#### Enable API Access
1. Go to **Setup** → **API access**
2. Link to Google Cloud project or create new one
3. Note the **Google Cloud Project ID**

### 2. Google Cloud Console Setup

#### Enable APIs
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Enable **Google Play Android Developer API**

#### Create Service Account
1. Go to **IAM & Admin** → **Service Accounts**
2. Click **Create Service Account**
3. Set name: `google-play-billing-service`
4. Grant **Editor** role
5. Create and download **JSON key file**

#### Share Service Account
1. Copy the service account email (ends with `.iam.gserviceaccount.com`)
2. In Google Play Console → **Users and permissions**
3. Add the service account email with **Admin** role

### 3. Server Configuration

#### Environment Setup
1. Place the JSON key file at: `config/google-play-service-account.json`
2. Update `.env` file:
```env
# Google Play Billing Configuration
GOOGLE_PLAY_SERVICE_ACCOUNT_KEY_PATH=./config/google-play-service-account.json
GOOGLE_PLAY_PACKAGE_NAME=com.vedicastro.app
GOOGLE_PLAY_DEVELOPER_ACCOUNT_ID=your_play_console_developer_id
```

#### Product Configuration
Update your course products in the database to match Google Play product IDs:
```sql
UPDATE courses SET 
  google_play_product_id = 'course_basic_vedic_astrology'
WHERE id = 1;

UPDATE courses SET 
  google_play_product_id = 'course_advanced_nakshatra'
WHERE id = 2;
```

### 4. Android App Integration

#### Dependencies
Add to `build.gradle` (Module: app):
```gradle
dependencies {
    implementation 'com.android.billingclient:billing:6.0.1'
    implementation 'com.google.code.gson:gson:2.10.1'
}
```

#### Initialize Billing Client
```java
public class BillingManager {
    private BillingClient billingClient;
    private Activity activity;
    
    public BillingManager(Activity activity) {
        this.activity = activity;
        initializeBillingClient();
    }
    
    private void initializeBillingClient() {
        billingClient = BillingClient.newBuilder(activity)
            .setListener(purchaseUpdateListener)
            .enablePendingPurchases()
            .build();
            
        billingClient.startConnection(new BillingClientStateListener() {
            @Override
            public void onBillingSetupFinished(BillingResult billingResult) {
                if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK) {
                    Log.d("Billing", "Billing client ready");
                    loadAvailableProducts();
                }
            }
            
            @Override
            public void onBillingServiceDisconnected() {
                Log.w("Billing", "Billing service disconnected");
            }
        });
    }
}
```

#### Handle Purchases
```java
private PurchasesUpdatedListener purchaseUpdateListener = new PurchasesUpdatedListener() {
    @Override
    public void onPurchasesUpdated(BillingResult billingResult, List<Purchase> purchases) {
        if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK 
            && purchases != null) {
            for (Purchase purchase : purchases) {
                handlePurchase(purchase);
            }
        } else {
            Log.e("Billing", "Purchase failed: " + billingResult.getDebugMessage());
        }
    }
};

private void handlePurchase(Purchase purchase) {
    if (purchase.getPurchaseState() == Purchase.PurchaseState.PURCHASED) {
        // Send to backend for verification
        verifyPurchaseWithBackend(purchase);
    }
}
```

#### Backend Verification
```java
private void verifyPurchaseWithBackend(Purchase purchase) {
    VerifyPurchaseRequest request = new VerifyPurchaseRequest();
    request.setProductId(purchase.getSkus().get(0));
    request.setPurchaseToken(purchase.getPurchaseToken());
    request.setCourseId(getCurrentCourseId());
    request.setIsSubscription(isSubscriptionProduct(purchase.getSkus().get(0)));
    
    apiService.verifyGooglePlayPurchase(request)
        .enqueue(new Callback<VerifyPurchaseResponse>() {
            @Override
            public void onResponse(Call<VerifyPurchaseResponse> call, 
                                 Response<VerifyPurchaseResponse> response) {
                if (response.isSuccessful() && response.body().isSuccess()) {
                    // Purchase verified successfully
                    showPurchaseSuccess();
                    navigateToCourse();
                } else {
                    // Verification failed
                    showPurchaseError("Purchase verification failed");
                }
            }
            
            @Override
            public void onFailure(Call<VerifyPurchaseResponse> call, Throwable t) {
                showPurchaseError("Network error: " + t.getMessage());
            }
        });
}
```

### 5. API Integration

#### Verify Purchase
```javascript
// POST /api/billing/google-play/verify-purchase
const verifyPurchase = async (purchaseData) => {
  const response = await fetch('/api/billing/google-play/verify-purchase', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`
    },
    body: JSON.stringify({
      productId: purchaseData.productId,
      purchaseToken: purchaseData.purchaseToken,
      courseId: purchaseData.courseId,
      isSubscription: purchaseData.isSubscription
    })
  });
  
  return response.json();
};
```

#### Check Subscription Status
```javascript
// GET /api/billing/google-play/subscription-status/:courseId
const checkSubscriptionStatus = async (courseId) => {
  const response = await fetch(`/api/billing/google-play/subscription-status/${courseId}`, {
    headers: {
      'Authorization': `Bearer ${jwtToken}`
    }
  });
  
  return response.json();
};
```

### 6. Real-time Developer Notifications (Optional)

#### Set up Pub/Sub Topic
1. In Google Cloud Console, create a Pub/Sub topic
2. Create a subscription for the topic
3. Configure endpoint: `https://yourdomain.com/api/billing/google-play/webhook`

#### Configure in Play Console
1. Go to **Monetize** → **Monetization setup**
2. Enable **Real-time developer notifications**
3. Enter your Pub/Sub topic name

### 7. Testing

#### Test Accounts
1. Add test accounts in Play Console → **Setup** → **License Testing**
2. Use these accounts for testing purchases

#### Test Products
1. Create test products with `android.test.purchased` SKU
2. Use Google Play Console's test track for testing

#### Verification Testing
```bash
# Test purchase verification endpoint
curl -X POST https://yourserver.com/api/billing/google-play/verify-purchase \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "productId": "course_basic_vedic_astrology",
    "purchaseToken": "test_purchase_token_from_google_play",
    "courseId": 1,
    "isSubscription": false
  }'
```

## Security Considerations

1. **Always verify purchases server-side** - Never trust client-side validation
2. **Use HTTPS** for all API endpoints in production
3. **Validate JWT tokens** for all billing endpoints
4. **Store purchase tokens securely** and check for duplicates
5. **Handle webhook authenticity** using Google's verification methods
6. **Log all billing events** for audit purposes

## Troubleshooting

### Common Issues

1. **"Purchase already processed"**
   - Each purchase token can only be used once
   - Check database for existing records

2. **"Invalid purchase token"**
   - Token might be expired or fake
   - Verify token format and authenticity

3. **"Service account permissions"**
   - Ensure service account has proper Play Console access
   - Check API is enabled in Google Cloud Console

4. **"Subscription not found"**
   - Verify subscription ID matches Play Console
   - Check subscription status with Google Play

### Debug Commands

```bash
# Check server health
curl http://localhost:3000/api/health

# Test database connection
curl http://localhost:3000/api/payments/courses

# Check Google Play service initialization
# (Check server logs for initialization messages)
```

## Production Deployment

1. **Update environment variables** with production values
2. **Configure SSL certificate** for webhook endpoints
3. **Set up monitoring** for billing events
4. **Configure backup strategy** for purchase records
5. **Test thoroughly** with real Google accounts before launch

## Support

For issues with Google Play integration:
1. Check Google Play Console documentation
2. Review server logs for detailed error messages
3. Test with Google Play's test accounts
4. Verify service account permissions
