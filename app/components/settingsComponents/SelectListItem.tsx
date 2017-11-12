import * as React from "react";
import * as config from 'react-global-configuration';

// Material UI Select
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';

interface IProps {
  name: string;
  options: string[];
  enabled: boolean;
}

const style = {
  width: '100%'
};

const padding = {
  padding: '16px',
  'paddingTop': '0px'
}

export default class SelectListItem extends React.Component<IProps, {}> {

  state = {
    option: 0,
  };

  // Select controller
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    switch (this.props.name) {
      case "Wydział":
        config.set({ filterWydział: event.target.value });
        break;
      case "Semestr":
        config.set({ filterSemestr: event.target.value });
        break;
      case "Grupa":
        config.set({ filterGrupa: event.target.value });
        break;
    
      default:
        break;
    }
  };

  drawSelect() {
    if (this.props.enabled) {
      return (
        <Select
          value={this.state.option}
          onChange={this.handleChange('option')}
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
          onChange={this.handleChange('option')}
          input={<Input />}
          disabled
        >
          <MenuItem value={0}>{this.props.options[0]}</MenuItem>
        </Select>
        
      );
    }
  }

  render() {
    return (
      <div style={padding}>
          <FormControl style={style}>
            <InputLabel>{this.props.name}</InputLabel>
            {this.drawSelect()}
          </FormControl>
        </div>
      );
  }

}