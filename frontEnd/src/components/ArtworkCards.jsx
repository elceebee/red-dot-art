// This component renders cards for works to appear in the catalogue.
// Handles searching and filtering by programmed are handled here.
// Inherits search and filter terms as props from Catalogue.

// Imports From third party libraries
import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { Card, Grid, Image, Message } from "semantic-ui-react";

// Imports from this application
import { withStoreContext } from "../withStoreContext";
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
    if (this.props.context.artWorks) {
      const results = this.props.context.artWorks;
      this.setState({ results });
    }
  }

  componentDidUpdate(prevProps) {
    const results = this.props.context.artWorks;

    // Initially render all artworks in the catalogue
    if (this.props.context.artWorks !== prevProps.context.artWorks) {
      this.setState({ results });
    }

    // Updates results in state based on searching or filtering
    const { term, programme } = this.props;
    const { artWorks } = this.props.context;
    if (prevProps.term === term && prevProps.programme === programme) return;

    // A change in search term
    if (prevProps.term !== term) {
      const searchTerm = term.toLowerCase();
      let results =
        searchTerm === "" ? artWorks : this.getWorksBySearch(searchTerm);

      this.setState({ results });
    }

    // A change in programme selection
    if (prevProps.programme !== programme) {
      let results =
        programme === ""
          ? artWorks
          : selectWorkByArtist("programme", programme, this.props.context);

      this.setState({ results });
    }
  }

  getWorksBySearch = term => {
    // Handles searching, passes results to componentDidUpdate
    let results = [];

    // Filters the artists profiles to those where the name contains search term
    const artistMatch = searchArtistbyName(term, this.props.context);

    // Reduces that array of objects to a array of IDs
    const artistIds = artistMatch.map(artist => {
      return artist.id;
    });

    // Filters the list of artworks by those with the artistid
    const worksByArtist = _.reduce(
      artistIds,
      (worksByArtist, id) => {
        return _.concat(
          worksByArtist,
          selectWorkByArtist("id", id, this.props.context)
        );
      },
      []
    );

    // Get artwork whose titles contain the term
    const worksByTitle = searchWorkTitle(term, this.props.context);

    results = _.concat(results, worksByArtist, worksByTitle);
    results = _.uniq(results);

    return results;
  };

  mapToCardView(work) {
    // Creates view for each piece of work in results state.
    return (
      <Grid.Column stretched mobile={16} tablet={8} computer={5} key={work.id}>
        <Card fluid as={Link} to={`work/${work.id}`}>
          <Image src={work.image} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{work.title}</Card.Header>
            <Card.Meta>
              <span>{selectArtistName(work.artistid, this.props.context)}</span>
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
    const { results } = this.state;
    if (_.isEmpty(results)) {
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
        {results.map(work => {
          return this.mapToCardView(work);
        })}
      </Grid>
    );
  }
}

export default withStoreContext(ArtworkCards);
