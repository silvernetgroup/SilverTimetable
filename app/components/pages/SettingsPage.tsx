import * as React from "react";
import * as config from "react-global-configuration";

// material UI
import List, { ListSubheader } from "material-ui/List";

// settings Components
import SelectListItem from "../settingsComponents/SelectListItem";
import SwitchListItem from "../settingsComponents/SwitchListItem";
import ITimetable from "../../models/ITimetable";

// const faculties: string[] = ["Informatyka", "Informatyka i ekonometria"];
// const semesters: string[] = ["1", "3", "5", "7"]; // todo: pobierac to z planu
// const modes: string[] = ["Stacjonarne", "Niestacjonarne"];
// const groups: string[] = ["1", "2", "3", "4", "5", "6", "ISI1"]; // todo: pobierac to z planu

interface IState {
  listsEnabled: ISelectListsState;
  listValues: ISelectListValues;
}

interface ISelectListsState {
  department: boolean;
  fieldOfStudy: boolean;
  degree: boolean;
  semester: boolean;
  mode: boolean;
  group: boolean;
}

interface ISelectListValues {
  department: string[];
  fieldOfStudy: string[];
  degree: string[];
  semester: string[];
  mode: string[];
  group: string[];
}

export default class SettingsPage extends React.Component<{}, IState> {

  constructor(props) {
    super(props);
    const data = config.get("timetable");
    this.state = {
      listsEnabled: {
        department: this.shouldBeEnabled("department", [], data),
        fieldOfStudy: this.shouldBeEnabled("fieldOfStudy", ["department"], data),
        degree: this.shouldBeEnabled("degree", ["department", "fieldOfStudy"], data),
        semester: this.shouldBeEnabled("semester", ["department", "fieldOfStudy", "degree"], data),
        mode: this.shouldBeEnabled("mode", ["department", "fieldOfStudy", "degree", "semester"], data),
        group: this.shouldBeEnabled("group", ["department", "fieldOfStudy", "degree", "mode"], data),
      },
      listValues: {
        department: this.getAvailableOptions("department", [], data),
        fieldOfStudy: this.getAvailableOptions("fieldOfStudy", ["department"], data),
        degree: this.getAvailableOptions("degree", ["department", "fieldOfStudy"], data),
        semester: this.getAvailableOptions("semester", ["department", "fieldOfStudy", "degree"], data),
        mode: this.getAvailableOptions("mode", ["department", "fieldOfStudy", "degree", "semester"], data),
        group: this.getAvailableOptions("group", ["department", "fieldOfStudy", "degree", "mode"], data),
      },
    };
  }
  public render(): JSX.Element {
    const data: ITimetable = config.get("timetable");
    return (
      <div style={{ marginTop: "69px" }}>
        <List subheader={<ListSubheader>Filtrowanie</ListSubheader>}>
          <SelectListItem
            name="Wydział"
            enabled={this.state.listsEnabled.department}
            options={this.state.listValues.department}
            configName="department"
            onChange={() => this.setStateOfSelectLists(data)}
          />
          <SelectListItem
            name="Kierunek"
            enabled={this.state.listsEnabled.fieldOfStudy}
            options={this.state.listValues.fieldOfStudy}
            configName="fieldOfStudy"
            onChange={() => this.setStateOfSelectLists(data)}
          />
          <SelectListItem
            name="Stopień"
            enabled={this.state.listsEnabled.degree}
            options={this.state.listValues.degree}
            configName="degree"
            onChange={() => this.setStateOfSelectLists(data)}
          />
          <SelectListItem
            name="Semestr"
            enabled={this.state.listsEnabled.semester}
            options={this.state.listValues.semester}
            configName="semester"
            onChange={() => this.setStateOfSelectLists(data)}
          />
          <SelectListItem
            name="Tryb"
            enabled={this.state.listsEnabled.mode}
            options={this.state.listValues.mode}
            configName="mode"
            onChange={() => this.setStateOfSelectLists(data)}
          />
          <SelectListItem
            name="Grupa"
            enabled={this.state.listsEnabled.group}
            options={this.state.listValues.group}
            configName="group"
            onChange={() => this.setStateOfSelectLists(data)}
          />
        </List>
        {/* <List subheader={<ListSubheader>Powiadomienia</ListSubheader>}>
          <SwitchListItem name="Nowa wersja planu" iconName="Notifications" configName="notificationNewVersion" />
          <SwitchListItem name="Przed zajęciami" iconName="Time" configName="notificationBeforeClass" />
        </List> */}
        <List subheader={<ListSubheader>Inne</ListSubheader>}>
          <SwitchListItem name="Szybka zmiana grupy " iconName="Top" configName="showGroupChange" />
          <SwitchListItem name="Zapisuj na urządzeniu" iconName="Download" configName="offline" />
        </List>
      </div>
    );
  }

  private getAvailableOptions(optionName: string, filterKeys: string[], data: ITimetable): string[] {
    if (!this.shouldBeEnabled(optionName, filterKeys, data)) {
      return [];
    }
    const resultsSet: Set<string> = new Set<string>();
    data
      .events
      .filter((event) => filterKeys
        .every((key) => event[key] === config.get(key)))
      .forEach((event) => resultsSet.add(event[optionName]));
    return [...resultsSet];
  }

  private shouldBeEnabled(optionName: string, filterKeys: string[], data: ITimetable): boolean {
    if (!data || filterKeys.some((value) => !config.get(value))) {
      return false;
    }
    return true;
  }

  private setStateOfSelectLists(data: ITimetable) {

    const enabled = {
      department: this.shouldBeEnabled("department", [], data),
      fieldOfStudy: this.shouldBeEnabled("fieldOfStudy", ["department"], data),
      degree: this.shouldBeEnabled("degree", ["department", "fieldOfStudy"], data),
      semester: this.shouldBeEnabled("semester", ["department", "fieldOfStudy", "degree"], data),
      mode: this.shouldBeEnabled("mode", ["department", "fieldOfStudy", "degree"], data),
      group: this.shouldBeEnabled("group", ["department", "fieldOfStudy", "degree", "mode", "semester"], data),
    };

    const values = {
      department: this.getAvailableOptions("department", [], data),
      fieldOfStudy: this.getAvailableOptions("fieldOfStudy", ["department"], data),
      degree: this.getAvailableOptions("degree", ["department", "fieldOfStudy"], data),
      semester: this.getAvailableOptions("semester", ["department", "fieldOfStudy", "degree"], data),
      mode: this.getAvailableOptions("mode", ["department", "fieldOfStudy", "degree"], data),
      group: this.getAvailableOptions("group", ["department", "fieldOfStudy", "degree", "mode", "semester"], data),
    };

    this.setState({
      listsEnabled: enabled,
      listValues: values,
    });
  }
}
