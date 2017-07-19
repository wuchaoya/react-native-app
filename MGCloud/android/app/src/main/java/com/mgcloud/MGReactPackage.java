package com.mgcloud;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.mgcloud.javamodule.UpdateAndroidModule;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * 注册jsmodule组件
 *
 * @author shisheng.zhao
 * @date 2017-06-26
 */
public class MGReactPackage implements ReactPackage {

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new RNInteration(reactContext));
        modules.add(new OrientationModule(reactContext));
        modules.add(new UpdateAndroidModule(reactContext));
        return modules;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
