// From 3rd party libraries
import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { Card, Grid, Image, Message } from "semantic-ui-react";

// From this application
import store from "../store";
import {
  selectArtistName,
  selectWorkByArtist,
  searchArtistbyName,
  searchWorkTitle
} from "./selectors";
import GetRedDotLabel from "./common/getlabel";

class ArtworkCards extends Component {
  state = { results: [] };

  componentDidMount() {
    this.setState({ results: store.artworks });
  }

  componentDidUpdate(prevProps) {
    const { term, programme } = this.props;
    if (prevProps.term === term && prevProps.programme === programme) return;

    // A change in search term
    if (prevProps.term !== term) {
      const searchTerm = term.toLowerCase();
      let results =
        searchTerm === "" ? store.artworks : this.getWorksBySearch(searchTerm);

      this.setState({ results });
    }

    // A change in programme selection
    if (prevProps.programme !== programme) {
      let results =
        programme === ""
          ? store.artworks
          : selectWorkByArtist("programme", programme);

      this.setState({ results });
    }
  }

  getWorksBySearch = term => {
    let results = [];

    // Filters the artists profiles to those where the name contains search term
    const artistMatch = searchArtistbyName(term);

    // Reduces that array of objects to a array of IDs
    const artistIds = artistMatch.map(artist => {
      return artist.id;
    });

    // Filters the list of artworks by those with the artistid
    const worksByArtist = _.reduce(
      artistIds,
      function(worksByArtist, id) {
        return _.concat(worksByArtist, selectWorkByArtist("id", id));
      },
      []
    );

    // Get artwork whose titles contain the term
    const worksByTitle = searchWorkTitle(term);

    results = _.concat(results, worksByArtist, worksByTitle);

    results = _.uniq(results);

    //TODO: Handle no search results

    return results;
  };

  mapToCardView(work) {
    return (
      <Grid.Column stretched mobile={16} tablet={8} computer={5} key={work.id}>
        <Card fluid as={Link} to={`work/${work.id}`}>
          <Image src={work.images[0]} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{work.title}</Card.Header>
            <Card.Meta>
              <span>{selectArtistName(work.artistid)}</span>
            </Card.Meta>
            <Card.Description>
              {work.forsale ? work.price : "not for sale"}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>{GetRedDotLabel(work.reddotstatus)}</Card.Content>
        </Card>
      </Grid.Column>
    );
  }

  render() {
    if (_.isEmpty(this.state.results)) {
      return (
        <Message negative>
          <Message.Header>
            There are no works that match that description
          </Message.Header>
        </Message>
      );
    }

    return (
      <Grid centered>
        {this.state.results.map(work => {
          return this.mapToCardView(work);
        })}
      </Grid>
    );
  }
}

export default ArtworkCards;
