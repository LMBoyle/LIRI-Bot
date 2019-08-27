require("dotenv").config();
var fs = require("fs");

var keys = require("./keys.js");
const axios = require('axios');
var moment = require('moment');

var input = process.argv[2];

// Concert-this
if (input === "concert-this") {
  displayConcertInfo(process.argv[3]);
}
// Spotify-this-song
else if (input === "spotify-this-song") {
  displaySpotifyInfo(process.argv[3]);
}
// Movie-this
else if (input === "movie-this") {
  displayMovieInfo(process.argv[3])
}
// Do-what-it-says
else if (input === "do-what-it-says") {
  displayWhatItSays();
}

// Bands API
function displayConcertInfo(str) {
  console.log("Concert This");

  var artist = str.replace("-", "%20").replace(" ", "%20");

  var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

  axios({
    url: queryURL,
    method: "get"
  }).then(function(data, err) {
    if (err){
      console.log("Error: ", err);
    }
    // Response
    var response = data.data[0];

    if (response === undefined) {
      console.log("No Upcoming Concerts")
    }
    else {
      // Venue
      var venue = response.venue.name;
      // Venue Location
      var location = response.venue.city;
      // Event Date
      var date = response.datetime;
      // Format Event Date
      var formatDate = moment(date).format("MM/DD/YYYY");
      // Text
      var text = "======Concert======\nVenue: " + venue + "\nLocation: " + location + "\nDate: " + formatDate + "\n";

      // Write to File
      fs.appendFile("log.txt", text, function(err) {
        if (err) {
          console.log("Error: ", err)
        }
        else {
          console.log("Content Added")
        }
      })

      // Display
      console.log("Venue: ", venue)
      console.log("Venue Location: ", location)
      console.log("Event Date: ", formatDate)
    }
  });
}

// Spotify API
function displaySpotifyInfo(song) {
  var Spotify = require('node-spotify-api');

  var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
  });

  // Default to "The Sign" by Ace of Base
  if (song === undefined) {
    song = "The Sign"
  }

  spotify.search({
    type: "track",
    query: song
  }, function(err, data) {
    if (err) {
      return console.log("Error: " + err);
    }
    else if (song === "The Sign") {
      // Data
      var data = data.tracks.items[2];
    }
    else {
      // Data
      var data = data.tracks.items[0];
    }

    // Artist(s)
    for (a = 0; a < data.artists.length; a++) {
      var artist = data.artists[a].name
      
      console.log("Artist(s): ", artist)
    };
    // Song Name
    var songName = data.name
    // Preview Link
    var link = data.external_urls.spotify;
    // Album
    var album = data.album.name
    // Text
    var text = "======Song======\nSong: " + songName + "\nPreview: " + link + "\nAlbum: " + album + "\n";

    // Write to File
    fs.appendFile("log.txt", text, function(err) {
      if (err) {
        console.log("Error: ", err)
      }
      else {
        console.log("Content Added")
      }
    })

    // Display
    console.log("Song: ", songName);
    console.log("Preview: ", link);
    console.log("Album: ", album);
  });
}

// OMDB API
function displayMovieInfo(movie) {
  console.log("Movie This");
  
  // Default to Mr. Nobody
  if (movie === undefined) {
    movie = "Mr Nobody"
  }

  var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

  axios({
    url: queryURL,
    method: "get"
  }).then(function(data, err) {
    if (err) {
      return console.log("Error: ", err);
    }

    // Response
    var response = data.data
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
    // Text
    var text = "======Movie======\nTitle: " + title + "\nYear Released: " + released + "\nIMDB Rating: " + imdb + "\nRotten Tomatoes Rating: " + tomatoes + "\nCountry Produced: " + country + "\nPlot: " + plot + "\nActor(s): " + actor + "\n";

    // Write to File
    fs.appendFile("log.txt", text, function(err) {
      if (err) {
        console.log("Error: ", err)
      }
      else {
        console.log("Content Added")
      }
    })

    // Display
    console.log("Title: ", title)
    console.log("Year Released: ", released)
    console.log("IMDB Rating: ", imdb)
    console.log("Rotten Tomatoes Rating: ", tomatoes)
    console.log("Country Produced: ", country)
    console.log("Language: ", lang)
    console.log("Plot: ", plot)
    console.log("Actor(s): ", actor)
  });
};

// Do What It Says
function displayWhatItSays() {
  console.log("Do What It Says");

  // Random.txt
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }

    // console.log(data);

    var dataArr = data.split(",");
    if (dataArr[0] === "concert-this") {
      displayConcertInfo(dataArr[1]);
    }
    // Spotify-this-song
    else if (dataArr[0] === "spotify-this-song") {
      displaySpotifyInfo(dataArr[1]);
    }
    // Movie-this
    else if (dataArr[0] === "movie-this") {
      displayMovieInfo(dataArr[1])
    }
    // Do-what-it-says
    else if (dataArr[0] === "do-what-it-says") {
      displayWhatItSays(dataArr[1]);
    }
  });
  
}