# Red Dot Art app, using react and python

## What this app does and why

Red Dot Art is designed to assist with selling student art at VIP events.
It is to be used by tour guides and artists, equipped with smart phones or small tablets, to match available art with the VIPs on the guest lists.

I used socketio to allow for real-time updating of reservation status, to ensure guides have up-to-date information.

I developed this app for a CS50 (harvardx) final project.

## Technologies

React
JavaScript (ES6)
Python / pymongo
MongoDB
Flask
Socketio
Axios
Lodash
Semantic ui

## Approach

The data (artists, artworks, vips) is stored in the state of app.jsx and passed around to components using a Context wrapper, rather than passing props into each component.

## How to see it work

TODO: sample data file, which you can set up locally with mongodb

## Future development

To make this work better:

- Export .csv file for uploading into existing billing software to create invoices
- Ability to edit works and profiles form within the application
- authentication and permission for different types of users (tour guides, admins donors, artists)
