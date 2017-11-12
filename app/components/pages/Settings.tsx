import * as React from "react";
import * as config from 'react-global-configuration';

// Material UI
import List, {ListSubheader} from 'material-ui/List';

// Settings Components
import SettingsAppBar from '../settingsComponents/SettingsAppBar';
import SwitchListItem from '../settingsComponents/SwitchListItem';
import SelectListItem from '../settingsComponents/SelectListItem';

const wydziały = ['Informatyka', 'Informatyka i ekonometria'];
const semestry = ['Semestr I', 'Semestr III', 'Semestr V', 'Semestr VII'];
const grupy = ['1', '2', '3', '4', '5', '6'];

export default class Settings extends React.Component {
  render() {
    return (
      <div>
        <SettingsAppBar />
        <div className="Powiadomienia">
          <List subheader={<ListSubheader>Filtrowanie</ListSubheader>}>
            <SelectListItem name="Wydział" enabled={true} options={wydziały} />
            <SelectListItem name="Semestr" enabled={true} options={semestry} />
            <SelectListItem name="Grupa" enabled={true} options={grupy} />
          </List>
          <List subheader={<ListSubheader>Powiadomienia</ListSubheader>}>
            <SwitchListItem name="Nowa wersja planu" iconName="Notifications" defValue={true} />
            <SwitchListItem name="Przed zajęciami" iconName="Time" defValue={false} />
          </List>
          <List subheader={<ListSubheader>Offline</ListSubheader>}>
            <SwitchListItem name="Zapisuj na urządzeniu" iconName="Download" defValue={true} />
          </List>
        </div>
      </div>
    );
  }
}
