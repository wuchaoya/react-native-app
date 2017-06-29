package com.mgcloud.utils;

import android.app.Activity;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.telephony.SmsManager;
import android.util.Log;
import android.widget.Toast;
import com.facebook.react.bridge.Promise;
import java.util.List;

/**
 * 发送短信,接收发送短信成功与失败
 * @author shisheng.zhao
 * @date 2017-06-27
 */
public class SendMessage {
    private static final String TAG = "SendMsg";
    private String SENT_SMS_ACTION = "SENT_SMS_ACTION";
    private Context context;
    private Promise promise;
    private Intent sentIntent = new Intent(SENT_SMS_ACTION);
    private SmsManager smsManager;
    private PendingIntent sentPI;
    private String DELIVERED_SMS_ACTION = "DELIVERED_SMS_ACTION";
    private Intent deliverIntent = new Intent(DELIVERED_SMS_ACTION);
    private PendingIntent deliverPI;

    /**
     * 构造函数
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
        context.registerReceiver(new BroadcastReceiver() {

            @Override
            public void onReceive(Context context, Intent intent) {
                // TODO Auto-generated method stub
                Toast.makeText(context, "短信发送成功,对方已接受!", Toast.LENGTH_LONG).show();
                updateStatus("1");
            }
        }, new IntentFilter(DELIVERED_SMS_ACTION));
    }

    /**
     * 发送短信，这里是我需要的几个参数，你可以根据你的具体情况来使用不同的参数
     * @param mobile 要发送的目标手机号，这个必须要有
     * @param code
     * @param msg    发送的短信内容
     */
    public void send(String mobile, String code, String msg) {
        String msg1 = "尊敬的客户，您正在进行";
        String msg2 = "(6小时内有效)，我站工作人员不会向您索取短信内容。[咪咕云游戏]";
        msg1 += msg + "操作，短信授权码为";
        String content = msg1 + code + msg2;
        List<String> divideContents = smsManager.divideMessage(content);
        for (String text : divideContents) {
            try {
                smsManager.sendTextMessage(mobile, null, text, sentPI, deliverPI);
            } catch (Exception e) {
                Toast.makeText(this.context, "短信发送失败，请检查是系统否限制本应用发送短信", Toast.LENGTH_LONG).show();
                updateStatus("0");
                e.printStackTrace();
            }
        }
    }

    private void updateStatus(String status) {
        //短信发送成功后做什么事情，就自己定吧
        Log.e("=======", status + "");
        if ("0".equals(status)) {
            promise.resolve(status);
        } else if ("1".equals(status)) {
            promise.reject(status);
        }
    }
}