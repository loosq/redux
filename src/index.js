import React from "react";
import employees from "./data/data.json";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from 'react-redux';
import store from "./store";

employees.map(payload => store.dispatch({type: "addEmployees", payload}));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
  document.getElementById("root")
);
