import * as React from "react";

export default class AboutPage extends React.Component {

    constructor(props: any) {
        super(props);
    }
    public render(): JSX.Element {
        const style: any = {
            textAlign: "center",
            marginTop: "69px",
        };
        return (
            <div style={style}>
                <h1>About page</h1>
            </div>
        );
    }
}
