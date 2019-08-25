require("dotenv").config();

var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);

var input = process.argv[2];

// TODO concert-this
if (input === "concert-this") {
  displayConcertInfo();
}
// TODO spotify-this-song
else if (input === "spotify-this-song") {
  displaySpotifyInfo();
}
// TODO movie-this
else if (input === "movie-this") {
  displayMovieInfo()
}
// TODO do-what-it-says
else if (input === "do-what-it-says") {
  displayWhatItSays();
}

// TODO bands API
// "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
function displayConcertInfo() {
  console.log("Concert This")
}

// TODO spotify API
// TODO "The Sign" by Ace of Base
function displaySpotifyInfo() {
  console.log("Spotify This")
}

// OMDB API
function displayMovieInfo() {
  console.log("Movie This")

  /*
  var movie = process.argv[3];
  var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

  // Creating an AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    var rating = response.Rated;

    var released = response.Released;

    var plot = response.Plot;
  


  });
  */
}

function displayWhatItSays() {
  console.log("Do What It Says")
}