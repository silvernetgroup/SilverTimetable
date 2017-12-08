window.onload = this.onLoad;

function onLoad() {
	document.addEventListener("deviceready", onDeviceReady, false);	
}

function onDeviceReady() {	
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

	// declare var WindowsAzure: any;
	var client = new WindowsAzure.MobileServiceClient("https://silvertimetable.azurewebsites.net");

	push.on('registration', (data) => {
		console.log("regID: " + data.registrationId);

		// Get the native platform of the device.
		var platform = device.platform;
		// Get the handle returned during registration.
		var handle = data.registrationId;
		// Set the device-specific message template.
		if (platform == 'android' || platform == 'Android') {
			// Register for GCM notifications.
			client.push.register('gcm', handle, {
				mytemplate: { body: { data: { message: "{$(messageParam)}" } } }
			});
		} else if (device.platform === 'iOS') {
			// Register for notifications.
			client.push.register('apns', handle, {
				mytemplate: { body: { aps: { alert: "{$(messageParam)}" } } }
			});
		} else if (device.platform === 'windows') {
			// Register for WNS notifications.
			client.push.register('wns', handle, {
				myTemplate: {
					body: '<toast><visual><binding template="ToastText01"><text id="1">$(messageParam)</text></binding></visual></toast>',
					headers: { 'X-WNS-Type': 'wns/toast' } }
			});
		}
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
