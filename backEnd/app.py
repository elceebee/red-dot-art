# This files handles requests to the backend of the application.
# Emits changes to the front end via socket io.

from flask_socketio import SocketIO, emit
from pprint import pprint
from bson.objectid import ObjectId
from pymongo import MongoClient
from flask import Flask, flash, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app)

# See ReadMe file for how to set up data in a local mongodb for testing app.
client = MongoClient("mongodb://localhost:27017")
db = client["red-dot-art"]

app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)


@app.route("/")
def home():
    serverStatusResult = db.command("serverStatus")
    pprint(serverStatusResult)
    return ""


@app.route("/artistsprofiles", methods=["GET"])
# Returns artistsprofile data to the client
def profileData():
    artistsProfiles = []
    artistsProfilesCursor = db.artistsProfiles.find()
    for profile in artistsProfilesCursor:
        addProfile = {"id": str(profile["_id"]), "image": profile["image"], "name": profile["name"], "programme": profile["programme"],
                      "youtube": profile["youtube"], "instagram": profile["instagram"], "facebook": profile["facebook"], "web": profile["web"]}
        artistsProfiles.append(addProfile)

    return jsonify(artistsProfiles)


@app.route("/vipdonors", methods=["GET"])
# Returns vipdonor data to the client
def vipDonors():
    vipDonors = []
    vipDonorsCursor = db.vipDonors.find()
    for donor in vipDonorsCursor:
        addDonor = {"id": str(
            donor["_id"]), "name": donor["name"], "image": donor["image"]}
        vipDonors.append(addDonor)

    return jsonify(vipDonors)


@app.route("/artworks", methods=["GET"])
# Returns artWork data to the client
def artWorks():
    artWorks = []
    artWorksCursor = db.artWorks.find()
    for work in artWorksCursor:
        addWork = {"id": str(work["_id"]), "image": work["image"], "title": work["title"], "artistid": work["artistid"], "description": work["description"],
                   "buyerid": work["buyerid"], "price": float(str(work["price"])), "sponsor": work["sponsor"], "reddotstatus": work["reddotstatus"]}
        artWorks.append(addWork)

    return jsonify(artWorks)


@app.route("/reservation", methods=["POST"])
# Handles reservations made on the client side
# Emits changes with socketio to avoid multiple reservations against an object
def makeReservation():
    if request.method == "POST":
        reservationObject = request.get_json()
        db.artWorks.find_one_and_update(
            {"_id": ObjectId(reservationObject["workId"])},
            {"$set": {
                "buyerid": reservationObject["donorId"],
                "reddotstatus": "Reserved"}})
        socketio.emit(
            "Reserved", {"id": reservationObject["workId"]}, broadcast=True)

        return ""
    else:
        return ""
