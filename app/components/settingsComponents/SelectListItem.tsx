import * as React from "react";
import * as config from "react-global-configuration";

// material UI Select
import Input, { InputLabel } from "material-ui/Input";
import { MenuItem } from "material-ui/Menu";
import { FormControl, FormHelperText } from "material-ui/Form";
import Select from "material-ui/Select";

interface IProps {
  name: string;
  options: string[];
  enabled: boolean;
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
    switch (this.props.name) {
      case "FieldOfStudy":
        temp.fieldOfStudy = this.props.options[event.target.value];
        break;
      case "Mode":
        temp.mode = this.props.options[event.target.value];
        break;
      case "Semester":
        temp.semester = this.props.options[event.target.value];
        break;
      case "Group":
        temp.group = event.target.value;
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
