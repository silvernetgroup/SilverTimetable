import * as React from "react";
import ITimetable from "../../models/ITimetable";
import ITimetableEvent from "../../models/ITimetableEvent";
import ITimetableFilters from "../../models/ITimetableFilters";
import CircularProgress from "material-ui/Progress/CircularProgress";
import LecturersPages from "../../services/LecturersPages";
import ErrorPage from "../Pages/ErrorPage";
import Timetable from "../timetable/Timetable";
import TimetableServices from "../../services/TimetableServices";
import IConfiguration from "../../store/IConfiguration";
import { initialState } from "../../store/index";
import ToastServices from "../../services/ToastServices";
import { IGlobalState } from "../../store/IGlobalState";
import { connect } from "react-redux";
import {
    loadTimetableRequest,
    changeGroup,
    closeBottomDrawer,
    loadTimetableSuccess,
    loadTimetableFailure,
} from "../../actions";

interface IProps {
    timetableData: ITimetable;
    timetableFilters: ITimetableFilters;
    isLoaded: boolean;
    isError: boolean;
    selectedGroup: string;
    bottomDrawerOpen: boolean;
    quickGroupChangeAllowed: boolean;
    configuration: IConfiguration;

    changeGroup: any;
    closeBottomDrawer: any;

    timetableLoadRequest: any;
    timetableLoadSuccess: any;
    timetableLoadFailure: any;
}

interface IState {
    selectedDay: number;
    selectedEvent: ITimetableEvent;
}

class MainPage extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
        const onDeviceReady = () => {
            TimetableServices.initialize().then(() => this.Initialize());
        };
        document.addEventListener("deviceready", onDeviceReady, false);

        this.state = {
            selectedDay: this.currentDay(this.props.timetableFilters.mode),
            selectedEvent: null,
        };
    }
    public async Initialize() {
        this.props.timetableLoadRequest();
        console.log("Initialize");
        const sessionConfigTimetable: ITimetable = this.props.timetableData;
        if (sessionConfigTimetable) {
            console.log("config w sesji");
            this.props.timetableLoadSuccess(); // bez payloadu
            return;
        }

        let configurationData: IConfiguration = await TimetableServices.readConfigurationFile();
        const timetableData: ITimetable = await TimetableServices.readTimetableFile();

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
                    const timetable = await this.getTimetableWithRetries(5);
                    await TimetableServices.writeTimetableFile(timetable);
                    this.props.timetableLoadSuccess(timetable);
                } catch {
                    console.log("Błąd pobierania...");
                    if (!timetableData) {
                        this.props.timetableLoadFailure();
                    } else {
                        this.props.timetableLoadSuccess(); // bez payloadu
                    }
                }
            }
        } else {
            console.log("nie ma internetu");
            if (!timetableData) {
                console.log("nie ma internetu i planu w pamieci");
                this.props.timetableLoadFailure();
            }
        }

        if (!configurationData) {
            console.log("nie ma pliku konfiguracyjnego, tworzę domyslny");
            configurationData = { ...this.props.configuration };
            await TimetableServices.writeConfigurationFile(configurationData);
        } else {
            console.log("jest konfiguracja w pamięci");
        }
    }

    public render(): JSX.Element {

        const data: ITimetable = this.props.timetableData;

        const filters: ITimetableFilters = this.props.timetableFilters;

        if (!this.props.isLoaded && !this.props.isError) {
            return (
                <div className="CrcProgress">
                    <CircularProgress color="accent" size={60} thickness={7} />
                </div>
            );
        } else if (this.props.isError) {
            return (<ErrorPage />);
        } else {
            return (
                <div className="main-page-container" style={{ marginTop: "69px" }}>
                    {this.props.timetableData &&
                        <Timetable
                            data={data}
                            filters={filters}
                            selectedDay={this.state.selectedDay}
                            selectedGroup={this.props.selectedGroup}
                            selectedEvent={this.state.selectedEvent}
                            bottomDrawerOpen={this.props.bottomDrawerOpen}
                            quickGroupChangeAllowed={this.props.quickGroupChangeAllowed}
                            handleGroupChange={this.props.changeGroup}
                            onDayChange={this.changeDay}
                            onEventBlockClick={(event) => this.handleEventBlockClick(event)}
                            onBottomDrawerClose={this.props.closeBottomDrawer}
                        />
                    }
                </div>
            );
        }
    }

    public async refresh() {
        console.log("refresh");
        let timetable: ITimetable = this.props.timetableData;

        if (TimetableServices.isNetworkAvailable()) {
            this.props.timetableLoadRequest();
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

                this.props.timetableLoadSuccess(); // bez payloadu
            }

            if (!timetable || isNewerTimetable) {
                try {
                    timetable = await this.getTimetableWithRetries(5);

                    const currentConfig: IConfiguration = this.props.configuration;
                    this.props.timetableLoadSuccess(timetable);

                    await TimetableServices.writeTimetableFile(timetable);
                    ToastServices.show("Pobrano nowy plan!");
                    return;

                } catch {
                    console.log("Blad pobierania planu");
                    ToastServices.show("Błąd serwera");
                    this.props.timetableLoadFailure();
                    return;
                }
            }
        } else {
            ToastServices.show("Brak połączenia z internetem");
        }
    }

    private changeDay = (event: any, newDay: number) => {
        this.setState({ selectedDay: newDay });
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

const mapStateToProps = (state: IGlobalState) => {
    return {
        isLoaded: state.timetable.isLoaded,
        isError: state.timetable.isError,
        selectedGroup: state.timetable.selectedGroup,
        bottomDrawerOpen: state.timetable.bottomDrawerOpen,
        timetableData: state.timetable.data,
        timetableFilters: state.configuration.filters,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeGroup: (group) => dispatch(changeGroup(group)),
        closeBottomDrawer: () => dispatch(closeBottomDrawer()),
        timetableLoadRequest: () => dispatch(loadTimetableRequest()),
        timetableLoadSuccess: (timetable) => dispatch(loadTimetableSuccess(timetable)),
        timetableLoadFailure: () => dispatch(loadTimetableFailure()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
