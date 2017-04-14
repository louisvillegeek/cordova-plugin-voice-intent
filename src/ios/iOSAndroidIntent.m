#import <Cordova/CDV.h>
#import "AppDelegate.h"
#define DELEGATE ((AppDelegate*)[[UIApplication sharedApplication]delegate])
@interface iOSAndroidIntent : CDVPlugin {
  
}
- (void)getIntent:(CDVInvokedUrlCommand*)command;
@end

@implementation iOSAndroidIntent
AppDelegate *appDelegate; //AppDelegate object to get message value

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

@end

