import * as Colors from "material-ui/colors";
import createMuiTheme from "material-ui/styles/createMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import * as React from "react";
import { HashRouter as Router, Link, Route, Switch } from "react-router-dom";
import FilteringPage from "./Pages/FilteringPage";
import FloorPage from "./Pages/FloorPage";
import MainPage from "./Pages/MainPage";
import SettingsPage from "./Pages/SettingsPage";
import * as ReactDOM from "react-dom";

// Config
import * as config from 'react-global-configuration';
import configuration from '../Config';

// Components
import Settings from "./pages/Settings";

const theme: any = createMuiTheme({
    palette: {
        secondary: Colors.yellow,
    },
});

export default class App extends React.Component {
    constructor(props) {
        super(props);
        config.set(configuration, { freeze: false });
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
                        </ul>
                    </nav>
                    <hr/>
                    <Switch>
                        <Route exact path="/" component={MainPage} />
                        <Route path="/settings" component={SettingsPage} />
                        <Route path="/filtering" component={FilteringPage} />
                        <Route path="/floor" render={() => <FloorPage />} />
                    </Switch>
                </div>
            </Router>
    
    
}
