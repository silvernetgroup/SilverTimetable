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
import IConfiguration from "../../store/IConfiguration";
import TimetableServices from "../../services/TimetableServices";

interface IProps {
  timetable: ITimetable;
  filters: ITimetableFilters;
  configuration: IConfiguration;
  selectListsState: ISelectListsState;
  selectListsValues: ISelectListsValues;
  changeFilter?(name: string, value: any): any;
  changeConfigurationOption?(name: string, value: any): any;
}

interface ISelectListsState {
  department: boolean;
  fieldOfStudy: boolean;
  degree: boolean;
  semester: boolean;
  mode: boolean;
  group: boolean;
  academicYear: boolean;
  lecturer: boolean;
}

interface ISelectListsValues {
  department: string[];
  fieldOfStudy: string[];
  degree: string[];
  semester: string[];
  mode: string[];
  group: string[];
  academicYear: string[];
  lecturer: string[];
}

class SettingsPage extends React.Component<IProps> {

  public componentWillReceiveProps(props: IProps) {
    TimetableServices.writeConfigurationFile(props.configuration);

    if (!props.filters.group && props.configuration.filters.mode) {
      props.changeFilter("group", props.selectListsValues.group[0]);
    }
  }

  public render(): JSX.Element {
    return (
      <div style={{ marginTop: "69px" }}>
        <List subheader={<ListSubheader>Filtrowanie</ListSubheader>}>
          <SwitchListItem
            name="Tryb prowadzącego"
            iconName="School"
            checked={this.props.configuration.lecturerMode}
            onChange={(event, newValue) => this.props.changeConfigurationOption("lecturerMode", newValue)}
          />
          {this.props.configuration.lecturerMode ?
            <>
              <SelectListItem
                name=""
                options={this.props.selectListsValues.lecturer}
                enabled={this.props.selectListsState.lecturer}
                activeOption={this.props.filters.lecturer}
                onChange={(event, newValue) => this.props.changeFilter("lecturer", newValue)}
              />
            </>
            :
            <>
              <SelectListItem
                name="Rok akademicki"
                enabled={this.props.selectListsState.academicYear}
                options={this.props.selectListsValues.academicYear}
                activeOption={this.props.filters.academicYear}
                onChange={(event, newValue) => this.props.changeFilter("academicYear", newValue)}
              />
              <SelectListItem
                name="Wydział"
                enabled={this.props.selectListsState.department}
                options={this.props.selectListsValues.department}
                activeOption={this.props.filters.department}
                onChange={(event, newValue) => this.props.changeFilter("department", newValue)}
              />
              <SelectListItem
                name="Kierunek"
                enabled={this.props.selectListsState.fieldOfStudy}
                options={this.props.selectListsValues.fieldOfStudy}
                activeOption={this.props.filters.fieldOfStudy}
                onChange={(event, newValue) => this.props.changeFilter("fieldOfStudy", newValue)}
              />
              <SelectListItem
                name="Stopień"
                enabled={this.props.selectListsState.degree}
                options={this.props.selectListsValues.degree}
                activeOption={this.props.filters.degree}
                onChange={(event, newValue) => this.props.changeFilter("degree", newValue)}
              />
              <SelectListItem
                name="Semestr"
                enabled={this.props.selectListsState.semester}
                options={this.props.selectListsValues.semester}
                activeOption={this.props.filters.semester}
                onChange={(event, newValue) => this.props.changeFilter("semester", newValue)}
              />
              <SelectListItem
                name="Tryb"
                enabled={this.props.selectListsState.mode}
                options={this.props.selectListsValues.mode}
                activeOption={this.props.filters.mode}
                onChange={(event, newValue) => this.props.changeFilter("mode", newValue)}
              />
              <SelectListItem
                name="Grupa"
                enabled={this.props.selectListsState.group}
                options={this.props.selectListsValues.group}
                activeOption={this.props.filters.group}
                onChange={(event, newValue) => this.props.changeFilter("group", newValue)}
              />
            </>
          }
        </List>
        {!this.props.configuration.lecturerMode &&
          <List subheader={<ListSubheader>Inne</ListSubheader>}>
            <SwitchListItem
              name="Szybka zmiana grupy"
              iconName="SwapHoriz"
              checked={this.props.configuration.allowQuickGroupChange}
              onChange={(event, newValue) => this.props.changeConfigurationOption("allowQuickGroupChange", newValue)}
            />
          </List>
        }
      </div>
    );
  }
}

const getAvailableOptions:
  ((optionName: string, filterKeys: string[], data: ITimetable, filters: ITimetableFilters) => string[]) =
  (optionName, filterKeys, data, filters) => {

    if (!data) {
      return [];
    }

    const resultsSet: Set<string> = new Set<string>();
    if (optionName !== "lecturers") {
      data
        .events
        .filter((event) => filterKeys
          .every((key) => event[key] === filters[key]))
        .forEach((event) => resultsSet.add(optionName === "group"
          ? event.specialization || event.group.toString()
          : event[optionName]));
    } else {
      data
        .events
        .forEach((event) =>
          event.lecturers.forEach(
            (lecturer) =>
              resultsSet.add(lecturer),
          ),
        );
    }

    return [...resultsSet];
  };

const shouldBeEnabled:
  ((optionName: string, filterKeys: string[], data: ITimetable, filters: ITimetableFilters) => boolean) =
  (optionName, filterKeys, data, filters) => {
    if (!data || filterKeys.some((value) => !filters[value])) {
      return false;
    }
    return true;
  };

const getSelectListsState: ((data: ITimetable, filters: ITimetableFilters) => ISelectListsState) = (data, filters) => {
  return {
    academicYear: shouldBeEnabled("academicYear", [], data, filters),
    department: shouldBeEnabled("department", ["academicYear"], data, filters),
    fieldOfStudy: shouldBeEnabled("fieldOfStudy", ["department", "academicYear"], data, filters),
    degree: shouldBeEnabled("degree", ["department", "fieldOfStudy", "academicYear"], data, filters),
    semester: shouldBeEnabled("semester", ["department", "fieldOfStudy", "degree", "academicYear"], data, filters),
    mode: shouldBeEnabled("mode", ["department", "fieldOfStudy", "degree", "academicYear", "semester"], data, filters),
    group: shouldBeEnabled("group",
      ["department", "fieldOfStudy", "degree", "mode", "semester", "academicYear"], data, filters),
    lecturer: shouldBeEnabled("lecturer", [], data, filters),
  };
};

const getSelectListsValues: ((data: ITimetable, filters: ITimetableFilters) => ISelectListsValues) =
  (data, filters) => {
    return {
      academicYear: getAvailableOptions("academicYear", [], data, filters),
      department: getAvailableOptions("department", ["academicYear"], data, filters),
      fieldOfStudy: getAvailableOptions("fieldOfStudy", ["department", "academicYear"], data, filters),
      degree: getAvailableOptions("degree", ["department", "fieldOfStudy", "academicYear"], data, filters),
      semester: getAvailableOptions("semester", ["department", "fieldOfStudy", "degree", "academicYear"],
        data, filters),
      mode: getAvailableOptions("mode", ["department", "fieldOfStudy", "degree", "academicYear", "semester"],
        data, filters),
      group: getAvailableOptions("group",
        ["department", "fieldOfStudy", "degree", "mode", "semester", "academicYear"], data, filters),
      lecturer: getAvailableOptions("lecturers", [], data, filters),
    };
  };

const mapStateToProps: ((state: IGlobalState) => IProps) = (state) => {
  return {
    timetable: state.timetable.data,
    filters: state.configuration.filters,
    configuration: state.configuration,
    selectListsState: getSelectListsState(state.timetable.data, state.configuration.filters),
    selectListsValues: getSelectListsValues(state.timetable.data, state.configuration.filters),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeConfigurationOption: (name, value) => dispatch(changeConfigurationOption(name, value)),
    changeFilter: (name, value) => dispatch(changeFilter(name, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
