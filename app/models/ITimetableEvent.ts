import * as Moment from "moment";

export default interface ITimetableEvent {
    groups: number[];
    name: string;
    lecturer: string;
    type: string;
    room: string;
    startTime: Moment.Moment;
    duration: number;
    comment?: string;
}