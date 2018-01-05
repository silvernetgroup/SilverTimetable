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
import FileManager from "../FileManager";
import configuration from "../../Config";

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
        const onDeviceReady = () => {
            console.log(this);
            FileManager.setupFiles(false, (exist, value) => this.AppLifeCycle(exist, value));
                // console.log("doniczkav2.0 " + exist + "WYNIK: " + value);
        };
        document.addEventListener("deviceready", onDeviceReady, false);
        this.state = {
            schedule: this.props.data,
            IsLoaded: false,
            IsError: false,
        };
    }
    public AppLifeCycle(exist, value) {
        // CZY W PAMIECI ? - TAK:
        if (exist) {
            console.log("budyn");
            console.log(value);
            config.set(JSON.parse(value), { freeze: false });
            this.setState({
                // TODO: wczytac plan z pamieci (plan moze byc null) !!!
                schedule: value.timetable,
                IsLoaded: false,
                IsError: false,
            });
            if (TimetableServices.isNetwork()) {
                if (TimetableServices.isNewerSchedule()) {
                    TimetableServices.getData((response) => {
                        this.setState({
                            schedule: response.data,
                            IsLoaded: true,
                        });
                        if (this.state.schedule !== undefined) {
                            // const kurczak = JSON.stringify(this.state.schedule);
                            FileManager.saveTimetableStorageConfig(this.state.schedule);
                        }
                        console.log("SUCCESS 1");
                    });
                }
            }
        // CZY W PAMIECI ? - NIE:
        } else {
            config.set(configuration, { freeze: false });
            if (TimetableServices.isNetwork()) {
                TimetableServices.getData((response) => {
                    this.setState({
                        schedule: response.data,
                        IsLoaded: true,
                    });
                    if (this.state.schedule !== undefined) {
                        const kurczak = JSON.stringify(this.state.schedule);
                        FileManager.saveTimetableStorageConfig(this.state.schedule);
                    }
                    console.log("SUCCESS 2");
                });
            } else {
                this.setState({
                    IsLoaded: false,
                    IsError: true,
                });
            }
        }
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
