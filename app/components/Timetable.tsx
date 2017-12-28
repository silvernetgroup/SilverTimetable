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
    defaultDay?: string;
    defaultGroup?: string;
    onEventBlockClick(event: ITimetableEvent): void;
}

interface IState {
    selectedDay: string;
    selectedGroup: number;
}

export default class Timetable extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        const groupNamesSet: Set<string> = this.generateGroupNamesSet(props.data, props.filters);
        this.state = {
            selectedDay: props.defaultDay || "PN",
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
                    >
                        {this.renderDayTabs(this.props.filters.mode)}
                    </Tabs>
                </AppBar>
                {this.renderDayTab(this.props.data, this.props.filters, this.state.selectedDay)}
            </div>
        );
    }

    private renderDayTabs(mode: string): JSX.Element[] {
        if (mode === "Stacjonarne") {
            return [
                <Tab label="Pn" style={{ minWidth: 50 }} key="Pn" />,
                <Tab label="Wt" style={{ minWidth: 50 }} key="Wt" />,
                <Tab label="Śr" style={{ minWidth: 50 }} key="Sr" />,
                <Tab label="Czw" style={{ minWidth: 50 }} key="Cz" />,
                <Tab label="Pt" style={{ minWidth: 50 }} key="Pt" />,
            ];
        } else {
            return [
                <Tab label="Pt" style={{ minWidth: 50 }} key="Pt" />,
                <Tab label="So" style={{ minWidth: 50 }} key="So" />,
                <Tab label="Nd" style={{ minWidth: 50 }} key="Nie" />,
            ];
        }
    }

    private generateGroupNamesSet(data: ITimetable, filters: ITimetableFilters): Set<string> {

        const groupNames: string[] = [];

        data.events.filter((obj) =>
            obj.degree === filters.degree
            && obj.department === filters.department
            && obj.fieldOfStudy === filters.fieldOfStudy
            && obj.mode === filters.mode
            && obj.semester === filters.semester
            && obj.specialization === filters.specialization)
            .forEach((event) => {
                groupNames.push(event.specialization || event.group.toString());
            });

        return new Set(groupNames);
    }

    private saveCurrentGroup() {
        const temp = config.get();
        temp.group = this.state.selectedGroup;
        config.set(temp);
    }

    private renderDayTab(data: ITimetable, filters: ITimetableFilters, selectedDay: string): JSX.Element {

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
                    {this.renderEventBlocks(data, filters, selectedDay, this.state.selectedGroup)}
                </div>
            </div >

        );
    }

    private renderEventBlocks(data: ITimetable, filters: ITimetableFilters,
                              dayOfWeek: string, group: number): JSX.Element[] {

        return data
            .events
            .filter((obj) => obj.group === group
                && obj.dayOfWeek === dayOfWeek
                && obj.degree === filters.degree
                && obj.department === filters.department
                && obj.fieldOfStudy === filters.fieldOfStudy
                && obj.mode === filters.mode
                && obj.semester === filters.semester
                && obj.specialization === filters.specialization || !filters.specialization)
            .map((event, index, array) => {
                let duration;
                if (index + 1 < array.length) {
                    const nextEventStartTime = array[index + 1].startTime.get("minutes")
                        + array[index + 1].startTime.get("hours") * 60;
                    const currentEventEndTime = event.endTime.get("minutes")
                        + event.startTime.get("hours") * 60;
                    duration = nextEventStartTime - currentEventEndTime;
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
                                endTime={event.endTime}
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
                                    endTime={event.endTime}
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
                                    endTime={event.endTime}
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
                                    endTime={event.endTime}
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
