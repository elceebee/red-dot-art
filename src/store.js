import { statuses, programmes } from "./components/common/keywords";

const store = {
  artistsProfiles: [
    {
      id: 123,
      name: "Great artist",
      programme: programmes._PAINT,
      insta: null,
      twitter: "@greatartist",
      web: "www.greatart.com"
    },
    {
      id: 321,
      name: "Good artist",
      programme: programmes._PRINT,
      insta: "@goodartist",
      twitter: "null",
      web: "www.goodart.com"
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
      title: "neato print",
      artistid: 321,
      forsale: false,
      price: null,
      images: [
        "http://www.hollywoodprimaryschool.co.uk/wp-content/uploads/IMG_8863.jpg",
        "http://www.hollywoodprimaryschool.co.uk/wp-content/uploads/IMG_8920.jpg"
      ],
      reddotstatus: statuses._RESERVED
    }
  ],
  currentUser: "elbee@domain.ac.uk"
};

export default store;
