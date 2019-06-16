// Functions for selecting and searching through artists and works in the store Context.
// Artist keys are: id, name, image, programme, youtube, instagram, twitter, facebook, web (all strings)
// Work keys are: id, title artistid, description, buyerid, price, sponsor, image, reddotstatus (all strings)
import _ from "lodash";

// Returns artist object(s) in an array given a key in the artists profile.
export function selectArtist(key, value, store) {
  return _.filter(store.artistsProfiles, [key, value]);
}

// Returns artists name, given artist id
export function selectArtistName(id, store) {
  return _.find(store.artistsProfiles, ["id", id]).name;
}

// Returns work(s) given a key in the work object
export function selectWork(key, value, store) {
  return _.filter(store.artWorks, [key, value]);
}

// Returns an array of works given a key in the artists profile.
export function selectWorkByArtist(key, value, store) {
  let artists = selectArtist(key, value, store);
  artists = artists.map(artist => artist.id);

  return _.filter(store.artWorks, work => {
    return _.includes(artists, work.artistid);
  });
}

// Returns an array of artist profiles given a key in the work object
export function selectArtistByWork(key, value, store) {
  const works = selectWork(key, value, store);
  const artistids = works.map(work => work.artistid);

  return _.filter(store.artistsProfiles, artist => {
    return _.includes(artistids, artist.id);
  });
}

// Returns array of artist ids where artists name contains search term.
export function searchArtistbyName(term, store) {
  return _.filter(store.artistsProfiles, artist => {
    return _.includes(artist.name.toLowerCase(), term);
  });
}

// Returns array of works where title contains term
export function searchWorkTitle(term, store) {
  return _.filter(store.artWorks, work => {
    return _.includes(work.title.toLowerCase(), term);
  });
}

// Returns the VIP donor object
export function selectDonor(donorid, store) {
  return _.filter(store.vipDonors, vip => {
    return _.includes(vip.id, donorid);
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
