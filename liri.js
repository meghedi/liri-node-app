require("dotenv").config();

var keys = require("./keys");
var axios = require("axios");
var moment = require('moment');
var fs = require("fs");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

let command = process.argv[2];
let userInput = process.argv.slice(3).join("+");

main(command);

function main(command) {
    switch (command) {
        case "concert-this":
            bandsInTown();
            break;
        case "spotify-this-song":
            spotifySearch();
            break;
        case "movie-this":
            omdb();
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
    }
}

function bandsInTown() {

    axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp").then(function (response) {
        let txtHtml = '';
        for (let i = 0; i < response.data.length; i++) {
            txtHtml += '\n===================================================================\n';
            txtHtml += `Name of the Venue: ${response.data[i].venue.name}
           Venue Location: ${response.data[i].venue.city} ${response.data[i].venue.country}
           Date of the Event: ${moment(response.data[i].datetime).format("MM/DD/YY")}`;
        }

        console.log(txtHtml);

    });
}


function omdb() {
    if(!userInput){
       userInput = 'Mr Nobody';
    }
    url = "http://www.omdbapi.com/?apikey=trilogy&t=" + userInput;
    let txtHtml = '';
    axios.get(url).then(function (response) {
        let res = response.data;
        txtHtml += `
         * Title of the movie : ${res.Title}
         * Year the movie came out : ${res.Year}
         * IMDB Rating of the movie: ${res.imdbRating}
         * Rotten Tomatoes Rating of the movie: ${res.Ratings[1].Value}
         * Country where the movie was produced: ${res.COuntry}
         * Language of the movie: ${res.Language}
         * Plot of the movie: ${res.Plot}
         * Actors in the movie: ${res.Actors}`;

        console.log(txtHtml);
    });
}


function spotifySearch(){
    spotify.search({ type: 'track', query: userInput }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        let txtHtml='';
        for(let i=0; i<3; i++){
            txtHtml += `
            ===========================================
            Artists : ${data.tracks.items[i].artists[0].name}
            Song Name: ${data.tracks.items[i].name}
            Preview Link: ${data.tracks.items[i].external_urls.spotify}
            Album Name: ${data.tracks.items[i].album.name}
            `;
        }
       
      console.log(txtHtml); 
      });
}


function doWhatItSays() {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if(err){
            console.log(err);
        }
        let firstCommand = data.split(",")[0];
        let secondCommand = data.split(",")[1];
         command = firstCommand;
         userInput = secondCommand;

         main(command);
        });
}











