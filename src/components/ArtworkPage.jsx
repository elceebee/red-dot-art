// This file renders a more detailed view of the work
// Guests can reserve a work or find out more about the artist
// Artist can edit their own works

// From 3rd party libraries
import React, { Component } from "react";
import { Grid, Container, Image, Divider, List } from "semantic-ui-react";

// From this application
import GetRedDotLabel from "./common/getlabel";

class ArtworkPage extends Component {
  getSponsorListItem(work) {
    if (work.sponsor === "") return null;
    return (
      <List.Item key={`${work.sponsor}${work.id}`}>
        {`With support from ${work.sponsor}`}
      </List.Item>
    );
  }

  getDescriptionItem(work) {
    if (work.description === "") return null;
    return (
      <List.Item key={`${work.description}${work.id}`}>
        {work.description}
      </List.Item>
    );
  }
  mapToPageView(work, artist) {
    return (
      <Grid.Column stretched mobile={16} tablet={8} computer={5} key={work.id}>
        {GetRedDotLabel(work.reddotstatus)}
        <Divider horizontal>About this work</Divider>
        <List>
          {this.getSponsorListItem(work)}
          {this.getDescriptionItem(work)}
        </List>
        <Image.Group size="medium">
          {work.images.map(image => {
            return <Image key={image} src={image} rounded />;
          })}
        </Image.Group>
      </Grid.Column>
    );
  }
  render() {
    return (
      <React.Fragment>
        <Container style={{ marginTop: "3em" }}>
          <Grid centered>
            {this.mapToPageView(this.props.work, this.props.artist)}
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

export default ArtworkPage;
