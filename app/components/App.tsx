import * as React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import MainPage from "./MainPage";
import Settings from "./Settings";

export default class App extends React.Component {
    render(): JSX.Element {
        return (
            <Router>
                <div className="App">
                    <nav>
                        <ul>
                            <li><Link to="/">[Strona główna]</Link></li>
                            <li><Link to="/settings">[Ustawienia]</Link></li>
                            <hr />
                        </ul>
                    </nav>

                    <Switch>
                        <Route exact path="/" component={MainPage} />
                        <Route path="/settings" component={Settings} />
                    </Switch>
                </div>
            </Router>
        );
    }
}