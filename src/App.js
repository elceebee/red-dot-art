// From 3rd party libraries
import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// Compotents from this application
import Catalogue from "./components/catalogue";
import NotFound from "./components/notFound";
import Tabs from "./components/tabs";

// CSS modules
import "./App.css";

class App extends Component {
  state = {};
  render() {
    return (
      <Switch>
        <Route path="/catalogue" component={Catalogue} />
        <Route path="/work/:id" component={Tabs} />
        <Redirect path="/work" exact to="/catalogue" />
        <Route path="/not-found" component={NotFound} />
        <Redirect from="/" exact to="/catalogue" />
        <Redirect to="/not-found" />
      </Switch>
    );
  }
}

export default App;
