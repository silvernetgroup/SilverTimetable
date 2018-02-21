import AppBar from "material-ui/AppBar";
import Tabs, { Tab } from "material-ui/Tabs";
import * as React from "react";
import ITimetable from "../../models/ITimetable";
import ITimetableEvent from "../../models/ITimetableEvent";
import ITimetableFilters from "../../models/ITimetableFilters";
import BreakBlock from "./BreakBlock";
import EventBlock from "./EventBlock";
import Button from "material-ui/Button";
import { NavLink } from "react-router-dom";
import Typography from "material-ui/Typography";
import EventBlockMore from "./EventBlockMore";
import SwipeableViews from "react-swipeable-views";
import { ChangeEvent } from "react";

interface IProps {
    data: ITimetable;
    filters: ITimetableFilters;
    selectedDay: number;
    selectedEvent: ITimetableEvent;
    bottomDrawerOpen: boolean;
    quickGroupChangeAllowed: boolean;
    handleGroupChange: any;
    onDayChange: any;
    onBottomDrawerClose: any;
    onEventBlockClick(event: ITimetableEvent): void;
}

interface IGroupNumberNamePair {
    number: number;
    name: string;
}

export default class Timetable extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
        // this.state = {
        //     selectedDay: props.selectedDay || 0,
        //     // selectedGroup: config.get("filters").group || groupNames[0],
        //     // selectedEvent: null,
        // };
        const groupNames = this.generateGroupNames(props.data, props.filters);
    }

    public render(): JSX.Element {
        if (!this.props.filters.mode || !this.ensureFilteredValuesExist(this.props.filters, this.props.data)) {
            return (
                <div style={{ width: 290, margin: "30% auto auto auto", textAlign: "center" }}>
                    <img src="res/img/unknown.png" style={{ width: 155, margin: "0 auto" }} />
                    <Typography type="subheading" style={{ marginBottom: 10 }}>
                        Aby zobaczyć plan zajęć proszę spersonalizować ustawienia
                </Typography>
                    <NavLink to="/settings" style={{ height: "100%", textAlign: "center", textDecoration: "none" }}>
                        <Button raised>Ustaw filtry planu</Button>
                    </NavLink>
                </div>
            );
        }

        return (
            <div className="timetable-container">
                <AppBar style={{ position: "relative", color: "white" }}>
                    <Tabs
                        value={this.props.selectedDay + 1}
                        onChange={(event: object, value: number) => {this.props.onDayChange(event, value - 1); }}
                        scrollable
                        fullWidth
                        >
                        {this.renderDayTabs(this.props.filters.mode)}
                    </Tabs>
                </AppBar>
                    <SwipeableViews
                        index={this.props.selectedDay}
                        onChangeIndex={(index, fromIndex) => {this.props.onDayChange(null, index); }}
                    >
                        {this.renderAllDaysTabs(this.props.data, this.props.filters)}
                    </SwipeableViews>
                <EventBlockMore
                    event={this.props.selectedEvent}
                    closeBottomDrawer={this.props.onBottomDrawerClose}
                    bottomDrawerOpen={this.props.bottomDrawerOpen}
                    />
            </div>
        );
    }

    private ensureFilteredValuesExist(filters: ITimetableFilters, timetable: ITimetable): boolean {
        return Object.keys(filters).every((key) => timetable.events.some((event) => event[key] === filters[key]
        || ((key === "group") && event.specialization === filters.group)
            || (!filters.group && this.props.quickGroupChangeAllowed)));
    }

    private renderDayTabs(mode: string): JSX.Element[] {
        if (mode === "Stacjonarne") {
            return [
                <Tab label="Pn" style={{ minWidth: 50 }} key="Pn" value={1} />,
                <Tab label="Wt" style={{ minWidth: 50 }} key="Wt" value={2} />,
                <Tab label="Śr" style={{ minWidth: 50 }} key="Sr" value={3} />,
                <Tab label="Czw" style={{ minWidth: 50 }} key="Cz" value={4} />,
                <Tab label="Pt" style={{ minWidth: 50 }} key="Pt" value={5} />,
            ];
        } else {
            return [
                <Tab label="Pt" style={{ minWidth: 50 }} key="Pt" value={5} />,
                <Tab label="So" style={{ minWidth: 50 }} key="So" value={6} />,
                <Tab label="Nd" style={{ minWidth: 50 }} key="Nie" value={7} />,
            ];
        }
    }

    private generateGroupNames(data: ITimetable, filters: ITimetableFilters): any {

        const groupNamesSet: Set<string> = new Set<string>();

        data.events.filter((obj) =>
            obj.degree === filters.degree
            && obj.department === filters.department
            && obj.fieldOfStudy === filters.fieldOfStudy
            && obj.mode === filters.mode
            && obj.semester === filters.semester)
            .forEach((event) => {
                groupNamesSet.add(event.specialization || event.group.toString());
            });

        return [...groupNamesSet].sort();
    }

    // private saveCurrentGroup() {
    //     const temp = config.get();
    //     temp.filters.group = this.props.selectedGroup;
    //     config.set(temp);
    // }
    private renderAllDaysTabs(data: ITimetable, filters: ITimetableFilters): JSX.Element[] {
        if (filters.mode === "Stacjonarne") {
            return [
                this.renderDayTab(data, filters, 1),
                this.renderDayTab(data, filters, 2),
                this.renderDayTab(data, filters, 3),
                this.renderDayTab(data, filters, 4),
                this.renderDayTab(data, filters, 5),
            ];
        } else {
            return [
                this.renderDayTab(data, filters, 5),
                this.renderDayTab(data, filters, 6),
                this.renderDayTab(data, filters, 7),
            ];
        }
    }

    private renderDayTab(data: ITimetable, filters: ITimetableFilters, selectedDay: number): JSX.Element {

        const groupNames: string[] = this.generateGroupNames(data, filters);

        return (
            <div style={{ display: "flex", flexDirection: "column" }}>
                {this.props.quickGroupChangeAllowed &&
                    <AppBar style={{ position: "relative", background: "#00BCD4", color: "white" }}>
                        <Tabs
                            value={this.props.filters.group}
                            onChange={(event, value) => this.props.handleGroupChange(value)}
                            fullWidth
                            scrollable
                            {...{} as any}
                        >
                            {
                                groupNames.map((name) => {
                                    return (
                                        <Tab
                                            label={name}
                                            key={name}
                                            value={name}
                                        />
                                    );
                                })
                            }
                        </Tabs>
                    </AppBar>
                }
                {/* {this.saveCurrentGroup()} */}
                <div className="event-blocks-container">
                    {this.renderEventBlocks(data, filters, selectedDay, this.props.filters.group)}
                </div>
            </div >

        );
    }

    private renderEventBlocks(
        data: ITimetable, filters: ITimetableFilters,
        dayOfWeek: number, group: string): JSX.Element[] {

        const dayNames: any = {
            1: "PN",
            2: "WT",
            3: "ŚR",
            4: "CZW",
            5: "PT",
            6: "SO",
            7: "NIE",
        };

        const result =
            data
                .events
                .filter((obj) => (obj.group.toString() === group || obj.specialization === group)
                    && obj.dayOfWeek === dayNames[dayOfWeek]
                    && obj.degree === filters.degree
                    && obj.department === filters.department
                    && obj.fieldOfStudy === filters.fieldOfStudy
                    && obj.mode === filters.mode
                    && obj.semester === filters.semester
                    && obj.academicYear === filters.academicYear);

        result.sort((a, b) => a.startTime.isAfter(b.startTime) ? 1 : -1); // na wypadek gdyby dane nie były posortowane

        const elements: JSX.Element[] = result.length
            ? [(<BreakBlock isStart startTime={result[0].startTime} key={0} />)]
            : [];

        result.forEach((event, index) => elements.push(
            <React.Fragment key={index + 1}>
                <EventBlock
                    event={event}
                    onClick={() => this.props.onEventBlockClick(event)}
                    order={index + 1}
                />
                {index + 1 < result.length &&
                    <BreakBlock duration={result[index + 1].startTime.diff(event.endTime, "minutes")} />
                }
            </React.Fragment>,
        ));

        if (result.length) {
            elements.push(<BreakBlock isEnd key={result.length + 1} />);
        }

        return elements;
    }
}
