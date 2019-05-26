import { statuses, programmes } from "./components/common/keywords";

const store = {
  artistsProfiles: [
    {
      id: 123,
      name: "Great artist",
      programme: programmes._PAINT,
      insta: "",
      twitter: "@greatartist",
      web: "www.greatart.com"
    },
    {
      id: 321,
      name: "Good artist",
      programme: programmes._PRINT,
      insta: "@goodartist",
      twitter: "",
      web: "www.goodart.com"
    },
    {
      id: 561,
      name: "bling bling",
      programme: programmes._JAM,
      insta: "@blingy",
      twitter: "@blingy",
      web: "www.blingyJewellery.com"
    }
  ],

  artworks: [
    {
      id: "aw123",
      title: "cool painting",
      artistid: 123,
      forsale: true,
      price: "£1230.00",
      images: [
        "http://www.hollywoodprimaryschool.co.uk/wp-content/uploads/1-3.jpg",
        "http://www.hollywoodprimaryschool.co.uk/wp-content/uploads/IMG_9339-e1554321815892.jpg",
        "http://www.hollywoodprimaryschool.co.uk/wp-content/uploads/IMG_9101.jpg"
      ],
      reddotstatus: statuses._SOLD
    },
    {
      id: "aw321",
      title: "zneato print",
      artistid: 321,
      forsale: false,
      price: null,
      images: [
        "http://www.hollywoodprimaryschool.co.uk/wp-content/uploads/IMG_8863.jpg"
      ],
      reddotstatus: statuses._RESERVED
    },
    {
      id: "aw001",
      title: "bling Jewellery",
      artistid: 561,
      forsale: true,
      price: "£500",
      images: [
        "http://www.hollywoodprimaryschool.co.uk/wp-content/uploads/IMG_8920.jpg"
      ],
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
  currentUser: "elbee@domain.ac.uk"
};

export default store;
