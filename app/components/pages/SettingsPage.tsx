import * as React from "react";
import config from "react-global-configuration";

// material UI
import List, { ListSubheader } from "material-ui/List";

// settings Components
import SelectListItem from "../settings/SelectListItem";
import SwitchListItem from "../settings/SwitchListItem";
import ITimetable from "../../models/ITimetable";
import ITimetableFilters from "../../models/ITimetableFilters";

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

  private academicYearListItem: SelectListItem;
  private departmentListItem: SelectListItem;
  private fieldOfStudyListItem: SelectListItem;
  private degreeListItem: SelectListItem;
  private semesterListItem: SelectListItem;
  private modeListItem: SelectListItem;
  private groupListItem: SelectListItem;

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
            onChange={() => this.setStateOfSelectLists(data, "academicYear")}
            ref={(item) => this.academicYearListItem = item}
          />
          <SelectListItem
            name="Wydział"
            enabled={this.state.listsEnabled.department}
            options={this.state.listValues.department}
            configName="department"
            onChange={() => this.setStateOfSelectLists(data, "department")}
            ref={(item) => this.departmentListItem = item}
          />
          <SelectListItem
            name="Kierunek"
            enabled={this.state.listsEnabled.fieldOfStudy}
            options={this.state.listValues.fieldOfStudy}
            configName="fieldOfStudy"
            onChange={() => this.setStateOfSelectLists(data, "fieldOfStudy")}
            ref={(item) => this.fieldOfStudyListItem = item}
          />
          <SelectListItem
            name="Stopień"
            enabled={this.state.listsEnabled.degree}
            options={this.state.listValues.degree}
            configName="degree"
            onChange={() => this.setStateOfSelectLists(data, "degree")}
            ref={(item) => this.degreeListItem = item}
          />
          <SelectListItem
            name="Semestr"
            enabled={this.state.listsEnabled.semester}
            options={this.state.listValues.semester}
            configName="semester"
            onChange={() => this.setStateOfSelectLists(data, "semester")}
            ref={(item) => this.semesterListItem = item}
          />
          <SelectListItem
            name="Tryb"
            enabled={this.state.listsEnabled.mode}
            options={this.state.listValues.mode}
            configName="mode"
            onChange={() => this.setStateOfSelectLists(data, "mode")}
            ref={(item) => this.modeListItem = item}
          />
          <SelectListItem
            name="Grupa"
            enabled={this.state.listsEnabled.group}
            options={this.state.listValues.group}
            configName="group"
            onChange={() => this.setStateOfSelectLists(data, "group")}
            ref={(item) => this.groupListItem = item}
          />
        </List>
        <List subheader={<ListSubheader>Inne</ListSubheader>}>
          <SwitchListItem name="Szybka zmiana grupy " iconName="Top" configName="allowQuickGroupChange" />
        </List>
      </div>
    );
  }

  private getAvailableOptions(optionName: string, filterKeys: string[], data: ITimetable): string[] {
    if (!this.shouldBeEnabled(optionName, filterKeys, data)) {
      return [];
    }

    const resultsSet: Set<string> = new Set<string>();
    const filters: ITimetableFilters = config.get("filters");

    if (optionName === "group") {
      console.log(filters);
      console.log(data
        .events
        .filter((event) => filterKeys
          .every((key) => event[key].toString() === filters[key].toString())));
      console.log(filterKeys)

      for (let i = 0; i < data.events.length; i++) {
        filterKeys.forEach((element) => {
          if (filters[element] !== data.events[i][element]) {
            console.log("Nie rowna sie " + element.toString());
            console.log(filters[element] + " !== " + data.events[i][element]);
          }
        });
      }

      console.log(data.events);
    }

    data
      .events
      .filter((event) => filterKeys
        .every((key) => event[key] === filters[key]))
      .forEach((event) => resultsSet.add(optionName === "group"
        ? event.specialization || event.group.toString()
        : event[optionName]));

    console.log("options for " + optionName);
    console.log(resultsSet);

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
      mode: this.shouldBeEnabled("mode", ["department", "fieldOfStudy", "degree", "academicYear", "semester"], data),
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
      mode: this.getAvailableOptions("mode", ["department", "fieldOfStudy", "degree", "academicYear", "semester"],
        data),
      group: this.getAvailableOptions("group",
        ["department", "fieldOfStudy", "degree", "mode", "semester", "academicYear"], data),
    };
  }

  private setStateOfSelectLists(data: ITimetable, resetRoot: string) {

    const values = this.getSelectListsValues(data);

    switch (resetRoot) {
      case "academicYear":
      this.departmentListItem.setState({option: null});
      let temp = config.get();
      temp.filters.department = null;
      config.set(temp);
      break;
      case "department":
      this.fieldOfStudyListItem.setState({ option: null });
      temp = config.get();
      temp.filters.fieldOfStudy = null;
      config.set(temp);
      break;
      case "fieldOfStudy":
      this.degreeListItem.setState({ option: null });
      temp = config.get();
      temp.filters.degree = null;
      config.set(temp);
      break;
      case "degree":
      this.semesterListItem.setState({ option: null });
      temp = config.get();
      temp.filters.semester = null;
      config.set(temp);
      break;
      case "semester":
      this.modeListItem.setState({ option: null });
      temp = config.get();
      temp.filters.mode = null;
      config.set(temp);
      break;
      case "mode":
      this.groupListItem.setState({ option: null });
      temp = config.get();
      temp.filters.group = null;
      config.set(temp);
      break;
      default:
      break;
    }

    const enabled = this.getSelectListsState(data);

    this.setState({
      listsEnabled: enabled,
      listValues: values,
    });
  }
}
