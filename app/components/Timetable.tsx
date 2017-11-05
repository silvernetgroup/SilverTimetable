import * as React from "react";
import ITimetable from "../models/ITimetable";
import ITimetableFilters from "../models/ITimetableFilters";
import { Tab, Tabs } from "material-ui/Tabs";
import EventBlock from "./EventBlock";

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
            .map((day, index) => {
                return (
                    day.events.length > 0 &&
                    <Tab key={day.name} label={day.name} style={{ height: "calc(100% - 48px)" }}>
                        <Tabs
                            style={{ height: "100%" }}
                            tabTemplateStyle={{ height: "100%" }}
                            contentContainerStyle={{ height: "calc(100% - 48px)" }}
                        >
                            {this.renderGroupsTabs(data, filters, index)}
                        </Tabs>
                    </Tab>
                );
            });
    }

    renderGroupsTabs(data: ITimetable, filters: ITimetableFilters, dayIndex: number): JSX.Element[] {

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
                <Tab key={group} label={group}>
                    <div className="event-blocks-container">
                        {this.renderEventBlocks(data, filters, dayIndex, group)}
                    </div>
                </Tab>
            );
        });
    }

    renderEventBlocks(data: ITimetable, filters: ITimetableFilters, dayIndex: number, group: number): JSX.Element[] {

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
            .days[dayIndex]
            .events
            .map((event, index) => {
                return (
                    event.groups.indexOf(group) !== -1 &&
                    <EventBlock
                        key={index}
                        name={event.name}
                        lecturer={event.lecturer}
                        type={event.type}
                        room={event.room}
                        duration={event.duration}
                        startTime={event.startTime} />
                );
            });
    }

    render(): JSX.Element {
        return (
            <div className="timetable-container">
                <Tabs style={{ height: "100%" }} tabTemplateStyle={{ height: "100%" }} contentContainerStyle={{ height: "calc(100% - 48px)" }}>
                    {this.renderDayTabs(this.props.data, this.props.filters)}
                </Tabs>
            </div>
        );
    }
}