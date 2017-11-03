import * as React from "react";
import { TimetableEventType } from "../models/TimetableEventType";
import Paper from "material-ui/Paper";
import * as Colors from "material-ui/styles/colors";

interface IProps {
    name: string;
    lecturer: string;
    type: TimetableEventType;
    room: string;
    duration: number;
    comment?: string;
    startTime: Date;
}

interface IState {

}

export default class EventBlock extends React.Component<IProps, IState> {

    basicBlockHeight: number = 100; // 45 minut

    getBgColor(eventType: TimetableEventType): string {
        switch (eventType) {
            case TimetableEventType.activities:
                return Colors.yellow500;
            case TimetableEventType.faculty:
                return Colors.blue500;
            case TimetableEventType.laboratory:
                return Colors.deepOrange100;
            case TimetableEventType.lecture:
                return Colors.lightGreenA100;
            case TimetableEventType.other:
                return Colors.deepOrange400;
        }
    }

    render(): JSX.Element {

        const style: any = {
            height: this.basicBlockHeight * (this.props.duration / 45),
            backgroundColor: this.getBgColor(this.props.type),
            width: "100%",
            position: "relative",
            top: ((this.props.startTime.getHours() * 60 + this.props.startTime.getMinutes()) / 15) * this.basicBlockHeight
        };
        return (
            <Paper style={style} zDepth={3}>
                <h3>{this.props.name}</h3>
                {this.props.lecturer}
                {this.props.room}
            </Paper>
        );
    }
}