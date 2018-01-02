import * as React from "react";

export default class FloorPage extends React.Component {

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
                <div style={{ position: "relative" }}>
                    <img src="res/img/floor.png" style={{ width: "100%" }} />
                </div>
            </div>
        );
    }
}
