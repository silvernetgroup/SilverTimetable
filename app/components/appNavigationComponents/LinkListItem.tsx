import * as React from "react";
import * as config from "react-global-configuration";
import ITimetableEvent from "../../models/ITimetableEvent";

import { HashRouter as Router, NavLink, Link, Route, Switch, Redirect } from "react-router-dom";

// material UI
import {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "material-ui/List";
import Button from "material-ui/Button";

// settings Components
import IconHelper from "../settingsComponents/IconHelper";

interface IProps {
  name: string;
  iconName: string;
  linkPage?: string;
  onClick?(event: ITimetableEvent): void;
}

const style: any = {
  width: "100%",
};

const padding: any = {
  padding: "16px",
  paddingTop: "0px",
};

const linkStyle: any = {
  color: "#4F4F4F",
  textDecoration: "none",
};

export default class SwitchListItem extends React.Component<IProps, {}> {

  public render(): JSX.Element {
    if (this.props.linkPage === null) {
      return (
        <div>
            <ListItem
              button
              onClick={(timetableEvent, event) => this.props.onClick(timetableEvent)}
              {...{} as any}
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
          style={linkStyle}>
            <ListItem button >
              <ListItemIcon>
                <IconHelper iconName={this.props.iconName} />
              </ListItemIcon>
              <ListItemText primary={this.props.name} />
            </ListItem>
          </NavLink>
        </div>
      );
    }
  }
}
