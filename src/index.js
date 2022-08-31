import {Provider}                from "mobx-react";
import React                     from "react";
import ReactDOM                  from "react-dom/client";
import {BrowserRouter as Router} from "react-router-dom";
import App                       from "./App";
import "./i18n";
import "./index.scss";
import stores                    from "./Stores";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider {...stores}>
      <Router>
        <App />
      </Router>
    </Provider>
);
