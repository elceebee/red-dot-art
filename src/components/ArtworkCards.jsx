// From 3rd party libraries
import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { Card, Icon, Label, Image } from "semantic-ui-react";

// From this application
import store from "../store";
import { statuses, programmes } from "./common/keywords";

const { _SOLD, _RESERVED, _FORSALE } = statuses;
const { _CAG, _JAM, _PAINT, _PRINT, _PHTOTO, _SCULPT } = programmes;

class ArtworkCards extends Component {
  state = { searchterm: "", results: [] };

  // If there is a search term in the props, use that to filter the results. Otherwise, the results are just the store.artists.
  componentDidMount() {
    this.setState({ results: store.artworks });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.term === this.props.term) return;
    const searchTerm = this.props.term.toLowerCase();
    let results =
      searchTerm === "" ? store.artworks : this.getWorks(searchTerm);

    this.setState({ searchTerm, results });
  }
  // TODO: filter by programme

  // Return work object where the artist name or work title match the search term.
  // This will be passed to maptoview function

  getWorks = term => {
    let results = [];

    // Filters the artists profiles to those where the name contains search term
    const artistMatch = _.filter(store.artistsProfiles, artist => {
      return _.includes(artist.name, term);
    });

    // Reduces that array of objects to a array of IDs
    const artistIds = artistMatch.map(artist => {
      return artist.id;
    });

    // Filters the list of artworks by those with the artistid
    const worksByArtistName = _.filter(store.artworks, work => {
      if (_.includes(artistIds, work.artistid)) return true;
      else return false;
    });

    // Pushes the works to the results array.
    results = _.concat(results, worksByArtistName);

    // Get artwork whose titles contain the term
    let worksByTitle = _.filter(store.artworks, work => {
      return _.includes(work.title, term);
    });
    results = _.concat(results, worksByTitle);

    results = _.uniq(results);

    console.log(results);
    return results;
  };

  getArtistName = artistid => {
    return _.find(store.artistsProfiles, ["id", artistid]).name;
  };

  getLabel = status => {
    const getLabelMessage = status => {
      switch (true) {
        case status === _SOLD:
          return "This work has been sold";
        case status === _RESERVED:
          return "This work has been reserved. Put your name on a waiting list.";
        case status === _FORSALE:
          return "Purchase this work.";
        default:
          return "";
      }
    };

    const attributes = {
      color: status === (_SOLD || _RESERVED) ? "red" : "grey",
      name: status === (_SOLD || _FORSALE) ? "circle" : "circle outline",
      message: getLabelMessage(status)
    };

    return (
      <Label>
        <Icon color={attributes.color} name={attributes.name} />{" "}
        {attributes.message}.
      </Label>
    );
  };

  mapToCardView(work) {
    return (
      <Card as={Link} to={`work/${work.id}`} key={work.id}>
        <Image src={work.images[0]} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{work.title}</Card.Header>
          <Card.Meta>
            <span>{this.getArtistName(work.artistid)}</span>
          </Card.Meta>
          <Card.Description>
            {work.forsale ? work.price : "not for sale"}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>{this.getLabel(work.reddotstatus)}</Card.Content>
      </Card>
    );
  }

  render() {
    return (
      <Card.Group>
        {this.state.results.map(work => {
          return this.mapToCardView(work);
        })}
      </Card.Group>
    );
  }
}

export default ArtworkCards;
