# Red Dot Art app, using react and python

## What this app does and why

Red Dot Art is designed to assist with the sale of student artwork at VIP events in advance of the degree show.
It is to be used by tour guides and artists equipped with smart phones or tablets. The guides match available artworks with the VIPs on the guest lists to be invoiced later.

I used socketio to allow for real-time updating of reservation status to ensure guides have up-to-date information.

I used semantic ui to style the interface.

I developed this app for a CS50 (harvardx) final project. The brief was simply to "build something of interest to you, that you solve an actual problem, that you impact your community". For more information about CS50, see <https://www.edx.org/course/cs50s-introduction-to-computer-science>

## Technologies

-React
-JavaScript (ES6)
-Python / pymongo
-MongoDB
-Flask
-Socketio
-Axios
-Lodash
-Semantic ui

## Approach

The data (artists, artworks, vips) is stored in the state of app.jsx and passed around to components using a Context wrapper, rather than passing props into each component.

Using SocketIO for real-time updating of the interface was important in this context to ensure against multiple buyers of the same piece of art.

The app looks best on a smart phone or tablet.

## How to see it work

TODO:

## Future development

To make this work better:

- Export .csv file for uploading into existing billing software to create invoices
- Ability to edit works and profiles form within the application
- authentication and permission for different types of users (tour guides, admins donors, artists)
