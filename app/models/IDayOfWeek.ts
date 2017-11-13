import ITimetableEvent from "./ITimetableEvent";

export default interface IDayOfWeek {
    name: string;
    events: ITimetableEvent[];
}