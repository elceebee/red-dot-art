// From 3rd party libraries
import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// Compotents from this application
import DotMenu from "./components/dotMenu";
import Catalogue from "./components/catalogue";
import NotFound from "./components/notFound";
import Reserve from "./components/reserve";
import Tabs from "./components/tabs";

// CSS modules
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = { artists: [], donors: [], works: []};

  ComponentDidMount() {
    // TODO: call the backend to retreive data
  }
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/catalogue" component={Catalogue} />
          <Route path="/confirmation" component={Reserve} />
          <Route path="/work/:id" component={Tabs} />
          <Redirect path="/work" exact to="/catalogue" />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/catalogue" />
          <Redirect to="/not-found" />
        </Switch>
        <DotMenu />
      </React.Fragment>
    );
  }
}

export default App;
