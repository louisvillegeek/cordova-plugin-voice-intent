# com.abhaya.iOSAndroidIntent

This plugin takes iOS SIRI intent of {send a message using appName} and Ok Google {take a note} with the help of getIntent method.

```javascript
var exec = require('cordova/exec');

var iOSAndroidIntent = {
    /**
     * Method: used to call getIntent method on iOS or Android platform.
     */
    getIntent: function(){
        return new Promise(function (resolve, reject){
            cordova.exec(function(success){
                resolve(success);
            }, function(error){
                reject(error);
            }, "iOSAndroidIntent", "getIntent", []);
        });
    }
}
module.exports = iOSAndroidIntent;
```

# Android

say Ok Google 'take a note I am happy' will send status message to android intent and get back to status on success.

The below getIntent method will execute when corodva execute method call. You can find iOSAndroidIntent.java file path -> src/android/iOSAndroidIntent.java.

```java
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
```

# iOS

say Hey Siri 'send a message using appName I am happy' will send status message to iOS intent and get back to status on success.

The below getIntent method will execute when cordova is ready to perform. You can find iOSAndroidIntent.m file path -> src/ios/iOSAndroidIntent.m

```objective-c
/*
 * Method: used to get SIRI intent
 * @param: CDVInvokedUrlCommand - return intent result.
 */
- (void)getIntent:(CDVInvokedUrlCommand*)command
{
    appDelegate = DELEGATE;
    NSString* result = @"";
    if(appDelegate.message!=NULL){
        result = appDelegate.message;
        appDelegate.message = @"";
    }

    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:result];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

```