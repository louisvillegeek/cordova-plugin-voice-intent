#!/usr/bin/env node

'use strict';
module.exports = function (context) 
{
    const fs = require('fs');
    const _ = require('lodash');

    const scheme = 'flowkey';
    const insertIntent = `
            <intent-filter>
                <action android:name="android.intent.action.SEND" />
                <category android:name="com.google.android.voicesearch.SELF_NOTE" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.VOICE" />
                <data android:mimeType="*/*" />
            </intent-filter>
            <intent-filter>
                <action android:name="com.google.android.gm.action.AUTO_SEND" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.VOICE" />
                <data android:mimeType="text/plain" />
            </intent-filter>
    `;
    const manifestPath = context.opts.projectRoot + '/platforms/android/AndroidManifest.xml';
    const androidManifest = fs.readFileSync(manifestPath).toString();
    if (!androidManifest.includes(`android:scheme="${scheme}"`)) {
        const manifestLines = androidManifest.split(/\r?\n/);
        const lineNo = _.findIndex(manifestLines, (line) => line.includes('@string/activity_name'));
        manifestLines.splice(lineNo + 1, 0, insertIntent);
        fs.writeFileSync(manifestPath, manifestLines.join('\n'));
    }
};
