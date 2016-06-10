var logToDom = function (message) {
    document.getElementById("deviceready").innerHTML = "Paragraph changed!";
};

var delegate = new cordova.plugins.locationManager.Delegate();

delegate.didDetermineStateForRegion = function (pluginResult) {

    logToDom('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));

    cordova.plugins.locationManager.appendToDeviceLog('[DOM] didDetermineStateForRegion: '
        + JSON.stringify(pluginResult));
};

delegate.didStartMonitoringForRegion = function (pluginResult) {
    console.log('didStartMonitoringForRegion:', pluginResult);

    logToDom('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
};

delegate.didRangeBeaconsInRegion = function (pluginResult) {
    logToDom('[DOM] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
};

var uuid = '00000000-0000-0000-0000-000000000000';
var identifier = 'beaconOnTheMacBooksShelf';
var minor = 1000;
var major = 5;
var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);

cordova.plugins.locationManager.setDelegate(delegate);

// required in iOS 8+
cordova.plugins.locationManager.requestWhenInUseAuthorization(); 
// or cordova.plugins.locationManager.requestAlwaysAuthorization()

cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
    .fail(function(e) { console.error(e); })
    .done();

logToDom();
