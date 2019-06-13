from flask import Flask, flash, jsonify, render_template, request, session, abort
app = Flask(__name__)


from pymongo import MongoClient
from bson.objectid import ObjectId
from pprint import pprint
import os
import time
from flask_socketio import SocketIO, emit
from collections import deque

from werkzeug.exceptions import default_exceptions, HTTPException, InternalServerError
from werkzeug.security import check_password_hash, generate_password_hash

client = MongoClient("mongodb://localhost:27017")
db=client.reddot

app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

@app.route("/")
def home():
    serverStatusResult=db.command("serverStatus")
    pprint(serverStatusResult)
    return "Hello, Flask!"

# Retrieves artists data
@app.route("/artistsprofiles", methods=["GET"])
def profileData():
    # Empty array for artists data
    artistsProfiles = []

    # Request profiles from database, stored in Cursor object
    artistsProfilesCursor = db.artistsProfiles.find()
    
    # Adds each profile to the artistsProfiles array
    for profile in artistsProfilesCursor:
        addProfile = {"_id": str(profile["_id"]), "image": profile["image"], "name": profile["name"], "programme": profile["programme"], "youtube": profile["youtube"], "instagram": profile["instagram"], "facebook": profile["facebook"], "web": profile["web"]}
        artistsProfiles.append(addProfile)
    
    # Returns a jsonified object of artists profiles
    return jsonify(artistsProfiles)

# Retrieves donor data
@app.route("/vipdonors", methods=["GET"])
def vipDonors():
    # Empty array for donor data
    vipDonors = []

    # Request donor profiles from database, stored in Cursor object
    vipDonorsCursor = db.vipDonors.find()
    
    # Adds each donor to the donors array
    for donor in vipDonorsCursor:
        addDonor = {"_id": str(vipDonors["_id"]), "name": vipDonors["name"], "image": donor["image"]}
        vipDonors.append(addDonor)
    
    # Returns a jsonified object of artists profiles
    return jsonify(vipDonors)


# Retrieves art work data
@app.route("/artworks", methods=["GET"])
def artworks():
    # Empty array for artwork data
    artworks = []

    # Request artwork profiles from database, stored in Cursor object
    artworksCursor = db.artworks.find()
    
    # Adds each donor to the donors array
    for artworks in artworksCursor:
        addWork = {"_id": str(artworks["_id"]), "image": artworks["image"], "title": work["title"], "artistid": work["artistid"], "description": work["description"], "buyerid": work["buyerid"], "price": float(str(work["price"])), "sponsor": work["sponsor"], "reddotstatus": work["reddotstatus"]}
        artworks.append(addWork)
    
    # Returns a jsonified object of artists profiles
    return jsonify(artworks)

# Handles reservations
@app.route("/reservation", methods=["GET", "POST"])
def makeReservation():
    if request.method == "POST":

        reservationObject= request.get_json()

        db.artworks.find_one_and_update(
            {"_id" : ObjectId(reservationObject["workId"])},
            {"$set": {
                       "buyerid" : reservationObject["donorId"],
                       "reddotstatus": "Reserved"}})

 
        #socketio.emit("reserved", channel, broadcast=True)


        return ""
    else:
        return "hi"