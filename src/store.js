export const store = {
  artistsProfiles: {
    1: {
      id: 123,
      name: "Great artist",
      programme: "painting",
      insta: null,
      twitter: "@greatartist",
      web: "www.greatart.com"
    },
    2: {
      id: 321,
      name: "Good artist",
      programme: "printing",
      insta: "@goodartist",
      twitter: "null",
      web: "www.goodart.com"
    }
  },
  artworks: {
    1: {
      id: "aw123",
      title: "cool painting",
      artistId: "123",
      forSale: true,
      price: 1230,
      images: [
        "http://www.hollywoodprimaryschool.co.uk/wp-content/uploads/1-3.jpg",
        "http://www.hollywoodprimaryschool.co.uk/wp-content/uploads/IMG_9339-e1554321815892.jpg",
        "http://www.hollywoodprimaryschool.co.uk/wp-content/uploads/IMG_9101.jpg"
      ]
    },
    2: {
      id: "aw321",
      title: "neato print",
      artistId: "321",
      forSale: false,
      price: null,
      images: [
        "http://www.hollywoodprimaryschool.co.uk/wp-content/uploads/IMG_8863.jpg",
        "http://www.hollywoodprimaryschool.co.uk/wp-content/uploads/IMG_8920.jpg"
      ]
    }
  },
  currentUser: "elbee@domain.ac.uk"
};
