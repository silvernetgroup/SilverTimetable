import * as React from "react";
import Paper from "material-ui/Paper";
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

    render(): JSX.Element {

        let { startTime, duration } = this.props;
        const style: any = {
            height: 80,
            backgroundColor: "#FFFFFF",
            padding: 10,
            margin: 10
        };
        return (
            <Paper style={style} zDepth={1}>
                {this.props.name} <br />
                {this.props.type} {startTime.format("HH:mm")} - {startTime.clone().add(duration, "minutes").format("HH:mm")}<br />
                {this.props.room} - {this.props.lecturer}<br />
            </Paper>
        );
    }
}