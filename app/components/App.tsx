import * as React from "react";
import * as TimeTableServices from "../../TimetableServices";
import FlatButton from "material-ui/FlatButton";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";

export default class App extends React.Component {
    render(): JSX.Element {
        return (
            // <h1>Silver Timetable</h1>
            <MuiThemeProvider>
                <div>
                    {TimeTableServices.TimeTableServices.downloadTimetableFile("https://www.ifj.edu.pl/private/krawczyk/kurshtml/odsylacz/przyklad.txt")}
                </div>
            </MuiThemeProvider>
        );
    }
}