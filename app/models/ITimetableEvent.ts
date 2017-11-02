import { TimetableEventType } from "./TimetableEventType";

export default interface ITimetableEvent {
    groups: number[];
    name: string;
    lecturer: string;
    type: TimetableEventType;
    room: string;
    startTime: Date;
    duration: number;
    comment?: string;
}