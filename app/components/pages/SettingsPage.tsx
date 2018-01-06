import * as React from "react";
import config from "react-global-configuration";

// material UI
import List, { ListSubheader } from "material-ui/List";

// settings Components
import SelectListItem from "../settings/SelectListItem";
import SwitchListItem from "../settings/SwitchListItem";
import ITimetable from "../../models/ITimetable";

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
  academicYear: boolean;
}

interface ISelectListValues {
  department: string[];
  fieldOfStudy: string[];
  degree: string[];
  semester: string[];
  mode: string[];
  group: string[];
  academicYear: string[];
}

export default class SettingsPage extends React.Component<{}, IState> {

  constructor(props) {
    super(props);
    const data = config.get("timetable");
    this.state = {
      listsEnabled: this.getSelectListsState(data),
      listValues: this.getSelectListsValues(data),
    };
  }
  public render(): JSX.Element {
    const data: ITimetable = config.get("timetable");
    return (
      <div style={{ marginTop: "69px" }}>
        <List subheader={<ListSubheader>Filtrowanie</ListSubheader>}>
          <SelectListItem
            name="Rok akademicki"
            enabled={this.state.listsEnabled.academicYear}
            options={this.state.listValues.academicYear}
            configName="academicYear"
            onChange={() => this.setStateOfSelectLists(data)}
          />
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
        <List subheader={<ListSubheader>Inne</ListSubheader>}>
          <SwitchListItem name="Szybka zmiana grupy " iconName="Top" configName="showGroupChange" />
        </List>
      </div>
    );
  }

  private getAvailableOptions(optionName: string, filterKeys: string[], data: ITimetable): string[] {
    if (!this.shouldBeEnabled(optionName, filterKeys, data)) {
      return [];
    }
    const resultsSet: Set<string> = new Set<string>();
    const filters = config.get("filters");

    data
      .events
      .filter((event) => filterKeys
        .every((key) => event[key] === filters[key]))
      .forEach((event) => resultsSet.add(optionName === "group"
        ? event.specialization || event.group.toString()
        : event[optionName]));
    return [...resultsSet];
  }

  private shouldBeEnabled(optionName: string, filterKeys: string[], data: ITimetable): boolean {
    if (!data || filterKeys.some((value) => !config.get("filters")[value])) {
      return false;
    }
    return true;
  }

  private getSelectListsState(data: ITimetable): ISelectListsState {
    return {
      academicYear: this.shouldBeEnabled("academicYear", [], data),
      department: this.shouldBeEnabled("department", ["academicYear"], data),
      fieldOfStudy: this.shouldBeEnabled("fieldOfStudy", ["department", "academicYear"], data),
      degree: this.shouldBeEnabled("degree", ["department", "fieldOfStudy", "academicYear"], data),
      semester: this.shouldBeEnabled("semester", ["department", "fieldOfStudy", "degree", "academicYear"], data),
      mode: this.shouldBeEnabled("mode", ["department", "fieldOfStudy", "degree", "academicYear"], data),
      group: this.shouldBeEnabled("group",
        ["department", "fieldOfStudy", "degree", "mode", "semester", "academicYear"], data),
    };
  }

  private getSelectListsValues(data: ITimetable): ISelectListValues {
    return {
      academicYear: this.getAvailableOptions("academicYear", [], data),
      department: this.getAvailableOptions("department", ["academicYear"], data),
      fieldOfStudy: this.getAvailableOptions("fieldOfStudy", ["department", "academicYear"], data),
      degree: this.getAvailableOptions("degree", ["department", "fieldOfStudy", "academicYear"], data),
      semester: this.getAvailableOptions("semester", ["department", "fieldOfStudy", "degree", "academicYear"], data),
      mode: this.getAvailableOptions("mode", ["department", "fieldOfStudy", "degree", "academicYear"], data),
      group: this.getAvailableOptions("group",
        ["department", "fieldOfStudy", "degree", "mode", "semester", "academicYear"], data),
    };
  }

  private setStateOfSelectLists(data: ITimetable) {

    const enabled = this.getSelectListsState(data);

    const values = this.getSelectListsValues(data);

    this.setState({
      listsEnabled: enabled,
      listValues: values,
    });
  }
}
