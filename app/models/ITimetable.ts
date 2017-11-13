import IFieldOfStudy from "./IFieldOfStudy";

export default interface ITimetable {
    creationDate: Date;
    fieldsOfStudy: IFieldOfStudy[];
}
