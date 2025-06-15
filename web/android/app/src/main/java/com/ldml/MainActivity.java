package com.ldml;

import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.WebView;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Configure status bar
        configureStatusBar();
        
        // Disable screenshots and screen recording
        getWindow().setFlags(
            WindowManager.LayoutParams.FLAG_SECURE,
            WindowManager.LayoutParams.FLAG_SECURE
        );
        
        // Register custom plugin
        registerPlugin(SecurityPlugin.class);
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
        }
    }
}
