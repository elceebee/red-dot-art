// This file renders a more detailed view of the work, rendered in Tab.
// From here, guides can reserve a work for a VIP
// Inherits work and artist as props from Tabs
// Future development: Artist can edit their own works

// From 3rd party libraries
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Grid,
  Container,
  Image,
  Divider,
  List,
  Message,
  Form,
  Select
} from "semantic-ui-react";
import _ from "lodash";

// From this application
import GetRedDotLabel from "./common/getlabel";
import { statuses } from "./common/keywords";
import store from "../store";

const { _RESERVED, _FORSALE, _NOTFORSALE } = statuses;

class ArtworkPage extends Component {
  state = {
    hideLabel: true,
    hideForm: true,
    donorId: ""
  };

  getSponsorListItem(work) {
    if (work.sponsor === "") return null;
    return (
      <List.Item key={`${work.sponsor}${work.id}`}>
        {`With support from ${work.sponsor}`}
      </List.Item>
    );
  }

  handleClick() {

    // Displays message if the work is unavailable; 
    // Displays form if the work can be reserved.
    const {work} = this.props; 

    if (_.includes([_RESERVED, _NOTFORSALE], work.reddotstatus)) {
      this.setState({ hideLabel: false });
    }
    if (_.includes([_FORSALE], work.reddotstatus)) {
      this.setState({ hideForm: false });
    }
  }

  handleLabelDismiss = () => {
    this.setState({ hideLabel: true });
  };

  handleFormDismiss = () => {
    this.setState({ hideForm: true });
  };

  getVipsList() {
    return store.VIPs.map(vip => {
      return {
        key: vip.donorid,
        text: vip.name,
        value: vip.donorid,
        image: { avatar: true, src: vip.image }
      };
    });
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleNext = () => {
    // Handles Form submission by passing work and donor 
    // As props to confirmation
    this.props.history.push("/confirmation", {
      workId: this.props.work.id,
      donorId: this.state.donorId
    });
  };

  getForm = () => {
    return (
      <React.Fragment>
        <Message
          onDismiss={this.handleFormDismiss}
          attached
          header="Reservation Form"
          hidden={this.state.hideForm}
        />
        <Form className="attached fluid segment" hidden={this.state.hideForm}>
          <Form.Group widths="equal">
            <Form.Input
              name="donorId"
              control={Select}
              options={this.getVipsList()}
              search
              fluid
              placeholder="Select Guest"
              onChange={this.handleChange}
            />
            <Form.Field>
              <Form.Button
                type="button"
                content="Next"
                onClick={() => this.handleNext()}
              />
            </Form.Field>
          </Form.Group>
        </Form>
      </React.Fragment>
    );
  };

  getDescriptionItem(work) {
    if (work.description === "") return null;
    return (
      <List.Item key={`${work.description}${work.id}`}>
        {work.description}
      </List.Item>
    );
  }

  mapToPageView(work) {
    return (
      <Grid.Column stretched mobile={16} tablet={8} computer={5} key={work.id}>
        {GetRedDotLabel(work.reddotstatus, () => this.handleClick())}
        <Message
          error
          hidden={this.state.hideLabel}
          header="This work cannot be reserved"
          onDismiss={this.handleLabelDismiss}
        />
        {this.getForm()}

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
          <Grid centered>{this.mapToPageView(this.props.work)}</Grid>
        </Container>
      </React.Fragment>
    );
  }
}

export default withRouter(ArtworkPage);
