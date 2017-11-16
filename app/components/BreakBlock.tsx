import * as React from "react";
import * as Moment from "moment";
import ITimetableEvent from "../models/ITimetableEvent";

interface IProps {
    duration: Moment.Moment;
}

interface IState {

}

export default class EventBlock extends React.Component<IProps, IState> {

    render(): JSX.Element {
        const style: any = {
            height: 20,
            padding: 10,
            margin: 10,
            display: 'flex',
            justifyContent: 'center'
        };


        return (
            <div style={style}>
                {this.props.duration.format("HH:mm")} minut przerwy<br />
            </div>
        );
    }
}