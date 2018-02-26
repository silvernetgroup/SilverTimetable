import * as React from "react";

import { closeFloorPagePin } from "../../actions/index";
import { connect } from "react-redux";
import { IGlobalState } from "../../store/IGlobalState";

// import { coordinates } from "../../constants/floorCoords";
import FloorCoords from "../../constants/FloorCoords";

interface IProps {
    floorPageOpen: boolean;
    closeFloorPagePin: any;
    roomNumber?: string;
  }

class FloorPage extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render(): JSX.Element {
        const style: any = {
            position: "relative",
            textAlign: "center",
            marginTop: "69px",
        };
        // tslint:disable-next-line:max-line-length
        // const room: {X: string, Y: string} = this.props.roomNumber !== null ? coordinates[this.props.roomNumber] : {X: "-10%", Y: "-10%"};

        const pinStyle: any = {
            width: "18%",
            height: "10%",
            position: "absolute",
            // tslint:disable-next-line:max-line-length
            left: FloorCoords.getCoords(this.props.roomNumber) !== null ? FloorCoords.getCoords(this.props.roomNumber).X : "-10%",     // X
            // tslint:disable-next-line:max-line-length
            top: FloorCoords.getCoords(this.props.roomNumber) !== null ? FloorCoords.getCoords(this.props.roomNumber).Y : "-10%",
            display: "block",
        };

        if (!this.props.floorPageOpen) {
            return (
                <div id="content" style = {style}>
                    <img src="res/img/floor.png" style={{ width: "100%" }} />
                </div>
            );
        } else {
            return (
                <div id="content" style = {style}>
                    <img src="res/img/floor.png" style={{ width: "100%" }} />
                    <img src="res/img/pin.png" style={pinStyle} />
                </div>
            );
        }
    }
}

const mapStateToProps = (state: IGlobalState) => {
    return {
        floorPageOpen: state.floorPageWithPin.floorPageOpen,
        roomNumber: state.floorPageWithPin.roomNumber,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        closeFloorPagePin: () => dispatch(closeFloorPagePin()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FloorPage);
