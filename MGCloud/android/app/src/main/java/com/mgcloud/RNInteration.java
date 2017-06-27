package com.mgcloud;

import android.content.Intent;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.mgcloud.activity.CloudPlayActivity;
import com.mgcloud.activity.FullScreenVideoActivity;

public class RNInteration extends ReactContextBaseJavaModule {

    public RNInteration(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "RNInteraction";
    }

    /**
     * 调用云玩功能，后期需要增加云玩相关参数
     * @author: todo: 需要增加参数信息 shisheng.zhao
     */
    @ReactMethod
    public void startCloudPlay() {
        Intent intent = new Intent();
        intent.setClass(getReactApplicationContext(), CloudPlayActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        getReactApplicationContext().startActivity(intent);
    }

    /**
     * 调用native视频播放器功能
     * @author: todo:需要增加参数信息 shisheng.zhao
     */
    @ReactMethod
    public void playVideoByUrl() {
        Intent intent = new Intent();
        intent.setClass(getReactApplicationContext(), FullScreenVideoActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        intent.putExtra("videoUrl", "http://gslb.miaopai.com/stream/ed5HCfnhovu3tyIQAiv60Q__.mp4");
        getReactApplicationContext().startActivity(intent);
    }
}