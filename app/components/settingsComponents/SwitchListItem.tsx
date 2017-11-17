import * as React from "react";
import * as config from "react-global-configuration";

// material UI
import {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "material-ui/List";
import Switch from "material-ui/Switch";

// material UI Select
import Input, { InputLabel } from "material-ui/Input";
import { MenuItem } from "material-ui/Menu";
import { FormControl, FormHelperText } from "material-ui/Form";
import Select from "material-ui/Select";

// settings Components
import IconHelper from "./IconHelper";

interface IProps {
  name: string;
  iconName: string;
  defValue: boolean;
}

var notifyOn: boolean = false;

const style: any = {
  width: "100%"
};

const padding: any = {
  padding: "16px",
  "paddingTop": "0px"
};

export default class SwitchListItem extends React.Component<IProps, {}> {

  state = {
    time: 5,
    checked: ["none"],
  };

  constructor(props: IProps) {
    super(props);
    if (this.props.defValue === true) {
      this.state = {
        checked: [this.props.iconName],
        time: 5
      };
    }
  }

  // toggle controller
  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex: number = checked.indexOf(value);
    const newChecked: string[] = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    // global settings controller
    switch (this.props.iconName) {
      case "Time":
        notifyOn = !notifyOn;
        if (notifyOn) {
          config.set({ notificationBeforeClass: this.state.time });
        } else {
          config.set({ notificationBeforeClass: 0 });
        }
        break;
      case "Notifications":
        if (currentIndex === -1) {
          config.set({ notificationNewVersion: true });
        } else {
          config.set({ notificationNewVersion: false });
        }
        break;

      case "Download":
        if (currentIndex === -1) {
          config.set({ offline: true });
        } else {
          config.set({ offline: false });
        }
        break;

      case "Top":
        if (currentIndex === -1) {
          config.set({ showGroupChange: true });
        } else {
          config.set({ showGroupChange: false });
        }

      default:
        break;
    }

    this.setState({
      checked: newChecked,
    });
  }

  // select controller
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    config.set({ notificationBeforeClass: event.target.value });
  }

  renderInputField(): JSX.Element {
    if (notifyOn === true && this.props.iconName === "Time") {
      return (
        <div style={padding}>
          <FormControl style={style}>
            <InputLabel htmlFor="age-simple">Czas powiadomienia przed zajęciami</InputLabel>
            <Select
              value={this.state.time}
              onChange={this.handleChange("time")}
              input={<Input />}
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
    } else {
      return;
    }
  }

  render(): JSX.Element {
    return (
      <div>
        <ListItem>
          <ListItemIcon>
            <IconHelper iconName={this.props.iconName} />
          </ListItemIcon>
          <ListItemText primary={this.props.name} />
          <ListItemSecondaryAction>
            <Switch
              onChange={this.handleToggle(this.props.iconName)}
              checked={this.state.checked.indexOf(this.props.iconName) !== -1}
            />
          </ListItemSecondaryAction>
        </ListItem>
        {this.renderInputField()}
      </div>
    );
  }
}