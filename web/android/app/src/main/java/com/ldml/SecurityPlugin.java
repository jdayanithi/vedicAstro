package com.ldml;

import android.webkit.WebView;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

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
}
