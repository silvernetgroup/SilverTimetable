import * as React from "react";
import ITimetable from "../models/ITimetable";
import ITimetableFilters from "../models/ITimetableFilters";
import IFieldOfStudy from "../models/IFieldOfStudy";
import { Tab, Tabs } from "material-ui/Tabs";

interface IProps {
    data: ITimetable;
    filters: ITimetableFilters;
}

interface IState {

}

export default class Timetable extends React.Component<IProps, IState> {

    renderDayTabs(data: ITimetable, filters: ITimetableFilters): JSX.Element[] {

        let { fieldOfStudy, degree, mode, semester } = filters;

        let fieldOfStudyIndex: number = data.fieldsOfStudy.findIndex(f => f.name === fieldOfStudy);
        let degreeIndex: number = data.fieldsOfStudy[fieldOfStudyIndex].degrees.findIndex(d => d.name === degree);
        let modeIndex: number = data.fieldsOfStudy[fieldOfStudyIndex].degrees[degreeIndex].modes.findIndex(m => m.name === mode);
        let semesterIndex: number = data
            .fieldsOfStudy[fieldOfStudyIndex]
            .degrees[degreeIndex]
            .modes[modeIndex]
            .semesters.findIndex(s => s.number === semester);

        return data
            .fieldsOfStudy[fieldOfStudyIndex]
            .degrees[degreeIndex]
            .modes[modeIndex]
            .semesters[semesterIndex]
            .days
            .map((day) => {
                return (
                    day.events.length > 0 &&
                    <Tab key={day.name} label={day.name}>{day.name}</Tab>
                );
            });
    }

    render(): JSX.Element {
        return (
            <Tabs>
                {this.renderDayTabs(this.props.data, this.props.filters)}
            </Tabs>
        );
    }
}