package com.demo.sheng.jnidemo;

import android.content.Context;
import android.content.res.AssetManager;
import android.util.Log;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;

/**
 * Created by sheng on 2016/12/28.
 */

public class JniUtils {
    private static String TAG = "JniUtils";

    static {
        System.loadLibrary("JniUtils");
    }

    public native String getVersion();

    //当这个方法所对应的c代码在执行的时候 回去调用 helloFromJava()的方法
    public native void callHelloFromJava();

    //当这个方法所对应的c代码在执行的时候 回去调用Add(int x,int y)的方法
    public native void callAdd();

    //当这个方法所对应的c代码在执行的时候 回去调用printString(String s)的方法
    public native void callPrintString();

    /**
     * 首先java代码调用一个底层的c代码,
     * C在执行的时候 反过来调用java空方法
     */
    public void helloFromJava() {
        System.out.println("hello from java ");
    }

    //C调用java中的带两个int参数的方法
    public int Add(int x, int y) {

        return x + y;
    }

    //C调用java中参数为string的方法
    public void printString(String s) {
        System.out.println(s);
    }

    public void copy(Context context, String strOutFileName) {
        InputStream myInput = null;
        OutputStream myOutput = null;
        try {
            myOutput = new FileOutputStream(strOutFileName + "/libJniUtils.so");
            myInput = context.getAssets().open("libJniUtils.so");
            byte[] buffer = new byte[1024];
            int length = myInput.read(buffer);
            while (length > 0) {
                myOutput.write(buffer, 0, length);
                length = myInput.read(buffer);
            }
            myOutput.flush();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (myInput != null) {
                    myInput.close();
                }

                if (myOutput != null) {
                    myOutput.close();
                }
            } catch (Exception e) {
            }
        }
    }


    public static boolean copyAssetDirToFiles(Context context, String dirname) {
        Log.e(TAG, "copyAssetDirToFiles");
        boolean flag = false;
        try {
            File src = context.getDir("libs", Context.MODE_PRIVATE);

            AssetManager assetManager = context.getAssets();
            String[] files = assetManager.list(dirname);
            Log.e(TAG, files.length + "copyAssetDirToFiles" + src);
            for (String filename : files) {
                String filepath = dirname + '/' + filename;
                Log.e(TAG, "asset -- " + filepath);
                String[] grandChildren = assetManager.list(filepath);
                if (0 == grandChildren.length)
                    flag = copyAssetFileToFiles(context, filename, filepath, src);
                else
                    copyAssetDirToFiles(context, filepath);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return flag;
    }

    public static boolean copyAssetFileToFiles(Context context, String filename, String filepath, File src) {
        boolean flag = false;
        InputStream in = null;
        FileOutputStream out = null;
        File file = new File(src, filename);
        if (!file.exists()) {
            Log.e(TAG, "copy --" + file.getAbsolutePath());
            try {
                in = context.getAssets().open(filepath); // 从assets目录下复制
                out = new FileOutputStream(file);
                int length = -1;
                byte[] buf = new byte[1024];
                while ((length = in.read(buf)) != -1) {
                    out.write(buf, 0, length);
                }
                out.flush();
                flag = true;
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                if (in != null) {
                    try {
                        in.close();
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
                if (out != null) {
                    try {
                        out.close();
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }
        } else {
            flag = true;
        }
        return flag;
    }

}
