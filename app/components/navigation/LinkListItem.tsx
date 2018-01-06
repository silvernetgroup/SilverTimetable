import * as React from "react";
import config from "react-global-configuration";
import ITimetableEvent from "../../models/ITimetableEvent";

import { NavLink } from "react-router-dom";

// material UI
import {
  ListItem,
  ListItemIcon,
  ListItemText,
} from "material-ui/List";

// settings Components
import IconHelper from "../settings/IconHelper";

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

export default class SwitchListItem extends React.Component<IProps, {}> {

  public static defaultProps: IProps = {
    name: "error",
    iconName: "Settings",
    color: "#4F4F4F",
};

  public render(): JSX.Element {
    if (this.props.linkPage === null) {
      return (
        <div>
            <ListItem
              button
              onClick={(timetableEvent, event) => this.props.onClick(timetableEvent)}
              {...{} as any}
              style={{color: this.props.color}}
            >
              <ListItemIcon>
                <IconHelper iconName={this.props.iconName} />
              </ListItemIcon>
              <ListItemText primary={this.props.name} />
            </ListItem>
        </div>
      );
    } else {
      return (
        <div>
          <NavLink to={this.props.linkPage}
          style={{textDecoration: "none", color: this.props.color}}>
            <ListItem button>
              <ListItemIcon>
                <IconHelper iconName={this.props.iconName}/>
              </ListItemIcon>
              <ListItemText primary={this.props.name} />
            </ListItem>
          </NavLink>
        </div>
      );
    }
  }
}
