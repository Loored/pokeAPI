import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import Navigator from './Navigator';
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const routes = (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      {/* <Route path="/Pokemon" component={} /> */}
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById("root"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
