package kz.tradeagent.manager;

import android.app.*;
import android.os.*;
import android.content.*;
import android.graphics.Color;
import android.net.*;
import android.provider.Settings;
import android.view.*;
import android.webkit.*;
import android.widget.*;
import java.net.URISyntaxException;

public class MainActivity extends Activity {
    private WebView web;
    private ValueCallback<Uri[]> fileCallback;
    private static final int FILE_CHOOSER = 1201;
    private static final String FALLBACK = "file:///android_asset/www/index.html";

    @Override public void onCreate(Bundle b) {
        super.onCreate(b);
        getWindow().setStatusBarColor(Color.rgb(8,10,8));
        getWindow().setNavigationBarColor(Color.rgb(8,10,8));
        if (Build.VERSION.SDK_INT >= 28) getWindow().getAttributes().layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
        web = new WebView(this);
        web.setBackgroundColor(Color.rgb(8,10,8));
        web.setOverScrollMode(View.OVER_SCROLL_NEVER);
        setContentView(web, new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        configure();
        if (b != null) web.restoreState(b); else web.loadUrl(BuildConfig.REMOTE_URL);
    }

    private void configure() {
        WebSettings s=web.getSettings();
        s.setJavaScriptEnabled(true); s.setDomStorageEnabled(true); s.setDatabaseEnabled(true);
        s.setLoadWithOverviewMode(false); s.setUseWideViewPort(true); s.setBuiltInZoomControls(false); s.setDisplayZoomControls(false);
        s.setSupportZoom(false); s.setMediaPlaybackRequiresUserGesture(false); s.setAllowFileAccess(true); s.setAllowContentAccess(true);
        s.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        s.setUserAgentString(s.getUserAgentString()+" TradeAgentAndroid/1.0");
        CookieManager.getInstance().setAcceptCookie(true); CookieManager.getInstance().setAcceptThirdPartyCookies(web,true);

        web.setWebViewClient(new WebViewClient(){
            @Override public boolean shouldOverrideUrlLoading(WebView v, WebResourceRequest r){ return route(r.getUrl()); }
            @Override public void onReceivedError(WebView v, WebResourceRequest r, WebResourceError e){
                if(r.isForMainFrame() && !v.getUrl().startsWith("file:")) v.loadUrl(FALLBACK);
            }
        });
        web.setWebChromeClient(new WebChromeClient(){
            @Override public boolean onShowFileChooser(WebView w, ValueCallback<Uri[]> cb, FileChooserParams p){
                if(fileCallback!=null) fileCallback.onReceiveValue(null); fileCallback=cb;
                try { startActivityForResult(p.createIntent(),FILE_CHOOSER); return true; }
                catch(Exception e){ fileCallback=null; return false; }
            }
        });
        web.setDownloadListener((url,ua,cd,mime,len)->{
            try { startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(url))); }
            catch(Exception ignored) { Toast.makeText(this,"Не удалось открыть файл",Toast.LENGTH_SHORT).show(); }
        });
    }

    private boolean route(Uri u){
        String scheme=u.getScheme()==null?"":u.getScheme().toLowerCase();
        String host=u.getHost()==null?"":u.getHost().toLowerCase();
        if(scheme.equals("http")||scheme.equals("https")){
            if(host.equals("arekenzi.github.io") || host.endsWith("firebaseapp.com") || host.endsWith("googleapis.com") || host.endsWith("gstatic.com")) return false;
            try { startActivity(new Intent(Intent.ACTION_VIEW,u)); } catch(Exception ignored){} return true;
        }
        if(scheme.equals("intent")){
            try { Intent i=Intent.parseUri(u.toString(),Intent.URI_INTENT_SCHEME); startActivity(i); } catch(Exception ignored){} return true;
        }
        try { startActivity(new Intent(Intent.ACTION_VIEW,u)); } catch(Exception ignored){} return true;
    }

    @Override protected void onActivityResult(int req,int result,Intent data){
        super.onActivityResult(req,result,data);
        if(req==FILE_CHOOSER && fileCallback!=null){ fileCallback.onReceiveValue(WebChromeClient.FileChooserParams.parseResult(result,data)); fileCallback=null; }
    }
    @Override protected void onSaveInstanceState(Bundle out){ web.saveState(out); super.onSaveInstanceState(out); }
    @Override public void onBackPressed(){ if(web.canGoBack()) web.goBack(); else super.onBackPressed(); }
}
