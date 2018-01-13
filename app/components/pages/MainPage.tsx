import * as React from "react";
import ITimetable from "../../models/ITimetable";
import ITimetableEvent from "../../models/ITimetableEvent";
import ITimetableFilters from "../../models/ITimetableFilters";
import CircularProgress from "material-ui/Progress/CircularProgress";
import LecturersPages from "../../services/LecturersPages";
import ErrorPage from "../Pages/ErrorPage";
import Timetable from "../timetable/Timetable";
import config from "react-global-configuration";
import TimetableServices from "../../services/TimetableServices";
import defaultConfig from "../../DefaultConfiguration";
import IConfiguration from "../../models/IConfiguration";
import IDateCheck from "../../models/IDateCheck";

interface IState {
    timetableData: ITimetable;
    IsLoaded: boolean;
    IsError: boolean;
}

declare let window: any;

const toastStyle = {
    opacity: 1,
    backgroundColor: "#323232",
    textColor: "white",
    cornerRadius: 3,
    textSize: 15,
    horizontalPadding: 20,
    verticalPadding: 16,
};

export default class MainPage extends React.Component<{}, IState> {
    constructor(props) {
        super(props);
        const onDeviceReady = () => {
            TimetableServices.initialize().then(() => this.Initialize().then((result) => this.setState(result)));
        };
        document.addEventListener("deviceready", onDeviceReady, false);
        this.state = {
            timetableData: null,
            IsLoaded: false,
            IsError: false,
        };
    }
    public async Initialize(): Promise<IState> {

        const sessionConfigTimetable: ITimetable = config.get("timetable");
        if (sessionConfigTimetable) {
            console.log("config w sesji");
            return {
                timetableData: sessionConfigTimetable,
                IsError: false,
                IsLoaded: true,
            };
        }

        const result: IState = {
            timetableData: null,
            IsError: false,
            IsLoaded: false,
        };

        let configurationData: IConfiguration = await TimetableServices.readConfigurationFile();
        const timetableData: ITimetable = await TimetableServices.readTimetableFile();
        result.timetableData = timetableData;

        if (TimetableServices.isNetworkAvailable()) {
            console.log("jest internet");

            let isNewerTimetable: boolean = false;

            try {
                isNewerTimetable = await TimetableServices.isNewerTimetable(timetableData);
            } catch {
                console.log("Blad sprawdzania nowej wersji");
            }

            if (!timetableData || isNewerTimetable) {
                console.log("jest nowszy plan lub nie ma w pamieci, ściągam");
                try {
                    result.timetableData = await this.getTimetableWithRetries(5);
                    await TimetableServices.writeTimetableFile(result.timetableData);
                } catch {
                    console.log("Błąd pobierania...");
                    window.plugins.toast.showWithOptions({
                        message: "Błąd pobierania planu",
                        duration: 3000,
                        position: "bottom",
                        styling: toastStyle,
                    });
                }
            }
        } else {
            console.log("nie ma internetu");
            if (!timetableData) {
                console.log("nie ma internetu i planu w pamieci");
                result.IsError = true;
                return result;
            }
        }

        if (!configurationData) {
            console.log("nie ma pliku konfiguracyjnego, tworzę domyslny");
            configurationData = { ...defaultConfig };
            await TimetableServices.writeConfigurationFile(configurationData);
        } else {
            console.log("jest konfiguracja w pamięci");
        }

        config.set({ ...configurationData, timetable: result.timetableData });

        result.IsLoaded = true;

        return result;
    }

    public render(): JSX.Element {

        const data: ITimetable = this.state.timetableData;

        const filters: ITimetableFilters = config.get("filters");

        if (!this.state.IsLoaded && !this.state.IsError) {
            return (
                <div className="CrcProgress">
                    <CircularProgress color="accent" size={60} thickness={7} />
                </div>
            );
        } else if (this.state.IsError) {
            return (<ErrorPage />);
        } else {
            return (
                <div className="main-page-container" style={{ marginTop: "69px" }}>
                    {this.state.timetableData &&
                        <Timetable
                            data={data}
                            filters={filters}
                            defaultDay={this.currentDay(filters.mode)}
                            onEventBlockClick={(event) => this.handleEventBlockClick(event)}
                        />
                    }
                </div>
            );
        }
    }

    public async refresh() {
        const currentState: IState = this.state;
        this.setState({ ...this.state, IsLoaded: false });
        let timetable: ITimetable = currentState.timetableData;

        if (TimetableServices.isNetworkAvailable()) {
            let isNewerTimetable: boolean = false;
            if (timetable) {
                try {
                    isNewerTimetable = await TimetableServices.isNewerTimetable(timetable);
                    if (!isNewerTimetable) {    
                        window.plugins.toast.showWithOptions({
                            message: "Plan jest aktualny",
                            duration: 3000,
                            position: "bottom",
                            styling: toastStyle,
                        });
                    }
                } catch {
                    console.log("Blad sprawdzania nowej wersji");
                }
            }

            if (!timetable || isNewerTimetable) {
                try {
                    timetable = await this.getTimetableWithRetries(5);

                    const currentConfig: IConfiguration = config.get();
                    config.set({ ...currentConfig, timetable });

                    this.setState({ timetableData: timetable, IsLoaded: true, IsError: false });
                    await TimetableServices.writeTimetableFile(timetable);
                    window.plugins.toast.showWithOptions({
                        message: "Pobrano nowy plan!",
                        duration: 3000,
                        position: "bottom",
                        styling: toastStyle,
                    });
                    return;

                } catch {
                    console.log("Blad pobierania planu");
                    window.plugins.toast.showWithOptions({
                        message: "Błąd pobierania planu",
                        duration: 3000,
                        position: "bottom",
                        styling: toastStyle,
                    });
                    this.setState(currentState);
                    return;
                }
            }
        } else {
            window.plugins.toast.showWithOptions({
                message: "Brak połączenia z internetem",
                duration: 3000,
                position: "bottom",
                styling: toastStyle,
            });
        }
        this.setState(currentState);
    }

    private async getTimetableWithRetries(retriesCount: number): Promise<ITimetable> {
        let error;
        let timetable: ITimetable;
        for (let i = 0; i < retriesCount; i++) {
            try {
                console.log("trying to get the timetable...");
                timetable = await TimetableServices.getTimetable();
                if (timetable) {
                    return timetable;
                }
            } catch (e) {
                error = e;
                timetable = null;
            }
        }
        throw error;
    }
    private handleEventBlockClick = (event: ITimetableEvent): void => {
        LecturersPages.openLecturersPage(event);
    }

    private currentDay(mode: string): number {
        const today: Date = new Date();
        let dayNumber: number = today.getDay();

        switch (mode) {
            case "Stacjonarne":
                if (dayNumber === 0 || dayNumber === 6) {
                    dayNumber = 1;
                }
                break;

            case "Niestacjonarne":
                if (dayNumber >= 1 && dayNumber <= 4) {
                    dayNumber = 5;
                } else if (dayNumber === 0) {
                    dayNumber = 7;
                }
                break;
        }

        return dayNumber;
    }
}
