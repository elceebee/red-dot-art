// This file renders a more detailed view of the work
// Guests can reserve a work or find out more about the artist
// Artist can edit their own works

// From 3rd party libraries
import React, { Component } from "react";
import _ from "lodash";
import { Grid, Header } from "semantic-ui-react";

// From this application
import store from "../store";
import { selectWork, selectArtistByWork } from "./selectors";
import GetRedDotLabel from "./common/getlabel";

class ArtworkPage extends Component {
  state = { selectedWork: [], selectedArtist: [] };

  componentDidMount() {
    const selectedWork = selectWork("id", this.props.match.params.id);
    const selectedArtist = selectArtistByWork("id", this.props.match.params.id);
    this.setState({ selectedWork, selectedArtist });
  }

  mapToPageView(work) {
    return (
      <Grid.Column stretched mobile={16} tablet={8} computer={5} key={work.id}>
        <Header as="h1">{this.state.selectedWork.title}</Header>
      </Grid.Column>
    );
  }
  render() {
    return <Grid centered>{this.mapToPageView(this.state.selectedWork)}</Grid>;
  }
}

export default ArtworkPage;
