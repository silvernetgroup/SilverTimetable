import * as React from "react";
import axios from "axios";
import ITimetable from "../models/ITimetable";
import FileManager from "./FileManager";
import IConfiguration from "../store/IConfiguration";
import * as Moment from "moment";
import ITimetableFilters from "../models/ITimetableFilters";

export default class TimetableServices extends React.Component {

    public static isNetworkAvailable = (): boolean => {
        if (typeof (Connection) === "undefined" || typeof (navigator.connection) === "undefined") {
            console.log("Plugin not installed");
            return true;    // for testing purposes
        }
        const networkState = navigator.connection.type;
        console.log("Connection type: " + networkState);

        if (networkState !== "none") {
            return true;
        } else {
            return false;
        }
    }
    public static async isNewerTimetable(timetable: ITimetable): Promise<boolean> {
        const newerDate = await TimetableServices.getNewerDate();
        if (newerDate) {
            console.log(newerDate === timetable.date ? "Nie ma nowej wersji planu." : "Jest nowa wersja planu.");
            return !(newerDate === timetable.date);
        }
        console.log("Nie udało się sprawdzić nowszej wersji");
        return false;
    }

    public static async getTimetable(): Promise<ITimetable> {
        const response = await axios.get("https://silvertimetable.azurewebsites.net/api/timetable");
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
        const eventsWithSerializedDates = data.events.map((event) => {
            return {
                ...event,
                startTime: event.startTime.format("HH:mm"),
                endTime: event.endTime.format("HH:mm"),
            };
        });
        await FileManager.writeFile(this.timetableFileName, { ...data, events: eventsWithSerializedDates });
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

    private static async getNewerDate(): Promise<string> {
        const url = "https://silvertimetable.azurewebsites.net/api/timetable/date";
        const value = await axios.get(url, {responseType: "text"});
        return value.data;
    }
}
