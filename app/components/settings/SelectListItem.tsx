import * as React from "react";
import config from "react-global-configuration";

// material UI Select
import { FormControl } from "material-ui/Form";
import Input, { InputLabel } from "material-ui/Input";
import { MenuItem } from "material-ui/Menu";
import Select from "material-ui/Select";
import TimetableServices from "../../services/TimetableServices";
import IConfiguration from "../../models/IConfiguration";

interface IProps {
  name: string;
  options: string[];
  enabled: boolean;
  configName: string;
  onChange?: any;
}
interface IState {
  option: any;
}

const style: any = {
  width: "100%",
};

const padding: any = {
  padding: "16px",
  paddingTop: "0px",
};

export default class SelectListItem extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    let option = config.get("filters")[this.props.configName];
    if (props.configName === "group" && option) {
      option = option.toString();
    }

    this.state = {
      option: this.props.options.indexOf(option),
    };
  }

  public componentDidUpdate() {
    const temp = config.get();
    temp.filters[this.props.configName] = this.props.options[this.state.option];
    config.set(temp);
    // console.log("set " + this.props.configName + " to " + this.props.options[this.state.option]);
  }

  public render(): JSX.Element {
    return (
      <div style={padding}>
        <FormControl style={style}>
          <InputLabel>{this.props.name}</InputLabel>
          {this.drawSelect()}
        </FormControl>
      </div>
    );
  }

  // select controller
  private handleChange = (event) => {
    this.setState({ option: event.target.value });
    const temp: IConfiguration = config.get();
    temp.filters[this.props.configName] = this.props.options[event.target.value];
    config.set(temp);
    if (this.props.onChange) {
      this.props.onChange();
    }
    TimetableServices.writeConfigurationFile(temp);
  }

  private drawSelect(): JSX.Element {
    if (this.props.enabled) {
      return (
        <Select
          value={this.state.option}
          onChange={(event) => this.handleChange(event)}
          input={<Input />}
        >
          {this.props.options.map((item, index) => (
            <MenuItem value={index} key={index}>{this.props.options[index]}</MenuItem>
          ))}
        </Select>
      );
    } else {
      return (
        <Select
          value={this.state.option}
          onChange={(event) => this.handleChange(event)}
          input={<Input />}
          disabled
        >
          <MenuItem value={0}>{this.props.options[0]}</MenuItem>
        </Select>
      );
    }
  }
}
