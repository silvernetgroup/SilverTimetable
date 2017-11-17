import * as React from "react";
import * as Moment from "moment";
import ITimetableEvent from "../models/ITimetableEvent";
//import { duration } from "material-ui/styles/transitions";

interface IProps {
    //key: number;
    isStart: boolean;
    isEnd: boolean;
    duration: number
    startTime?: Moment.Moment;
}

interface IState {

}

export default class BreakBlock extends React.Component<IProps, IState> {

    render(): JSX.Element {
        const style: any = {
            height: 17,
            bottom: 2,
            padding: 0,
            margin: 0,
            display: 'flex',
            justifyContent: 'center',
            fontWeight: 'bold',
            color: 'rgb(125,125,125)', //'rgb(74,74,74)'
            fontSize: 15
        };
        var text = "";
        if(this.props.isStart)
            text = "Start " + this.props.startTime.format("HH:mm");
        else if(this.props.isEnd)
            text = "Koniec 🎉";
        else{
            var tmp = Moment.utc(Moment.duration(this.props.duration,'minutes').asMilliseconds());
            //if(tmp === "00:00")
                //text = "⚠  " + tmp + "  ⚠";
            //else
                //text = "🕛  " + tmp + "  🕛";
            if(tmp.hours() !== 0)
                text += tmp.hours() + " godz " 
            if(tmp.minutes() !== 0)
                text += tmp.minutes() + " min";
            if(tmp.hours() === 0 && tmp.minutes() === 0)
                text = "brak";
            text += " przerwy";
        }

        return (
            <div style={style}>
               {text}<br />
           </div>
        );
    }
}