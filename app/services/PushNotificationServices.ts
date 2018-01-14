declare let WindowsAzure: any;

export default class PushNotificationServices {

    public onPushNotification: any;

    private push: PhonegapPluginPush.PushNotification;
    private client: any;

    constructor() {
        document.addEventListener("deviceready", () => this.onDeviceReady(), false);
    }

    private onDeviceReady() {
        this.push = PushNotification.init({
            android: {
                senderID: "948434874310",
            },
            ios: {
                alert: "true",
                badge: "true",
                sound: "true",
            },
            windows: {},
        });

        this.client = new WindowsAzure.MobileServiceClient("https://silvertimetable.azurewebsites.net");

        this.push.on("registration", (data) => {
            // Get the native platform of the device.
            const platform = device.platform;
            // Get the handle returned during registration.
            const handle = data.registrationId;
            // Set the device-specific message template.
            if (platform === "android" || platform === "Android") {
                // Register for GCM notifications.
                this.client.push.register("gcm", handle, {
                    mytemplate: { body: { data: { message: "{$(messageParam)}" } } },
                });
            } else if (device.platform === "iOS") {
                // Register for notifications.
                this.client.push.register("apns", handle, {
                    mytemplate: { body: { aps: { alert: "{$(messageParam)}" } } },
                });
            } else if (device.platform === "windows") {
                // Register for WNS notifications.
                this.client.push.register("wns", handle, {
                    myTemplate: {
                        // tslint:disable-next-line:max-line-length
                        body: '<toast><visual><binding template="ToastText01"><text id="1">$(messageParam)</text></binding></visual></toast>',
                        headers: { "X-WNS-Type": "wns/toast" },
                    },
                });
            }
        });

        this.push.on("notification", (data) => {
            console.log("Notification event");
            this.onPushNotification();
        });

        this.push.on("error", (e) => {
            console.log(e);
        });
    }
}
