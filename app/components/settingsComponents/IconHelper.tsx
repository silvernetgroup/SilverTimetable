import * as React from 'react';

// Icons
import Time from 'material-ui-icons/AccessTime';
import Notifications from 'material-ui-icons/Notifications';
import Download from 'material-ui-icons/CloudDownload';

interface IProps {
    iconName: string;
}

function SetIcon(props) {
    if (props === "Time") {
        return <Time />;
    } else if (props === "Notifications") {
        return <Notifications />;
    } else if (props === "Download") {
        return <Download />;
    }
}

export default class IconHelper extends React.Component<IProps, {}> {
    render() {
        return (
            <div>
                {SetIcon(this.props.iconName)}
            </div>
        );
    }
}