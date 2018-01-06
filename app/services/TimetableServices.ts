import axios from "axios";
import ITimetable from "../models/ITimetable";
import FileManager from "./FileManager";
import IConfiguration from "../models/IConfiguration";
import * as Moment from "moment";
import ITimetableFilters from "../models/ITimetableFilters";

export default class TimetableServices {

    public static isNetworkAvailable = (): boolean => {
        if (typeof (Connection) === "undefined" || typeof (navigator.connection) === "undefined") {
            console.log("Plugin not installed");
            return false;
        }
        const networkState = navigator.connection.type;
        console.log("Connection type: " + networkState);

        if (networkState !== "none") {
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
        return { ...response.data, events };
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

    public static async writeTimetableFile(data: ITimetable) {
        await FileManager.writeFile(this.timetableFileName, data);
    }

    public static async readTimetableFile(): Promise<ITimetable> {
        const result = await FileManager.readFile(this.timetableFileName);
        if (!result) {
            return null;
        }
        const events = result.events.map((event) => {
            return {
                ...event,
                startTime: Moment.utc(event.startTime, "HH:mm"),
                endTime: Moment.utc(event.endTime, "HH:mm"),
            };
        });
        return { ...result, events };
    }
    private static configFileName: string = "config.json";
    private static timetableFileName: string = "timetable.json";
}
