import ITimetableEvent from "./ITimetableEvent";

export default interface ITimetable {
    date: string;
    events: ITimetableEvent[];
}
