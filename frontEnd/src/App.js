// From 3rd party libraries
import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import io from "socket.io-client";
import _ from "lodash";

// Context to be used in other components
import { StoreProvider } from "./storeContext";

// Compotents from this application
import DotMenu from "./components/dotMenu";
import Catalogue from "./components/catalogue";
import NotFound from "./components/notFound";
import Reserve from "./components/reserve";
import Tabs from "./components/tabs";

// CSS modules
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import axios from "axios";

var socket = io.connect("http://10.233.1.169:5000/");

class App extends Component {
  state = { artistsProfiles: [], artWorks: [], vipDonors: [] };

  async componentDidMount() {
    // Retrieves data and stores in state to be accessed as props by other components

    let res = await axios.get("http://10.233.1.169:5000/artistsprofiles");
    const artistsProfiles = res.data;

    res = await axios.get("http://10.233.1.169:5000/artworks");
    const artWorks = res.data;

    res = await axios.get("http://10.233.1.169:5000/vipdonors");
    const vipDonors = res.data;
    this.setState({ artistsProfiles, artWorks, vipDonors });

    socket.on("Reserved", this.handleReservation);
  }

  handleReservation = event => {
    const newArtWorks = _.map(this.state.artWorks, work => {
      if (work.id === event.id) {
        work.reddotstatus = "Reserved";
      }
      return work;
    });
    this.setState({ artWorks: newArtWorks });
  };

  render() {
    return (
      <React.Fragment>
        <Switch>
          <Redirect from="/" exact to="/catalogue" />
          <Redirect path="/work" exact to="/catalogue" />
          <StoreProvider value={this.state}>
            <Route path="/catalogue" component={Catalogue} />
            <Route path="/confirmation" component={Reserve} />
            <Route path="/work/:id" component={Tabs} />
          </StoreProvider>
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
        <DotMenu />
      </React.Fragment>
    );
  }
}

export default App;
