import React from "react";
import TimeTableServices from "..\\..\\TimetableServices";
import FlatButton from "material-ui/FlatButton";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TexField from "material-ui/TextField";

export default class App extends React.Component {
    render(): JSX.Element {
        return (
            //<h1>Silver Timetable</h1>
            <MuiThemeProvider>
                <div>
                    <TexField id="text" value={} />
                </div>
            </MuiThemeProvider>
        );
    }
}