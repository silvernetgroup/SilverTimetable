import * as types from "../constants/action-types";
import ITimetable from "../models/ITimetable";
import IConfiguration from "../store/IConfiguration";

export const openLeftDrawer = () => ({ type: types.OPEN_LEFT_DRAWER });
export const closeLeftDrawer = () => ({ type: types.CLOSE_LEFT_DRAWER });

export const openBottomDrawer = () => ({ type: types.OPEN_BOTTOM_DRAWER });
export const closeBottomDrawer = () => ({ type: types.CLOSE_BOTTOM_DRAWER });

export const loadTimetableRequest = () => ({ type: types.LOAD_TIMETABLE_REQUEST });
export const loadTimetableFailure = () => ({ type: types.LOAD_TIMETABLE_FAILURE });
export const loadTimetableSuccess = (timetable: ITimetable) => ({
    type: types.LOAD_TIMETABLE_SUCCESS, payload: timetable,
});

export const loadConfiguration = (configuration: IConfiguration) => ({
    type: types.LOAD_CONFIGURATION, payload: configuration,
});

export const changeFilter = (name: string, value: any) => ({ type: types.CHANGE_FILTER, payload: { name, value } });
export const changeConfigurationOption = (name: string, value: any) => ({
    type: types.CHANGE_CONFIGURATION_OPTION, payload: { name, value },
});
