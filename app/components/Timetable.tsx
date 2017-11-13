import * as React from "react";
import ITimetable from "../models/ITimetable";
import ITimetableFilters from "../models/ITimetableFilters";
import Tabs, { Tab } from "material-ui/Tabs";
import EventBlock from "./EventBlock";
import AppBar from "material-ui/AppBar";
import ITimetableEvent from "../models/ITimetableEvent";

interface IProps {
    data: ITimetable;
    filters: ITimetableFilters;
    defaultDay?: number;
    defaultGroup?: string;
    onEventBlockClick(event: ITimetableEvent): void;
}

interface IState {
    selectedDay: number;
    selectedGroup: string;
}

export default class Timetable extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        let groupNamesSet: Set<string> = this.generateGroupNamesSet(props.data, props.filters);

        this.state = {
            selectedDay: props.defaultDay||0,
            selectedGroup: props.defaultGroup||Array.from(groupNamesSet).sort()[0]
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

    generateGroupNamesSet(data: ITimetable, filters: ITimetableFilters): Set<string> {

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

        return new Set(groupNames);
    }

    renderDayTab(data: ITimetable, filters: ITimetableFilters, selectedDayIndex: number): JSX.Element {

        let groupNamesSet: Set<string> = this.generateGroupNamesSet(data, filters);

        return (
            <div style={{ display: "flex", flexDirection: "column" }}>
                <AppBar style={{ position: "relative", background: "#00BCD4", color: "white" }}>
                    <Tabs
                        value={this.state.selectedGroup}
                        onChange={this.handleGroupChange}
                        fullWidth
                        scrollable
                        {...{} as any}
                    >
                        {
                            Array.from(groupNamesSet).sort().map((group) => {
                                return (
                                    <Tab label={group} key={group} value={group} />
                                );
                            })
                        }
                    </Tabs>
                </AppBar>

                <div className="event-blocks-container">
                    {this.renderEventBlocks(data, filters, selectedDayIndex, this.state.selectedGroup)}
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
                        startTime={event.startTime}
                        onClick={() => this.props.onEventBlockClick(event)} />
                );
            });
    }

    handleDayChange = (event: any, value: any) => {
        this.setState({ selectedDay: value });
    }

    handleGroupChange = (event: any, value: any) => {
        this.setState({ selectedGroup: value });
    }

    render(): JSX.Element {
        return (
            <div className="timetable-container">
                <AppBar style={{ position: "relative", background: "#00BCD4", color: "white" }}>
                    <Tabs
                        value={this.state.selectedDay}
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
                {this.renderDayTab(this.props.data, this.props.filters, this.state.selectedDay)}
            </div>
        );
    }
}