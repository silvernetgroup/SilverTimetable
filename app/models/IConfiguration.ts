import ITimetableFilters from "./ITimetableFilters";
import ITimetable from "./ITimetable";

export default interface IConfiguration {
    filters: ITimetableFilters;
    timetable: ITimetable;
    notifyAboutUpdates: boolean;
    allowQuickGroupChange: boolean;
}
