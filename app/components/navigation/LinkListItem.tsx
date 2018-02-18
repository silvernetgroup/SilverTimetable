import * as React from "react";
import ITimetableEvent from "../../models/ITimetableEvent";

import { NavLink } from "react-router-dom";

// material UI
import {
  ListItem,
  ListItemIcon,
  ListItemText,
} from "material-ui/List";

import { Event, Settings, Map, Info, Public } from "material-ui-icons";

interface IProps {
  name: string;
  iconName: string;
  linkPage?: string;
  color?: string;
  onClick?(event: ITimetableEvent): void;
}

const style: any = {
  width: "100%",
};

const padding: any = {
  padding: "16px",
  paddingTop: "0px",
};
// tslint:disable:object-literal-shorthand
export default class LinkListItem extends React.Component<IProps> {

  public render(): JSX.Element {
    const icons = {
      Map: Map,
      Info: Info,
      Event: Event,
      Settings: Settings,
      Public: Public,
    };
    const Icon = icons[this.props.iconName];
    if (this.props.linkPage === null) {
      return (
        <div>
          <ListItem
            button
            onClick={(timetableEvent, event) => this.props.onClick(timetableEvent)}
            {...{} as any}
            style={{ color: this.props.color }}
          >
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            <ListItemText primary={this.props.name} />
          </ListItem>
        </div>
      );
    } else {
      return (
        <div>
          <NavLink to={this.props.linkPage}
            style={{ textDecoration: "none", color: this.props.color }}
            onClick={(timetableEvent, event) => this.props.onClick(timetableEvent)}
            {...{} as any}
          >
            <ListItem button>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={this.props.name} />
            </ListItem>
          </NavLink>
        </div>
      );
    }
  }
}
