import * as React from "react";

import { closeFloorPagePin } from "../../actions/index";
import { connect } from "react-redux";
import { IGlobalState } from "../../store/IGlobalState";

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

        const pinStyle: any = {
            width: "18%",
            height: "10%",
            position: "absolute",
            left: FloorCoords.getCoords(this.props.roomNumber).X,
            top: FloorCoords.getCoords(this.props.roomNumber).Y,
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
