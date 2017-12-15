import AppBar from "material-ui/AppBar";
import Tabs, { Tab } from "material-ui/Tabs";
import * as React from "react";
import ITimetable from "../models/ITimetable";
import ITimetableEvent from "../models/ITimetableEvent";
import ITimetableFilters from "../models/ITimetableFilters";
import BreakBlock from "./BreakBlock";
import EventBlock from "./EventBlock";

// Config
import * as config from "react-global-configuration";

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

        const groupNamesSet: Set<string> = this.generateGroupNamesSet(props.data, props.filters);
        this.state = {
            selectedDay: props.defaultDay || 0,
            selectedGroup: config.get("group"),
        };
    }

    public render(): JSX.Element {
        return (
            <div className="timetable-container">
                <AppBar style={{ position: "relative", color: "white" }}>
                    <Tabs
                        value={this.state.selectedDay}
                        onChange={this.handleDayChange}
                        scrollable
                        fullWidth
                        {...{} as any}
                    >
                        {/*Temp minWidth implementation, will be cleaned-up when other tasks completion*/}
                        <Tab label="Pn" style={{minWidth: 50}}/>
                        <Tab label="Wt" style={{minWidth: 50}}/>
                        <Tab label="Śr" style={{minWidth: 50}}/>
                        <Tab label="Czw" style={{minWidth: 50}}/>
                        <Tab label="Pt" style={{minWidth: 50}}/>
                    </Tabs>
                </AppBar>
                {this.renderDayTab(this.props.data, this.props.filters, this.state.selectedDay)}
            </div>
        );
    }

    private filterIndexes(data: ITimetable, filters: ITimetableFilters): {
        fieldOfStudyIndex: number,
        degreeIndex: number,
        modeIndex: number,
        semesterIndex: number,
    } {

        const { fieldOfStudy, degree, mode, semester, turnus } = filters;

        const fieldOfStudyIndex: number = data.fieldsOfStudy.findIndex((f) => f.name === fieldOfStudy);
        const degreeIndex: number = data.fieldsOfStudy[fieldOfStudyIndex].degrees.findIndex((d) => d.name === degree);
        const modeIndex: number = data
            .fieldsOfStudy[fieldOfStudyIndex]
            .degrees[degreeIndex]
            .modes
            .findIndex((m) => m.name === mode);

        let semesterIndex: number;

        if (turnus !== undefined && mode === "Niestacjonarne") {
            semesterIndex = data
                .fieldsOfStudy[fieldOfStudyIndex]
                .degrees[degreeIndex]
                .modes[modeIndex]
                .semesters.findIndex((s) => s.number === semester && s.turnus === turnus);
        } else {
            semesterIndex = data
                .fieldsOfStudy[fieldOfStudyIndex]
                .degrees[degreeIndex]
                .modes[modeIndex]
                .semesters.findIndex((s) => s.number === semester);
        }

        return (
            {
                fieldOfStudyIndex,
                degreeIndex,
                modeIndex,
                semesterIndex,
            }
        );
    }

    private generateGroupNamesSet(data: ITimetable, filters: ITimetableFilters): Set<string> {

        const {
            fieldOfStudyIndex,
            degreeIndex,
            modeIndex,
            semesterIndex,
        } = this.filterIndexes(data, filters);

        const groupNames: string[] = [];

        data
            .fieldsOfStudy[fieldOfStudyIndex]
            .degrees[degreeIndex]
            .modes[modeIndex]
            .semesters[semesterIndex]
            .days
            .forEach((day) => {
                day.events.forEach((event) => {
                    groupNames.push(...event.groups);
                });
            });

        return new Set(groupNames);
    }

    private saveCurrentGroup() {
        const temp = config.get();
        temp.group = this.state.selectedGroup;
        config.set(temp);
    }

    private renderDayTab(data: ITimetable, filters: ITimetableFilters, selectedDayIndex: number): JSX.Element {

        const groupNamesSet: Set<string> = this.generateGroupNamesSet(data, filters);

        return (
            <div style={{ display: "flex", flexDirection: "column" }}>
                {config.get("showGroupChange") === true &&
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
                }
                {this.saveCurrentGroup()}
                <div className="event-blocks-container">
                    {this.renderEventBlocks(data, filters, selectedDayIndex, this.state.selectedGroup)}
                </div>
            </div >

        );
    }

    private renderEventBlocks(data: ITimetable, filters: ITimetableFilters,
                              dayIndex: number, group: string): JSX.Element[] {

        const {
                fieldOfStudyIndex,
            degreeIndex,
            modeIndex,
            semesterIndex,
        } = this.filterIndexes(data, filters);

        return data
            .fieldsOfStudy[fieldOfStudyIndex]
            .degrees[degreeIndex]
            .modes[modeIndex]
            .semesters[semesterIndex]
            .days[dayIndex]
            .events
            .filter((obj) => obj.groups.indexOf(group) !== -1)
            .map((event, index, array) => {
                let duration;
                if (index + 1 < array.length) {
                    const nextEventStartTime = array[index + 1].startTime.get("minutes")
                        + array[index + 1].startTime.get("hours") * 60;
                    const currentEventStartTime = event.startTime.get("minutes")
                        + event.startTime.get("hours") * 60;
                    duration = nextEventStartTime - currentEventStartTime - event.duration;
                } else {
                    duration = 0;
                }
                if (array.length < 2) {
                    return (
                        <div key={index}>
                            <BreakBlock
                                isStart={true}
                                isEnd={false}
                                duration={0}
                                startTime={event.startTime} />
                            <EventBlock
                                name={event.name}
                                lecturer={event.lecturer}
                                type={event.type}
                                room={event.room}
                                duration={event.duration}
                                startTime={event.startTime}
                                onClick={() => this.props.onEventBlockClick(event)} />
                            <BreakBlock
                                isStart={false}
                                isEnd={true}
                                duration={duration} />
                        </div>
                    );
                } else {
                    if (index === 0) {
                        return (
                            <div key={index}>
                                <BreakBlock
                                    isStart={true}
                                    isEnd={false}
                                    duration={0}
                                    startTime={event.startTime} />
                                <EventBlock
                                    name={event.name}
                                    lecturer={event.lecturer}
                                    type={event.type}
                                    room={event.room}
                                    duration={event.duration}
                                    startTime={event.startTime}
                                    onClick={() => this.props.onEventBlockClick(event)} />
                                <BreakBlock
                                    isStart={false}
                                    isEnd={false}
                                    duration={duration} />
                            </div>
                        );
                    } else if (index === array.length - 1) {
                        return (
                            <div key={index}>
                                <EventBlock
                                    name={event.name}
                                    lecturer={event.lecturer}
                                    type={event.type}
                                    room={event.room}
                                    duration={event.duration}
                                    startTime={event.startTime}
                                    onClick={() => this.props.onEventBlockClick(event)} />
                                <BreakBlock
                                    isStart={false}
                                    isEnd={true}
                                    duration={duration} />
                            </div>
                        );
                    } else {
                        return (
                            <div key={index}>
                                <EventBlock
                                    name={event.name}
                                    lecturer={event.lecturer}
                                    type={event.type}
                                    room={event.room}
                                    duration={event.duration}
                                    startTime={event.startTime}
                                    onClick={() => this.props.onEventBlockClick(event)} />
                                <BreakBlock
                                    isStart={false}
                                    isEnd={false}
                                    duration={duration} />
                            </div>
                        );
                    }
                }
            });
    }

    private handleDayChange = (event: any, value: any) => {
        this.setState({ selectedDay: value });
    }

    private handleGroupChange = (event: any, value: any) => {
        this.setState({ selectedGroup: value });
    }
}
