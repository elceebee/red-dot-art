import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu, Container } from "semantic-ui-react";

class DotMenu extends Component {
  render() {
    return (
      <Container>
        <Menu size="large" fixed="bottom" compact fluid widths={3}>
          <Menu.Item
            as={Link}
            to="/catalogue"
            name="catalogue"
            active={this.props.location.pathname.startsWith("/catalogue")}
          >
            Catalogue
          </Menu.Item>

          <Menu.Item
            as={Link}
            to="/artists"
            name="artists"
            active={this.props.location.pathname.startsWith("/artists")}
          >
            Artists
          </Menu.Item>
        </Menu>
      </Container>
    );
  }
}

export default withRouter(DotMenu);
