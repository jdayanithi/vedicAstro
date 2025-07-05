package com.ldml;

import android.app.Activity;
import android.content.Context;
import android.content.pm.PackageManager;
import android.os.Build;
import android.provider.Settings;
import android.view.WindowManager;
import android.webkit.WebView;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.JSObject;

@CapacitorPlugin(name = "SecurityPlugin")
public class SecurityPlugin extends Plugin {

    @PluginMethod
    public void disableTextSelection(PluginCall call) {
        getBridge().getActivity().runOnUiThread(() -> {
            WebView webView = getBridge().getWebView();
            if (webView != null) {
                // Disable text selection
                webView.setOnLongClickListener(v -> true);
                webView.setLongClickable(false);
                webView.setHapticFeedbackEnabled(false);
                
                // Disable context menu
                webView.setOnCreateContextMenuListener(null);
            }
        });
        call.resolve();
    }
    
    @PluginMethod
    public void enableSecureMode(PluginCall call) {
        getBridge().getActivity().runOnUiThread(() -> {
            WebView webView = getBridge().getWebView();
            if (webView != null) {
                // Additional security settings
                webView.getSettings().setAllowContentAccess(false);
                webView.getSettings().setAllowFileAccess(false);
                webView.getSettings().setAllowFileAccessFromFileURLs(false);
                webView.getSettings().setAllowUniversalAccessFromFileURLs(false);
            }
        });
        call.resolve();
    }
    
    @PluginMethod
    public void preventScreenshots(PluginCall call) {
        getBridge().getActivity().runOnUiThread(() -> {
            Activity activity = getBridge().getActivity();
            if (activity != null) {
                activity.getWindow().setFlags(
                    WindowManager.LayoutParams.FLAG_SECURE,
                    WindowManager.LayoutParams.FLAG_SECURE
                );
            }
        });
        
        JSObject result = new JSObject();
        result.put("success", true);
        result.put("message", "Screenshot prevention enabled");
        call.resolve(result);
    }
    
    @PluginMethod
    public void allowScreenshots(PluginCall call) {
        getBridge().getActivity().runOnUiThread(() -> {
            Activity activity = getBridge().getActivity();
            if (activity != null) {
                activity.getWindow().clearFlags(WindowManager.LayoutParams.FLAG_SECURE);
            }
        });
        
        JSObject result = new JSObject();
        result.put("success", true);
        result.put("message", "Screenshot prevention disabled");
        call.resolve(result);
    }
    
    @PluginMethod
    public void isSecureModeEnabled(PluginCall call) {
        Activity activity = getBridge().getActivity();
        boolean isSecure = false;
        
        if (activity != null) {
            int flags = activity.getWindow().getAttributes().flags;
            isSecure = (flags & WindowManager.LayoutParams.FLAG_SECURE) != 0;
        }
        
        JSObject result = new JSObject();
        result.put("isSecure", isSecure);
        call.resolve(result);
    }
    
    @PluginMethod
    public void checkDeviceSecurity(PluginCall call) {
        JSObject result = new JSObject();
        Context context = getBridge().getContext();
        
        // Check if device is rooted
        boolean isRooted = isDeviceRooted(context);
        result.put("isRooted", isRooted);
        
        // Check developer options
        boolean devOptionsEnabled = isDeveloperOptionsEnabled(context);
        result.put("developerOptionsEnabled", devOptionsEnabled);
        
        // Check USB debugging
        boolean usbDebuggingEnabled = isUSBDebuggingEnabled(context);
        result.put("usbDebuggingEnabled", usbDebuggingEnabled);
        
        // Overall security status
        boolean isSecureDevice = !isRooted && !devOptionsEnabled && !usbDebuggingEnabled;
        result.put("isSecureDevice", isSecureDevice);
        
        call.resolve(result);
    }
    
    @PluginMethod
    public void clearWebViewData(PluginCall call) {
        getBridge().getActivity().runOnUiThread(() -> {
            WebView webView = getBridge().getWebView();
            if (webView != null) {
                webView.clearCache(true);
                webView.clearFormData();
                webView.clearHistory();
                
                // Force garbage collection
                System.gc();
            }
        });
        
        JSObject result = new JSObject();
        result.put("success", true);
        result.put("message", "WebView data cleared");
        call.resolve(result);
    }
    
    @PluginMethod
    public void enableAdvancedSecurity(PluginCall call) {
        getBridge().getActivity().runOnUiThread(() -> {
            WebView webView = getBridge().getWebView();
            if (webView != null) {
                // Enhanced WebView security
                webView.getSettings().setJavaScriptCanOpenWindowsAutomatically(false);
                webView.getSettings().setMediaPlaybackRequiresUserGesture(true);
                webView.getSettings().setMixedContentMode(android.webkit.WebSettings.MIXED_CONTENT_NEVER_ALLOW);
                
                // Disable zoom controls
                webView.getSettings().setBuiltInZoomControls(false);
                webView.getSettings().setDisplayZoomControls(false);
                webView.getSettings().setSupportZoom(false);
                
                // Additional security measures
                webView.setOnLongClickListener(v -> true);
                webView.setLongClickable(false);
                webView.setHapticFeedbackEnabled(false);
                webView.setOnCreateContextMenuListener(null);
            }
        });
        
        JSObject result = new JSObject();
        result.put("success", true);
        result.put("message", "Advanced security features enabled");
        call.resolve(result);
    }
    
    private boolean isDeviceRooted(Context context) {
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
        
        PackageManager pm = context.getPackageManager();
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
    
    private boolean isDeveloperOptionsEnabled(Context context) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1) {
            return Settings.Secure.getInt(
                context.getContentResolver(),
                Settings.Global.DEVELOPMENT_SETTINGS_ENABLED,
                0
            ) != 0;
        }
        return false;
    }
    
    private boolean isUSBDebuggingEnabled(Context context) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1) {
            return Settings.Secure.getInt(
                context.getContentResolver(),
                Settings.Global.ADB_ENABLED,
                0
            ) != 0;
        }
        return false;
    }
}
