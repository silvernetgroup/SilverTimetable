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
import IConfiguration from "../../store/IConfiguration";
import { initialState } from "../../store/index";
import ToastServices from "../../services/ToastServices";

interface IState {
    timetableData: ITimetable;
    isLoaded: boolean;
    isError: boolean;
}

export default class MainPage extends React.Component<{}, IState> {
    constructor(props) {
        super(props);
        const onDeviceReady = () => {
            TimetableServices.initialize().then(() => this.Initialize().then((result) => this.setState(result)));
        };
        document.addEventListener("deviceready", onDeviceReady, false);
        this.state = {
            timetableData: null,
            isLoaded: false,
            isError: false,
        };
    }
    public async Initialize(): Promise<IState> {
        console.log("Initialize");
        const sessionConfigTimetable: ITimetable = config.get("timetable");
        if (sessionConfigTimetable) {
            console.log("config w sesji");
            return {
                timetableData: sessionConfigTimetable,
                isError: false,
                isLoaded: true,
            };
        }

        const result: IState = {
            timetableData: null,
            isError: false,
            isLoaded: false,
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
                    if (!timetableData) {
                        result.isError = true;
                    }
                }
            }
        } else {
            console.log("nie ma internetu");
            if (!timetableData) {
                console.log("nie ma internetu i planu w pamieci");
                result.isError = true;
                return result;
            }
        }

        if (!configurationData) {
            console.log("nie ma pliku konfiguracyjnego, tworzę domyslny");
            configurationData = { ...initialState.configuration };
            await TimetableServices.writeConfigurationFile(configurationData);
        } else {
            console.log("jest konfiguracja w pamięci");
        }

        config.set({ ...configurationData, timetable: result.timetableData });

        result.isLoaded = true;

        return result;
    }

    public render(): JSX.Element {

        const data: ITimetable = this.state.timetableData;

        const filters: ITimetableFilters = config.get("filters");

        if (!this.state.isLoaded && !this.state.isError) {
            return (
                <div className="CrcProgress">
                    <CircularProgress color="accent" size={60} thickness={7} />
                </div>
            );
        } else if (this.state.isError) {
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
        console.log("refresh");
        const currentState: IState = this.state;
        this.setState({ ...this.state, isLoaded: false, isError: false });
        let timetable: ITimetable = currentState.timetableData;

        if (TimetableServices.isNetworkAvailable()) {
            let isNewerTimetable: boolean = false;
            if (timetable) {
                try {
                    isNewerTimetable = await TimetableServices.isNewerTimetable(timetable);
                    if (!isNewerTimetable) {
                        ToastServices.show("Plan aktualny");
                    }
                } catch {
                    console.log("Blad sprawdzania nowej wersji");
                    ToastServices.show("Błąd serwera");
                }
            }

            if (!timetable || isNewerTimetable) {
                try {
                    timetable = await this.getTimetableWithRetries(5);

                    const currentConfig: IConfiguration = config.get();
                    config.set({ ...currentConfig, timetable });

                    this.setState({ timetableData: timetable, isLoaded: true, isError: false });
                    await TimetableServices.writeTimetableFile(timetable);
                    ToastServices.show("Pobrano nowy plan!");
                    return;

                } catch {
                    console.log("Blad pobierania planu");
                    ToastServices.show("Błąd serwera");
                    this.setState(currentState);
                    return;
                }
            }
        } else {
            ToastServices.show("Brak połączenia z internetem");
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
