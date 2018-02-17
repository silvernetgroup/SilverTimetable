import * as React from "react";

// material UI
import List, { ListSubheader } from "material-ui/List";

// settings Components
import SelectListItem from "../settings/SelectListItem";
import SwitchListItem from "../settings/SwitchListItem";
import ITimetable from "../../models/ITimetable";
import ITimetableFilters from "../../models/ITimetableFilters";
import { IGlobalState } from "../../store/IGlobalState";
import { connect } from "react-redux";
import { changeConfigurationOption, changeFilter } from "../../actions";

interface IState {
  listsEnabled: ISelectListsState;
  listValues: ISelectListValues;
}

interface IProps {
  timetable: ITimetable;
  filters: ITimetableFilters;
  changeFilter(name: string, value: any): any;
  changeConfigurationOption(name: string, value: any): any;
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

class SettingsPage extends React.Component<IProps, IState> {

  private academicYearListItem;
  private departmentListItem;
  private fieldOfStudyListItem;
  private degreeListItem;
  private semesterListItem;
  private modeListItem;
  private groupListItem;

  constructor(props) {
    super(props);
    const data = this.props.timetable;
    console.log(data);
    this.state = {
      listsEnabled: this.getSelectListsState(data),
      listValues: this.getSelectListsValues(data),
    };
  }
  public render(): JSX.Element {
    const data: ITimetable = this.props.timetable;
    console.log(data);
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
    const filters: ITimetableFilters = this.props.filters;

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
    if (!data || filterKeys.some((value) => !this.props.filters[value])) {
      console.log(optionName + "shouldn't be enabled");
      console.log(this.props.filters);
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
        this.departmentListItem.getWrappedInstance().reset();
        this.props.changeFilter("department", null);
        break;
      case "department":
        this.fieldOfStudyListItem.getWrappedInstance().reset();
        this.props.changeFilter("fieldOfStudy", null);
        break;
      case "fieldOfStudy":
        this.degreeListItem.getWrappedInstance().reset();
        this.props.changeFilter("degree", null);
        break;
      case "degree":
        this.semesterListItem.getWrappedInstance().reset();
        this.props.changeFilter("semester", null);
        break;
      case "semester":
        this.modeListItem.getWrappedInstance().reset();
        this.props.changeFilter("mode", null);
        break;
      case "mode":
        this.groupListItem.getWrappedInstance().reset();
        this.props.changeFilter("group", null);
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

const mapStateToProps = (state: IGlobalState) => {
  return {
    timetable: state.timetable.data,
    filters: state.configuration.filters,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeConfigurationOption: (name, value) => dispatch(changeConfigurationOption(name, value)),
    changeFilter: (name, value) => dispatch(changeFilter(name, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
