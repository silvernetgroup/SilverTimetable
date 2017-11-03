import * as React from "react";
import {BrowserRouter as Router, Link, Match, Miss, Route} from  'react-router-dom';
import MainPage from "./MainPage";
import Settings from "./Settings";

export default class App extends React.Component {
    render(): JSX.Element {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={MainPage} />
                    <Route exact path="/settings" component={Settings} />

                </div>
            </Router>
        );
    }
}