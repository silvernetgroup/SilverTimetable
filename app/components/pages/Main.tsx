import * as React from "react";
import Timetable from "../Timetable";
import ITimetable from "../../models/ITimetable";
import ITimetableFilters from "../../models/ITimetableFilters";
import { TimetableEventType } from "../../models/TimetableEventType";

export default class Main extends React.Component {
    render(): JSX.Element {

        let data: ITimetable = {
            creationDate: new Date("02.11.2017"),
            fieldsOfStudy: [
                {
                    name: "Informatyka",
                    degrees: [
                        {
                            name: "I - inżynierskie",
                            modes: [
                                {
                                    name: "Stacjonarne",
                                    semesters: [
                                        {
                                            number: 1,
                                            days: [
                                                {
                                                    name: "Poniedzialek",
                                                    events: [
                                                        {
                                                            groups: [1, 2, 3, 4, 5, 6],
                                                            name: "Wstęp do programowania",
                                                            lecturer: "Maciej Pankiewicz",
                                                            type: TimetableEventType.lecture,
                                                            room: "Aula IV",
                                                            startTime: new Date("8:45"),
                                                            duration: 90
                                                        },
                                                        {
                                                            groups: [1, 2, 3, 4, 5, 6],
                                                            name: "Podstawy fizyki",
                                                            lecturer: "Andrzej Zembrzuski",
                                                            type: TimetableEventType.lecture,
                                                            room: "Aula IV",
                                                            startTime: new Date("10:30"),
                                                            duration: 90
                                                        },
                                                        {
                                                            groups: [1, 2, 3, 4, 5, 6],
                                                            name: "Matematyka dyskretna",
                                                            lecturer: "Arkadiusz Orlowski",
                                                            type: TimetableEventType.lecture,
                                                            room: "Aula IV",
                                                            startTime: new Date("14:00"),
                                                            duration: 90
                                                        },
                                                        {
                                                            groups: [1, 2],
                                                            name: "Matematyka dyskretna",
                                                            lecturer: "Arkadiusz Orlowski",
                                                            type: TimetableEventType.activities,
                                                            room: "3/40",
                                                            startTime: new Date("15:30"),
                                                            duration: 90
                                                        },
                                                        {
                                                            groups: [3, 4],
                                                            name: "Podstawy fizyki",
                                                            lecturer: "Andrzej Zembrzuski",
                                                            type: TimetableEventType.activities,
                                                            room: "3/83",
                                                            startTime: new Date("15:30"),
                                                            duration: 90
                                                        },
                                                        {
                                                            groups: [5, 6],
                                                            name: "Podstawy analizy matematycznej",
                                                            lecturer: "J. Bojarski",
                                                            type: TimetableEventType.activities,
                                                            room: "1/78",
                                                            startTime: new Date("15:30"),
                                                            duration: 90
                                                        }
                                                    ]
                                                },
                                                {
                                                    name: "Wtorek",
                                                    events: [
                                                        {
                                                            groups: [3, 4],
                                                            name: "Podstawy fizyki",
                                                            lecturer: "Andrzej Zembrzuski",
                                                            type: TimetableEventType.activities,
                                                            room: "3/83",
                                                            startTime: new Date("15:30"),
                                                            duration: 90
                                                        },
                                                        {
                                                            groups: [5, 6],
                                                            name: "Podstawy analizy matematycznej",
                                                            lecturer: "J. Bojarski",
                                                            type: TimetableEventType.activities,
                                                            room: "1/78",
                                                            startTime: new Date("15:30"),
                                                            duration: 90
                                                        }
                                                    ]
                                                }, ,
                                                {
                                                    name: "Środa",
                                                    events: [
                                                        {
                                                            groups: [1, 2, 3, 4, 5, 6],
                                                            name: "Matematyka dyskretna",
                                                            lecturer: "Arkadiusz Orlowski",
                                                            type: TimetableEventType.lecture,
                                                            room: "Aula IV",
                                                            startTime: new Date("14:00"),
                                                            duration: 90
                                                        },
                                                        {
                                                            groups: [1, 2],
                                                            name: "Matematyka dyskretna",
                                                            lecturer: "Arkadiusz Orlowski",
                                                            type: TimetableEventType.activities,
                                                            room: "3/40",
                                                            startTime: new Date("15:30"),
                                                            duration: 90
                                                        }
                                                    ]
                                                }
                                                ,
                                                {
                                                    name: "Czwartek",
                                                    events: [
                                                        {
                                                            groups: [1, 2, 3, 4, 5, 6],
                                                            name: "Wstęp do programowania",
                                                            lecturer: "Maciej Pankiewicz",
                                                            type: TimetableEventType.lecture,
                                                            room: "Aula IV",
                                                            startTime: new Date("8:45"),
                                                            duration: 90
                                                        },
                                                        {
                                                            groups: [1, 2, 3, 4, 5, 6],
                                                            name: "Podstawy fizyki",
                                                            lecturer: "Andrzej Zembrzuski",
                                                            type: TimetableEventType.lecture,
                                                            room: "Aula IV",
                                                            startTime: new Date("10:30"),
                                                            duration: 90
                                                        }
                                                    ]
                                                }
                                                ,
                                                {
                                                    name: "Piątek",
                                                    events: [
                                                        {
                                                            groups: [1, 2, 3, 4, 5, 6],
                                                            name: "Wstęp do programowania",
                                                            lecturer: "Maciej Pankiewicz",
                                                            type: TimetableEventType.lecture,
                                                            room: "Aula IV",
                                                            startTime: new Date("8:45"),
                                                            duration: 90
                                                        },
                                                        {
                                                            groups: [1, 2, 3, 4, 5, 6],
                                                            name: "Podstawy fizyki",
                                                            lecturer: "Andrzej Zembrzuski",
                                                            type: TimetableEventType.lecture,
                                                            room: "Aula IV",
                                                            startTime: new Date("10:30"),
                                                            duration: 90
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        };

        let filters: ITimetableFilters = {
            fieldOfStudy: "Informatyka",
            degree: "I - inżynierskie",
            mode: "Stacjonarne",
            semester: 1
        };

        return (
            <div>
                <h1>Plan zajęć</h1>
                <Timetable data={data} filters={filters} />
            </div>
        );
    }
}