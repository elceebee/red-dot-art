import React, { Component } from "react";
import { Grid, Header, Container, Search } from "semantic-ui-react";

import ArtworkCards from "./ArtworkCards";

class Catalogue extends Component {
  state = { searchterm: "" };

  render() {
    return (
      <React.Fragment>
        <Container style={{ marginTop: "3em" }}>
          <Grid>
            <Header as="h1">2020 Fine Art Catalogue</Header>
            <Search />
            <ArtworkCards />
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

export default Catalogue;
