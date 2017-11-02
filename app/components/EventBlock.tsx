import * as React from "react";
import { TimetableEventType } from "../models/TimetableEventType";

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

    render(): JSX.Element {

        const style: any = {
            height: this.basicBlockHeight * (this.props.duration / 45),
            backgroundColor: "#1E88E5",
            width: "100%",
            position: "relative",
            top: ((this.props.startTime.getHours() * 60 + this.props.startTime.getMinutes()) / 15) * this.basicBlockHeight
        };
        return (
            <div style={style}>
                <h3>{this.props.name}</h3>
                {this.props.lecturer}
                {this.props.room}
            </div>
        );
    }
}