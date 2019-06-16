// Renders the catalogue view, the default page.
// Passes selected programme and search terms as props to handle filtering

// From 3rd party libraries
import React, { Component } from "react";
import { Grid, Header, Container, Form } from "semantic-ui-react";

// From this application
import ArtworkCards from "./ArtworkCards";
import SearchBox from "./common/searchBox";
import Programmes from "./common/programmes";

class Catalogue extends Component {
  state = { term: "", selectedProgramme: null };
  updateSearchTerm = term => {
    this.setState({ term: term.toLowerCase(), selectedProgramme: "" });
  };

  handleProgrammeSelect = programme => {
    this.setState({ term: "", selectedProgramme: programme.value });
  };
  render() {
    return (
      <React.Fragment>
        <Container style={{ marginTop: "3em" }}>
          <Grid centered>
            <Header as="h1">2020 Fine Art Catalogue</Header>
            <Grid.Row>
              <Grid.Column>
                <Form>
                  <Form.Group widths="equal">
                    <Form.Field>
                      <Programmes
                        selectedProgramme={this.state.selectedProgramme}
                        onProgrammeSelect={this.handleProgrammeSelect}
                      />
                    </Form.Field>
                    <Form.Field>
                      <SearchBox
                        term={this.state.term}
                        updateSearchTerm={this.updateSearchTerm}
                      />
                    </Form.Field>
                  </Form.Group>
                </Form>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <ArtworkCards
                  term={this.state.term}
                  programme={this.state.selectedProgramme}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

export default Catalogue;
