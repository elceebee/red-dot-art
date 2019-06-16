import React from "react";
import { statuses } from "./keywords";
import { Icon, Button } from "semantic-ui-react";
import _ from "lodash";

const { _RESERVED, _FORSALE, _NOTFORSALE } = statuses;

const GetRedDotLabel = (status, handleClick) => {
  const getLabelMessage = status => {
    switch (true) {
      case status === _RESERVED:
        return "Artwork has been reserved";
      case status === _FORSALE:
        return "Reserve this work";
      case status === _NOTFORSALE:
        return "Artwork not for sale";
      default:
        return "";
    }
  };
  const attributes = {
    color: _.includes([_RESERVED, _NOTFORSALE], status) ? "red" : "grey",
    name: _.includes([_RESERVED, _FORSALE], status)
      ? "circle"
      : "circle outline",
    message: getLabelMessage(status)
  };

  return (
    <Button icon labelPosition="left" onClick={handleClick} type="button">
      <Icon color={attributes.color} name={attributes.name} />{" "}
      {attributes.message}.
    </Button>
  );
  // } else {
  //   return null;
  // }
};

export default GetRedDotLabel;
