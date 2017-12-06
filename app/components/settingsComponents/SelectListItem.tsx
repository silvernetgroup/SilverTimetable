import * as React from "react";
import * as config from "react-global-configuration";

// material UI Select
import { FormControl, FormHelperText } from "material-ui/Form";
import Input, { InputLabel } from "material-ui/Input";
import { MenuItem } from "material-ui/Menu";
import Select from "material-ui/Select";

interface IProps {
  name: string;
  options: string[];
  enabled: boolean;
  configName: string;
}

const style: any = {
  width: "100%",
};

const padding: any = {
  padding: "16px",
  paddingTop: "0px",
};

export default class SelectListItem extends React.Component<IProps, {}> {

  public state = {
    option: 0,
  };

  constructor(props: IProps) {
    super(props);
    this.state = {
        option: this.props.options.indexOf(config.get(this.props.configName)),
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
    switch (this.props.configName) {
      case "fieldOfStudy":
        temp.fieldOfStudy = this.props.options[event.target.value];
        break;
      case "mode":
        temp.mode = this.props.options[event.target.value];
        break;
      case "semester":
        temp.semester = this.props.options[event.target.value];
        break;
      case "group":
        temp.group = this.props.options[event.target.value];
        break;
      default:
        break;
    }
    config.set(temp);
  }

  private drawSelect(): JSX.Element {
    if (this.props.enabled) {
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