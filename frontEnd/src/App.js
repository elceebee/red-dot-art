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
import { axios } from "axios";

class App extends Component {
  state = { artistsProfiles: [], artWorks: [], vipDonors: [] };

  componentDidMount() {
    // Retrieves data and stores in state to be accessed as props by other components
    const artistsProfiles = this.getArtistsProfiles();
    const artWorks = this.getArtWorks();
    const vipDonors = this.getVipDonors();

    this.setState({ artistsProfiles, artWorks, vipDonors });
  }

  getArtistsProfiles() {
    const axios = require("axios");

    axios
      .get("http://127.0.0.1:5000/artistsprofiles")
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  getArtWorks() {
    const axios = require("axios");
    axios
      .get("http://127.0.0.1:5000/artworks")
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  getVipDonors() {
    const axios = require("axios");
    axios
      .get("http://127.0.0.1:5000/vipdonors")
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const { artistsProfiles, artWorks, vipDonors } = this.state;
    return (
      <React.Fragment>
        <Switch>
          <Route
            path="/catalogue"
            component={Catalogue}
            artWorks={artWorks}
            vipDonors={vipDonors}
            artistsProfiles={artistsProfiles}
          />
          <Route path="/confirmation" component={Reserve} />
          <Route path="/work/:id" component={Tabs} vipDonors={vipDonors} />
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
