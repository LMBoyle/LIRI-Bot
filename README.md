# LIRI Bot

Look up your favorite artist/band, song or movie and get back data for each

## Installation
To use, first clone the repository to your local machine.

    $ https://github.com/LMBoyle/liriBot.git

Or

    $ git@github.com:LMBoyle/liriBot.git

Then add an .env file at the root of the app containing your Spotify API keys. You can get a key [here](https://developer.spotify.com/documentation/web-api/)

Add the following to your .env file:

    SPOTIFY_ID=<your spotify id here>
    SPOTIFY_SECRET=<your spotify secret here>

## Instructions
Start each line with `node liri.js` and use the commands below to search.

To look up a band enter `concert-this` followed by the name of an artist or band.

To look up a song enter `spotify-this-song` followed by the name of a song.

To look up a movie enter `movie-this` followed by the name of a movie.

Enter `do-what-it-says` for a surprise!

All the data is also saved in log.txt.

## Built With...
* JavaScript
* Node.js
* Bands in Town API
* Node Spotify API
* OMDB API

## Demo

![Demo Gif](liriDemo.gif)

## Future Development/Improvements
- [ ] Add more things to let user look up
- [ ] Incorporate inquirer (or something similar)

[Luke Boyle](https://lmboyle.github.io/)
