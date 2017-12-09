import * as Moment from "moment";

export default interface ITimetableEvent {
    groups: string[];
    name: string;
    lecturer: string;
    type: string;
    room: string;
    startTime: Moment.Moment;
    duration: number;
    comment?: string;
}
