import * as React from "react";
import Typography from "material-ui/Typography";

export default class AboutPage extends React.Component {

    constructor(props: any) {
        super(props);
    }
    public render(): JSX.Element {
        const style: any = {
            textAlign: "center",
            marginTop: "90px",
        };
        return (
            <div style={style}>
                <img src="res/img/logo.png" style={{ width: 155 }} />
                <h1 style={{color: "#4A4A4A", marginTop: 0, marginBottom: 2, fontSize: "2.5em"}}>Plan WZIM</h1>
                <Typography type="caption" gutterBottom align="center">
                    Wersja 1.0.4
                </Typography>
                <Typography type="subheading" gutterBottom style={{margin: "30px auto 0 auto", width: 280}}>
                    Aplikacja stworzona przez członków koła naukowego Silver .NET
                </Typography>
                <img src="res/img/silver_logo.png" style={{ width: 160, marginTop: 10 }} />
            </div>
        );
    }
}
