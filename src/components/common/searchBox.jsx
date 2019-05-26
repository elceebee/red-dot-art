// From 3rd party libraries
import React, { Component } from "react";
import { Input } from "semantic-ui-react";

class SearchBox extends Component {
  handleSearchChange = (e, { value }) => {
    this.props.updateSearchTerm(value);
  };
  render() {
    return (
      <Input
        icon="search"
        placeholder="Search..."
        onChange={this.handleSearchChange}
        value={this.props.term}
      />
    );
  }
}

export default SearchBox;
