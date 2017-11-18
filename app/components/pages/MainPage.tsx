import * as React from "react";
import Timetable from "../Timetable";
import ITimetable from "../../models/ITimetable";
import ITimetableFilters from "../../models/ITimetableFilters";
import * as Moment from "moment";
import ITimetableEvent from "../../models/ITimetableEvent";

declare let device: any;
declare let cordova: any;

export default class MainPage extends React.Component {

    handleEventBlockClick = (event: ITimetableEvent): void => {

        var linkURL: string;
        var name: string = event.lecturer.toLowerCase().replace(' ', '_');
        //#region "Own links"
        else if(name ==="ewa_jalowiecka") linkURL = "http://www.sggw.pl/o_pracowniku&employee_id=1175692";
        else if(name ==="krzysztof_gajowniczek") linkURL = "http://krzysztof_gajowniczek.users.sggw.pl/";
        if(name ==="arkadiusz_orlowski") linkURL = "http://ao.cem.sggw.pl/";
        else if(name ==="piotr_jalowiecki") linkURL = "http://www.sggw.pl/o_pracowniku&employee_id=1175694";
        else if(name ==="maciej_janowicz") linkURL = "http://www.sggw.pl/o_pracowniku&employee_id=1180300";
        else if(name ==="marek_karwanski") linkURL = "http://www.sggw.pl/o_pracowniku&employee_id=1207500";
        else if(name ==="piotr_lukasiewicz") linkURL = "http://www.sggw.pl/o_pracowniku&employee_id=1310301";
        else if(name ==="michal_kruk") linkURL = "http://michal_kruk.users.sggw.pl/";
        else if(name ==="luiza_ochnio") linkURL = "http://www.sggw.pl/o_pracowniku&employee_id=1070900";
        else if(name ==="rafik_nafkha") linkURL = "http://www.wzim.pl/";
        else if(name ==="marian_rusek") linkURL = "http://e.sggw.pl/rusek/";
        else if(name ==="adam_przezdziecki") linkURL = "http://adam_przezdziecki.users.sggw.pl";
        else if(name ==="piotr_stachura") linkURL = "http://www.wzim.sggw.pl/piotr_stachura1/";
        else if(name ==="aleksander_strasburger") linkURL = "http://aleksander_strasburger.users.sggw.pl";
        else if(name ==="monika_zielinska-sitkiewicz") linkURL = "http://www.sggw.pl/o_pracowniku&employee_id=1621855";
        else if(name ==="wojciech_zielisnki") linkURL = "http://wojtek.zielinski.statystyka.info";
        name = name.replace('ą', 'a').replace('ć','c').replace('ę','e').replace('ł','l').replace('ó','o').replace('ż','z').replace('ź','z');
        else linkURL = "http://www.wzim.sggw.pl/" + name + "/";
        //#endregion "Own links"
        if(device.platform.toUpperCase() === "BROWSER"){
            window.open(linkURL, "_blank");
            return;
        }
        window.open = cordova.InAppBrowser.open(linkURL, "_system", "location=yes");
    }

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
                                                            startTime: Moment.utc("8:45", "HH:mm"),
                                                            duration: 90
                                                        },
                                                        {
                                                            groups: ["1", "2", "3", "4", "5", "6"],
                                                            name: "Podstawy fizyki",
                                                            lecturer: "Andrzej Zembrzuski",
                                                            type: "wykład",
                                                            room: "Aula IV",
                                                            startTime: Moment.utc("10:30", "HH:mm"),
                                                            duration: 90
                                                        },
                                                        {
                                                            groups: ["1", "2", "3", "4", "5", "6"],
                                                            name: "Matematyka dyskretna",
                                                            lecturer: "Arkadiusz Orlowski",
                                                            type: "wykład",
                                                            room: "Aula IV",
                                                            startTime: Moment.utc("14:00", "HH:mm"),
                                                            duration: 90
                                                        },
                                                        {
                                                            groups: ["1", "2"],
                                                            name: "Matematyka dyskretna",
                                                            lecturer: "Arkadiusz Orlowski",
                                                            type: "ćwiczenia",
                                                            room: "3/40",
                                                            startTime: Moment.utc("15:30", "HH:mm"),
                                                            duration: 90
                                                        },
                                                        {
                                                            groups: ["3", "4"],
                                                            name: "Podstawy fizyki",
                                                            lecturer: "Andrzej Zembrzuski",
                                                            type: "ćwiczenia",
                                                            room: "3/83",
                                                            startTime: Moment.utc("15:30", "HH:mm"),
                                                            duration: 90
                                                        },
                                                        {
                                                            groups: ["5", "6"],
                                                            name: "Podstawy analizy matematycznej",
                                                            lecturer: "J. Bojarski",
                                                            type: "ćwiczenia",
                                                            room: "1/78",
                                                            startTime: Moment.utc("15:30", "HH:mm"),
                                                            duration: 90
                                                        }
                                                    ]
                                                },
                                                {
                                                    name: "Wtorek",
                                                    events: [
                                                        {
                                                            groups: ["3", "4", "ISI1"],
                                                            name: "Podstawy fizyki",
                                                            lecturer: "Andrzej Zembrzuski",
                                                            type: "ćwiczenia",
                                                            room: "3/83",
                                                            startTime: Moment.utc("15:30", "HH:mm"),
                                                            duration: 90
                                                        },
                                                        {
                                                            groups: ["5", "6"],
                                                            name: "Podstawy analizy matematycznej",
                                                            lecturer: "J. Bojarski",
                                                            type: "ćwiczenia",
                                                            room: "1/78",
                                                            startTime: Moment.utc("15:30", "HH:mm"),
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
                                                            startTime: Moment.utc("14:00", "HH:mm"),
                                                            duration: 90
                                                        },
                                                        {
                                                            groups: ["1", "2"],
                                                            name: "Matematyka dyskretna",
                                                            lecturer: "Arkadiusz Orlowski",
                                                            type: "ćwiczenia",
                                                            room: "3/40",
                                                            startTime: Moment.utc("15:30", "HH:mm"),
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
                                                            startTime: Moment.utc("8:45", "HH:mm"),
                                                            duration: 90
                                                        },
                                                        {
                                                            groups: ["1", "2", "3", "4", "5", "6"],
                                                            name: "Podstawy fizyki",
                                                            lecturer: "Andrzej Zembrzuski",
                                                            type: "wykład",
                                                            room: "Aula IV",
                                                            startTime: Moment.utc("10:30", "HH:mm"),
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
                                                            startTime: Moment.utc("8:45", "HH:mm"),
                                                            duration: 90
                                                        },
                                                        {
                                                            groups: ["1", "2", "3", "4", "5", "6"],
                                                            name: "Podstawy fizyki",
                                                            lecturer: "Andrzej Zembrzuski",
                                                            type: "wykład",
                                                            room: "Aula IV",
                                                            startTime: Moment.utc("10:30", "HH:mm"),
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
                <h1 style={{ margin: 0 }}>Plan zajęć</h1>
                <Timetable
                    data={data}
                    filters={filters}
                    // defaultDay={3}
                    // defaultGroup="3"
                    onEventBlockClick={(event) => this.handleEventBlockClick(event)}
                />
            </div>
        );
    }
}