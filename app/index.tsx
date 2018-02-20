import * as React from "react";
import { render } from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import store from "./store/index";
import "babel-polyfill";

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("app-root"),
);
