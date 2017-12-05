import * as React from "react";
import * as config from "react-global-configuration";

// material UI
import List, { ListSubheader } from "material-ui/List";

// settings Components
import SelectListItem from "../settingsComponents/SelectListItem";
import SwitchListItem from "../settingsComponents/SwitchListItem";

const faculties: string[] = ["Informatyka", "Informatyka i ekonometria"];
const semesters: string[] = ["1", "3", "5", "7"]; // todo: pobierac to z planu
const modes: string[] = ["Stacjonarne", "Niestacjonarne"];
const groups: string[] = ["1", "2", "3", "4", "5", "6"];

export default class SettingsPage extends React.Component {
  public render(): JSX.Element {
    return (
      <div>
        <List subheader={<ListSubheader>Filtrowanie</ListSubheader>}>
          <SelectListItem name="FieldOfStudy" enabled={true} options={faculties} />
          <SelectListItem name="Semester" enabled={true} options={semesters} />
          <SelectListItem name="Mode" enabled={true} options={modes} />
          <SelectListItem name="Group" enabled={true} options={groups} />
        </List>
        <List subheader={<ListSubheader>Powiadomienia</ListSubheader>}>
          <SwitchListItem name="Nowa wersja planu" iconName="Notifications" defValue={true} />
          <SwitchListItem name="Przed zajęciami" iconName="Time" defValue={false} />
        </List>
        <List subheader={<ListSubheader>Inne</ListSubheader>}>
          <SwitchListItem name="Szybka zmiana grupy " iconName="Top" defValue={false} />
          <SwitchListItem name="Zapisuj na urządzeniu" iconName="Download" defValue={true} />
        </List>
      </div>
    );
  }
}
