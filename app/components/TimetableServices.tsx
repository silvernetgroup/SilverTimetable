import * as React from "react";

export default class TimetableServices extends React.Component {
    // -------------------------------------------------------
    public static isScheduleStoraged = (): boolean => {
        // TODO: tutaj sprawdzamy czy plan jest w pamieci;
        //       jest: zwracamy true;
        // tego if'a trzeba potem wywalic
        if (window.localStorage.getItem("kanapka") !== null) {
            return false;
        } else {
            return false;
        }
    }
    public static isNetwork = (): boolean => {
        // ondeviceready ?
       /* if (typeof(Connection) === "undefined" || typeof(navigator.connection) === "undefined") {
            console.log("Plugin not installed");
            return true;
        }*/
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

       /* if (networkState !== "unknow" && networkState !== "none") {
            return true;
        } else {
            return true;
        }*/
        return true;
    }
    public static isNewerSchedule = (date: string): boolean => {
        // ondeviceready?
       console.log(date);
       return true;
    }
    // -------------------------------------------------------
}
