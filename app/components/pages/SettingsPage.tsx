import * as React from "react";
import * as config from "react-global-configuration";

// material UI
import List, { ListSubheader } from "material-ui/List";

// settings Components
import SwitchListItem from "../settingsComponents/SwitchListItem";
import SelectListItem from "../settingsComponents/SelectListItem";

const faculties: string[] = ["Informatyka", "Informatyka i ekonometria"];
const semesters: string[] = ["Semestr I", "Semestr III", "Semestr V", "Semestr VII"]; // todo: pobierac to z planu
const modes: string[] = ["Stacjonarne", "Niestacjonarne"];
const groups: string[] = ["1", "2", "3", "4", "5", "6"];

export default class SettingsPage extends React.Component {
  render(): JSX.Element {
    return (
      <div>
        <List subheader={<ListSubheader>Filtrowanie</ListSubheader>}>
          <SelectListItem name="Wydział" enabled={true} options={faculties} />
          <SelectListItem name="Semestr" enabled={true} options={semesters} />
          <SelectListItem name="Rodzaj" enabled={true} options={modes} />
          <SelectListItem name="Grupa" enabled={true} options={groups} />
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
