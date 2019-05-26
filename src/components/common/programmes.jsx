import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";

import store from "../../store";

class Programmes extends Component {
  render() {
    const options = store.programmes;
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
