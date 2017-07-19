package com.mgcloud;

import android.app.Application;
import android.os.Environment;
import android.support.annotation.Nullable;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
    public static final String FILE_NAME = "index.android.bundle";

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new MGReactPackage()
            );
        }

        @Nullable
        @Override
        protected String getJSBundleFile() {
            File file = new File(getExternalCacheDir(), FILE_NAME);
            if (file != null && file.length() > 0) {
                String bundleFileStr = file.getAbsolutePath();
                Log.i("", "Bundle文件热更新：文件：" + bundleFileStr);
                return bundleFileStr;
            }
            return super.getJSBundleFile();
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        copyBundle();
        SoLoader.init(this, /* native exopackage */ false);
    }

    private void copyBundle() {
        if (!Environment.getExternalStorageState().equals(Environment.MEDIA_MOUNTED)) {
            return;
        }
        File file = new File(getExternalCacheDir(), FILE_NAME);
        if (file != null && file.length() > 0) {
            return;
        }
        BufferedInputStream bis = null;
        BufferedOutputStream bos = null;
        try {
            bis = new BufferedInputStream(getAssets().open(FILE_NAME));
            bos = new BufferedOutputStream(new FileOutputStream(file));
            int len = -1;
            byte[] buffer = new byte[512];
            while ((len = bis.read(buffer)) != -1) {
                bos.write(buffer, 0, len);
                bos.flush();
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (bis != null) {
                    bis.close();
                }
                if (bos != null) {
                    bos.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
