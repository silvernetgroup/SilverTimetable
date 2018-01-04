import * as React from "react";

import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";

// Icons
import Refresh from "material-ui-icons/Refresh";

import { HashRouter as Router, Link, Route, Switch } from "react-router-dom";

import LeftDrawer from "./LeftDrawer";

const styles: any = (theme) => ({
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

const testPadding: any = {
  boxShadow: "0px 2px 4px -1px rgba(0, 0, 0, 0), 0px 4px 5px 0px rgba(0, 0, 0, 0), 0px 1px 10px 0px rgba(0, 0, 0, 0)",
  padding: "7px",
};

function ButtonAppBar(props: any): JSX.Element {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar style={testPadding}>
        <Toolbar>
          <LeftDrawer />
          <Switch>
            <Route exact path="/" render={(props) => (
              <>
              <Typography type="title" color="inherit" className={classes.flex}>Plan zajęć WZIiM</Typography>
              <IconButton>
                <Refresh color="contrast"/>
              </IconButton>
              </>
            )} />
            <Route exact path="/settings" render={(props) => (
              <Typography type="title" color="inherit" className={classes.flex}>Ustawienia</Typography>
            )} />
            <Route exact path="/floor" render={(props) => (
              <Typography type="title" color="inherit" className={classes.flex}>Schemat piętra</Typography>
            )} />
            <Route exact path="/about" render={(props) => (
              <Typography type="title" color="inherit" className={classes.flex}>O aplikacji</Typography>
            )} />
          </Switch>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(ButtonAppBar);
