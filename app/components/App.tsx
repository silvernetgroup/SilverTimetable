import * as Colors from "material-ui/colors";
import createMuiTheme from "material-ui/styles/createMuiTheme";
import * as React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import FloorPage from "./Pages/FloorPage";
import MainPage from "./Pages/MainPage";
import SettingsPage from "./Pages/SettingsPage";
import AboutPage from "./Pages/AboutPage";

// AppBar/Navigation
import NavigationToolbar from "./navigation/NavigationToolbar";

import PushNotificationServices from "../services/PushNotificationServices";
import ToastServices from "../services/ToastServices";
import { IGlobalState } from "../store/IGlobalState";
import { closeLeftDrawer, closeBottomDrawer, closeFloorPagePin } from "../actions/index";
import { connect } from "react-redux";
import { initialState } from "../store/index";
import ITimetable from "../models/ITimetable";

const theme: any = createMuiTheme({
    palette: {
        secondary: Colors.yellow,
    },
});

interface IProps {
    leftDrawerOpen: boolean;
    bottomDrawerOpen: boolean;
    floorPageOpen: boolean;

    closeFloorPagePin: any;
    closeBottomDrawer: any;
    closeLeftDrawer: any;

    timetable: ITimetable;
}

declare let navigator: any;

class App extends React.Component<IProps> {
    private mainPage;
    constructor(props: any) {
        super(props);
        // mobile touch delay fix
        // initReactFastclick();
        // config

        const pushNotificationServices = new PushNotificationServices();
        pushNotificationServices.onPushNotification = async () => {
            if (this.props.timetable) { // todo poprawic
                await this.mainPage.getWrappedInstance().refresh();
            }
        };

        const onBackButtonClick = () => {
            if (this.props.bottomDrawerOpen) {
                this.props.closeBottomDrawer();
            } else if (this.props.leftDrawerOpen) {
                this.props.closeLeftDrawer();
            } else if (this.props.floorPageOpen) {
                this.props.closeFloorPagePin();
            } else if (window.location.hash !== "#/") {
                window.location.replace("index.html#/");
            } else {
                navigator.app.exitApp();
            }
        };

        // config.set(initialState.configuration, { freeze: false });
        const onDeviceReady = () => {
            navigator.splashscreen.hide();
            StatusBar.styleLightContent();
            StatusBar.overlaysWebView(false); // config one doesn't work (on iOS)
            if (device.platform === "Android") {
                StatusBar.backgroundColorByHexString("#303F9F");
            } else if (device.platform === "iOS") {
                StatusBar.backgroundColorByHexString("#3f51b5");
            }
            document.addEventListener("backbutton", onBackButtonClick, true);
        };

        document.addEventListener("deviceready", onDeviceReady, false);
    }

    public render(): JSX.Element {
        return (
            <Router>
                <div className="app-container" style={{ WebkitOverflowScrolling: "touch" }}>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={(props) => <MainPage ref={(mainPage) => this.mainPage = mainPage} />}
                        />
                        <Route path="/settings" component={SettingsPage} />
                        <Route path="/floor" component={FloorPage} />
                        <Route path="/about" component={AboutPage} />
                    </Switch>
                    <NavigationToolbar onRefreshClick={() => this.mainPage.getWrappedInstance().refresh()} />
                </div>
            </Router>
        );
    }
}

const mapStateToProps = (state: IGlobalState, ownProps) => {
    return {
        leftDrawerOpen: state.navigationToolbar.leftDrawerOpen,
        bottomDrawerOpen: state.timetable.bottomDrawerOpen,
        timetable: state.timetable,
        floorPageOpen: state.floorPageWithPin.floorPageOpen,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        closeLeftDrawer: () => dispatch(closeLeftDrawer()),
        closeBottomDrawer: () => dispatch(closeBottomDrawer()),
        closeFloorPagePin: () => dispatch(closeFloorPagePin()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
