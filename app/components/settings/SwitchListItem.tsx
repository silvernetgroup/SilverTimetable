import * as React from "react";

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
import { IGlobalState } from "../../store/IGlobalState";
import { changeConfigurationOption } from "../../actions";
import { connect } from "react-redux";

interface IProps {
  name: string;
  iconName: string;
  configName: string;

  configuration: IConfiguration;
  changeConfigurationOption(name: string, value: any): any;
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

class SwitchListItem extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);

    this.state = {
      checked: ["none"],
    };
    if (this.props.configuration[this.props.configName] === true) {
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

    this.props.changeConfigurationOption("allowQuickGroupChange", currentIndex === -1); // wtf?? zmienic to koniecznie!!

    TimetableServices.writeConfigurationFile(this.props.configuration);

    this.setState({
      checked: newChecked,
    });
  }
}

const mapStateToProps = (state: IGlobalState, ownProps) => {
  return {
    configuration: state.configuration,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeConfigurationOption: (name, value) => dispatch(changeConfigurationOption(name, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SwitchListItem);
