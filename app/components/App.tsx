import * as React from "react";
import * as TimeTableServices from "..\\..\\TimetableServices";
import FlatButton from "material-ui/FlatButton";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";

export default class App extends React.Component {
    render(): JSX.Element {
        let result = new TimeTableServices.TimeTableServices();
        return (
            // <h1>Silver Timetable</h1>
            <MuiThemeProvider>
                <div>
                    {"Test"/*result.downloadTimetableFile("https://www.ifj.edu.pl/private/krawczyk/kurshtml/odsylacz/przyklad.txt")*/}
                </div>
            </MuiThemeProvider>
        );
    }
}