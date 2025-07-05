# Android Security Features Documentation

## Comprehensive Security Implementation

The Vedic Astrology Android application implements multiple layers of security protection to safeguard sensitive content from unauthorized access, screenshots, and security threats.

## 🔒 Enhanced Security Features

### 1. Screenshot & Screen Recording Prevention
- **Primary Protection**: `WindowManager.LayoutParams.FLAG_SECURE`
- **Recent Apps Protection**: Prevents app content in task switcher
- **Media Scanner Monitoring**: Detects screenshot attempts
- **Location**: `MainActivity.java` - Enhanced `enableSecurityFeatures()` method

### 2. Advanced Device Security Monitoring
- **Root Detection**: Comprehensive root file and app detection
- **Developer Options Monitoring**: Checks if dev settings are enabled
- **USB Debugging Detection**: Monitors ADB debugging status
- **Screen Recording App Detection**: Identifies common recording apps

### 3. Enhanced WebView Security
- **Text Selection Disabled**: Prevents content copying
- **Context Menu Disabled**: Removes long-press menus
- **File Access Restrictions**: Blocks unauthorized file access
- **Mixed Content Prevention**: Blocks insecure content
- **Zoom Controls Disabled**: Prevents zooming
- **Auto-popup Prevention**: Blocks JavaScript popups

### 4. App Lifecycle Security
- **Memory Clearing**: Clears sensitive data on background
- **Cache Management**: Removes browsing history and cache
- **Task Description Security**: Custom recent apps appearance
- **Orientation Lock**: Forces portrait mode

#### Angular Security Service
- **File**: `security.service.ts`
- **Functions**:
  - Initialize security on app startup
  - Platform detection
  - Security feature management
  - Development mode controls

## Security Measures Applied

### 1. Window-Level Security
```java
// Prevent screenshots and screen recording
window.setFlags(
    WindowManager.LayoutParams.FLAG_SECURE,
    WindowManager.LayoutParams.FLAG_SECURE
);
```

### 2. WebView Security
```java
// Disable content access
webView.getSettings().setAllowContentAccess(false);
webView.getSettings().setAllowFileAccess(false);
webView.getSettings().setAllowFileAccessFromFileURLs(false);
webView.getSettings().setAllowUniversalAccessFromFileURLs(false);

// Disable text selection
webView.setOnLongClickListener(v -> true);
webView.setLongClickable(false);
webView.setHapticFeedbackEnabled(false);
```

### 3. Orientation Lock
```java
// Lock to portrait mode
setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
```

## Usage

### Automatic Initialization
Security features are automatically enabled when the app starts:
```typescript
// In app.component.ts
await this.securityService.initializeSecurity();
```

### Manual Control (Development)
```typescript
// Prevent screenshots
await this.securityService.preventScreenshots();

// Allow screenshots (for testing)
await this.securityService.allowScreenshots();

// Check security status
const isSecure = await this.securityService.isSecureModeEnabled();
```

## Security Status Indicators

### Console Logs
- ✅ `"Security status: SECURE"` - All protections active
- ⚠️ `"Security status: NOT SECURE"` - Protection disabled
- 🌐 `"Running on web platform - security features not available"` - Web browser

### Visual Indicators
- Black screen when attempting screenshots
- "Can't take screenshot due to security policy" message on Android
- Disabled text selection and context menus

## Platform Support

| Feature | Android | iOS | Web |
|---------|---------|-----|-----|
| Screenshot Prevention | ✅ | ✅ | ❌ |
| Screen Recording Block | ✅ | ✅ | ❌ |
| Text Selection Control | ✅ | ✅ | ❌ |
| Context Menu Disable | ✅ | ✅ | ❌ |
| Recent Apps Protection | ✅ | ✅ | ❌ |

## Technical Notes

### Android Limitations
- FLAG_SECURE only works on native Android apps
- Does not prevent external camera recording of the screen
- Root/jailbroken devices may bypass these restrictions

### Development Considerations
- Screenshots can be temporarily enabled for development
- Use `allowScreenshots()` method for testing
- Security warnings appear in web browser console

### Performance Impact
- Minimal performance impact
- May slightly reduce rendering performance due to secure rendering path
- No significant battery drain

## Testing

### Verify Protection
1. **Screenshot Test**: Try taking a screenshot → Should show black screen
2. **Screen Recording**: Try recording → Should show black content
3. **Recent Apps**: Check app preview → Should not show sensitive content
4. **Text Selection**: Try selecting text → Should be disabled

### Debug Mode
```typescript
// Check if protection is active
const isProtected = await this.securityService.isSecureModeEnabled();
console.log('App is protected:', isProtected);
```

## Compliance

This implementation helps meet security requirements for:
- **Financial Applications**: Prevents capture of sensitive financial data
- **Healthcare Apps**: Protects patient information (HIPAA compliance)
- **Educational Content**: Prevents unauthorized copying of course materials
- **Enterprise Applications**: Protects proprietary business information

## Troubleshooting

### Common Issues
1. **Screenshots working in debug mode**: Check if `allowScreenshots()` was called
2. **Not working on emulator**: Use physical device for testing
3. **Web platform warnings**: Expected behavior, feature only works on native platforms

### Support
- Android API Level 21+ (Android 5.0+)
- Capacitor 5.0+
- Ionic 7.0+
- Angular 16+
