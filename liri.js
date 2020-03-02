//nrequire("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require('moment');

//var spotify = new Spotify(keys.spotify);

let command = process.argv[2];
let thirdArg = process.argv.slice(3).join("+");


switch (command) {
    case "concert-this":
        bandsInTown();
        break;
    case "spotify-this-song":
        spotify();
        break;
    case "movie-this":
        omdb();
        break;
    case "do-what-it-says":
        dowhatItSays();
        break;
}

function bandsInTown(){

    axios.get("https://rest.bandsintown.com/artists/"+ thirdArg +"/events?app_id=codingbootcamp").then(function(response){
        let txtHtml = '';
        for(let i=0; i<response.data.length; i++){
           txtHtml += '\n===================================================================\n';
           txtHtml += `Name of the Venue: ${response.data[i].venue.name}
           Venue Location: ${response.data[i].venue.city} ${response.data[i].venue.country}
           Date of the Event: ${moment(response.data[i].datetime).format("MM/DD/YY")}`;
        }

        console.log(txtHtml);

    });
}


function omdb(){
    url = "http://www.omdbapi.com/?apikey=trilogy&t="+ thirdArg ;
    let txtHtml = '';
    axios.get(url).then(function(response){
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









