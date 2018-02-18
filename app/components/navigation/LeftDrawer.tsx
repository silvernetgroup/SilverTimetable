import * as React from "react";
import Divider from "material-ui/Divider";
import Drawer from "material-ui/Drawer";
import Typography from "material-ui/Typography";
import List from "material-ui/List";
import IconButton from "material-ui/IconButton";
import LinkListItem from "./LinkListItem";
// Icons
import Hamburger from "material-ui-icons/Menu";

import { openLeftDrawer, closeLeftDrawer } from "../../actions/index";
import { connect } from "react-redux";
import ITimetableFilters from "../../models/ITimetableFilters";
import { IGlobalState } from "../../store/IGlobalState";
import ITimetable from "../../models/ITimetable";

const styles = {
  list: {
    width: 250,
  },
};

interface IProps {
  open: boolean;
  closeLeftDrawer?: any;
  openLeftDrawer?: any;

  filters: ITimetableFilters;
  timetable: ITimetable;
}

declare let navigator: any;

class LeftDrawer extends React.Component<IProps> {

  public render() {
    const sideList = (
      <div style={{ width: 250 }}>
        <List style={{ paddingTop: 0 }}>
          <div style={{ height: 160, backgroundColor: "#3f51b5", top: 0, display: "flex", marginBottom: 16 }}>
            <div style={{ display: "inline-block", alignSelf: "flex-end", marginLeft: 16, marginBottom: 6 }}>
              <Typography type="headline" gutterBottom style={{ color: "white", marginBottom: 0 }}>
                {this.props.filters.degree &&
                  this.props.filters.fieldOfStudy + " (" + this.props.filters.degree + ")"
                }
              </Typography>
              <Typography gutterBottom style={{ color: "white" }}>
                {this.props.filters.mode &&
                  <React.Fragment>
                    {this.props.filters.mode}, semestr {this.props.filters.semester}
                  </React.Fragment>
                  // react fragment - w razie problemow zaktualizuj vscode
                }
              </Typography>
            </div>
          </div>
          <LinkListItem name="Plan" iconName="Event" linkPage="/" onClick={null} />
          <LinkListItem name="Ustawienia" iconName="Settings" linkPage="/settings" onClick={null} />
          <LinkListItem name="Schemat piętra" iconName="Map" linkPage="/floor" onClick={null} />
          <LinkListItem name="O aplikacji" iconName="Info" linkPage="/about" onClick={null} />
        </List>
      </div>
    );

    const footerStyle: any = {
      position: "absolute",
      bottom: 0,
      width: "100%",
    };
    return (
      <div>
        <IconButton
          color="contrast"
          onClick={() => this.props.openLeftDrawer()} style={{ marginLeft: -12, marginRight: 20 }}
        >
          <Hamburger />
        </IconButton>
        <Drawer open={this.props.open} onClose={() => this.props.closeLeftDrawer()}>
          <div
            tabIndex={0}
            role="button"
            onClick={() => this.props.closeLeftDrawer()}
            onKeyDown={() => this.props.closeLeftDrawer()}
          >
            {sideList}
            {this.props.timetable &&
              <div style={footerStyle}>
                <Divider />
                <Typography type="body1" style={{
                  marginLeft: 16, marginTop: 16, marginBottom: 16,
                  color: "rgba(0, 0, 0, 0.56)",
                }}>
                  Ostatnia aktualizacja: <br /> {
                    this.props.timetable.date.replace("T", " ").slice(0, -3)}
                </Typography>
              </div>
            }
          </div>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps: ((state: IGlobalState, ownProps) => IProps) = (state, ownProps) => {
  return {
    ...ownProps,
    filters: state.configuration.filters,
    timetable: state.timetable.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openLeftDrawer: () => dispatch(openLeftDrawer()),
    closeLeftDrawer: () => dispatch(closeLeftDrawer()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftDrawer);
