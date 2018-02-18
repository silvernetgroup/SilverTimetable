import * as React from "react";
import { FormControl } from "material-ui/Form";
import Input, { InputLabel } from "material-ui/Input";
import { MenuItem } from "material-ui/Menu";
import Select from "material-ui/Select";

interface IProps {
  name: string;
  options: string[];
  enabled: boolean;
  activeOption: any;
  onChange: any;
}

const style: any = {
  width: "100%",
};

const padding: any = {
  padding: "16px",
  paddingTop: "0px",
};

const SelectListItem = (props: IProps) => {
  return (
    <div style={padding}>
      <FormControl style={style}>
        <InputLabel>{props.name}</InputLabel>
        {renderSelect(props)}
      </FormControl>
    </div>
  );
};

const renderSelect = (props: IProps) => {
  return (
    <Select
      value={props.options.indexOf(props.activeOption)}
      onChange={(event) => props.onChange(event, props.options[event.target.value])}
      input={<Input />}
      disabled={!props.enabled}
    >
      {props.options.map((item, index) => (
        <MenuItem value={index} key={index}>{props.options[index]}</MenuItem>
      ))}
    </Select>
  );
};

export default SelectListItem;
