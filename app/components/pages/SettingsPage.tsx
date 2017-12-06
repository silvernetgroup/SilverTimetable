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
const groups: string[] = ["1", "2", "3", "4", "5", "6", "ISI1"]; // todo: pobierac to z planu

export default class SettingsPage extends React.Component {
  public render(): JSX.Element {
    return (
      <div>
        <List subheader={<ListSubheader>Filtrowanie</ListSubheader>}>
          <SelectListItem name="Kierunek" enabled={true} options={faculties} configName="fieldOfStudy"/>
          <SelectListItem name="Semestr" enabled={true} options={semesters} configName="semester"/>
          <SelectListItem name="Tryb" enabled={true} options={modes} configName="mode"/>
          <SelectListItem name="Grupa" enabled={true} options={groups} configName="group"/>
        </List>
        <List subheader={<ListSubheader>Powiadomienia</ListSubheader>}>
          <SwitchListItem name="Nowa wersja planu" iconName="Notifications" configName="notificationNewVersion" />
          <SwitchListItem name="Przed zajęciami" iconName="Time" configName="notificationBeforeClass" />
        </List>
        <List subheader={<ListSubheader>Inne</ListSubheader>}>
          <SwitchListItem name="Szybka zmiana grupy " iconName="Top" configName="showGroupChange" />
          <SwitchListItem name="Zapisuj na urządzeniu" iconName="Download" configName="offline" />
        </List>
      </div>
    );
  }
}
