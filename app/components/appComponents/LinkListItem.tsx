import * as React from "react";
import * as config from "react-global-configuration";

import { HashRouter as Router, Link, Route, Switch, Redirect } from "react-router-dom";

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
  linkPage: string;
}

interface IState {
  redirect: boolean;
}

const style: any = {
  width: "100%",
};

const padding: any = {
  padding: "16px",
  paddingTop: "0px",
};

export default class SwitchListItem extends React.Component<IProps, IState> {

  constructor(props) {
    super(props);
    this.state = {redirect: false};
  }

  public componentDidMount() {
    this.state = {redirect: false};
  }

  public render(): JSX.Element {
    return (
      <div>
    <ListItem button onClick={ () => {this.setState({redirect: true})}}>
            <ListItemIcon>
              <IconHelper iconName={this.props.iconName} />
            </ListItemIcon>
            <ListItemText primary={this.props.name} />
          </ListItem>
          {this.linkTo()}
      </div>
    );
  }

  private linkTo(): JSX.Element {
    if (this.state.redirect) {
      return (
        <Redirect to={this.props.linkPage}/>
      );
    } else {
      return (
        <div />
      );
    }
  }
}
