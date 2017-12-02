import * as React from "react";

// icons
import Time from "material-ui-icons/AccessTime";
import Download from "material-ui-icons/CloudDownload";
import Notifications from "material-ui-icons/Notifications";
import Top from "material-ui-icons/VerticalAlignTop";

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
