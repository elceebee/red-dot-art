// Gets props from Catalogue component

import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";

import { programmesList } from "./keywords";

class Programmes extends Component {
  render() {
    const options = programmesList;
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
