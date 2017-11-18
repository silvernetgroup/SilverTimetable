window.onload = this.onLoad;
console.log("plik")
function onLoad() {
	document.addEventListener("deviceready", onDeviceReady, false);
	console.log("onLoad");
}

function onDeviceReady() {
	console.log("ready");
	const push = PushNotification.init({
		android: {
			senderID: "948434874310"
		},
		browser: {
			pushServiceURL: 'http://push.api.phonegap.com/v1/push'
		},
		ios: {
			alert: "true",
			badge: "true",
			sound: "true"
		},
		windows: {}
	});

	push.on('registration', (data) => {
		console.log("regID: " + data.registrationId);
	});

	push.on('notification', (data) => {
		// data.message,
		// data.title,
		// data.count,
		// data.sound,
		// data.image,
		// data.additionalData
		console.log('notification event');
		navigator.notification.alert(
			data.message,         // message
			null,                 // callback
			data.title,           // title
			'Ok'                  // buttonName
		);
	});

	push.on('error', (e) => {
		// e.message
	});	
}
