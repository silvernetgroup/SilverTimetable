import * as React from "react";
import Paper from "material-ui/Paper";
import * as Colors from "material-ui/styles/colors";
import * as Moment from "moment";

interface IProps {
    name: string;
    lecturer: string;
    type: string;
    room: string;
    duration: number;
    comment?: string;
    startTime: Moment.Moment;
}

interface IState {

}

export default class EventBlock extends React.Component<IProps, IState> {

    basicBlockHeight: number = 35; // 15 minut

    getBgColor(eventType: string): string {
        switch (eventType) {
            case "ćwiczenia":
                return Colors.yellow500;
            case "fakultet":
                return Colors.blue500;
            case "laboratorium":
                return Colors.deepOrange100;
            case "wykład":
                return Colors.lightGreenA100;
            case "inny":
                return Colors.deepOrange400;
        }
    }

    render(): JSX.Element {

        let { startTime, duration } = this.props;
        const style: any = {
            height: this.basicBlockHeight * (duration / 15),
            backgroundColor: this.getBgColor(this.props.type),
            width: "100%",
            position: "absolute",
            top: ((startTime.hours() * 60 + startTime.minutes() - 480) / 15) * this.basicBlockHeight,
            borderRadius: 20,
            paddingLeft: 10
        };
        return (
            <Paper style={style} zDepth={2}>
                <h2>{this.props.name}</h2>
                <h3>{startTime.format("HH:mm")} - {startTime.clone().add(duration, "minutes").format("HH:mm")}</h3>
                <h3>{this.props.type}</h3>
                <p>{this.props.lecturer}</p>
                <p>{this.props.room}</p>
            </Paper>
        );
    }
}