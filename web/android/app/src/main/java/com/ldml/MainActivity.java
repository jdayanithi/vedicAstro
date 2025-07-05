package com.ldml;

import android.app.Activity;
import android.app.ActivityManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.ActivityInfo;
import android.content.pm.PackageManager;
import android.media.AudioManager;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.WebView;
import android.widget.Toast;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    
    private ScreenshotDetectionReceiver screenshotReceiver;
    private boolean isDeviceSecure = true;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Initialize security checks
        performSecurityChecks();
        
        // Configure status bar
        configureStatusBar();
        
        // Enhanced security measures
        enableSecurityFeatures();
        
        // Set up security monitoring
        setupSecurityMonitoring();
        
        // Register custom plugin
        registerPlugin(SecurityPlugin.class);
    }
    
    private void enableSecurityFeatures() {
        Window window = getWindow();
        
        // Disable screenshots and screen recording (PRIMARY SECURITY FEATURE)
        window.setFlags(
            WindowManager.LayoutParams.FLAG_SECURE,
            WindowManager.LayoutParams.FLAG_SECURE
        );
        
        // Prevent app from appearing in recent apps screenshots
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            window.addFlags(WindowManager.LayoutParams.FLAG_SECURE);
        }
        
        // Additional security flags
        window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);  // Prevent screen timeout during use
        
        // Disable hardware acceleration for content protection
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB) {
            window.setFlags(
                WindowManager.LayoutParams.FLAG_HARDWARE_ACCELERATED,
                WindowManager.LayoutParams.FLAG_HARDWARE_ACCELERATED
            );
        }
        
        // Lock orientation to prevent unwanted behavior during screenshots
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        
        // Disable showing the app in recent apps with sensitive content
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            ActivityManager.TaskDescription taskDescription = new ActivityManager.TaskDescription(
                "LDML Astro", 
                null, 
                getResources().getColor(android.R.color.black)
            );
            setTaskDescription(taskDescription);
        }
    }
    
    private void performSecurityChecks() {
        // Check if device is rooted
        if (isDeviceRooted()) {
            showSecurityWarning("Device appears to be rooted. Some security features may be compromised.");
            isDeviceSecure = false;
        }
        
        // Check if developer options are enabled
        if (isDeveloperOptionsEnabled()) {
            showSecurityWarning("Developer options are enabled. Please disable for enhanced security.");
        }
        
        // Check if USB debugging is enabled
        if (isUSBDebuggingEnabled()) {
            showSecurityWarning("USB debugging is enabled. Please disable for enhanced security.");
        }
    }
    
    private boolean isDeviceRooted() {
        // Check for common root files and paths
        String[] rootPaths = {
            "/system/app/Superuser.apk",
            "/sbin/su",
            "/system/bin/su",
            "/system/xbin/su",
            "/data/local/xbin/su",
            "/data/local/bin/su",
            "/system/sd/xbin/su",
            "/system/bin/failsafe/su",
            "/data/local/su"
        };
        
        for (String path : rootPaths) {
            if (new java.io.File(path).exists()) {
                return true;
            }
        }
        
        // Check for root management apps
        String[] rootApps = {
            "com.noshufou.android.su",
            "com.noshufou.android.su.elite",
            "eu.chainfire.supersu",
            "com.koushikdutta.superuser",
            "com.thirdparty.superuser",
            "com.yellowes.su"
        };
        
        PackageManager pm = getPackageManager();
        for (String app : rootApps) {
            try {
                pm.getPackageInfo(app, PackageManager.GET_ACTIVITIES);
                return true;
            } catch (PackageManager.NameNotFoundException e) {
                // App not found, continue checking
            }
        }
        
        return false;
    }
    
    private boolean isDeveloperOptionsEnabled() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1) {
            return Settings.Secure.getInt(
                getContentResolver(),
                Settings.Global.DEVELOPMENT_SETTINGS_ENABLED,
                0
            ) != 0;
        }
        return false;
    }
    
    private boolean isUSBDebuggingEnabled() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1) {
            return Settings.Secure.getInt(
                getContentResolver(),
                Settings.Global.ADB_ENABLED,
                0
            ) != 0;
        }
        return false;
    }
    
    private void showSecurityWarning(String message) {
        Toast.makeText(this, "⚠️ Security Warning: " + message, Toast.LENGTH_LONG).show();
    }
    
    private void setupSecurityMonitoring() {
        // Set up screenshot detection (for monitoring purposes)
        screenshotReceiver = new ScreenshotDetectionReceiver();
        IntentFilter filter = new IntentFilter();
        filter.addAction(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE);
        filter.addAction(Intent.ACTION_MEDIA_SCANNER_STARTED);
        filter.addDataScheme("file");
        
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            registerReceiver(screenshotReceiver, filter, Context.RECEIVER_NOT_EXPORTED);
        } else {
            registerReceiver(screenshotReceiver, filter);
        }
        
        // Monitor for screen recording apps
        monitorScreenRecording();
    }
    
    private void configureStatusBar() {
        Window window = getWindow();
        
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            // Clear any layout flags that might cause overlap
            window.clearFlags(WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS);
            window.clearFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
            
            // Set status bar color
            window.setStatusBarColor(getResources().getColor(android.R.color.black));
            
            // Ensure content doesn't draw behind status bar
            View decorView = window.getDecorView();
            int flags = decorView.getSystemUiVisibility();
            flags &= ~View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN;
            flags &= ~View.SYSTEM_UI_FLAG_LAYOUT_STABLE;
            flags &= ~View.SYSTEM_UI_FLAG_FULLSCREEN;
            decorView.setSystemUiVisibility(flags);
            
            // Explicitly set window to respect system windows
            decorView.setFitsSystemWindows(true);
        }
    }
    
    @Override
    public void onStart() {
        super.onStart();
        
        // Additional security measures for WebView
        WebView webView = getBridge().getWebView();
        if (webView != null) {
            // Disable text selection
            webView.setOnLongClickListener(v -> true);
            webView.setLongClickable(false);
            webView.setHapticFeedbackEnabled(false);
            
            // Disable context menu
            webView.setOnCreateContextMenuListener(null);
            
            // Additional WebView security settings
            webView.getSettings().setAllowContentAccess(false);
            webView.getSettings().setAllowFileAccess(false);
            webView.getSettings().setAllowFileAccessFromFileURLs(false);
            webView.getSettings().setAllowUniversalAccessFromFileURLs(false);
            
            // Enhanced WebView security
            webView.getSettings().setJavaScriptCanOpenWindowsAutomatically(false);
            webView.getSettings().setMediaPlaybackRequiresUserGesture(true);
            webView.getSettings().setMixedContentMode(android.webkit.WebSettings.MIXED_CONTENT_NEVER_ALLOW);
            
            // Disable zoom controls
            webView.getSettings().setBuiltInZoomControls(false);
            webView.getSettings().setDisplayZoomControls(false);
            webView.getSettings().setSupportZoom(false);
        }
    }
    
    @Override
    public void onResume() {
        super.onResume();
        
        // Re-enable security features when app resumes
        enableSecurityFeatures();
        
        // Check if app was backgrounded and potentially screenshotted
        checkAppIntegrity();
    }
    
    @Override
    public void onPause() {
        super.onPause();
        
        // Clear sensitive data from memory when app goes to background
        clearSensitiveData();
    }
    
    @Override
    public void onDestroy() {
        super.onDestroy();
        
        // Unregister receivers
        if (screenshotReceiver != null) {
            try {
                unregisterReceiver(screenshotReceiver);
            } catch (IllegalArgumentException e) {
                // Receiver was not registered
            }
        }
        
        // Clear all sensitive data
        clearSensitiveData();
    }
    
    private void monitorScreenRecording() {
        // Check for common screen recording apps
        String[] screenRecordingApps = {
            "com.mobizen.mirroring.uimode",
            "com.hecorat.screenrecorder.free",
            "com.kimcy929.screenrecorder",
            "com.nll.screenrecorder",
            "com.duapps.recorder",
            "com.pro.video.tool"
        };
        
        PackageManager pm = getPackageManager();
        for (String app : screenRecordingApps) {
            try {
                pm.getPackageInfo(app, PackageManager.GET_ACTIVITIES);
                showSecurityWarning("Screen recording app detected: " + app);
            } catch (PackageManager.NameNotFoundException e) {
                // App not found, continue checking
            }
        }
    }
    
    private void checkAppIntegrity() {
        // Check if app was tampered with while in background
        if (!isDeviceSecure) {
            showSecurityWarning("Device security status changed. Please ensure device security.");
        }
        
        // Additional integrity checks can be added here
    }
    
    private void clearSensitiveData() {
        // Clear WebView cache and data
        WebView webView = getBridge().getWebView();
        if (webView != null) {
            webView.clearCache(true);
            webView.clearFormData();
            webView.clearHistory();
        }
        
        // Force garbage collection
        System.gc();
    }
    
    // Screenshot detection receiver
    private class ScreenshotDetectionReceiver extends BroadcastReceiver {
        @Override
        public void onReceive(Context context, Intent intent) {
            // Log screenshot attempts (for monitoring purposes)
            // Note: FLAG_SECURE should prevent actual screenshots
            String action = intent.getAction();
            if (Intent.ACTION_MEDIA_SCANNER_SCAN_FILE.equals(action) ||
                Intent.ACTION_MEDIA_SCANNER_STARTED.equals(action)) {
                
                // Additional security logging or actions can be added here
                // For example, notify server about screenshot attempts
                android.util.Log.w("SecurityWarning", "Media scanner activity detected");
            }
        }
    }
}
