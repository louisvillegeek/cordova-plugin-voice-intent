# Cordova Siri / Ok Google Adapter

This plugin takes iOS SIRI intent of {send a message using appName} and Ok Google {take a note} with the help of getIntent method.


Usage Example:
```javascript
 var iOSAndroidIntent = window['cordova'].plugins.iOSAndroidIntent;
 if (typeof iOSAndroidIntent != 'undefined') {
     iOSAndroidIntent.getIntent().then((value) => {
         // handle voice input
     })
     .catch(error => {
         // handle error
     });
 }
```


## Supported Operating Systems:

IOS

Android