require("dotenv").config();

var keys = require("./keys.js");
const axios = require('axios');
var moment = require('moment');

var input = process.argv[2];

// Concert-this
if (input === "concert-this") {
  displayConcertInfo();
}
// Spotify-this-song
else if (input === "spotify-this-song") {
  displaySpotifyInfo();
}
// Movie-this
else if (input === "movie-this") {
  displayMovieInfo()
}
// Do-what-it-says
else if (input === "do-what-it-says") {
  displayWhatItSays();
}

// Bands API
function displayConcertInfo() {
  console.log("Concert This");

  var str = process.argv[3];
  var artist = str.replace("-", "%20");

  var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

  axios({
    url: queryURL,
    method: "get"
  }).then(function(response) {
    var response = response.data[0];
    // Venue
    var venue = response.venue.name;
    // Venue Location
    var location = response.venue.city;
    // Event Date
    var date = response.datetime;
    // Format Event Date
    var formatDate = moment(date).format("MM/DD/YYYY");

    // Display
    console.log("Venue: ", venue)
    console.log("Venue Location: ", location)
    console.log("Event Date: ", formatDate)
  });
}

// Spotify API
// TODO "The Sign" by Ace of Base
function displaySpotifyInfo() {
  var Spotify = require('node-spotify-api');

  var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
  });

  var song = process.argv[3];

  spotify.search({
    type: "track",
    query: song
  }, function(err, data) {
    if (err) {
      return console.log("Error Occured: " + err);
    }
    // Data
    var data = data.tracks.items[0];
    // Artist(s)
    var artist = data.artists[0].name
    // TODO Song Name
    var songName = data.name
    // TODO Preview Link
    var link = data.external_urls.spotify;
    // TODO Album
    var album = data.album.name

    // Console Logs
    console.log("Artist(s): ", artist);
    console.log("Song: ", songName);
    console.log("Preview: ", link);
    console.log("Album: ", album);
  })


  

}

// OMDB API
function displayMovieInfo() {
  console.log("Movie This");

  var movie = process.argv[3];
  var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

  axios({
    url: queryURL,
    method: "get"
  }).then(function(response) {
    var response = response.data

    // Title
    var title = response.Title;
    // Year
    var released = response.Released;
    // IMDB Rating
    var imdb = response.Ratings[0].Value;
    // Rotten Tomatoes Rating
    var tomatoes = response.Ratings[2].Value;
    // Country Produced
    var country = response.Country;
    // Language
    var lang = response.Language;
    // Plot
    var plot = response.Plot;
    // Actors
    var actor = response.Actors;

    // Display
    console.log("Title: ", title)
    console.log("Year Released: ", released)
    console.log("IMDB Rating: ", imdb)
    console.log("Rotton Tomato Rating: ", tomatoes)
    console.log("Country Produced: ", country)
    console.log("Language: ", lang)
    console.log("Plot: ", plot)
    console.log("Actor(s): ", actor)
  });
};

// Do What It Says
function displayWhatItSays() {
  console.log("Do What It Says");

  // TODO random.txt
}