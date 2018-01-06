import * as React from "react";

// icons
import Time from "material-ui-icons/AccessTime";
import Download from "material-ui-icons/CloudDownload";
import Notifications from "material-ui-icons/Notifications";
import Top from "material-ui-icons/VerticalAlignTop";
import Settings from "material-ui-icons/Settings";
import Map from "material-ui-icons/Map";
import Event from "material-ui-icons/Event";
import MoreHoriz from "material-ui-icons/MoreHoriz";
import Link from "material-ui-icons/Link";
import LocationOn from "material-ui-icons/LocationOn";
import InfoOutline from "material-ui-icons/InfoOutline";

interface IProps {
    iconName: string;
}

function SetIcon(props: string): JSX.Element {

    if (props === "Time") {
        return <Time />;
    } else if (props === "Notifications") {
        return <Notifications />;
    } else if (props === "Download") {
        return <Download />;
    } else if (props === "Top") {
        return <Top />;
    } else if (props === "Settings") {
        return <Settings />;
    } else if (props === "Map") {
        return <Map />;
    } else if (props === "Event") {
        return <Event />;
    } else if (props === "MoreHoriz") {
        return <MoreHoriz />;
    } else if (props === "Link") {
        return <Link />;
    } else if (props === "LocationOn") {
        return <LocationOn />;
    } else if (props === "InfoOutline") {
        return <InfoOutline />;
    }
}

export default class IconHelper extends React.Component<IProps, {}> {
    public render(): JSX.Element {
        return (
            <div>
                {SetIcon(this.props.iconName)}
            </div>
        );
    }
}
