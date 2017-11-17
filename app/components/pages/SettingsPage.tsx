import * as React from "react";
import * as config from "react-global-configuration";

// material UI
import List, {ListSubheader} from "material-ui/List";

// settings Components
import SettingsAppBar from "../settingsComponents/SettingsAppBar";
import SwitchListItem from "../settingsComponents/SwitchListItem";
import SelectListItem from "../settingsComponents/SelectListItem";

const wydziały: string[] = ["Informatyka", "Informatyka i ekonometria"];
const semestry: string[] = ["Semestr I", "Semestr III", "Semestr V", "Semestr VII"]; // todo: pobierac to z planu
const rodzaj: string[] = ["Stacjonarne", "Niestacjonarne"];
const grupy: string[] = ["1", "2", "3", "4", "5", "6"];

export default class SettingsPage extends React.Component {
  render(): JSX.Element {
    return (
      <div>
        <SettingsAppBar />
        <div className="Powiadomienia">
          <List subheader={<ListSubheader>Filtrowanie</ListSubheader>}>
            <SelectListItem name="Wydział" enabled={true} options={wydziały} />
            <SelectListItem name="Semestr" enabled={true} options={semestry} />
            <SelectListItem name="Rodzaj" enabled={true} options={rodzaj} />
            <SelectListItem name="Grupa" enabled={true} options={grupy} />
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
      </div>
    );
  }
}
