import * as types from "../constants/action-types";
import ITimetable from "../models/ITimetable";
import IConfiguration from "../store/IConfiguration";

export const openLeftDrawer = () => ({ type: types.OPEN_LEFT_DRAWER });
export const closeLeftDrawer = () => ({ type: types.CLOSE_LEFT_DRAWER });

export const changeGroup = (group: string) => ({type: types.CHANGE_GROUP, payload: group});

export const openBottomDrawer = () => ({ type: types.OPEN_BOTTOM_DRAWER });
export const closeBottomDrawer = () => ({ type: types.CLOSE_BOTTOM_DRAWER });

export const loadTimetableRequest = () => ({ type: types.LOAD_TIMETABLE_REQUEST });
export const loadTimetableFailure = () => ({ type: types.LOAD_TIMETABLE_FAILURE });
export const loadTimetableSuccess = (timetable: ITimetable) => ({
    type: types.LOAD_TIMETABLE_SUCCESS, payload: timetable,
});

export const loadConfigurationRequest = () => ({ type: types.LOAD_CONFIGURATION_REQUEST });
export const loadConfigurationSuccess = (configuration: IConfiguration) => ({
    type: types.LOAD_CONFIGURATION_SUCCESS, payload: configuration,
});
