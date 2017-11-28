import * as Colors from "material-ui/colors";
import createMuiTheme from "material-ui/styles/createMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import * as React from "react";
import { HashRouter as Router, Link, Route, Switch } from "react-router-dom";
import FilteringPage from "./Pages/FilteringPage";
import FloorPage from "./Pages/FloorPage";
import MainPage from "./Pages/MainPage";
import SettingsPage from "./Pages/SettingsPage";

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

    calendarExport = () => {
        var startDate = new Date(2017, 10, 29, 12, 0, 0, 0); // 10 month == listopad
        var endDate = new Date(2017, 10, 29, 20, 0, 0, 0);
        var title = "test kalendarza";
        var eventLocation = "SGGW";
        var notes = "nic ważnego";
        var success = function(message) {console.log("udało się: " + message); };
        var error = function(message) {console.log("dupa: " + message); };
        //window['plugins'].
        //window['plugins'].calendar.createEvent(title, eventLocation, notes, startDate, endDate, success, error);
        window.plugins.calendar.createEvent(title,eventLocation,notes,startDate,endDate,success,error);
    }

    public render(): JSX.Element {
        return (
            <Router>
                <div className="app-container">
                    <nav>
                        <ul>
                            <li><Link to="/" replace>[Strona główna]</Link></li>
                            <li><Link to="/settings" replace>[Ustawienia]</Link></li>
                            <li><Link to="/filtering" replace>[Filtrowanie]</Link></li>
                            <li><Link to="/floor" replace>[Schemat piętra]</Link></li>
                            <li><a onClick={this.calendarExport}>[Test kalendarza]</a></li>
                        </ul>
                    </nav>
                    <hr />
                    <Switch>
                        <Route exact path="/" component={MainPage} />
                        <Route path="/settings" component={SettingsPage} />
                        <Route path="/filtering" component={FilteringPage} />
                        <Route path="/floor" render={() => <FloorPage />} />
                    </Switch>
                </div>
            </Router>
        );
    }
}
