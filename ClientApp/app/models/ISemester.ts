import IDayOfWeek from "./IDayOfWeek";

export default interface ISemester {
    number: number;
    turnus?: string;
    days: IDayOfWeek[];
}
