import ISemester from "./ISemester";

export default interface IMode {
    name: string;
    semesters: ISemester[];
}
