// For rendering artist information alongside work information

// From third parties
import React, { Component } from "react";
import { List, Divider, Image } from "semantic-ui-react";
import _ from "lodash";

// From this application
import { selectWork } from "./selectors";

class ArtistPage extends Component {
  // Retreives work for a particulr artists, renders as list
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
    // Retreives image of artist for profile page.
    if (!artist.image) return null;
    else {
      return <Image src={artist.image} size="small" centered circular />;
    }
  }

  getSocial(artist) {
    // Retreives Social media and links to external information related to the artist.
    return (
      <React.Fragment>
        <Divider horizontal>Connect with this artist</Divider>
        <List>
          {_.map(artist.connect, (key, value) => {
            if (key !== "_id" || key !== "name" || key !== programme) {
              return (
                <List.Item key={`${key}_${value}`}>
                  <a href={key}>{`${value} : ${key}`}</a>
                </List.Item>
              );
            }
          })}
        </List>
      </React.Fragment>
    );
  }
  render() {
    // Renders information related to the artists whose work has been selected.
    const { artist, work } = this.props;
    return (
      <React.Fragment>
        {this.getImage(artist)}
        {this.getAllWorks(work)}
        {this.getSocial(artist)}
      </React.Fragment>
    );
  }
}

export default ArtistPage;
