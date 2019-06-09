import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu, Container } from "semantic-ui-react";

class DotMenu extends Component {
  render() {
    if (!this.props.location.pathname.startsWith("/catalogue")) {
      return (
        <Container>
          <Menu fixed="bottom" large="true" fluid widths={6}>
            <Menu.Item as={Link} to="/catalogue" name="catalogue">
              Return to Catalogue
            </Menu.Item>
          </Menu>
        </Container>
      );
    }
    return null;
  }
}

export default withRouter(DotMenu);
