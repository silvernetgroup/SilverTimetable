import * as React from "react";
import * as config from "react-global-configuration";
import FileManager from "../FileManager";

// material UI Select
import { FormControl, FormHelperText } from "material-ui/Form";
import Input, { InputLabel } from "material-ui/Input";
import { MenuItem } from "material-ui/Menu";
import Select from "material-ui/Select";

interface IProps {
  name: string;
  options: string[];
  configName: string;
}
interface IState {
  option: number;
  enabled: boolean;
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
    let ifEnabled = true;
    if (this.props.name === "Turnus" && config.get("mode") === "Niestacjonarne") {
        ifEnabled = false;
    }

    this.state = {
        option: this.props.options.indexOf(config.get(this.props.configName)),
        enabled: ifEnabled,
    };
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
  private handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
    const temp = config.get();
    temp[this.props.configName] = this.props.options[event.target.value];
    config.set(temp);
    FileManager.setupFiles(true);
  }

  private drawSelect(): JSX.Element {
    if (this.state.enabled) {
      return (
        <Select
          value={this.state.option}
          onChange={this.handleChange("option")}
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
          onChange={this.handleChange("option")}
          input={<Input />}
          disabled
        >
          <MenuItem value={0}>{this.props.options[0]}</MenuItem>
        </Select>
      );
    }
  }
}
