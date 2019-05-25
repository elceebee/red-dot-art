// From 3rd party libraries
import React, { Component } from "react";
import { Grid, Header, Container } from "semantic-ui-react";

// From this application
import ArtworkCards from "./ArtworkCards";
import SearchBox from "./common/searchBox";

class Catalogue extends Component {
  state = { term: "" };
  updateSearchTerm = term => {
    this.setState({ term: term.toLowerCase() });
  };
  render() {
    return (
      <React.Fragment>
        <Container style={{ marginTop: "3em" }}>
          <Grid>
            <Header as="h1">2020 Fine Art Catalogue</Header>
            <SearchBox updateSearchTerm={this.updateSearchTerm} />
            <Grid.Row>
              <ArtworkCards term={this.state.term} />
            </Grid.Row>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

export default Catalogue;
