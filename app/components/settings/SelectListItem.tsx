import * as React from "react";

// material UI Select
import { FormControl } from "material-ui/Form";
import Input, { InputLabel } from "material-ui/Input";
import { MenuItem } from "material-ui/Menu";
import Select from "material-ui/Select";
import TimetableServices from "../../services/TimetableServices";
import IConfiguration from "../../store/IConfiguration";
import ITimetableFilters from "../../models/ITimetableFilters";
import { IGlobalState } from "../../store/IGlobalState";
import { changeFilter } from "../../actions";
import { connect } from "react-redux";

interface IProps {
  name: string;
  options: string[];
  enabled: boolean;
  configName: string;
  onChange?: any;

  configuration: IConfiguration;
  filters: ITimetableFilters;
  changeFilter(name: string, value: any): any;
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

class SelectListItem extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    let option = this.props.filters[this.props.configName];
    if (props.configName === "group" && option) {
      option = option.toString();
    }
    console.log(option);
    this.state = {
      option: this.props.options.indexOf(option),
    };
  }

  public componentDidUpdate() {
    // this.props.changeFilter(this.props.configName, this.props.options[this.state.option]);
    TimetableServices.writeConfigurationFile(this.props.configuration);
  }

  public reset() {
    console.log("reset");
    this.props.changeFilter(this.props.configName, null);
    TimetableServices.writeConfigurationFile(this.props.configuration);
    this.setState({ option: -1 });
  }

  public render(): JSX.Element {
    console.log("render");
    return (
      <div style={padding}>
        <FormControl style={style}>
          <InputLabel>{this.props.name}</InputLabel>
          {this.renderSelect()}
        </FormControl>
      </div>
    );
  }

  // select controller
  private handleChange = (event) => {
    console.log("handlechange");
    this.setState({ option: event.target.value });
    this.props.changeFilter(this.props.configName, this.props.options[event.target.value]);

    if (this.props.onChange) {
      this.props.onChange(this.props.configName);
    }
    TimetableServices.writeConfigurationFile(this.props.configuration);
  }

  private renderSelect(): JSX.Element {
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
          value={-1}
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

const mapStateToProps = (state: IGlobalState, ownProps) => {
  return {
    configuration: state.configuration,
    filters: state.configuration.filters,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeFilter: (name, value) => dispatch(changeFilter(name, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(SelectListItem);
