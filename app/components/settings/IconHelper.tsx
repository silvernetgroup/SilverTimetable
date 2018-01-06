import * as React from "react";

// icons
import Time from "material-ui-icons/AccessTime";
import Download from "material-ui-icons/CloudDownload";
import Notifications from "material-ui-icons/Notifications";
import Top from "material-ui-icons/VerticalAlignTop";
import Settings from "material-ui-icons/Settings";
import Map from "material-ui-icons/Map";
import Event from "material-ui-icons/Event";
import More from "material-ui-icons/MoreVert";
import Website from "material-ui-icons/Public";

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
    } else if (props === "More") {
        return <More />;
    } else if (props === "Website") {
        return <Website />;
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
