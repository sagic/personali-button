package com.personalireactnative;

import android.app.Activity;
import android.widget.Toast;

import java.util.HashMap;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.Map;

public class PersonaliModule extends ReactContextBaseJavaModule {

  private Activity mActivity = null;

  public PersonaliModule(ReactApplicationContext reactContext, Activity activity) {
    super(reactContext);
    mActivity = activity;
  }

  @Override
  public String getName() {
    return "PersonaliAndroid";
  }

  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    // constant declaration for JS usage
    // constants.put(LOCAL_CONSTANT, "LOCAL_CONSTANT_VALUE");
    return constants;
  }

  @ReactMethod
  public void getInitialData(ReadableMap props, final Callback errorCallback, final Callback successCallback) {

    // debugging input props
    String message = "init with props: ";
    message += "\nSKU: " + props.getString("sku");
    message += "\nPRICE: " + props.getDouble("price");
    message += "\nNAME: " + props.getString("name");
    // toasting for instant notification
    Toast.makeText(getReactApplicationContext(), message, Toast.LENGTH_LONG).show();

    // (!) in case you need to handle API errors:
    // errorCallback.invoke({
    //   errorId: 101,
    //   message: "Can't find SKU or something is wrong..."
    // });

    // creating the button status, styles and label.
    // if you want to do it async, just save or pass on the 'callback' arguments
    // so you can invoke them later
    final Boolean buttonDisplayStatus = true;

    final String buttonLabel = "We got cookies :)";

    final WritableMap buttonStyleMap = Arguments.createMap();
    buttonStyleMap.putString("color", "#FFFF00");
    buttonStyleMap.putString("backgroundColor", "#040");
    buttonStyleMap.putString("fontFamily", "Arial");
    buttonStyleMap.putInt("fontSize", 20);

    // successCallback.invoke(buttonDisplayStatus, buttonLabel, buttonStyleMap);
    new android.os.Handler().postDelayed(
      new Runnable() {
          public void run() {
              successCallback.invoke(buttonDisplayStatus, buttonLabel, buttonStyleMap);
          }
      }, 2000);
  }

  @ReactMethod
  public void negotiate(String sku) {
    Toast.makeText(getReactApplicationContext(), "negotiate for SKU:\n" + sku, Toast.LENGTH_LONG).show();
    // open webview or whatever required and then send your 'negotiationResponse' event
    // to announce results.
    // meanwhile for this demo, i'm delaying the mocked response for 2 seconds
    new android.os.Handler().postDelayed(
      new Runnable() {
          public void run() {
              WritableMap params = Arguments.createMap();
              params.putString("status", "sababa");
              getReactApplicationContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("negotiationResponse", params);
          }
      }, 2000);
  }
}
