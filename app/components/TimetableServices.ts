import axios from "axios";
import ITimetable from "../models/ITimetable";
import FileManager from "./FileManager";
import IConfiguration from "../models/IConfiguration";
import * as Moment from "moment";

export default class TimetableServices {

    public static isNetworkAvailable = (): boolean => {
        if (typeof (Connection) === "undefined" || typeof (navigator.connection) === "undefined") {
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
    public static isNewerTimetable = (): boolean => {
        return true;
    }

    public static async getTimetable(): Promise<ITimetable> {
        const response = await axios.get("http://silvertimetable.azurewebsites.net/api/timetable");
        const events = response.data.events.map((event) => {
            return {
                ...event,
                startTime: Moment.utc(event.startTime, "HH:mm"),
                endTime: Moment.utc(event.endTime, "HH:mm"),
            };
        });
        return {...response.data, events};
    }

    public static async initialize() {
        await FileManager.initialize();
    }

    public static async writeConfigurationFile(data: IConfiguration) {
        await FileManager.writeFile(this.configFileName, data);
    }

    public static async readConfigurationFile(): Promise<IConfiguration> {
        return await FileManager.readFile(this.configFileName);
    }
    private static configFileName: string = "Timetable.json";
}
