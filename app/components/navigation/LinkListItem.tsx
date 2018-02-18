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
const LinkListItem = (props: IProps) => {
  const icons = {
    Map: Map,
    Info: Info,
    Event: Event,
    Settings: Settings,
    Public: Public,
  };
  const Icon = icons[props.iconName];
  if (props.linkPage === null) {
    return (
      <div>
        <ListItem
          button
          onClick={(timetableEvent, event) => props.onClick(timetableEvent)}
          {...{} as any}
          style={{ color: props.color }}
        >
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          <ListItemText primary={props.name} />
        </ListItem>
      </div>
    );
  } else {
    return (
      <div>
        <NavLink to={props.linkPage}
          style={{ textDecoration: "none", color: props.color }}
          onClick={props.onClick ? (timetableEvent, event) => props.onClick(timetableEvent) : null}
          {...{} as any}
        >
          <ListItem button>
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            <ListItemText primary={props.name} />
          </ListItem>
        </NavLink>
      </div>
    );
  }
};

export default LinkListItem;
