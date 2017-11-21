import * as React from "react";
import * as config from "react-global-configuration";
import { HashRouter as Router, Link, Route, Switch } from "react-router-dom";

// material UI
import {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "material-ui/List";

// settings Components
import IconHelper from "../settingsComponents/IconHelper";

interface IProps {
  name: string;
  iconName: string;
  linkPage: string;
}

const style: any = {
  width: "100%"
};

const padding: any = {
  padding: "16px",
  paddingTop: "0px"
};

export default class SwitchListItem extends React.Component<IProps, {}> {

  render(): JSX.Element {
    return (
      <div>
        <Link to="/settings" replace>
          <ListItem>
            <ListItemIcon>
              <IconHelper iconName={this.props.iconName} />
            </ListItemIcon>
            <ListItemText primary={this.props.name} />
          </ListItem>
        </Link>
      </div>
    );
  }
}