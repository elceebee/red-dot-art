// From 3rd party libraries
import React, { Component } from "react";
import { Tab } from "semantic-ui-react";

// From this application
import { selectWork, selectArtistByWork } from "./selectors";
import ArtworkPage from "./ArtworkPage";
import ArtistPage from "./ArtistPage";

class Tabs extends Component {
  state = { selectedWork: {}, selectedArtist: {} };

  componentWillMount() {
    let selectedWork = selectWork("id", this.props.match.params.id);
    let selectedArtist = selectArtistByWork("id", this.props.match.params.id);
    this.setState({
      selectedWork: selectedWork[0],
      selectedArtist: selectedArtist[0]
    });
  }
  render() {
    const panes = [
      {
        menuItem: this.state.selectedWork.title,
        pane: {
          key: this.state.selectedWork.title,
          content: (
            <ArtworkPage
              work={this.state.selectedWork}
              artist={this.state.selectedArtist}
            />
          )
        }
      },
      {
        menuItem: this.state.selectedArtist.name,
        pane: {
          key: this.state.selectedArtist.name,
          content: (
            <ArtistPage
              work={this.state.selectedWork}
              artist={this.state.selectedArtist}
            />
          )
        }
      }
    ];
    const tabs = () => <Tab panes={panes} renderActiveOnly={false} />;

    return <React.Fragment>{tabs()}</React.Fragment>;
  }
}

export default Tabs;
