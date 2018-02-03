import {
    OPEN_LEFT_DRAWER,
    CLOSE_LEFT_DRAWER,
    OPEN_BOTTOM_DRAWER,
    CLOSE_BOTTOM_DRAWER,
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
        default:
            return state;
    }
};

export default rootReducer;
