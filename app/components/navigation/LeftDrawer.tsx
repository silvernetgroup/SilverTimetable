import * as React from "react";
import Divider from "material-ui/Divider";
import Drawer from "material-ui/Drawer";
import Typography from "material-ui/Typography";
import List from "material-ui/List";
import IconButton from "material-ui/IconButton";
import LinkListItem from "./LinkListItem";
import Hamburger from "material-ui-icons/Menu";
import { Swipeable } from "react-touch";
import ITimetableFilters from "../../models/ITimetableFilters";
import ITimetable from "../../models/ITimetable";

const styles = {
  list: {
    width: 250,
  },
};

interface IProps {
  open: boolean;
  closeLeftDrawer: any;
  openLeftDrawer: any;
  filters: ITimetableFilters;
  updateDate: string;
}

const LeftDrawer = (props: IProps) => {
  const sideList = (
    <div style={{ width: 250 }}>
      <List style={{ paddingTop: 0 }}>
        <div style={{ height: 160, backgroundColor: "#3f51b5", top: 0, display: "flex", marginBottom: 16 }}>
          <div style={{ display: "inline-block", alignSelf: "flex-end", marginLeft: 16, marginBottom: 6 }}>
            <Typography type="headline" gutterBottom style={{ color: "white", marginBottom: 0 }}>
              {props.filters.degree &&
                props.filters.fieldOfStudy + " (" + props.filters.degree + ")"
              }
            </Typography>
            <Typography gutterBottom style={{ color: "white" }}>
              {props.filters.mode &&
                <React.Fragment>
                  {props.filters.mode}, semestr {props.filters.semester}
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
    <Swipeable onSwipeLeft={props.closeLeftDrawer}>
      <div>
        <IconButton
          color="contrast"
          onClick={() => props.openLeftDrawer()} style={{ marginLeft: -12, marginRight: 20 }}
        >
          <Hamburger />
        </IconButton>
        <Drawer open={props.open} onClose={() => props.closeLeftDrawer()}>
          <div
            tabIndex={0}
            role="button"
            onClick={() => props.closeLeftDrawer()}
            onKeyDown={() => props.closeLeftDrawer()}
          >
            {sideList}
            {props.updateDate &&
              <div style={footerStyle}>
                <Divider />
                <Typography type="body1" style={{
                  marginLeft: 16, marginTop: 16, marginBottom: 16,
                  color: "rgba(0, 0, 0, 0.56)",
                }}>
                  Ostatnia aktualizacja: <br /> {
                    props.updateDate.replace("T", " ").slice(0, -5)}
                </Typography>
              </div>
            }
          </div>
        </Drawer>
      </div>
    </Swipeable>
  );
};

export default LeftDrawer;
