# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# If your project uses WebView with JS, uncomment the following
# and specify the fully qualified class name to the JavaScript interface
# class:
#-keepclassmembers class fqcn.of.javascript.interface.for.webview {
#   public *;
#}

# Disabling obfuscation is useful if you collect stack traces from production crashes
# (unless you are using a system that supports de-obfuscate the stack traces).
-dontobfuscate

# React Native

# Keep our interfaces so they can be used by other ProGuard rules.
# See http://sourceforge.net/p/proguard/bugs/466/
-keep,allowobfuscation @interface com.facebook.proguard.annotations.DoNotStrip
-keep,allowobfuscation @interface com.facebook.proguard.annotations.KeepGettersAndSetters
-keep,allowobfuscation @interface com.facebook.common.internal.DoNotStrip

# Do not strip any method/class that is annotated with @DoNotStrip
-keep @com.facebook.proguard.annotations.DoNotStrip class *
-keep @com.facebook.common.internal.DoNotStrip class *
-keepclassmembers class * {
    @com.facebook.proguard.annotations.DoNotStrip *;
    @com.facebook.common.internal.DoNotStrip *;
}

-keepclassmembers @com.facebook.proguard.annotations.KeepGettersAndSetters class * {
  void set*(***);
  *** get*();
}

-keep class * extends com.facebook.react.bridge.JavaScriptModule { *; }
-keep class * extends com.facebook.react.bridge.NativeModule { *; }
-keepclassmembers,includedescriptorclasses class * { native <methods>; }
-keepclassmembers class *  { @com.facebook.react.uimanager.UIProp <fields>; }
-keepclassmembers class *  { @com.facebook.react.uimanager.annotations.ReactProp <methods>; }
-keepclassmembers class *  { @com.facebook.react.uimanager.annotations.ReactPropGroup <methods>; }

-dontwarn com.facebook.react.**

# TextLayoutBuilder uses a non-public Android constructor within StaticLayout.
# See libs/proxy/src/main/java/com/facebook/fbui/textlayoutbuilder/proxy for details.
-dontwarn android.text.StaticLayout

# okhttp

-keepattributes Signature
-keepattributes *Annotation*
-keep class okhttp3.** { *; }
-keep interface okhttp3.** { *; }
-dontwarn okhttp3.**

# okio

-keep class sun.misc.Unsafe { *; }
-dontwarn java.nio.file.*
-dontwarn org.codehaus.mojo.animal_sniffer.IgnoreJRERequirement
-dontwarn okio.**


-dontwarn org.codehaus.**
-keep class org.codehaus.** {*;}
-keep interface com.haima.hmcp.listeners.*{*;}
-keep class com.haima.hmcp.beans.*{*;}
-keep enum com.haima.hmcp.enums.*{*;}
-keep class com.haima.hmcp.**{*;}
-keep enum com.haima.hmcp.websocket.WebSocketCloseNotification{*;}
-keep interface com.haima.hmcp.websocket.WebSocket{*;}
-keep interface com.haima.hmcp.websocket.WebSocketConnectionObserver{*;}
-keep class com.haima.hmcp.websocket.WebSocketConnection{public <methods>;}
-keep class com.haima.hmcp.websocket.WebSocketOptions{public <methods>;}
-keep class com.haima.hmcp.websocket.WebSocketException{*;}
-keep interface com.hmcp.saas.sdk.listeners.*{*;}
-keep class com.hmcp.saas.sdk.beans.*{*;}
-keep class com.hmcp.saas.sdk.enums.*{*;}
-keep class com.hmcp.saas.sdk.SaasSDK{public <methods>;}
-keep class de.tavendo.autobahn.**{*;}
-keep class tv.haima.ijk.media.player.** { *; }
-keep interface tv.haima.ijk.media.player.listeners.*{*;}
-keep interface tv.haima.ijk.media.player.IMediaPlayer{*;}

-keep class com.netease.LDNetDiagnoService.LDNetDiagnoService{public <methods>;}
-keep interface com.netease.LDNetDiagnoService.LDNetDiagnoListener{public <methods>;}
-keep class com.netease.LDNetDiagnoService.LDNetTraceRoute { *; }

-dontwarn org.openudid.**
-keep class org.openudid.**{*;}

