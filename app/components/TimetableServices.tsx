import * as React from "react";
import axios from "axios";

export default class TimetableServices extends React.Component {

    public static isNetwork = (): boolean => {
        // ondeviceready ?
        if (typeof(Connection) === "undefined" || typeof(navigator.connection) === "undefined") {
            console.log("Plugin not installed");
            return false;
        }
        const networkState = navigator.connection.type;

      /*  const states = {};
        states[Connection.UNKNOWN]  = "Unknown connection";
        states[Connection.ETHERNET] = "Ethernet connection";
        states[Connection.WIFI]     = "WiFi connection";
        states[Connection.CELL_2G]  = "Cell 2G connection";
        states[Connection.CELL_3G]  = "Cell 3G connection";
        states[Connection.CELL_4G]  = "Cell 4G connection";
        states[Connection.CELL]     = "Cell generic connection";
        states[Connection.NONE]     = "No network connection";*/
        console.log("Connection type: " + networkState);

        if (networkState !== "unknow" && networkState !== "none") {
            return true;
        } else {
            return false;
        }
    }
    public static isNewerSchedule = (): boolean => {
        // ondeviceready?
       //console.log(date);
       return true;
    }
    // -------------------------------------------------------
    public static getData = (onLoaded) => {
        axios.get("http://silvertimetable.azurewebsites.net/api/timetable")
            .then((response) => {
                onLoaded(response);
        });
    }
}
