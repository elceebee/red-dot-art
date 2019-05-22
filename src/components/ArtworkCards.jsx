// From 3rd party libraries
import React, { Component } from "react";
import _ from "lodash";
import { Card, Icon, Label } from "semantic-ui-react";

// From this application
import store from "../store";
import { statuses } from "./common/keywords";

const { _SOLD, _RESERVED, _FORSALE, _NOTFORSALE } = statuses;

class ArtworkCards extends Component {
  getArtistName = artistId => {
    return _.find(store.artistsProfiles, ["id", artistId]).name;
  };

  getLabel = status => {
    const getLabelMessage = status => {
      let message = "";
      switch (true) {
        case status === _SOLD:
          return (message = "This work has been sold");
        case status === _RESERVED:
          return (message =
            "This work has been reserved. Put your name on a waiting list.");
        case status === _FORSALE:
          return (message = "Purchase this work.");
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
    return {
      image: work.images[0],
      header: work.title,
      meta: this.getArtistName(work.artistId),
      description: work.forSale ? work.price : "not for sale",
      extra: this.getLabel(work.redDotStatus)
    };
  }

  render() {
    const items = store.artworks.map(work => this.mapToCardView(work));
    return <Card.Group items={items} />;
  }
}

export default ArtworkCards;
