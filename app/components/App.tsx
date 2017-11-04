import * as React from "react";
import { HashRouter as Router, Link, Route, Switch } from 'react-router-dom';
import MainPage from "./MainPage";
import Settings from "./Settings";

export default class App extends React.Component {
    render(): JSX.Element {
        return (
            <Router>
                <div className="App">
                    <nav>
                        <ul>
                            <li><Link to="/" replace>[Strona główna]</Link></li>
                            <li><Link to="/settings" replace>[Ustawienia]</Link></li>
                        </ul>
                    </nav>
                    <hr/>
                    <Switch>
                        <Route exact path="/" component={MainPage} />
                        <Route path="/settings" component={Settings} />
                    </Switch>
                </div>
            </Router>
        );
    }
}