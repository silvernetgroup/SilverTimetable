import * as Moment from "moment";

export default interface ITimetableEvent {
    department: string;
    fieldOfStudy: string;
    mode: string;
    year: number;
    semester: number;
    group: number;
    facultyGroup?: string;
    specialization?: string;
    degree: string;
    name: string;
    dayOfWeek: string;
    startTime: Moment.Moment;
    endTime: Moment.Moment;
    room: string;
    lecturer: string;
    type: string;
    remarks?: string;
    isFaculty: boolean;
}
