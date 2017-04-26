#!/usr/bin/env node

'use strict';
module.exports = function (context) 
{
    const fs = require('fs');
    const _ = require('lodash');
    const properyHeader = '@property(strong, nonatomic, readwrite) NSString *message;';
    const properyImplement = `
    extern NSString *message;

    @synthesize message;
    -(BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray * _Nullable))restorationHandler{
        if ([userActivity.activityType isEqualToString:@"INSendMessageIntent"])
        {
            message = [userActivity.userInfo valueForKey:@"moodstatus"];
        }
        return YES;
    }
    `;

    // Add property Message to AppDelegate.h.
    const appDelegateFileH = context.opts.projectRoot + '/platforms/ios/moodstatus/classes/AppDelegate.h';
    const iosAppDelegateH = fs.readFileSync(appDelegateFileH).toString();
    const linesH = iosAppDelegateH.split(/\r?\n/);
    const lineNoH = _.findIndex(linesH, (line) => line.includes('@interface AppDelegate'));
    linesH.splice(lineNoH + 1, 0, properyHeader);
    fs.writeFileSync(appDelegateFileH, linesH.join('\n'));
    
    // Add field and overide application to AppDelegate.m.
    const appDelegateFileM = context.opts.projectRoot + '/platforms/ios/moodstatus/classes/AppDelegate.m';
    const iosAppDelegateM = fs.readFileSync(appDelegateFileM).toString();
    const linesM = iosAppDelegateM.split(/\r?\n/);
    const lineNoM = _.findIndex(linesM, (line) => line.includes('@implementation AppDelegate'));
    linesM.splice(lineNoM + 1, 0, properyImplement);
    fs.writeFileSync(appDelegateFileM, linesM.join('\n'));
};