import * as Colors from "material-ui/colors";
import createMuiTheme from "material-ui/styles/createMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import * as React from "react";
import { HashRouter as Router, Link, Route, Switch } from "react-router-dom";
import FilteringPage from "./Pages/FilteringPage";
import FloorPage from "./Pages/FloorPage";
import MainPage from "./Pages/MainPage";
import SettingsPage from "./Pages/SettingsPage";

import Drawer from "./appComponents/Drawer";

import AppBar from "./appComponents/AppBar";

// config
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
    }

    public render(): JSX.Element {
        return (
            <div>
                
            <Router>
                <div className="app-container" style={{marginTop: "92px"}}>
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
