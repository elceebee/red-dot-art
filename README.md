# Red Dot Art app, using react and python

## What this app does and why

Red Dot Art is designed to assist with the sale of student artwork at VIP events. Details about the artists, works, and vips are loaded before the event. VIPs indicate to tour guides equipped with smart phones which pieces they would like to reserve. The guides match available artworks with the VIPs on the guest list to be invoiced later.

I developed this app for a CS50 (harvardx) final project. The brief was simply that "you build something of interest to you, that you solve an actual problem, that you impact your community". For more information about CS50, see <https://www.edx.org/course/cs50s-introduction-to-computer-science>

## Technologies

- React
- React Router v4
- JavaScript (ES6)
- Python / PyMongo
- MongoDB
- Flask
- Socket.IO
- Axios
- Lodash
- Semantic UI

## Approach

The data (artists, artworks, vips) is uploaded and stored in the state of app.jsx when the application starts, allowing for quick loading of images and data as the user navigates around. This is useful because there are a few spots in the gallaries where the wifi is not as great as it could be.

### React Router v4

I used React Router v4 for routing to different components (see [frontEnd/src/App.js#L56](https://github.com/elceebee/red-dot-art/blob/67e7e09e49a67dcb4e81d3c84c3394dfecb1d263/frontEnd/src/App.js#L56))

### Context Wrapper

The state is passed around to components using a Context wrapper I chose this method rather than passing props into each component after reading this blog (<https://medium.com/shemseddine-on-code/react-context-api-and-higher-order-components-d81573688a1c>). You can see this in my code:

- Here I create the context: [frontEnd/src/storeContext.js#L1](https://github.com/elceebee/red-dot-art/blob/f5511a713a498c8597dc913d75e415e1f0f8a1f2/frontEnd/src/storeContext.js#L1)
- Here is the function for wrapping components with the context: [frontEnd/src/withStoreContext.jsx#L4](https://github.com/elceebee/red-dot-art/blob/f5511a713a498c8597dc913d75e415e1f0f8a1f2/frontEnd/src/withStoreContext.jsx#L4)
- And here is an example of it is use: [frontEnd/src/components/ArtworkPage.jsx#L64](https://github.com/elceebee/red-dot-art/blob/f5511a713a498c8597dc913d75e415e1f0f8a1f2/frontEnd/src/components/ArtworkPage.jsx#L64)

### Real-time updates

Socket.IO enabled real-time updating of the interface. This was important to ensure against multiple buyers of the same piece of art.

- See here: [backEnd/app.py#L70](https://github.com/elceebee/red-dot-art/blob/67e7e09e49a67dcb4e81d3c84c3394dfecb1d263/backEnd/app.py#L70) where the changes is emitted from the backend.
- And here [frontEnd/src/App.js#L23](https://github.com/elceebee/red-dot-art/blob/67e7e09e49a67dcb4e81d3c84c3394dfecb1d263/frontEnd/src/App.js#L23) for where the socket is opened to listen for changes in reservation status.

### Selectors refactored

Nearly all of the components required the selection of particular pieces of art, individual or groups of artists, or VIPs. I refectored these functions into a separate selectors file for easy updating and reference. See [frontEnd/src/components/selectors.js#L1](https://github.com/elceebee/red-dot-art/blob/f5511a713a498c8597dc913d75e415e1f0f8a1f2/frontEnd/src/components/selectors.js#L1).

I used Lodash when writing the selectors, and in other areas of the code, to simplify iterating over objects and allow for easier reading. See: [frontEnd/src/components/selectors.js#L44](https://github.com/elceebee/red-dot-art/blob/f5511a713a498c8597dc913d75e415e1f0f8a1f2/frontEnd/src/components/selectors.js#L44)

### Semantic UI

The app looks best on a smart phone or small tablet, but you can see where I used the responsive grid of Semantic UI here:[frontEnd/src/components/ArtworkCards.jsx#L100](https://github.com/elceebee/red-dot-art/blob/67e7e09e49a67dcb4e81d3c84c3394dfecb1d263/frontEnd/src/components/ArtworkCards.jsx#L100)

## See it work

You can see the demo submitted as part of the final project here on youtube: <https://youtu.be/HG1u-TqtjWw>

To make it work on your machine you'll need to have mongoDB compass installed to install and access local database. Then...

1. Create a DB called red-dot-art with three collections: artWorks, artistsProfiles, and vipDonors.
2. Use the fake data in the folder above and follow the MongoDB import instructions (<https://docs.mongodb.com/manual/reference/program/mongoimport/>).

## Future development

There are a few things I would like to develop further in this app to make it more practical before the 2020 Degree Show:

- Export .csv file for uploading into existing billing software to create invoices
- Ability to edit works and profiles form within the application
- Authentication and permission for different types of users (tour guides, admins donors, artists)
- Better handling for race conditions in the database.
