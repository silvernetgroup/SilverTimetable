import Paper from "material-ui/Paper";
import * as Moment from "moment";
import * as React from "react";
import ITimetableEvent from "../models/ITimetableEvent";

interface IProps {
    name: string;
    lecturer: string;
    type: string;
    room: string;
    endTime: Moment.Moment;
    remarks?: string;
    startTime: Moment.Moment;
    isFaculty: boolean;
    onClick(event: ITimetableEvent): void;
}

export default class EventBlock extends React.Component<IProps, {}> {

    public render(): JSX.Element {

        const { startTime, endTime } = this.props;
        const style: any = {
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
                <div className="lectureName-event-block">
                    {this.props.name + (this.props.isFaculty ? " (F)" : "")}
                </div>
                <div className="props-event-block">
                    <span>
                        {this.props.type} {startTime.format("HH:mm ")}
                        - {endTime.format("HH:mm")}
                        <br />
                        <span className="additionalFt-event-block">{this.props.room}</span> - {this.props.lecturer}
                    </span>
                </div>
            </Paper>
        );
    }
}
