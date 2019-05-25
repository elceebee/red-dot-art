import React, { Component } from "react";
import store from "../store";
import _ from "lodash";

class ArtworkPage extends Component {
  getArtistName = artistid => {
    return _.find(store.artistsProfiles, ["id", artistid]).name;
  };

  getArtwork = id => {
    return _.find(store.artworks, ["id", id]);
  };

  mapToPageView = work => {
    return {};
  };
  render() {
    const selectedWork = this.getArtwork(this.props.match.params.id); // need to pass the id from the artcards on the search page
    const artistName = this.getArtistName(selectedWork.artistid);
    return console.log(artistName);
  }
}

export default ArtworkPage;
