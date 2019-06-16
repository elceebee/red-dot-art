from werkzeug.security import check_password_hash, generate_password_hash
from werkzeug.exceptions import default_exceptions, HTTPException, InternalServerError
from collections import deque
from flask_socketio import SocketIO, emit
import time
import os
from pprint import pprint
from bson.objectid import ObjectId
from pymongo import MongoClient
from flask import Flask, flash, jsonify, render_template, request, session, abort
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app)

client = MongoClient("mongodb://localhost:27017")
db = client["red-dot-art"]

app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)


@app.route("/")
def home():
    serverStatusResult = db.command("serverStatus")
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
        addProfile = {"id": str(profile["_id"]), "image": profile["image"], "name": profile["name"], "programme": profile["programme"],
                      "youtube": profile["youtube"], "instagram": profile["instagram"], "facebook": profile["facebook"], "web": profile["web"]}
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
        addDonor = {"id": str(
            donor["_id"]), "name": donor["name"], "image": donor["image"]}
        vipDonors.append(addDonor)

    # Returns a jsonified object of artists profiles
    return jsonify(vipDonors)


# Retrieves art work data
@app.route("/artworks", methods=["GET"])
def artWorks():
    # Empty array for artwork data
    artWorks = []

    # Request artworks  from database, stored in Cursor object
    artWorksCursor = db.artWorks.find()

    # Adds each work to the artWorks array
    for work in artWorksCursor:
        addWork = {"id": str(work["_id"]), "image": work["image"], "title": work["title"], "artistid": work["artistid"], "description": work["description"],
                   "buyerid": work["buyerid"], "price": float(str(work["price"])), "sponsor": work["sponsor"], "reddotstatus": work["reddotstatus"]}
        artWorks.append(addWork)

    # Returns a jsonified object of artists profiles
    return jsonify(artWorks)

# Handles reservations
@app.route("/reservation", methods=["POST"])
def makeReservation():
    if request.method == "POST":
        reservationObject = request.get_json()

        # Updates the database, recording the donor as the buyer, and changing status to reserved.
        db.artWorks.find_one_and_update(
            {"_id": ObjectId(reservationObject["workId"])},
            {"$set": {
                "buyerid": reservationObject["donorId"],
                "reddotstatus": "Reserved"}})

        # Updates reddotstatus on the client side of the work identified in the reservationObject
        socketio.emit(
            "Reserved", {"id": reservationObject["workId"]}, broadcast=True)

        return ""
    else:
        return "hi"
