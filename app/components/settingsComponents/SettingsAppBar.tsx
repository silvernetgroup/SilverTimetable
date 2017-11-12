// @flow weak

import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui-icons/ArrowBack';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: '100%',
    height: '70px',
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
      height: '24px',
      width: '100%',
      'background-color': '#303F9F',
      right: 0
  }

});

const testPadding = {
    padding: '7px',
    top: '23px'
}


function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div>
        <div className={classes.statusBar} style={{ position: "fixed" }}/>
        <div className={classes.root}>
        <AppBar style={testPadding}>
        
            <Toolbar>
            <IconButton className={classes.menuButton} color="contrast">
                <ArrowBack />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
                Ustawienia
            </Typography>
            </Toolbar>
        </AppBar>
        </div>
    </div>
  );
}

export default withStyles(styles)(ButtonAppBar);