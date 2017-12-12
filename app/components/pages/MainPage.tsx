import axios from "axios";
import * as Moment from "moment";
import * as React from "react";
import ITimetable from "../../models/ITimetable";
import ITimetableEvent from "../../models/ITimetableEvent";
import ITimetableFilters from "../../models/ITimetableFilters";
import LecturersPages from "../LecturersPages";
import Timetable from "../Timetable";

interface IProps {
    data: ITimetable;
}

interface IState {
    schedule: ITimetable;
}

export default class MainPage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            schedule: this.props.data,
        };
    }

    public componentWillMount() {
        this.getData();
    }

    public getData = () => {
        // tslint:disable-next-line:max-line-length
        axios.get("https://gist.githubusercontent.com/michaelspace/b998f5d5a29e0124bf9c5701a5a1c19e/raw/fb86b48e5ed154c4ce1d6458f9d1c29458e479ad/plan.json")
            .then( (response) => {
                this.setState({schedule: response.data});
                console.log("SUCCESS");
            })
            .catch( (error) => {
               console.log("FAILED TO FETCH DATA ", error);
            });
    }

    public render(): JSX.Element {
        //const {schedule}: any = this.state;

        const data: ITimetable = this.state.schedule;

       // console.log("pies");
       // console.log(this.state.schedule && data.creationDate);
       // console.log("pies");

        const filters: ITimetableFilters = {
            fieldOfStudy: "Informatyka",
            degree: "I - inżynierskie",
            mode: "Niestacjonarne",
            semester: 1,
            turnus: "B",
        };
        return (
            <div className="main-page-container">
                <h1 style={{ margin: 0 }}>Plan zajęć</h1>
                {this.state.schedule &&
                <Timetable
                    data={data}
                    filters={filters}
                    // defaultDay={3}
                    // defaultGroup="3"
                    onEventBlockClick={(event) => this.handleEventBlockClick(event)}
                />}
            </div>
        );
    }

    private handleEventBlockClick = (event: ITimetableEvent): void => {
        LecturersPages.openLecturersPage(event);
    }
}
