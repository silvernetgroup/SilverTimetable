/* eslint-disable flowtype/require-valid-file-annotation */

import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import LinkListItem from "./LinkListItem";
import IconButton from "material-ui/IconButton";
import Hamburger from "material-ui-icons/Menu";
import { HashRouter as Router, Link, Route, Switch } from "react-router-dom";

const styles = {
  list: {
    width: 250,
  }
};

export default class LeftDrawer extends React.Component {
  state = {
    left: false,
  };

  toggleDrawer = (open) => () => {
    this.setState({
      left: open,
    });
  };

  render() {

    const sideList = (
      <div style={{width: 250}}>
        <List>
          <nav>
                    
            <ul>
              <li><Link to="/" replace>[Strona główna]</Link></li>
              <li><Link to="/settings" replace>[Ustawienia]</Link></li>
              <li><Link to="/filtering" replace>[Filtrowanie]</Link></li>
              <li><Link to="/floor" replace>[Schemat piętra]</Link></li>
            </ul>
          </nav>
        </List>
      </div>
    );

    return (
      <div>
        <IconButton color="contrast" onClick={this.toggleDrawer(true)} style={{marginLeft: -12, marginRight: 20}}>
              <Hamburger />
        </IconButton>
        <Drawer open={this.state.left} onRequestClose={this.toggleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}