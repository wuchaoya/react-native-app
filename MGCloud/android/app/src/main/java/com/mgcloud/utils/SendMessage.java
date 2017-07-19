package com.mgcloud.utils;

import android.app.Activity;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.telephony.SmsManager;
import android.telephony.TelephonyManager;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.Promise;

import java.util.List;

/**
 * 发送短信,接收发送短信成功与失败
 *
 * @author shisheng.zhao
 * @date 2017-06-27
 */
public class SendMessage {
    private String SENT_SMS_ACTION = "SENT_SMS_ACTION";
    private Context context;
    private Promise promise;
    private Intent sentIntent = new Intent(SENT_SMS_ACTION);
    private SmsManager smsManager;
    private PendingIntent sentPI;
    private String DELIVERED_SMS_ACTION = "DELIVERED_SMS_ACTION";
    private Intent deliverIntent = new Intent(DELIVERED_SMS_ACTION);
    private PendingIntent deliverPI;
    private String msgCode = "";

    /**
     * 构造函数
     *
     * @param c
     * @param promise
     */
    public SendMessage(Context c, Promise promise) {
        this.context = c;
        this.promise = promise;
        smsManager = SmsManager.getDefault();
        sentPI = PendingIntent.getBroadcast(context, 0, sentIntent, 0);
        //短信发送状态监控
        context.registerReceiver(new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                switch (getResultCode()) {
                    case Activity.RESULT_OK:
                        break;
                    case SmsManager.RESULT_ERROR_GENERIC_FAILURE:
                        Toast.makeText(context, "未指定失败 \n 信息未发出，请重试", Toast.LENGTH_LONG).show();
                        updateStatus("0");
                        break;
                    case SmsManager.RESULT_ERROR_RADIO_OFF:
                        Toast.makeText(context, "无线连接关闭 \n 信息未发出，请重试", Toast.LENGTH_LONG).show();
                        updateStatus("0");
                        break;
                    case SmsManager.RESULT_ERROR_NULL_PDU:
                        Toast.makeText(context, "PDU失败 \n 信息未发出，请重试", Toast.LENGTH_LONG).show();
                        updateStatus("0");
                        break;
                }

            }
        }, new IntentFilter(SENT_SMS_ACTION));

        //短信是否被接收状态监控
        deliverPI = PendingIntent.getBroadcast(context, 0, deliverIntent, 0);
        try {
            context.registerReceiver(new BroadcastReceiver() {
                @Override
                public void onReceive(Context context, Intent intent) {
                    Toast.makeText(context, "短信发送成功,对方已接受!", Toast.LENGTH_LONG).show();
                    updateStatus("1");
                }
            }, new IntentFilter(DELIVERED_SMS_ACTION));
        } catch (Throwable e) {
            e.printStackTrace();
        }
    }

    /**
     * 发送短信，这里是我需要的几个参数，你可以根据你的具体情况来使用不同的参数
     *
     * @param mobile 要发送的目标手机号，这个必须要有
     */
    public void send(String mobile) {
        boolean isYDIMSI = getIsYDIMSI();
        if (isYDIMSI) {
            msgCode = System.currentTimeMillis() + "";
            List<String> divideContents = smsManager.divideMessage(msgCode);
            for (String text : divideContents) {
                try {
                    smsManager.sendTextMessage(mobile, null, text, sentPI, deliverPI);
                } catch (Exception e) {
                    Toast.makeText(this.context, "短信发送失败，请检查系统是否限制本应用发送短信", Toast.LENGTH_LONG).show();
                    updateStatus("0");
                    e.printStackTrace();
                }
            }
        } else {
            updateStatus("0");
            Toast.makeText(context, "该功能只针对移动用户可用，谢谢～～", Toast.LENGTH_LONG).show();
        }
    }

    /**
     * 获取运营商类型是否为移动用户
     *
     * @return
     */
    private boolean getIsYDIMSI() {
        TelephonyManager telManager = (TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE);
        String imsi = telManager.getSubscriberId();
        if (imsi != null) {
            if (imsi.startsWith("46000") || imsi.startsWith("46002")) {
                return true; //因为移动网络编号46000下的IMSI已经用完，所以虚拟了一个46002编号，134/159号段使用了此编号 //中国移动
            } else if (imsi.startsWith("46001")) {
                return false; //中国联通
            } else if (imsi.startsWith("46003")) {
                return false; //中国电信
            }
        }
        return false;
    }

    private void updateStatus(String status) {
        Log.i("", "短信流程最终状态：" + status);
        // 失败
        if ("0".equals(status)) {
            promise.reject(msgCode);
        }
        // 成功
        else if ("1".equals(status)) {
            promise.resolve(msgCode);
        }
    }
}