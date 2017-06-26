package com.mgcloud;

import android.content.Intent;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.mgcloud.activity.CloudPlayActivity;

public class RNInteration extends ReactContextBaseJavaModule {

    public RNInteration(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "RNInteraction";
    }

    @ReactMethod
    public void startCloudPlay() {
        Intent intent = new Intent();
        intent.setClass(getReactApplicationContext(), CloudPlayActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        getReactApplicationContext().startActivity(intent);
    }
}