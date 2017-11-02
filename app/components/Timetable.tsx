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

    filterIndexes(data: ITimetable, filters: ITimetableFilters): {
        fieldOfStudyIndex: number,
        degreeIndex: number,
        modeIndex: number,
        semesterIndex: number
    } {

        let { fieldOfStudy, degree, mode, semester } = filters;

        let fieldOfStudyIndex: number = data.fieldsOfStudy.findIndex(f => f.name === fieldOfStudy);
        let degreeIndex: number = data.fieldsOfStudy[fieldOfStudyIndex].degrees.findIndex(d => d.name === degree);
        let modeIndex: number = data.fieldsOfStudy[fieldOfStudyIndex].degrees[degreeIndex].modes.findIndex(m => m.name === mode);
        let semesterIndex: number = data
            .fieldsOfStudy[fieldOfStudyIndex]
            .degrees[degreeIndex]
            .modes[modeIndex]
            .semesters.findIndex(s => s.number === semester);

        return (
            {
                fieldOfStudyIndex: fieldOfStudyIndex,
                degreeIndex: degreeIndex,
                modeIndex: modeIndex,
                semesterIndex: semesterIndex
            }
        );
    }

    renderDayTabs(data: ITimetable, filters: ITimetableFilters): JSX.Element[] {

        let {
            fieldOfStudyIndex,
            degreeIndex,
            modeIndex,
            semesterIndex
        } = this.filterIndexes(data, filters);

        return data
            .fieldsOfStudy[fieldOfStudyIndex]
            .degrees[degreeIndex]
            .modes[modeIndex]
            .semesters[semesterIndex]
            .days
            .map((day) => {
                return (
                    day.events.length > 0 &&
                    <Tab key={day.name} label={day.name}>
                        <Tabs>
                            {this.renderGroupsTabs(data, filters)}
                        </Tabs>
                    </Tab>
                );
            });
    }

    renderGroupsTabs(data: ITimetable, filters: ITimetableFilters): JSX.Element[] {
        if (filters.groups) {
            if (filters.groups.length > 0) {
                return filters.groups.map((group) => {
                    return (
                        <Tab key={group} label={group} />
                    );
                });
            }
        } else {
            let {
                fieldOfStudyIndex,
                degreeIndex,
                modeIndex,
                semesterIndex
            } = this.filterIndexes(data, filters);

            let groupNumbers: number[] = [];

            data.fieldsOfStudy[fieldOfStudyIndex].degrees[degreeIndex].modes[modeIndex].semesters[semesterIndex].days.forEach(day => {
                day.events.forEach(event => {
                    groupNumbers.push(...event.groups);
                });
            });

            let groupNumbersSet: Set<number> = new Set(groupNumbers);

            return Array.from(groupNumbersSet).map((group) => {
                return (
                    <Tab key={group} label={group} />
                );
            });
        }
    }

    render(): JSX.Element {
        return (
            <Tabs>
                {this.renderDayTabs(this.props.data, this.props.filters)}
            </Tabs>
        );
    }
}