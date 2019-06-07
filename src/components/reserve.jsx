import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { selectWork, selectDonor, selectArtistByWork } from "./selectors";
import {
  Container,
  Grid,
  Header,
  Image,
  Card,
  Button,
  Confirm
} from "semantic-ui-react";

class Reserve extends Component {
  state = this.props.location.state;

  handleEdit() {
    this.props.history.push(`/work/${this.state.workId}`);
  }

  show = () => this.setState({ open: true });

  handleConfirm = () => {
    // update database
    this.props.history.push("/catalogue");
  };

  mapToPageView(work, artist, donor) {
    return (
      <React.Fragment>
        <Header as="h2">Confirm donor and work before proceeding</Header>
        <Card>
          <Image src={donor.image} wrapped ui={false} />
          <Card.Header>{donor.name}</Card.Header>
        </Card>
        <Card>
          <Image src={work.images[0]} wrapped ui={false} />
          <Card.Header>{`${work.title} by ${artist.name}`}</Card.Header>
        </Card>
        <Button.Group size="large">
          <Button onClick={() => this.handleEdit()} type="button">
            Edit
          </Button>
          <Button.Or />
          <Button onClick={this.show} type="button" positive>
            Confirm reservation
          </Button>
          <Confirm
            open={this.state.open}
            onConfirm={this.handleConfirm}
            content={`${donor.name} will be invoiced for ${work.price} `}
          />
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
