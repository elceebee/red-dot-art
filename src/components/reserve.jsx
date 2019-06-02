import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { selectWork, selectDonor, selectArtistByWork } from "./selectors";
import {
  Container,
  Grid,
  Header,
  Image,
  Card,
  Button
} from "semantic-ui-react";

class Reserve extends Component {
  state = this.props.location.state;

  handleEdit() {
    this.props.history.push(`/work/${this.state.workId}`);
  }

  handleConfirm() {
    console.log("Confirm");
  }

  mapToPageView(work, artist, donor) {
    return (
      <React.Fragment>
        <Header as="h2">Confirm donor and work before proceeding</Header>
        <Card>
          <Image src={donor.image} wrapped ui={false} />
          <Card.Header>{donor.name}</Card.Header>
          <Card.Description>VIP Donor</Card.Description>
        </Card>
        <Card>
          <Image src={work.images[0]} wrapped ui={false} />
          <Card.Header>{work.title}</Card.Header>
          <Card.Description>Work</Card.Description>
        </Card>
        <Button.Group size="large">
          <Button onClick={() => this.handleEdit()} type="button">
            Edit
          </Button>
          <Button.Or />
          <Button onClick={() => this.handleConfirm()} type="button" positive>
            Confirm reservation
          </Button>
        </Button.Group>
      </React.Fragment>
    );
  }

  render() {
    let work = selectWork("id", this.state.workId);
    work = work[0];
    let artist = selectArtistByWork("id", this.state.workId);
    artist = artist[0];
    let donor = selectDonor(this.state.donorId);
    donor = donor[0];

    return (
      <React.Fragment>
        <Container fluid style={{ marginTop: "3em" }}>
          <Grid centered>{this.mapToPageView(work, artist, donor)}</Grid>
        </Container>
      </React.Fragment>
    );
  }
}

export default withRouter(Reserve);
