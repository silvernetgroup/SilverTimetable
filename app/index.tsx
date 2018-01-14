import * as React from "react";
import { render } from "react-dom";
import App from "./components/App";
import "babel-polyfill";
import "babel-core/register";

render(
    <App />,
    document.getElementById("app-root"),
);
