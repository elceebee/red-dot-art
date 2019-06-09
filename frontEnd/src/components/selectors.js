import store from "../store";
import _ from "lodash";

// Returns artist object(s) in an array given a key in the artists profile.
export function selectArtist(key, value) {
  return _.filter(store.artistsProfiles, [key, value]);
}

// Returns artists name, given artist id
export function selectArtistName(id) {
  return _.find(store.artistsProfiles, ["id", id]).name;
}

// Returns work(s) given a key in the work object
export function selectWork(key, value) {
  return _.filter(store.artworks, [key, value]);
}

// Returns an array of works given a key in the artists profile.
export function selectWorkByArtist(key, value) {
  let artists = selectArtist(key, value);
  artists = artists.map(artist => artist.id);

  return _.filter(store.artworks, work => {
    return _.includes(artists, work.artistid);
  });
}

// Returns an array of artist profiles given a key in the work object
export function selectArtistByWork(key, value) {
  const works = selectWork(key, value);
  const artistids = works.map(work => work.artistid);

  return _.filter(store.artistsProfiles, artist => {
    return _.includes(artistids, artist.id);
  });
}

// Returns array of artist ids where artists name contains search term.
export function searchArtistbyName(term) {
  return _.filter(store.artistsProfiles, artist => {
    return _.includes(artist.name.toLowerCase(), term);
  });
}

// Returns array of works where title contains term
export function searchWorkTitle(term) {
  return _.filter(store.artworks, work => {
    return _.includes(work.title.toLowerCase(), term);
  });
}

// Returns the VIP donor object
export function selectDonor(donorid) {
  return _.filter(store.VIPs, vip => {
    return _.includes(vip.donorid, donorid);
  });
}

export default {
  selectArtist,
  selectArtistName,
  selectWork,
  selectWorkByArtist,
  selectArtistByWork,
  searchArtistbyName,
  searchWorkTitle
};
