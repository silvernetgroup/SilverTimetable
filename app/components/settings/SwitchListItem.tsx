import * as React from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "material-ui/List";
import Switch from "material-ui/Switch";

interface IProps {
  name: string;
  iconName: string;
  onChange: any;
  checked: boolean;
}

const style: any = {
  width: "100%",
};

const padding: any = {
  padding: "16px",
  paddingTop: "0px",
};

const SwitchListItem = (props: IProps) => {
  const IconName = props.iconName;
  return (
    <div>
      <ListItem>
        <ListItemIcon>
          <IconName/>
        </ListItemIcon>
        <ListItemText primary={props.name} />
        <ListItemSecondaryAction>
          <Switch
            onChange={(event) => props.onChange(event)}
            checked={props.checked}
          />
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  );
};

export default SwitchListItem;
