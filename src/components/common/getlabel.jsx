import React from "react";
import { statuses } from "./keywords";
import { Icon, Label } from "semantic-ui-react";

const { _SOLD, _RESERVED, _FORSALE } = statuses;

const GetRedDotLabel = status => {
  const getLabelMessage = status => {
    switch (true) {
      case status === _SOLD:
        return "This work has been sold";
      case status === _RESERVED:
        return "This work has been reserved. Put your name on a waiting list.";
      case status === _FORSALE:
        return "Purchase this work.";
      default:
        return "";
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

export default GetRedDotLabel;
