package com.mgcloud.activity;

import android.Manifest;
import android.app.Activity;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.os.Build;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import com.alibaba.fastjson.JSONObject;
import com.haima.hmcp.HmcpManager;
import com.haima.hmcp.beans.Message;
import com.haima.hmcp.beans.MessagePayload;
import com.haima.hmcp.beans.UserInfo;
import com.haima.hmcp.enums.ErrorType;
import com.haima.hmcp.enums.NetWorkState;
import com.haima.hmcp.enums.ScreenOrientation;
import com.haima.hmcp.listeners.HmcpPlayerListener;
import com.haima.hmcp.listeners.OnInitCallBackListener;
import com.haima.hmcp.utils.CryptoUtils;
import com.haima.hmcp.widgets.HmcpVideoView;
import com.mgcloud.R;

/**
 * 云玩界面activity
 * @author shisheng.zhao
 * @date 2017-06-26
 */
public class CloudPlayActivity extends AppCompatActivity implements HmcpPlayerListener,
        View.OnSystemUiVisibilityChangeListener {
    private HmcpVideoView hmcpVideoView;
    private String packageName = "com.netease.onmyoji";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_cloudplay);
        packageName = getIntent().getStringExtra("packageName");
        getIntent().getStringExtra("userId");
        getIntent().getStringExtra("playTime");
        hmcpVideoView = (HmcpVideoView) this.findViewById(R.id.gameView);
        getWindow().getDecorView().setOnSystemUiVisibilityChangeListener(this);
        initSDK();
        setTranslucentStatus(this);
    }

    private void initSDK() {
        HmcpManager manager = HmcpManager.getInstance();
        manager.init(this, new OnInitCallBackListener() {
            @Override
            public void success() { // 初始化SDK成功，可以云游戏
                requestCloudSdkPermission();
            }

            @Override
            public void fail(String s) { // 初始化SDK失败，不能云游戏
            }
        });
    }

    private void requestCloudSdkPermission() {
        if (Build.VERSION.SDK_INT >= 23 && ContextCompat.checkSelfPermission(this, Manifest.permission.READ_PHONE_STATE) != PackageManager.PERMISSION_GRANTED) {
            String[] mPermissionList = new String[]{Manifest.permission.READ_PHONE_STATE};
            ActivityCompat.requestPermissions(CloudPlayActivity.this, mPermissionList, 100);
        } else {
            // 不需要申请权限,开始云游戏
            startPlayCloudGame();
        }
    }

    private void startPlayCloudGame() {
        UserInfo mUserInfo = new UserInfo();
        mUserInfo.userId = "migu" + System.currentTimeMillis();
        mUserInfo.userToken = "userToken" + System.currentTimeMillis();
        hmcpVideoView.setUserInfo(mUserInfo);
        ScreenOrientation orientation = ScreenOrientation.LANDSCAPE; // 手机游戏默认都传ScreenOrientation.LANDSCAPE
        int playTime = 20 * 60 * 1000; // 用户可以玩游戏的时长，以ms为单位
        int priority = 0; // 用户申请游戏服务的优先级,传0就可以
        int appId = 0; // 预留参数，可以为0
//        String packageName = "com.netease.onmyoji"; // 游戏包名
        String cToken = ""; // 用来校验参数的有效性，cToken的计算方法请参考服务端SDK文档
        cToken = CryptoUtils.generateCToken(packageName, mUserInfo.userId, mUserInfo.userToken,
                "F367353CDAB", "migu-channel", "513647564b706e753354475a38344366");
        String extraId = ""; // 预留参数
        String payStr = ""; // 支付相关参数，默认为空字符串
        String CONFIG_INFO = "123";
        hmcpVideoView.setConfigInfo(CONFIG_INFO);
        hmcpVideoView.play(orientation, playTime, priority, appId,
                packageName, cToken, extraId, payStr);
    }

    public static boolean setTranslucentStatus(Activity activity) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT && Build.VERSION.SDK_INT < Build.VERSION_CODES.LOLLIPOP) { //4.4以上,状态栏透明
            activity.getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
            return true;
        } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {//5.0以上状态栏透明
            Window window = activity.getWindow();
            window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
            window.getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                    | View.SYSTEM_UI_FLAG_LAYOUT_STABLE);
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            window.setStatusBarColor(Color.TRANSPARENT);
            return true;
        }
        return false;
    }

    // Activity需要implements HmcpPlayerListener接口
    @Override
    public void onError(ErrorType errorType, String s) { // 出错信息回调
    }

    @Override
    public void onSuccess() { // SDK启动成功并且开始播流的回调
    }

    @Override
    public void onMessage(Message message) {
        // 收到退出登录消息回调
        if (message != null) {
            String payload = message.payload;
            if (message.type == Message.TYPE_INTERACTIVE_MESSAGE && !TextUtils.isEmpty(payload)) {
                MessagePayload messagePayload = JSONObject.parseObject(payload, MessagePayload.class);
                if (messagePayload.code == MessagePayload.CODE_EXIT) {
                    hmcpVideoView.stop();    // 消息类型为点击设置中的退出游戏，关闭游戏
                    this.finish();    // 关闭当前游戏界面
                }
            }
        }
    }

    @Override
    public void onSceneChanged(String s) { // 收到场景切换的回调（没有init状态的回调）
    }

    @Override
    public void onExitQueue() { // 游戏内部弹窗退出消失回调
        this.finish();
    }

    @Override
    public void onNetworkChanged(NetWorkState state) {    // 网络发生变化时的回调。
    }

    @Override
    public void onSystemUiVisibilityChange(int visibility) {
        setHideVirtualKey();
    }

    private void setHideVirtualKey() {
        //保持布局状态
        int uiOptions = View.SYSTEM_UI_FLAG_LAYOUT_STABLE |
                //布局位于状态栏下方
                View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION |
                //全屏
                View.SYSTEM_UI_FLAG_FULLSCREEN |
                //隐藏导航栏
                View.SYSTEM_UI_FLAG_HIDE_NAVIGATION |
                View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN;
        if (Build.VERSION.SDK_INT >= 19) {
            uiOptions |= 0x00001000;
        } else {
            uiOptions |= View.SYSTEM_UI_FLAG_LOW_PROFILE;
        }
        getWindow().getDecorView().setSystemUiVisibility(uiOptions);
    }

    // Activity部分方法的重写
    @Override
    protected void onResume() {
        super.onResume();
        hmcpVideoView.onResume();
    }

    @Override
    protected void onPause() {
        super.onPause();
        hmcpVideoView.onPause();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (hmcpVideoView != null) {
            hmcpVideoView.stop();
        }
    }
}
