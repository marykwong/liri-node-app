require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

//fs library
var fs = require("fs");

//variables for the input
var whichAPI = process.argv[2];
var name = process.argv[3];

//switch statement depending on first input 

switch(whichAPI) {
    case "spotify-this-song":
    spot(name);
    break;

    case "concert-this":
    bandsInTown(name);
    break;
    
    case "movie-this":
    movie(name);
    break;

    case "do-what-it-says":
    doWhat(name);
    break;
}

//spotify function 

function spot(name) {
    //no song picked
    if(!name)
    {
        name = "The Sign";
    }
    else{
        
    }

}