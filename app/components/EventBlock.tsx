import Paper from "material-ui/Paper";
import * as Moment from "moment";
import * as React from "react";
import ITimetableEvent from "../models/ITimetableEvent";
import EventBlockMenu from "./EventBlockMenu";

interface IProps {
    name: string;
    lecturer: string;
    type: string;
    room: string;
    duration: number;
    comment?: string;
    startTime: Moment.Moment;
    onClick(event: ITimetableEvent): void;
}

export default class EventBlock extends React.Component<IProps, {}> {

    public render(): JSX.Element {

        const { startTime, duration } = this.props;
        const style: any = {
            height: 80,
            backgroundColor: "#FFFFFF",
            padding: 10,
            margin: 10,
        };

        return (
            <Paper
                style={style}
                elevation={1}
                onClick={(timetableEvent, event) => this.props.onClick(timetableEvent)}
                {...{} as any}
            >
                <EventBlockMenu
                    name={this.props.name}
                    info="Studentów prosimy o przyniesienie własnych krzeseł na zajęcia."
                    // info=""
                />
                <div className="lectureName-event-block">
                    {this.props.name}
                </div>
                <div className="props-event-block">
                    <span>
                        {this.props.type} {startTime.format("HH:mm")}
                        - {startTime.clone().add(duration, "minutes").format("HH:mm")}
                        <br />
                        <span className="additionalFt-event-block">{this.props.room}</span> - {this.props.lecturer}
                    </span>
                </div>
            </Paper>
        );
    }
}
