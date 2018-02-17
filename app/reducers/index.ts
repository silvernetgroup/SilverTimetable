import {
    OPEN_LEFT_DRAWER,
    CLOSE_LEFT_DRAWER,
    OPEN_BOTTOM_DRAWER,
    CLOSE_BOTTOM_DRAWER,
    CHANGE_GROUP,
    LOAD_TIMETABLE_REQUEST,
    LOAD_TIMETABLE_FAILURE,
    LOAD_TIMETABLE_SUCCESS,
} from "../constants/action-types";
import { IGlobalState } from "../store/IGlobalState";

const rootReducer = (state: IGlobalState, action) => {
    switch (action.type) {
        case OPEN_LEFT_DRAWER:
            return { ...state, navigationToolbar: { leftDrawerOpen: true } };
        case CLOSE_LEFT_DRAWER:
            return { ...state, navigationToolbar: { leftDrawerOpen: false } };
        case OPEN_BOTTOM_DRAWER:
            return { ...state, timetable: { ...state.timetable, bottomDrawerOpen: true } };
        case CLOSE_BOTTOM_DRAWER:
            return { ...state, timetable: { ...state.timetable, bottomDrawerOpen: false } };
        case CHANGE_GROUP:
            return { ...state, timetable: { ...state.timetable, selectedGroup: action.payload } };
        case LOAD_TIMETABLE_REQUEST:
            return { ...state, timetable: { ...state.timetable, isLoaded: false } };
        case LOAD_TIMETABLE_FAILURE:
            return { ...state, timetable: { ...state.timetable, isLoaded: true, isError: true } };
        case LOAD_TIMETABLE_SUCCESS:
            return {
                ...state,
                timetable: {
                    ...state.timetable, isLoaded: true, isError: false, data: action.payload,
                },
            };
        default:
            return state;
    }
};

export default rootReducer;
