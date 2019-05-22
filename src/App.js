// From 3rd party libraries
import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// Compotents from this application
import Catalogue from "./components/catalogue";
import NotFound from "./components/notFound";

// CSS modules
import "./App.css";

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <main className="container">
          <Switch>
            <Route path="/catalogue" component={Catalogue} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/catalogue" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
