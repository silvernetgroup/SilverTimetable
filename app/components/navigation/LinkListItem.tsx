import * as React from "react";
import ITimetableEvent from "../../models/ITimetableEvent";

import { NavLink } from "react-router-dom";

// material UI
import {
  ListItem,
  ListItemIcon,
  ListItemText,
} from "material-ui/List";

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

export default class SwitchListItem extends React.Component<IProps> {

  public render(): JSX.Element {
    const IconName = this.props.iconName;
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
                <IconName/>
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
                <IconName/>
              </ListItemIcon>
              <ListItemText primary={this.props.name} />
            </ListItem>
          </NavLink>
        </div>
      );
    }
  }
}
