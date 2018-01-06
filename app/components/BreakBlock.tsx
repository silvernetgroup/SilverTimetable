import * as Moment from "moment";
import * as React from "react";
import ITimetableEvent from "../models/ITimetableEvent";

interface IProps {
    isStart?: boolean;
    isEnd?: boolean;
    duration?: number;
    startTime?: Moment.Moment;
    key?: number;
}

export default class BreakBlock extends React.Component<IProps> {

    public render(): JSX.Element {
        const style: any = {
            // height: 17,
            display: "flex",
            justifyContent: "center",
            fontWeight: 500,
            color: "rgb(125,125,125)",
            fontSize: 12,
        };
        let text = "";
        if (this.props.isStart) {
            text = "Start " + this.props.startTime.format("HH:mm");
        } else if (this.props.isEnd) {
            text = "Koniec 🎉";
        } else if (this.props.duration < 0) {
            text = "Zajęcia w tym samym czasie";
        } else {
            const tmp = Moment.utc(Moment.duration(this.props.duration, "minutes").asMilliseconds());
            if (tmp.hours() !== 0) {
                text += tmp.hours() + " godz";
            }
            if (tmp.minutes() !== 0) {
                if (text !== "") {
                    text += " ";
                }
                text += tmp.minutes() + " min";
            }
            if (tmp.hours() === 0 && tmp.minutes() === 0) {
                text = "brak";
            }
            if (this.props.duration >= 0) {
                text += " przerwy";
            }
        }

        if (this.props.isStart) {
            style.marginTop = 8;
        }
        if (this.props.isEnd) {
            style.paddingBottom = 10;
        }

        return (
            <div style={style}>
                {text}
            </div>
        );
    }
}
