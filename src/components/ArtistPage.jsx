// From Third parties
import React, { Component } from "react";
import { List, Divider, Image } from "semantic-ui-react";
import _ from "lodash";

// From this application
import { selectWork } from "./selectors";

class ArtistPage extends Component {
  getAllWorks(work) {
    const works = selectWork("artistid", work.artistid);
    return (
      <React.Fragment>
        <Divider horizontal>Works in this exhibit</Divider>
        <List>
          {works.map(work => {
            return (
              <List.Item key={work.id}>
                <a href={`/work/${work.id}`}>{work.title}</a>
              </List.Item>
            );
          })}
        </List>
      </React.Fragment>
    );
  }

  getImage(artist) {
    if (!artist.image) return null;
    else {
      return <Image src={artist.image} size="small" centered circular />;
    }
  }

  getSocial(artist) {
    return (
      <React.Fragment>
        <Divider horizontal>Connect with this artist</Divider>
        <List>
          {_.map(artist.connect, (key, value) => {
            return (
              <List.Item key={`${key}_${value}`}>
                <a href={key}>{`${value} : ${key}`}</a>
              </List.Item>
            );
          })}
        </List>
      </React.Fragment>
    );
  }
  render() {
    return (
      <React.Fragment>
        {this.getImage(this.props.artist)}
        {this.getAllWorks(this.props.work)}
        {this.getSocial(this.props.artist)}
      </React.Fragment>
    );
  }
}

export default ArtistPage;
