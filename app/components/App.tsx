import * as Colors from "material-ui/colors";
import createMuiTheme from "material-ui/styles/createMuiTheme";
import * as React from "react";
import initReactFastclick from "react-fastclick";
import { HashRouter as Router, Link, Route, Switch } from "react-router-dom";
import FilteringPage from "./Pages/FilteringPage";
import FloorPage from "./Pages/FloorPage";
import MainPage from "./Pages/MainPage";
import SettingsPage from "./Pages/SettingsPage";

// AppBar/Navigation
import NavigationToolbar from "./appNavigationComponents/NavigationToolbar";

// Config
import * as config from "react-global-configuration";
import configuration from "../DefaultConfiguration";

const theme: any = createMuiTheme({
    palette: {
        secondary: Colors.yellow,
    },
});

export default class App extends React.Component {
    constructor(props: any) {
        super(props);
        // mobile touch delay fix
        // initReactFastclick();
        // config
        config.set(configuration, { freeze: false });
        document.addEventListener("deviceready", onDeviceReady, false);
        function onDeviceReady() {
            StatusBar.styleLightContent();
            StatusBar.overlaysWebView(false); // config one doesn't work (on iOS)
            if (device.platform === "Android") {
                StatusBar.backgroundColorByHexString("#303F9F");
            } else if (device.platform === "iOS") {
                StatusBar.backgroundColorByHexString("#3f51b5");
            }
        }
    }

    public render(): JSX.Element {
        return (
            <Router>
                <div className="app-container" style={{WebkitOverflowScrolling: "touch"}}>
                    <Switch>
                        <Route exact path="/" component={MainPage} />
                        <Route path="/settings" component={SettingsPage} />
                        <Route path="/filtering" component={FilteringPage} />
                        <Route path="/floor" render={() => <FloorPage />} />
                    </Switch>
                    <NavigationToolbar />
                </div>
            </Router>
        );
    }
}
