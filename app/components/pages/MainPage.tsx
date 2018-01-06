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
import configuration from "../../DefaultConfiguration";
import IConfiguration from "../../models/IConfiguration";
import DefaultConfiguration from "../../DefaultConfiguration";

interface IProps {
    data: ITimetable;
}

interface IState {
    timetableData: ITimetable;
    IsLoaded: boolean;
    IsError: boolean;
}
export default class MainPage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        console.log("constructing mainpage");
        const onDeviceReady = () => {
            TimetableServices.initialize().then(() => this.AppLifeCycle().then((result) => this.setState(result)));
        };
        document.addEventListener("deviceready", onDeviceReady, false);
        this.state = {
            timetableData: this.props.data,
            IsLoaded: false,
            IsError: false,
        };
    }
    public async AppLifeCycle(): Promise<IState> {

        const sessionConfigTimetable: ITimetable = config.get("timetable");
        if (sessionConfigTimetable) {
            return {
                timetableData: sessionConfigTimetable,
                IsError: false,
                IsLoaded: true,
            };
        }

        let configurationData: IConfiguration = await TimetableServices.readConfigurationFile();

        let result: IState = {
            timetableData: null,
            IsError: false,
            IsLoaded: false,
        };

        if (configurationData) {
            console.log("wczytano config z pliku");

            if (configurationData.timetable) {
                console.log("jest plan w pamięci");
                if (TimetableServices.isNewerTimetable()) {
                    configurationData.timetable = await TimetableServices.getTimetable();
                }
                result = ({
                    timetableData: configurationData.timetable,
                    IsLoaded: true,
                    IsError: false,
                });
            } else {
                console.log("Nie ma planu w pamieci");
                if (TimetableServices.isNetworkAvailable()) {
                    console.log("jest internet");
                    try {
                        // console.log(configurationData);
                        configurationData.timetable = await TimetableServices.getTimetable();

                        console.log("Pobrano plan (bo nie bylo)");
                        result = {
                            timetableData: configurationData.timetable,
                            IsLoaded: true,
                            IsError: false,
                        };
                    } catch (error) {
                        console.log(error);
                        result.IsError = true;
                    }
                } else {
                    console.log("nie ma internetu");
                    result.IsError = true;
                }
            }
        } else {
            console.log("Nie ma pliku konfiguracyjnego");
            console.log(DefaultConfiguration);
            configurationData = { ...DefaultConfiguration };
            if (TimetableServices.isNetworkAvailable()) {
                console.log("jest internet");
                try {
                    configurationData.timetable = await TimetableServices.getTimetable();

                    result = {
                        timetableData: configurationData.timetable,
                        IsLoaded: true,
                        IsError: false,
                    };
                } catch (error) {
                    console.log(error);
                    result.IsError = true;
                }
            } else {
                console.log("Nie ma internetu");
                result.IsError = true;
            }
        }

        config.set(configurationData, { freeze: false });
        console.log("zapisuję: ");
        // console.log(configurationData);
        await TimetableServices.writeConfigurationFile(configurationData);
        console.log("Zapisano plan do pliku");

        return result;
    }

    public render(): JSX.Element {

        const data: ITimetable = this.state.timetableData;

        const filters = config.get("filters");

        if (!this.state.IsLoaded && !this.state.IsError) {
            return (<CircularProgress />);
        } else if (this.state.IsError) {
            return (<ErrorPage />);
        } else {
            return (
                <div className="main-page-container" style={{ marginTop: "69px" }}>
                    {this.state.timetableData &&
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
