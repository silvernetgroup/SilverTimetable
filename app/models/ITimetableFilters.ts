export default interface ITimetableFilters {
    fieldOfStudy: string;
    degree: string;
    mode: string;
    semester: number;
    groups?: number[];
}