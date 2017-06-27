package com.mgcloud.activity;

import android.app.Activity;
import android.content.pm.ActivityInfo;
import android.os.Bundle;
import android.view.Window;
import android.view.WindowManager;
import com.mgcloud.R;
import com.mgcloud.view.video.VideoPlayer;
import com.mgcloud.view.video.VideoPlayerController;
import com.mgcloud.view.video.VideoPlayerHelp;

/**
 * 全屏播放
 * @author shisheng.zhao
 */
public class FullScreenVideoActivity extends Activity {
    private VideoPlayer mVideo;
    private String videoUrl;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.requestWindowFeature(Window.FEATURE_NO_TITLE);
        this.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);// 横屏
        this.getWindow().addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
        setContentView(R.layout.activity_video_full);
        videoUrl = getIntent().getExtras().getString("videoUrl");
        initView();
        initData();
    }

    private void initView() {
        mVideo = (VideoPlayer) findViewById(R.id.videoSuperPlayer);
    }

    private void initData() {
        mVideo.loadAndPlay(VideoPlayerHelp.getInstance(), videoUrl, 0, true, true);
        mVideo.setPageType(VideoPlayerController.PageType.EXPAND);
        mVideo.setVideoPlayCallback(new VideoPlayer.VideoPlayCallbackImpl() {
            @Override
            public void onSwitchPageType() {
                if (getRequestedOrientation() == ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE) {
                    finish();
                }
            }

            @Override
            public void onPlayFinish() {
                finish();
            }

            @Override
            public void onPlayError() {

            }

            @Override
            public void onCloseVideo() {
                finish();
            }
        });
    }

    @Override
    public void finish() {
        VideoPlayerHelp.release();
        super.finish();
    }

    @Override
    protected void onPause() {
        VideoPlayerHelp.pause();
        super.onPause();

    }

    @Override
    protected void onResume() {
        VideoPlayerHelp.resume();
        super.onResume();
    }
}
