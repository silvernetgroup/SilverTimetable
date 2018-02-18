import Paper from "material-ui/Paper";
import * as Moment from "moment";
import * as React from "react";
import ITimetableEvent from "../../models/ITimetableEvent";
import EventBlockMore from "./EventBlockMore";
import { IconButton } from "material-ui";
import { MoreVert } from "material-ui-icons";

interface IProps {
    event: ITimetableEvent;
    order: number;
    onClick(): void;
}

export default class EventBlock extends React.Component<IProps> {

    public render(): JSX.Element {
        const { startTime, endTime } = this.props.event;
        const style: any = {
            backgroundColor: "#FFFFFF",
            padding: 10,
            margin: 10,
        };

        return (
            <Paper
                style={style}
                elevation={1}
                onClick={this.props.onClick}
            >
                <div className="header-event-block">
                    <div className="lectureName-event-block">
                        {this.props.event.name}
                    </div>
                </div>
                <div className="props-event-block">
                    <span>
                        {(this.props.event.isFaculty ? "(F) " : "") + this.props.event.type + " "}
                        {startTime.format("HH:mm ")}
                        - {endTime.format("HH:mm")}
                        <br />
                        <span className="additionalFt-event-block">{this.props.event.room + " "}</span>
                        - {this.props.event.lecturers.join(", ")}
                    </span>
                </div>
            </Paper>
        );
    }
}
