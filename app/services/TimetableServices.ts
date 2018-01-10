import * as React from "react";
import axios from "axios";
import ITimetable from "../models/ITimetable";
import FileManager from "./FileManager";
import IConfiguration from "../models/IConfiguration";
import * as Moment from "moment";
import ITimetableFilters from "../models/ITimetableFilters";
import IDateCheck from "../models/IDateCheck";

interface IState {
    dateToCompare: IDateCheck;
}

export default class TimetableServices extends React.Component {

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
    public static isNewerTimetable = (date, newerDate): boolean => {
        if (newerDate) {
            return (newerDate === date.date);
        }
        return false;
    }

    public static async getNewerDate(): Promise<IDateCheck> {
        const url = "https://silvertimetable.azurewebsites.net/api/timetable/date";
        const value = await axios.get(url, {responseType: "text"})
        .then((response) => {
            return response.data;
        })
        .catch((er) => {
            console.log("Błąd sprawdzania nowej wersji.", er);
        });
        // console.log(value.data);
        return value;
    }

    public static async getTimetable(): Promise<ITimetable> {
        const response = await axios.get("https://silvertimetable.azurewebsites.net/api/Timetable");
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

    public static async writeTimetableFile(data: ITimetable, date: IDateCheck) {
        await FileManager.writeFile(this.timetableFileName, data);
        await FileManager.writeFile(this.updaterFileName, date);
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
    private static updaterFileName: string = "updater.json";
}
