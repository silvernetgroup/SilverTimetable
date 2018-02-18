import ITimetableFilters from "../models/ITimetableFilters";
import ITimetable from "../models/ITimetable";

export default interface IConfiguration {
    filters: ITimetableFilters;
    notifyAboutUpdates: boolean;
    allowQuickGroupChange: boolean;
}
