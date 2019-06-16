// Renders page for guests to confirm reservation details (artwork and donor)

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import {
  Container,
  Grid,
  Header,
  Image,
  Card,
  Button,
  Confirm
} from "semantic-ui-react";

import { withStoreContext } from "../withStoreContext";
import { selectWork, selectDonor, selectArtistByWork } from "./selectors";

class Reserve extends Component {
  state = this.props.location.state;

  // Sends user back to reservation form to correct selection
  handleEdit() {
    this.props.history.push(`/work/${this.state.workId}`);
  }

  show = () => this.setState({ open: true });

  handleConfirm = async () => {
    const reservationObject = {
      workId: this.state.workId,
      donorId: this.state.donorId
    };

    await axios.post("http://10.233.1.169:5000/reservation", reservationObject);
    this.props.history.push("/catalogue");
  };

  mapToPageView(work, artist, donor) {
    return (
      <React.Fragment>
        <Header as="h2">Confirm donor and work before proceeding</Header>
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
        <Card>
          <Image src={donor.image} wrapped ui={false} />
          <Card.Header>{donor.name}</Card.Header>
        </Card>
        <Card>
          <Image src={work.image} wrapped ui={false} />
          <Card.Header>{`${work.title} by ${artist.name}`}</Card.Header>
        </Card>
      </React.Fragment>
    );
  }

  render() {
    const { context } = this.props;
    const { workId, donorId } = this.state;

    let work = selectWork("id", workId, context);
    work = work[0];
    let artist = selectArtistByWork("id", workId, context);
    artist = artist[0];
    let donor = selectDonor(donorId, context);
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

export default withStoreContext(withRouter(Reserve));
