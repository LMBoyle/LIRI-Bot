require("dotenv").config();

var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
const axios = require('axios');
var moment = require('moment');

var input = process.argv[2];

// concert-this
if (input === "concert-this") {
  displayConcertInfo();
}
// spotify-this-song
else if (input === "spotify-this-song") {
  displaySpotifyInfo();
}
// movie-this
else if (input === "movie-this") {
  displayMovieInfo()
}
// do-what-it-says
else if (input === "do-what-it-says") {
  displayWhatItSays();
}

// TODO bands API
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




// TODO spotify API
// TODO "The Sign" by Ace of Base
function displaySpotifyInfo() {
  console.log("Spotify This");

  // TODO Artist(s)
  // TODO Song Name
  // TODO Preview Link
  // TODO Album
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
}

function displayWhatItSays() {
  console.log("Do What It Says");

  // TODO random.txt
}