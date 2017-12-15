import * as React from "react";

interface IState {
    pinpointCoordinates: { x: number, y: number };
}
export default class FloorPage extends React.Component<{}, IState> {
    private roomCoordinates = {
        room1: { x: 50, y: 20 },
        room2: { x: 150, y: 20 },
        room3: { x: 250, y: 20 },
        room4: { x: 50, y: 125 },
        room5: { x: 250, y: 125 },
    };

    constructor(props: any) {
        super(props);
        this.state = {
            pinpointCoordinates: {
                x: 0,
                y: 0,
            },
        };
    }
    public render(): JSX.Element {
        const style: any = {
            textAlign: "center",
            marginTop: "69px",
        };
        const pointerStyle: any = {
            position: "absolute",
            top: this.state.pinpointCoordinates.y,
            left: this.state.pinpointCoordinates.x,
        };
        return (
            <div style={style}>
                <h1>Plan piętra</h1>
                <select onChange={(e) => this.setPinpointCoordinates(e.target.value)}>
                    <option value="room1">1</option>
                    <option value="room2">2</option>
                    <option value="room3">3</option>
                    <option value="room4">4</option>
                    <option value="room5">5</option>
                </select>
                <div style={{ position: "relative" }}>
                    <div style={pointerStyle}>x</div>
                    <img src="res/img/floor.png" style={{ width: "100%" }} />
                </div>
            </div>
        );
    }
    private setPinpointCoordinates(selection: string): void {
        this.setState({
            pinpointCoordinates: {
                x: this.roomCoordinates[selection].x,
                y: this.roomCoordinates[selection].y,
            },
        });
    }
}
