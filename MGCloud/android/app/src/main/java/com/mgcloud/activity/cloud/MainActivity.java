package com.mgcloud.activity.cloud;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;
import com.haima.hmcp.HmcpManager;
import com.haima.hmcp.listeners.OnInitCallBackListener;

public class MainActivity extends Activity implements View.OnClickListener {
    private static final String TAG = MainActivity.class.getSimpleName();
    private String playTime = "360";
    private boolean isPlay = false;
    private Button btnGame1, btnGame2;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        initView();
        checkPermission();
    }


    private void initView() {
        btnGame1 = (Button) findViewById(R.id.btnGame1);
        btnGame2 = (Button) findViewById(R.id.btnGame2);
        btnGame1.setOnClickListener(this);
        btnGame2.setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.btnGame1:
                if (isPlay) {
                    Intent intent = new Intent(MainActivity.this, CloudPlayActivity.class);
                    intent.putExtra(CloudPlayActivity.KEY_PLAYING_TIME, playTime);
                    intent.putExtra(CloudPlayActivity.KEY_GAME_PACKAGE_NAME, "com.netease.onmyoji");
                    intent.putExtra(CloudPlayActivity.KEY_SCREEN_ORIENTATION, 0);
                    intent.putExtra(CloudPlayActivity.KEY_PRIORITY, "0"); // 0代表横屏,1代表竖屏
                    startActivity(intent);
                } else {
                    Toast.makeText(MainActivity.this, "SDK初始化", Toast.LENGTH_LONG).show();
                }
                break;
            case R.id.btnGame2:
                if (isPlay) {
                    Intent intent = new Intent(MainActivity.this, CloudPlayActivity.class);
                    intent.putExtra(CloudPlayActivity.KEY_PLAYING_TIME, playTime);
                    intent.putExtra(CloudPlayActivity.KEY_GAME_PACKAGE_NAME, "com.netease.gmdl.yixin");
                    intent.putExtra(CloudPlayActivity.KEY_SCREEN_ORIENTATION, 0);
                    intent.putExtra(CloudPlayActivity.KEY_PRIORITY, "0");
                    startActivity(intent);
                } else {
                    Toast.makeText(MainActivity.this, "", Toast.LENGTH_LONG).show();
                }
                break;
        }
    }

    private void initSDK() {
        Toast.makeText(getApplication(), "初始化SDK中，请稍后...", Toast.LENGTH_SHORT).show();
        HmcpManager manager = HmcpManager.getInstance();
        manager.init(getApplication(), new OnInitCallBackListener() {
            @Override
            public void success() {
                isPlay = true;
                Toast.makeText(MainActivity.this, "SDK初始化成功", Toast.LENGTH_SHORT).show();
            }

            @Override
            public void fail(String msg) {
                Toast.makeText(MainActivity.this, msg, Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void checkPermission() {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.READ_PHONE_STATE) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.READ_PHONE_STATE, Manifest.permission.WRITE_EXTERNAL_STORAGE}, 1);
        } else {
            initSDK();
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        switch (requestCode) {
            case 1: {
                if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    initSDK();
                    Log.e(TAG, "onRequestPermissionsResult=== permission success");
                } else {
                    Log.e(TAG, " onRequestPermissionsResult===permission failed");
                }
                return;
            }
        }
    }
}
