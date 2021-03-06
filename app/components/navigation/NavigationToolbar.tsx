import * as React from "react";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import { connect } from "react-redux";

// Icons
import Refresh from "material-ui-icons/Refresh";

import { Route, Switch } from "react-router-dom";

import LeftDrawer from "./LeftDrawer";
import ITimetableFilters from "../../models/ITimetableFilters";
import { IGlobalState } from "../../store/IGlobalState";
import { openLeftDrawer, closeLeftDrawer } from "../../actions";
import IConfiguration from "../../store/IConfiguration";

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

interface IProps {
  leftDrawerOpen: boolean;
  filters: ITimetableFilters;
  updateDate: string;
  classes: any;
  lecturerMode: boolean;
  onRefreshClick: any;

  openLeftDrawer: any;
  closeLeftDrawer: any;
}

const ButtonAppBar = (props: IProps) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar style={testPadding}>
        <Toolbar style={{ paddingRight: 6 }}>
          <LeftDrawer
            open={props.leftDrawerOpen}
            filters={props.filters}
            updateDate={props.updateDate}
            openLeftDrawer={props.openLeftDrawer}
            closeLeftDrawer={props.closeLeftDrawer}
          />
          <Switch>
            <Route exact path="/" render={() => (
              <React.Fragment>
                <Typography
                  type="title"
                  color="inherit"
                  className={classes.flex}
                >
                  {props.lecturerMode ? props.filters.lecturer : "Plan zajęć WZIiM"}
                </Typography>
              </React.Fragment>
            )} />
            <Route exact path="/settings" render={() => (
              <Typography type="title" color="inherit" className={classes.flex}>Ustawienia</Typography>
            )} />
            <Route exact path="/floor" render={() => (
              <Typography type="title" color="inherit" className={classes.flex}>Schemat piętra</Typography>
            )} />
            <Route exact path="/about" render={() => (
              <Typography type="title" color="inherit" className={classes.flex}>O aplikacji</Typography>
            )} />
          </Switch>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps: ((state: IGlobalState, ownProps: any) => IProps) = (state, ownProps) => {
  return {
    leftDrawerOpen: state.navigationToolbar.leftDrawerOpen,
    filters: state.configuration.filters,
    updateDate: state.timetable.data ? state.timetable.data.date : null,
    lecturerMode: state.configuration.lecturerMode,
    ...ownProps,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openLeftDrawer: () => dispatch(openLeftDrawer()),
    closeLeftDrawer: () => dispatch(closeLeftDrawer()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ButtonAppBar));
