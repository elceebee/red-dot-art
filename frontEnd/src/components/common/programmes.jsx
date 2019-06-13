// Gets props from Catalogue component

import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";

import programmes from "./programmeList";

class Programmes extends Component {
  render() {
    const options = programmes;
    const { onProgrammeSelect } = this.props;
    return (
      <Dropdown
        placeholder="Select a programme"
        clearable
        options={options}
        onChange={(event, data) => onProgrammeSelect(data)}
        selection
        value={this.props.selectedProgramme}
      />
    );
  }
}

export default Programmes;
