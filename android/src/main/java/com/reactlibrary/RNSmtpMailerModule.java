
package com.reactlibrary;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;

import java.util.HashMap;
import java.util.Map;
import android.widget.Toast;

public class RNSmtpMailerModule extends ReactContextBaseJavaModule {
  
  private final ReactApplicationContext reactContext;
  private static final String DURATION_SHORT_KEY = "SHORT";
  private static final String DURATION_LONG_KEY = "LONG";

  public RNSmtpMailerModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "RNSmtpMailer";
  }

  @Override
    public Map<String, Object> getConstants() {
        // Export any constants to be used in your native module
      final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }

  @ReactMethod
  public void show(String text, int duration, final Promise promise){
    try{
     Toast.makeText(getReactApplicationContext(), text, duration).show();
     promise.resolve(true);
    }
    catch(Exception e){
      promise.reject("ERR_UNEXPECTED_EXCEPTION",e);
    }
  }
}