import { statuses, programmes } from "./components/common/keywords";

const store = {
  artistsProfiles: [
    {
      id: 123,
      image:
        "https://vignette.wikia.nocookie.net/animationcity/images/3/3c/Stupid_Stickman.png/revision/latest?cb=20131108201253",
      name: "Great artist",
      programme: programmes._PAINT,

      youtube: "",
      instagram: "",
      twitter: "@greatartist",
      facebook: "/great.artist",
      web: "www.greatart.com"
    },
    {
      id: 321,
      image: null,
      name: "Good artist",
      programme: programmes._PRINT,
      youtube: "",
      instagram: "@goodartist",
      twitter: "",
      facebook: "/good.artist",
      web: "www.goodart.com"
    },
    {
      id: 561,
      image:
        "https://vignette.wikia.nocookie.net/animationcity/images/3/3c/Stupid_Stickman.png/revision/latest?cb=20131108201253",
      name: "bling bling",
      programme: programmes._JAM,
      youtube: "",
      instagram: "@blingy",
      twitter: "@blingy",
      facebook: "/bling.rings",
      web: "www.blingyJewellery.com"
    }
  ],

  artworks: [
    {
      id: "aw123",
      title: "cool painting",
      artistid: 123,
      description: "This is the description of my cool painting on canvas.",
      forsale: true,
      price: "£1230.00",
      sponsor: "",
      image:
        "http://www.hollywoodprimaryschool.co.uk/wp-content/uploads/1-3.jpg",
      reddotstatus: statuses._RESERVED
    },
    {
      id: "aw321",
      title: "neato Z print",
      artistid: 321,
      description: "This is the description of my super neat print lino cut.",
      forsale: false,
      price: null,
      sponsor: "Oil industry",
      image:
        "http://www.hollywoodprimaryschool.co.uk/wp-content/uploads/IMG_8863.jpg",
      reddotstatus: statuses._NOTFORSALE
    },
    {
      id: "aw001",
      title: "bling Jewellery",
      artistid: 561,
      description: "This is the description of my super blingy gold jewellery.",
      forsale: true,
      price: "£500",
      sponsor: "Dubius investor",
      image:
        "http://www.hollywoodprimaryschool.co.uk/wp-content/uploads/IMG_8920.jpg",
      reddotstatus: statuses._FORSALE
    },
    {
      id: "aw487",
      title: "Another print print",
      artistid: 321,
      description:
        "This is the description of a second super neat print lino cut.",
      forsale: true,
      price: "£510",
      sponsor: "Oil industry",
      image:
        "http://www.hollywoodprimaryschool.co.uk/wp-content/uploads/IMG_8863.jpg",
      reddotstatus: statuses._FORSALE
    }
  ],

  programmes: [
    { key: programmes._CAG, text: programmes._CAG, value: programmes._CAG },
    { key: programmes._JAM, text: programmes._JAM, value: programmes._JAM },
    {
      key: programmes._PAINT,
      text: programmes._PAINT,
      value: programmes._PAINT
    },
    {
      key: programmes._PHOTO,
      text: programmes._PHOTO,
      value: programmes._PHOTO
    },
    {
      key: programmes._PRINT,
      text: programmes._PRINT,
      value: programmes._PRINT
    },
    {
      key: programmes._SCULPT,
      text: programmes._SCULPT,
      value: programmes._SCULPT
    }
  ],
  vipDonors: [
    {
      donorid: "RE495618",
      name: "Chris Lloyd",
      image:
        "https://intl.startrek.com/sites/default/files/styles/992x473/public/images/2019-01/chrislloyd2.jpg?itok=ONpZXmqK"
    },
    {
      donorid: "RE867181",
      name: "Famous Designer",
      image:
        "https://thumbs-prod.si-cdn.com/p2qi4avByZrRy5TmuTL7MRM-4ls=/800x600/filters:no_upscale()/https://public-media.si-cdn.com/filer/89/40/89402b5e-251f-453b-ad19-f41d810f9e7d/jony-ive-800x600px-main-photo-web-page-300-dpi-copy-wr.jpg"
    }
  ],

  currentUser: "elbee@domain.ac.uk"
};

export default store;
