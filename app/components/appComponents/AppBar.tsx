// @flow weak

import * as React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";
import ArrowBack from "material-ui-icons/ArrowBack";
import Hamburger from "material-ui-icons/Menu";

import LeftDrawer from "./Drawer";

const styles: any = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: "100%",
    height: "70px",
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  statusBar: {
    top: 0,
    height: "24px",
    width: "100%",
    "background-color": "#303F9F",
    right: 0,
    "z-index": 1100,
  }
});

const testPadding: any = {
  padding: "7px",
  top: "23px",
  boxShadow: "0px 2px 4px -1px rgba(0, 0, 0, 0), 0px 4px 5px 0px rgba(0, 0, 0, 0), 0px 1px 10px 0px rgba(0, 0, 0, 0)",
};


function ButtonAppBar(props: any): JSX.Element {
  const { classes } = props;
  return (
    <div>
      <div className={classes.statusBar} style={{ position: "fixed" }} />
      <div className={classes.root}>
        <AppBar style={testPadding}>
          <Toolbar>
            <LeftDrawer/>
            <Typography type="title" color="inherit" className={classes.flex}>
              Plan zajęć WZiM
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
}

export default withStyles(styles)(ButtonAppBar);