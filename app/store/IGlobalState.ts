import ITimetable from "../models/ITimetable";
import IConfiguration from "./IConfiguration";

export interface IGlobalState {
    navigationToolbar: {
        leftDrawerOpen: boolean,
    };
    timetable: {
        isLoaded: boolean,
        isError: boolean,
        bottomDrawerOpen: boolean,
        data: ITimetable,
    };
    floorPageWithPin: {
        floorPageOpen: boolean,
        roomNumber?: string,
    };
    configuration: IConfiguration;
}
