import * as React from "react";
import config from "react-global-configuration";

// material UI
import {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "material-ui/List";
import Switch from "material-ui/Switch";

// Icons
import IconHelper from "./IconHelper";
import IConfiguration from "../../store/IConfiguration";
import TimetableServices from "../../services/TimetableServices";

interface IProps {
  name: string;
  iconName: string;
  configName: string;
}

interface IState {
  checked: string[];
}

const style: any = {
  width: "100%",
};

const padding: any = {
  padding: "16px",
  paddingTop: "0px",
};

export default class SwitchListItem extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);

    this.state = {
      checked: ["none"],
    };
    if (config.get(this.props.configName) === true) {
      this.state = {
        checked: [this.props.iconName],
      };
    }
  }

  public render(): JSX.Element {
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
      </div>
    );
  }

  // toggle controller
  private handleToggle = (value) => () => {
    const { checked } = this.state;
    const currentIndex: number = checked.indexOf(value);
    const newChecked: string[] = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    // global settings controller
    const temp: IConfiguration = config.get();
    temp.allowQuickGroupChange = currentIndex === -1;
    config.set(temp);
    TimetableServices.writeConfigurationFile(temp);

    this.setState({
      checked: newChecked,
    });
  }
}
