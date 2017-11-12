import * as React from "react";
import ITimetable from "../models/ITimetable";
import ITimetableFilters from "../models/ITimetableFilters";
import Tabs, { Tab } from "material-ui/Tabs";
import EventBlock from "./EventBlock";
import AppBar from "material-ui/AppBar";

interface IProps {
    data: ITimetable;
    filters: ITimetableFilters;
}

interface IState {
    selectedDayIndex: number;
    selectedGroupIndex: number;
}

export default class Timetable extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            selectedDayIndex: 0,
            selectedGroupIndex: 0
        };
    }

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

    renderDayTab(data: ITimetable, filters: ITimetableFilters, selectedDayIndex: number): JSX.Element {

        let {
            fieldOfStudyIndex,
            degreeIndex,
            modeIndex,
            semesterIndex
        } = this.filterIndexes(data, filters);

        let groupNames: string[] = [];

        data.fieldsOfStudy[fieldOfStudyIndex].degrees[degreeIndex].modes[modeIndex].semesters[semesterIndex].days.forEach(day => {
            day.events.forEach(event => {
                groupNames.push(...event.groups);
            });
        });

        let groupNamesSet: Set<string> = new Set(groupNames);

        return (
            <div style={{ display: "flex", flexDirection: "column" }}>
                <AppBar style={{ position: "relative", background: "#00BCD4", color: "white" }}>
                    <Tabs
                        value={this.state.selectedGroupIndex}
                        onChange={this.handleGroupChange}
                        fullWidth
                        scrollable
                        {...{} as any}
                    >
                        {
                            Array.from(groupNamesSet).map((group) => {
                                return (
                                    <Tab label={group} key={group} />
                                );
                            })
                        }
                    </Tabs>
                </AppBar>

                <div className="event-blocks-container">
                    {this.renderEventBlocks(data, filters, selectedDayIndex, groupNames[this.state.selectedGroupIndex])}
                </div>
            </div >

        );
    }

    renderEventBlocks(data: ITimetable, filters: ITimetableFilters, dayIndex: number, group: string): JSX.Element[] {

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

    handleDayChange = (event: any, value: any) => {
        this.setState({ selectedDayIndex: value });
    }

    handleGroupChange = (event: any, value: any) => {
        this.setState({ selectedGroupIndex: value });
    }

    render(): JSX.Element {
        return (
            <div className="timetable-container">
                <AppBar style={{ position: "relative", background: "#00BCD4", color: "white" }}>
                    <Tabs
                        value={this.state.selectedDayIndex}
                        onChange={this.handleDayChange}
                        scrollable
                        fullWidth
                        {...{} as any}
                    >
                        <Tab label="Pn" />
                        <Tab label="Wt" />
                        <Tab label="Śr" />
                        <Tab label="Czw" />
                        <Tab label="Pt" />
                    </Tabs>
                </AppBar>
                {this.renderDayTab(this.props.data, this.props.filters, this.state.selectedDayIndex)}
            </div>
        );
    }
}