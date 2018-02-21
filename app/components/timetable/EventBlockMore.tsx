import * as React from "react";
import ITimetableEvent from "../../models/ITimetableEvent";
import Divider from "material-ui/Divider";
import Drawer from "material-ui/Drawer";
import Typography from "material-ui/Typography";
import List from "material-ui/List";
import LinkListItem from "../navigation/LinkListItem";
import Avatar from "material-ui/Avatar";
import Chip from "material-ui/Chip";
import { Swipeable } from "react-touch";
import LecturersPages from "../../services/LecturersPages";

const styles = {
  list: {
    width: 250,
  },
};

interface IProps {
  event: ITimetableEvent;
  bottomDrawerOpen: boolean;
  closeBottomDrawer: any;
}

declare let navigator: any;

export default class EventBlockMore extends React.Component<IProps> {

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
      <Swipeable onSwipeDown={this.props.closeBottomDrawer}>
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
      </Swipeable>
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

    return (
      <LinkListItem
        name={text}
        iconName="Map"
        linkPage={location}
        onClick={() => this.props.closeBottomDrawer()}
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
