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
};
module.exports = iOSAndroidIntent;