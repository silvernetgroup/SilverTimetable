import { createStore } from "redux";
import rootReducer from "../reducers/index";
import { IGlobalState } from "./IGlobalState";

declare let window: any;

export const initialState: IGlobalState = {
    navigationToolbar: {
        leftDrawerOpen: false,
    },
    timetable: {
        isLoaded: false,
        isError: false,
        bottomDrawerOpen: false,
        data: null,
    },
    floorPageWithPin: {
        floorPageOpen: false,
        roomNumber: null,
    },
    configuration: {
        filters: {
            department: null,
            fieldOfStudy: null,
            degree: null,
            mode: null,
            semester: null,
            group: null,
            academicYear: null,
        },
        notifyAboutUpdates: true,
        allowQuickGroupChange: true,
        lecturerMode: false,
    },
};

const store = createStore(
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
