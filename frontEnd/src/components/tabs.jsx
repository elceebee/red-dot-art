// Renders the ArtworkPage and ArtistPage as tabs.

// From 3rd party libraries
import React, { Component } from "react";
import { Tab } from "semantic-ui-react";

// From this application
import { withStoreContext } from "../withStoreContext";
import { selectWork, selectArtistByWork } from "./selectors";
import ArtworkPage from "./ArtworkPage";
import ArtistPage from "./ArtistPage";

class Tabs extends Component {
  state = { selectedWork: {}, selectedArtist: {} };

  componentDidMount() {
    this.updateOrMount();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.context !== this.props.context ||
      prevProps.match.params.id !== this.props.match.params.id
    ) {
      this.updateOrMount();
    }
  }

  updateOrMount() {
    let selectedWork = selectWork(
      "id",
      this.props.match.params.id,
      this.props.context
    );
    let selectedArtist = selectArtistByWork(
      "id",
      this.props.match.params.id,
      this.props.context
    );
    this.setState({
      selectedWork: selectedWork[0],
      selectedArtist: selectedArtist[0]
    });
  }

  render() {
    const { selectedWork, selectedArtist } = this.state;

    if (!selectedArtist || !selectedWork) return null;
    const panes = [
      {
        menuItem: selectedWork.title,
        pane: {
          key: selectedWork.title,
          content: <ArtworkPage work={selectedWork} artist={selectedArtist} />
        }
      },
      {
        menuItem: selectedArtist.name,
        pane: {
          key: selectedArtist.name,
          content: <ArtistPage work={selectedWork} artist={selectedArtist} />
        }
      }
    ];
    const tabs = () => <Tab panes={panes} renderActiveOnly={false} />;

    return <React.Fragment>{tabs()}</React.Fragment>;
  }
}

export default withStoreContext(Tabs);
