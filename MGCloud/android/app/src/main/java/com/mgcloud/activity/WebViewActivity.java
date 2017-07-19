package com.mgcloud.activity;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import com.alibaba.fastjson.JSONObject;
import com.mgcloud.R;
import org.apache.commons.codec.digest.DigestUtils;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

/**
 * 咪咕客服功能activity
 * @author shisheng.zhao
 * @date 2017-07-19
 */
public class WebViewActivity extends Activity {
    private WebView mWebView;
    private String userId = "";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_webview);
        userId = getIntent().getStringExtra("userId");
        if ("".equals(userId) || null == userId) {
            userId = "2272087507094";
        }
        mWebView = (WebView) findViewById(R.id.webView);
        WebSettings webSettings = mWebView.getSettings();
        webSettings.setJavaScriptEnabled(true);  // 设置支持javascript脚本
        webSettings.setUseWideViewPort(true); // 可任意比例缩放
        webSettings.setDomStorageEnabled(true); // 支持文件存储
        webSettings.setDatabaseEnabled(true); // 支持数据库存储
        webSettings.setJavaScriptCanOpenWindowsAutomatically(true); // 设置为true表示支持使用js打开新的窗口
        webSettings.setSupportMultipleWindows(true); // 多窗口
        webSettings.setLoadWithOverviewMode(true); // 设置网页自适应屏幕大小
        webSettings.setSaveFormData(true); //设置WebView是否保存表单数据,默认true,保存数据
        webSettings.setAllowFileAccess(true); //设置允许访问文件数据webSettings.setGeolocationEnabled(true); //HTML5的地理位置服务,设置为true,启用地理定位
        webSettings.setAppCacheMaxSize(1024 * 1024 * 8); //最大缓存
        String appCachePath = this.getApplicationContext().getCacheDir().getAbsolutePath();
        webSettings.setAppCachePath(appCachePath); // 设置缓存文件的路径
        webSettings.setAppCacheEnabled(true); // 支持缓存
        mWebView.addJavascriptInterface(new CMGameJS(), "kf");
        mWebView.setInitialScale(25);// 为25%，最小缩放等级
        final String timeTemp = String.valueOf(System.currentTimeMillis());
        String md5str = "";
        final String baseKey = "15D6E12352BAD9A2EE3DB55671B918ED";
        final String channelId = "1609";
        final String appId = "1609000001";
        final String userType = "16";
        JSONObject map = new JSONObject();
        map.put("seq", timeTemp);
        map.put("appid", appId);
        map.put("channelId", channelId);
        map.put("msisdn", "13220112064");
        map.put("email", "zhaoshisheng@haima.me");
        map.put("account", "zhaoshisheng");
        map.put("nickname", "tianyu");
        map.put("servicetype", "6");
        map.put("usertype", userType);
        map.put("userId", userId);
        List<String> list = new ArrayList<String>();
        // 对所有参数进行排序
        for (Map.Entry<String, Object> entry : map.entrySet()) {
            list.add(entry.getKey());
        }
        Collections.sort(list);
        // 拼接要加密的字符串
        for (String key : list) {
            md5str += key + map.get(key);
        }
        //MD5加密，得到hash值
        final String hash = DigestUtils.md5Hex(md5str.trim() + baseKey);
        try {
            StringBuilder buf = new StringBuilder("http://223.111.8.101:8080/api/onlineWapV2");
            buf.append("?");
            buf.append("seq=" + URLEncoder.encode(timeTemp, "UTF-8") + "&");
            buf.append("appid=" + URLEncoder.encode(appId, "UTF-8") + "&");
            buf.append("channelId=" + URLEncoder.encode(channelId, "UTF-8") + "&");
            buf.append("msisdn=" + URLEncoder.encode("13220112064", "UTF-8") + "&");
            buf.append("email=" + URLEncoder.encode("zhaoshisheng@haima.me", "UTF-8") + "&");
            buf.append("account=" + URLEncoder.encode("zhaoshisheng", "UTF-8") + "&");
            buf.append("nickname=" + URLEncoder.encode("tianyu", "UTF-8") + "&");
            buf.append("servicetype=" + URLEncoder.encode("6", "UTF-8") + "&");
            buf.append("usertype=" + URLEncoder.encode(userType, "UTF-8") + "&");
            buf.append("userId=" + URLEncoder.encode(userId, "UTF-8") + "&");
            buf.append("hash=" + URLEncoder.encode(hash, "UTF-8"));
            mWebView.loadUrl(buf.toString());
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    /**
     * webView通过addJavascriptInterface注入CMGameJS Html5页面通过调用CMGameJS的public
     * method与java交互
     */
    public class CMGameJS {
        @JavascriptInterface
        public void close() {
            finish();
        }
    }

    @Override
    protected void onStop() {
        super.onStop();
    }

    @Override
    public void finish() {
        super.finish();
    }

    @Override
    protected void onDestroy() {
        if (mWebView != null) {
            mWebView.removeAllViews();
            mWebView.destroy();
        }
        super.onDestroy();
    }
}
