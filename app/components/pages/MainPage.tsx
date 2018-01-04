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

    /*
        TESTOWY HELP DO Trzymania planu w pamięci lokalnej:
        localStorage.removeItem("lastname");
        localStorage.setItem("lastname", "Smith");
        localStorage.getItem("lastname");
    */

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
    }

    public componentWillMount() {
        // CZY W PAMIECI ? - TAK
        if (this.isScheduleStoraged()) {
            // TODO: Jesli plan w pamieci to tutaj sie wczyta z pamieci
            //       wyswietlaniem zajmie sie component lifecycle i if'y w renderze
            this.setState({
                schedule: JSON.parse(window.localStorage.getItem("kanapka")),
                IsLoaded: false,
                IsError: false,
            });
            // Jesli jest polaczenie z internetem to sprawdz czy jest nowa wersja planu
            // jesli nie ma polaczenia to nic nie rob
            if (this.isNetwork()) {
                // Pobiera tutaj nowy plan
                if (this.isNewerSchedule()) {
                    this.getData();
                }
            }
        // CZY W PAMIECI ? - NIE
        } else {
            if (this.isNetwork()) {
                this.getData();
            } else {
                this.setState({
                    IsLoaded: false,
                    IsError: true,
                });
            }
        }
    }
    // -------------------------------------------------------
    public isScheduleStoraged = (): boolean => {
        // TODO: tutaj sprawdzamy czy plan jest w pamieci;
        //       jest: zwracamy true;
        // tego if'a trzeba potem wywalic
        if (window.localStorage.getItem("kanapka") !== null) {
            return true;
        } else {
            return false;
        }
    }
    public isNetwork = (): boolean => {
            // TODO: tutaj sprawdamy czy jest polaczenie z internetem;
          // https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-network-information/
        return true;
          /* if (true) {
          return true;
        } else {
            return false;
        }*/
    }
    public isNewerSchedule = (): boolean => {
        // TODO: czy jest nowa wersja planu
        return true;
        /*if (true) {
            return true;
          } else {
              return false;
          }*/
    }
    // Ta metoda pobiera plan, zapisuje go w pamieci i dopiero potem wyswietla
    public getData = () => {
        // tslint:disable-next-line:max-line-length
        axios.get("http://silvertimetable.azurewebsites.net/api/timetable")
            .then((response) => {
                this.setState({
                    schedule: response.data,
                    IsLoaded: true,
                });
                // TODO: Zapisuje tutaj plan w pamieci urzadzenia
                if (this.state.schedule !== undefined) {
                    const kurczak = JSON.stringify(this.state.schedule);
                    localStorage.setItem("kanapka", kurczak);
                }
                console.log("SUCCESS");
            })
            .catch((error) => {
                console.log("FAILED TO FETCH DATA ", error);
            });
    }
    // -------------------------------------------------------
        public render(): JSX.Element {

        const data: ITimetable = this.state.schedule;

        const temp = config.get();
        temp.timetable = data;
        config.set(temp);

        // const filters: ITimetableFilters = {
        //     fieldOfStudy: "Informatyka",
        //     degree: "inż",
        //     mode: "Stacjonarne",
        //     semester: 1,
        //     department: "WZIM",
        // };
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
                            // defaultGroup="3"
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
