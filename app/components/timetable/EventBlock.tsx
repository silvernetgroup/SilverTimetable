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
    lecturerMode: boolean;
    onClick(): void;
}

const EventBlock = (props: IProps) => {

    const { startTime, endTime } = props.event;
    const style: any = {
        backgroundColor: "#FFFFFF",
        padding: 10,
        margin: 10,
    };

    return (
        <Paper
            style={style}
            elevation={1}
            onClick={props.event.lecturers === null || props.event.building === null || props.event.room === null
                ? null : props.onClick}
        >
            <div className="header-event-block">
                <div className="lectureName-event-block">
                    {props.event.name}
                </div>
            </div>
            <div className="props-event-block">
                <span>
                    {(props.event.isFaculty ? "(F) " : "") + props.event.type + " "}
                    {startTime.format("HH:mm ")}
                    - {endTime.format("HH:mm")}
                    <br />
                    {props.lecturerMode
                        ? <>
                            {props.event.room.substr(0, 2) === "Au" || props.event.room.substr(0, 2) === "au"
                            ? "" : "sala"} <span className="additionalFt-event-block">
                            {props.event.room + ((props.event.department === "WZIM"
                                || props.event.department === "WZIiM")
                                && props.event.building !== "34" && props.event.building !== null
                                ? ", b." + props.event.building + " " : " ")}</span> <br/>
                            {props.event.fieldOfStudy} rok {props.event.year} {props.event.degree} <br />
                            {(props.event.groups !== null && props.event.groups.length > 1) ? <>
                            grupy: {props.event.groups.join(", ")} </>
                            : <> grupa: {props.event.specialization || props.event.group} </> }
                        </>
                        : <>
                            <span className="additionalFt-event-block">
                                {props.event.room + ((props.event.department === "WZIM"
                                || props.event.department === "WZIiM")
                                && props.event.building !== "34" && props.event.building !== null
                                ? ", b." + props.event.building + " " : " ")}
                            </span>
                            {props.event.lecturers[0] !== "" ? <> - {props.event.lecturers.join(", ")} </> : ""}
                        </>
                    }
                </span>
            </div>
        </Paper>
    );
};

export default EventBlock;
