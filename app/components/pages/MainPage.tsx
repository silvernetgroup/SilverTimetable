import axios from "axios";
import * as Moment from "moment";
import * as React from "react";
import ITimetable from "../../models/ITimetable";
import ITimetableEvent from "../../models/ITimetableEvent";
import ITimetableFilters from "../../models/ITimetableFilters";
import CircularProgress from "../CircularProgress";
import LecturersPages from "../LecturersPages";
import ErrorPage from "../Pages/ErrorPage";
import Timetable from "../Timetable";
import * as config from "react-global-configuration";
import TimetableServices from "../TimetableServices";

interface IProps {
    data: ITimetable;
}

interface IState {
    schedule: ITimetable;
    IsLoaded: boolean;
    IsError: boolean;
}

export default class MainPage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            schedule: this.props.data,
            IsLoaded: false,
            IsError: false,
        };
        // localStorage.removeItem("kanapka");
    }
    // LIFECYCLE APLIKACJI NA URUCHOMIENIU
    public componentWillMount() {
        // CZY W PAMIECI ? - TAK:
        if (TimetableServices.isScheduleStoraged()) {
            this.setState({
                // TODO: wczytac plan z pamieci:
                schedule: JSON.parse(window.localStorage.getItem("kanapka")),
                IsLoaded: false,
                IsError: false,
            });
            const date: string = this.state.schedule && this.state.schedule.date;
            if (TimetableServices.isNetwork()) {
                if (TimetableServices.isNewerSchedule(date)) {
                    this.getData();
                }
            }
        // CZY W PAMIECI ? - NIE:
        } else {
            if (TimetableServices.isNetwork()) {
                this.getData();
            } else {
                this.setState({
                    IsLoaded: false,
                    IsError: true,
                });
            }
        }
    }

    // Metoda pobierająca plan (domyslny format: json)
    public getData = () => {
        axios.get("http://silvertimetable.azurewebsites.net/api/timetable")
            .then((response) => {
                this.setState({
                    schedule: response.data,
                    IsLoaded: true,
                });
                // TODO: Wywolac metoda ktora zapisze plan w pamieci urzadzenia
                if (this.state.schedule !== undefined) {
                    // json sparsowany na stringa (moze sie przydac do zapisu)
                    const kurczak = JSON.stringify(this.state.schedule);
                    localStorage.setItem("kanapka", kurczak);
                }
                console.log("SUCCESS");
            })
            .catch((error) => {
                console.log("FAILED TO FETCH DATA ", error);
            });
    }
        public render(): JSX.Element {

        const data: ITimetable = this.state.schedule;

        const temp = config.get();
        temp.timetable = data;
        config.set(temp);

        const filters = config.get("filters");

        if (!this.state.IsLoaded && !this.state.IsError) {
            return (<CircularProgress />);
        } else if (this.state.IsError) {
            return (<ErrorPage />);
        } else {
            return (
                <div className="main-page-container" style={{ marginTop: "69px" }}>
                    {this.state.schedule &&
                        <Timetable
                            data={data}
                            filters={filters}
                            defaultDay={this.currentDay(filters)}
                            onEventBlockClick={(event) => this.handleEventBlockClick(event)}
                        />
                    }
                </div>
            );
        }
    }

    private handleEventBlockClick = (event: ITimetableEvent): void => {
        LecturersPages.openLecturersPage(event);
    }

    private currentDay(filters: ITimetableFilters): number {
        const today: Date = new Date();
        let dayNumber: number = today.getDay();
        const mode = filters.mode;

        switch (mode) {
            case "Stacjonarne":
                if (dayNumber === 0 || dayNumber === 6) {
                    dayNumber = 1;
                }
                dayNumber = dayNumber - 1;
                break;

            case "Niestacjonarne":
                if (dayNumber >= 1 && dayNumber <= 5) {
                    dayNumber = 0;
                } else if (dayNumber === 6) {
                    dayNumber = 1;
                } else if (dayNumber === 0) {
                    dayNumber = 2;
                }
                break;
        }

        return dayNumber;
    }
}
