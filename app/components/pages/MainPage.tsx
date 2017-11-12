import * as React from "react";
import Timetable from "../Timetable";
import ITimetable from "../../models/ITimetable";
import ITimetableFilters from "../../models/ITimetableFilters";
import * as Moment from "moment";

export default class MainPage extends React.Component {

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
                                                            groups: ["1", "2", "3", "4", "5", "6"],
                                                            name: "Wstęp do programowania",
                                                            lecturer: "Maciej Pankiewicz",
                                                            type: "wykład",
                                                            room: "Aula IV",
                                                            startTime: Moment.utc("8:45","HH:mm"),
                                                            duration: 90
                                                        },
                                                        {
                                                            groups: ["1", "2", "3", "4", "5", "6"],
                                                            name: "Podstawy fizyki",
                                                            lecturer: "Andrzej Zembrzuski",
                                                            type: "wykład",
                                                            room: "Aula IV",
                                                            startTime: Moment.utc("10:30","HH:mm"),
                                                            duration: 90
                                                        },
                                                        {
                                                            groups: ["1", "2", "3", "4", "5", "6"],
                                                            name: "Matematyka dyskretna",
                                                            lecturer: "Arkadiusz Orlowski",
                                                            type: "wykład",
                                                            room: "Aula IV",
                                                            startTime: Moment.utc("14:00","HH:mm"),
                                                            duration: 90
                                                        },
                                                        {
                                                            groups: ["1", "2"],
                                                            name: "Matematyka dyskretna",
                                                            lecturer: "Arkadiusz Orlowski",
                                                            type: "ćwiczenia",
                                                            room: "3/40",
                                                            startTime: Moment.utc("15:30","HH:mm"),
                                                            duration: 90
                                                        },
                                                        {
                                                            groups: ["3", "4"],
                                                            name: "Podstawy fizyki",
                                                            lecturer: "Andrzej Zembrzuski",
                                                            type: "ćwiczenia",
                                                            room: "3/83",
                                                            startTime: Moment.utc("15:30","HH:mm"),
                                                            duration: 90
                                                        },
                                                        {
                                                            groups: ["5", "6"],
                                                            name: "Podstawy analizy matematycznej",
                                                            lecturer: "J. Bojarski",
                                                            type: "ćwiczenia",
                                                            room: "1/78",
                                                            startTime: Moment.utc("15:30","HH:mm"),
                                                            duration: 90
                                                        }
                                                    ]
                                                },
                                                {
                                                    name: "Wtorek",
                                                    events: [
                                                        {
                                                            groups: ["3", "4","ISI1"],
                                                            name: "Podstawy fizyki",
                                                            lecturer: "Andrzej Zembrzuski",
                                                            type: "ćwiczenia",
                                                            room: "3/83",
                                                            startTime: Moment.utc("15:30","HH:mm"),
                                                            duration: 90
                                                        },
                                                        {
                                                            groups: ["5", "6"],
                                                            name: "Podstawy analizy matematycznej",
                                                            lecturer: "J. Bojarski",
                                                            type: "ćwiczenia",
                                                            room: "1/78",
                                                            startTime: Moment.utc("15:30","HH:mm"),
                                                            duration: 90
                                                        }
                                                    ]
                                                },
                                                {
                                                    name: "Środa",
                                                    events: [
                                                        {
                                                            groups: ["1", "2", "3", "4", "5", "6"],
                                                            name: "Matematyka dyskretna",
                                                            lecturer: "Arkadiusz Orlowski",
                                                            type: "wykład",
                                                            room: "Aula IV",
                                                            startTime: Moment.utc("14:00","HH:mm"),
                                                            duration: 90
                                                        },
                                                        {
                                                            groups: ["1", "2"],
                                                            name: "Matematyka dyskretna",
                                                            lecturer: "Arkadiusz Orlowski",
                                                            type: "ćwiczenia",
                                                            room: "3/40",
                                                            startTime: Moment.utc("15:30","HH:mm"),
                                                            duration: 90
                                                        }
                                                    ]
                                                },
                                                {
                                                    name: "Czwartek",
                                                    events: [
                                                        {
                                                            groups: ["1", "2", "3", "4", "5", "6"],
                                                            name: "Wstęp do programowania",
                                                            lecturer: "Maciej Pankiewicz",
                                                            type: "wykład",
                                                            room: "Aula IV",
                                                            startTime: Moment.utc("8:45","HH:mm"),
                                                            duration: 90
                                                        },
                                                        {
                                                            groups: ["1", "2", "3", "4", "5", "6"],
                                                            name: "Podstawy fizyki",
                                                            lecturer: "Andrzej Zembrzuski",
                                                            type: "wykład",
                                                            room: "Aula IV",
                                                            startTime: Moment.utc("10:30","HH:mm"),
                                                            duration: 90
                                                        }
                                                    ]
                                                },
                                                {
                                                    name: "Piątek",
                                                    events: [
                                                        {
                                                            groups: ["1", "2", "3", "4", "5", "6"],
                                                            name: "Wstęp do programowania",
                                                            lecturer: "Maciej Pankiewicz",
                                                            type: "wykład",
                                                            room: "Aula IV",
                                                            startTime: Moment.utc("8:45","HH:mm"),
                                                            duration: 90
                                                        },
                                                        {
                                                            groups: ["1", "2", "3", "4", "5", "6"],
                                                            name: "Podstawy fizyki",
                                                            lecturer: "Andrzej Zembrzuski",
                                                            type: "wykład",
                                                            room: "Aula IV",
                                                            startTime: Moment.utc("10:30","HH:mm"),
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
            <div className="main-page-container">
                <h1 style={{margin: 0}}>Plan zajęć</h1>
                <Timetable data={data} filters={filters} />
            </div>
        );
    }
}