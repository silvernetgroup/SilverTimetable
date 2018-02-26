import * as React from "react";
import ITimetableEvent from "../../models/ITimetableEvent";
import Divider from "material-ui/Divider";
import Drawer from "material-ui/Drawer";
import Typography from "material-ui/Typography";
import List from "material-ui/List";
import LinkListItem from "../navigation/LinkListItem";
import Avatar from "material-ui/Avatar";
import Chip from "material-ui/Chip";
import LecturersPages from "../../services/LecturersPages";

import { IGlobalState } from "../../store/IGlobalState";
import { openFloorPagePin, roomNumberAssign } from "../../actions/index";
import { connect } from "react-redux";

const styles = {
  list: {
    width: 250,
  },
};

interface IProps {
  event: ITimetableEvent;
  lecturerMode: boolean;
  bottomDrawerOpen: boolean;
  closeBottomDrawer: any;

  openFloorPagePin: any;
  roomNumberAssign: any;
  roomNumber?: string;
}

declare let navigator: any;

class EventBlockMore extends React.Component<IProps> {

  public render() {
    if (!this.props.event) {
      return null;
    }
    const { startTime, endTime } = this.props.event;
    const sideList = (
      <div>
        <List>
          <div style={{ marginBottom: 16, marginLeft: 16, marginRight: 16, marginTop: 6 }}>
            <Typography type="headline">{this.props.event.name}</Typography>
            <Typography type="subheading" gutterBottom style={{ color: "#787878" }}>
              {this.uppercaseFirstLetter(this.props.event.type) + " "}
              {startTime.format("HH:mm ")} - {endTime.format("HH:mm")}</Typography>
            {this.renderLecturers()}
            {this.renderRemarks()}
          </div>
          {/* <Divider /> */}
          <div style={{ color: "black", marginTop: 6 }}>
            {/* <LinkListItem
              name="Strona wykładowcy"
              iconName="Public"
              linkPage={null}
              color="black"
              onClick={() => LecturersPages.openLecturersPage(this.props.event)}
            /> */}
            {this.renderRoom()}
          </div>
        </List>
      </div>
    );

    const footerStyle: any = {
      position: "absolute",
      bottom: 0,
      width: "100%",
    };
    return (
      <div>
        <Drawer anchor="bottom" open={this.props.bottomDrawerOpen}
          onClose={(event) => this.props.closeBottomDrawer()}>
          <div
            tabIndex={0}
            role="button"
          // onClick={() => this.props.closeBottomDrawer()}
          // onKeyDown={() => this.props.closeBottomDrawer()}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }

  private renderRoom() {
    let location = "/floor";
    let text = "Budynek " + this.props.event.building + ", ";

    if (this.props.event.room.substring(0, 2) === "Au" || this.props.event.room.substring(0, 2) === "au") {
      text += this.lowercaseFirstLetter(this.props.event.room);
    } else {
      text += "sala " + this.props.event.room;
    }
    if (this.props.event.building !== "34") {
      location = "/";
    }

    if (location === "/"  // wrong building
    || (this.props.event.room.substring(0, 1) !== "3"  // wrong floor
    && ((this.lowercaseFirstLetter(this.props.event.room)).substring(0, 4) === "aula"
        // wrong lecture hall:
        && (this.props.event.room.substring(5, 7) !== "IV"
            && this.props.event.room.substring(5, 7) !== "III")) )) {
              return (
                <div style={{ marginBottom: 16, marginLeft: 16, marginRight: 16, padding: "10px", paddingTop: "0px"}}>
                  <Typography type="subheading">{text}</Typography>
                </div>
              );
            }

    return (
      <LinkListItem
        name={text}
        iconName="Map"
        linkPage={location}
        onClick={() => {
          this.props.openFloorPagePin();
          if (this.props.roomNumber === null) {
            this.props.roomNumberAssign(this.props.event.room);
          }
        }}
        color="black"
      />
    );
  }

  private lowercaseFirstLetter(text): string {
    return text.charAt(0).toLowerCase() + text.slice(1);
  }

  private uppercaseFirstLetter(text): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  private renderRemarks(): JSX.Element {
    if (this.props.event.remarks != null) {
      return (
        <div style={{ marginTop: 12 }}>
          <Typography gutterBottom>{this.props.event.remarks}</Typography>
        </div>
      );
    } else {
      return (<div />);
    }
  }

  private renderLecturers(): JSX.Element {
    if (this.props.lecturerMode) {
      return this.renderOneLecturer(this.props.event.fieldOfStudy, 0);
    }
    const rows = [];
    let key: number = 0;
    for (const item of this.props.event.lecturers) {
      key++;
      rows.push(this.renderOneLecturer(item, key));
    }
    return (
      <div style={{ marginTop: 10 }}>
        {rows}
      </div>
    );
  }

  private renderOneLecturer(name, key) {
    const style = {
      marginBottom: 6,
      marginRight: 6,
    };
    return (
      <Chip
        avatar={<Avatar>{name.split(" ").map((item) => item[0]).join("")}</Avatar>}
        label={name}
        style={style}
        key={key}
      />
    );
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
    openFloorPagePin: () => dispatch(openFloorPagePin()),
    roomNumberAssign: (name) => dispatch(roomNumberAssign(name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventBlockMore);
