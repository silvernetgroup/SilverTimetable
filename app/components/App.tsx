import * as Colors from "material-ui/colors";
import createMuiTheme from "material-ui/styles/createMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import * as React from "react";
import { HashRouter as Router, Link, Route, Switch } from "react-router-dom";
import FilteringPage from "./Pages/FilteringPage";
import FloorPage from "./Pages/FloorPage";
import MainPage from "./Pages/MainPage";
import SettingsPage from "./Pages/SettingsPage";

// AppBar/Navigation
import Drawer from "./appNavigationComponents/Drawer";
import AppBar from "./appNavigationComponents/Toolbar";

// Config
import * as config from "react-global-configuration";
import configuration from "../Config";

const theme: any = createMuiTheme({
    palette: {
        secondary: Colors.yellow,
    },
});

export default class App extends React.Component {
    constructor(props: any) {
        super(props);
        config.set(configuration, { freeze: false });
        document.addEventListener("deviceready", onDeviceReady, false);
        function onDeviceReady() {
            StatusBar.styleLightContent();
            StatusBar.overlaysWebView(false); // config one doesn't work (on iOS)
            if (device.platform == "Android") {
                StatusBar.backgroundColorByHexString("#303F9F");
            } else if (device.platform == "iOS") {
                StatusBar.backgroundColorByHexString("#3f51b5");
            }
        }
    }

    public render(): JSX.Element {
        return (
            <div>
                <Router>
                    <div className="app-container" style={{marginTop: "69px"}}>
                        <Switch>
                            <Route exact path="/" component={MainPage} />
                            <Route path="/settings" component={SettingsPage} />
                            <Route path="/filtering" component={FilteringPage} />
                            <Route path="/floor" render={() => <FloorPage />} />
                        </Switch>
                        <AppBar />
                    </div>
                </Router>
            </div>
        );
    }
}
