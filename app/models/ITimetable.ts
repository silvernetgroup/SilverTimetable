import IFieldOfStudy from "./IFieldOfStudy";

export default interface ITimetable {
    creationDate: string;
    fieldsOfStudy: IFieldOfStudy[];
}
