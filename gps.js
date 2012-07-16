var 
	elSamples,
	elLatitude,
	elLongitude,
	elHeight,
	elStatus,
	lats = [],
	longs = [],
	heights = [],
	dates = []
	;
	
var sum = function (a,b) {
	return a+b;
}

var heightToString = function (raw) { 
	return ( '' + Math.floor(raw) + ' m ' + Math.floor(( raw-Math.floor(raw) ) * 100) + ' cm' ); 
}

var degreesToString = function (degrees) {
	var minutes = (degrees - Math.floor(degrees)) * 60;
	var seconds = (minutes - Math.floor(minutes)) * 60;
	return '' + Math.floor(degrees) + 'º ' + Math.floor(minutes) + '\' ' + seconds.toFixed(5) + '\"'; 
}

var latToString = function (raw) {
	if(raw < 0)
		return degreesToString(-raw) + ' South';
	else
		return degreesToString(raw) + ' North';
}	

var longToString = function (raw) {
	if(raw < 0)
		return degreesToString(-raw) + ' West';
	else
		return degreesToString(raw) + ' East';
}	

var geoSuccess = function (position) {
	elStatus.innerHTML = "Working...";

	var date = new Date();
	
	dates[dates.length] = date;
	heights[heights.length] = position.coords.altitude;
	lats[lats.length] = position.coords.latitude;
	longs[longs.length] = position.coords.longitude;
	
	elSamples.innerHTML		= lats.length ;

	var auxLat = lats.reduce(sum)/lats.length;
	elLatitude.innerHTML	=  '' + latToString(auxLat) + '  |  ' + auxLat.toFixed(11);

	var auxLong = longs.reduce(sum)/longs.length;
	elLongitude.innerHTML	= '' + longToString(auxLong) + '  |  ' + auxLong.toFixed(11);
	
	var auxH = heights.reduce(sum)/heights.length;
	elHeight.innerHTML		= '' + heightToString(auxH) + '  |  ' + auxH.toFixed(4);
	
	elStatus.innerHTML		= "Sleeping..."
}

var geoError = function (error) { 
	switch(error.code) {
		case error.TIMEOUT:
			elStatus.innerHTML = "Timeout!";
			break;
	};
}

var geoPos = function () {
	if(!!navigator.geolocation)
		navigator.geolocation.getCurrentPosition(
			geoSuccess,
			geoError,
			{ 
				enableHighAccuracy: true
			});
	else
		elStatus.innerHTML = "ERROR: Your Browser doesnt support the Geo Location API";
}

var geoInit = function () {
	elSamples	= document.getElementById("samples");
	elLatitude	= document.getElementById("latitude");
	elLongitude	= document.getElementById("longitude");
	elHeight	= document.getElementById("height");
	elStatus	= document.getElementById("gpsStatus");
	
	if(
		elSamples &&
		elLatitude	&&
		elLongitude	&&
		elHeight &&
		elStatus
	) {
		setInterval(
			function () {
				elStatus.innerHTML = "Loading local client code...";
				geoPos();
			},
			3600 );
	}
}

window.onload = geoInit;
