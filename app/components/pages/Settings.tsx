import * as React from "react";
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import List, {ListSubheader} from 'material-ui/List';

import {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import Switch from 'material-ui/Switch';

// Icons
import WifiIcon from 'material-ui-icons/Wifi';
import Time from 'material-ui-icons/AccessTime';
import Notifications from 'material-ui-icons/Notifications';
import Download from 'material-ui-icons/CloudDownload';

//AppBar
import SettingsAppBar from '../settingsComponents/SettingsAppBar';

const styles = theme => ({
  root: {
    width: '100%',
    background: theme.palette.background.paper,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

var nofityOn = false;

export default class Settings extends React.Component {
  state = {
    checked: ['newVersion', 'offline'],
    age: ['1'],
  };


  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  changeToggle(checked) {
    this.setState({checked});
  }

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (value === 'timeBefore') {
      nofityOn = !nofityOn;
    }

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  render() {
    var test = true;

    const style = {
      width: '100%'
    };

    const padding = {
      padding: '16px',
      'padding-top': '0px'
    }

    const topBar = {
      statusBar: {
        height: '20px',
        width: '100%',
        'background-color': 'red'
    }
    }

    let inputfield = null;
    if (nofityOn) {
      inputfield = (
        <div style={padding}>
        <FormControl style={style}>
          <InputLabel htmlFor="age-simple">Czas powiadomienia przed zajęciami</InputLabel>
          <Select
            value={this.state.age}
            onChange={this.handleChange('age')}
            input={<Input id="age-simple" />}
          >
            <MenuItem value={1}>1 minuta</MenuItem>
            <MenuItem value={5}>5 minut</MenuItem>
            <MenuItem value={10}>10 minut</MenuItem>
            <MenuItem value={15}>15 minut</MenuItem>
            <MenuItem value={30}>30 minut</MenuItem>
          </Select>
        </FormControl>
      </div>
      );
    }
    return (
      <div>
       <SettingsAppBar />
      <div className="Powiadomienia">
        
        <List subheader={<ListSubheader>Powiadomienia</ListSubheader>}>
          <ListItem>
            <ListItemIcon>
              <Notifications />
            </ListItemIcon>
            <ListItemText primary="Nowa wersja planu" />
            <ListItemSecondaryAction>
              <Switch
                onChange={this.handleToggle('newVersion')}
                checked={this.state.checked.indexOf('newVersion') !== -1}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Time />
            </ListItemIcon>
            <ListItemText primary="Przed zajęciami" />
            <ListItemSecondaryAction>
              <Switch
                onChange={this.handleToggle('timeBefore')}
                checked={this.state.checked.indexOf('timeBefore') !== -1}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        {inputfield}
        <List subheader={<ListSubheader>Offline</ListSubheader>}>
          <ListItem>
            <ListItemIcon>
              <Download />
            </ListItemIcon>
            <ListItemText primary="Zapisuj na urządzeniu" />
            <ListItemSecondaryAction>
              <Switch
                onChange={this.handleToggle('offline')}
                checked={this.state.checked.indexOf('offline') !== -1}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </div>
      </div>
    );
  }
}
