# Red Dot Art app, using react and python

## What this app does and why

Red Dot Art is designed to assist with the sale of student artwork at VIP events. Details about the artists, works, and vips are loaded before the event. VIPs indicate to tour guides equipped with smart phones which pieces they would like to reserve. The guides match available artworks with the VIPs on the guest lists to be invoiced later.

I used socketio to allow for real-time updating of reservation status to ensure guides do no inadvertantly promise the same piece to more than one person.

I used semantic ui to style the interface.

I developed this app for a CS50 (harvardx) final project. The brief was simply that "you build something of interest to you, that you solve an actual problem, that you impact your community". For more information about CS50, see <https://www.edx.org/course/cs50s-introduction-to-computer-science>

## Technologies

- React
- JavaScript (ES6)
- Python / pymongo
- MongoDB
- Flask
- Socketio
- Axios
- Lodash
- Semantic ui

## Approach

The data (artists, artworks, vips) is uploaded and stored in the state of app.jsx when the application starts, allowing for quick loading of images and data as the user navigates around. This is useful because there are a few spots in the gallaries where the wifi is not as great as it could be.

The state is passed around to components using a Context wrapper I chose this method rather than passing props into each component after reading this blog (<https://medium.com/shemseddine-on-code/react-context-api-and-higher-order-components-d81573688a1c>).

Using SocketIO for real-time updating of the interface was important in this context to ensure against multiple buyers of the same piece of art.

The app looks best on a smart phone or small tablet.

## How to see it work

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
