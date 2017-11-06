import { render } from "react-dom";
import App from "./components/App";
import * as React from "react";

declare let cordova: any;
declare let device: any;

render(
    <App />,
    document.getElementById("app-root")
);


document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady(): void {
    console.log("DUPADUPA", device.platform);
    window.open = cordova.InAppBrowser.open("http://apache.org", "_system", "location=yes");
}