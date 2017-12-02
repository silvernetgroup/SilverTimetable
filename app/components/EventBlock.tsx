import Paper from "material-ui/Paper";
import * as Moment from "moment";
import * as React from "react";
import ITimetableEvent from "../models/ITimetableEvent";

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
                {this.props.name} <br />
                {this.props.type} {startTime.format("HH:mm")}
                - {startTime.clone().add(duration, "minutes").format("HH:mm")}<br />
                {this.props.room} - {this.props.lecturer}<br />
            </Paper>
        );
    }
}
