package com.abhaya.iOSAndroidIntent;

import org.apache.cordova.CordovaActivity;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import android.content.Intent;

public class iOSAndroidIntent extends CordovaPlugin {

    private static final String EXTRA_TEXT = "android.intent.extra.TEXT";

    /**
     * Method: execute on cordova ready.
     * @param {String} action - name of the action.
     * @param {JSONArray} args - list of arguments if specified in function.
     * @param {CallbackContext} - return success or fail with return message.
     * @returns JSONException - return true if successed else false.
     */
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("getIntent")) {
            this.getIntent(callbackContext);
            return true;
        }
        return false;
    }

    /**
     * Method: used to call getIntent from Ok Google.
     * @param {CallbackContext} - return success or fail with return message.
     */
    private void getIntent(CallbackContext callbackContext) {
        Intent intent = ((CordovaActivity)this.cordova.getActivity()).getIntent();
        if(intent.hasExtra(EXTRA_TEXT))
            callbackContext.success(intent.getStringExtra(EXTRA_TEXT));
        else
            callbackContext.success("");
    }
}
