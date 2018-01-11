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
    dateToCheck: IDateCheck;
    IsLoaded: boolean;
    IsError: boolean;
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
            dateToCheck: null,
            IsLoaded: false,
            IsError: false,
        };
    }
    public async Initialize(): Promise<IState> {

        const sessionConfigTimetable: ITimetable = config.get("timetable");
        const sessionConfigUpdater: IDateCheck = config.get("updater");
        if (sessionConfigTimetable) {
            console.log("config w sesji");
            return {
                timetableData: sessionConfigTimetable,
                dateToCheck: sessionConfigUpdater,
                IsError: false,
                IsLoaded: true,
            };
        }

        const result: IState = {
            timetableData: null,
            dateToCheck: null,
            IsError: false,
            IsLoaded: false,
        };

        let configurationData: IConfiguration = await TimetableServices.readConfigurationFile();
        const timetableData: ITimetable = await TimetableServices.readTimetableFile();
        const newerDate: IDateCheck = await TimetableServices.getNewerDate();

        if (TimetableServices.isNetworkAvailable()) {
            console.log("jest internet");
            if (!timetableData || TimetableServices.isNewerTimetable(timetableData, newerDate)) {
                console.log("jest nowszy plan lub nie ma w pamieci, ściągam");
                try {
                    result.timetableData = await TimetableServices.getTimetable();
                    result.dateToCheck = await newerDate;
                    await TimetableServices.writeTimetableFile(result.timetableData, result.dateToCheck);
                } catch {
                    console.log("Błąd pobierania...");
                    result.IsError = true;
                }
            } else {
                console.log("odczytuję plan z pamięci...");
                result.timetableData = timetableData;
            }
        } else {
            console.log("nie ma internetu lub plan jest aktualny");
            if (timetableData) {
                console.log("jest plan w pamieci, ładuję");
                result.timetableData = timetableData;
            } else {
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

        config.set({ ...configurationData, timetable: result.timetableData, updater: result.dateToCheck });

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
        console.log("Odświerzam...");
        this.setState({ ...this.state, IsLoaded: false });
        if (TimetableServices.isNetworkAvailable()
            && (!this.state.timetableData || TimetableServices.isNewerTimetable(this.state.timetableData, this.state.dateToCheck))) {
            console.log("Jest internet i nowsza wersja - pobieram...");
            let timetable: ITimetable;
            let updater: IDateCheck;
            try {
                timetable = await TimetableServices.getTimetable();
                updater = await TimetableServices.getNewerDate();
                await TimetableServices.writeTimetableFile(timetable, updater);
            } catch {
                console.log("Błąd pobierania");
                timetable = this.state.timetableData;
                updater = this.state.dateToCheck;
            }

            this.setState({
                ...this.state,
                timetableData: timetable,
                dateToCheck: updater,
                IsLoaded: true,
            });

        }
        this.setState({ ...this.state, IsLoaded: true });
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
