require("dotenv").config();
var keys = require("./keys.js");

//fs library
var fs = require("fs");

//setting up variables
var Spotify = require('node-spotify-api')
var Spotify = new Spotify(keys.spotify)
var moment = require("moment")
var axios = require("axios")


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
    doWhat();
    break;
}

//spotify function 
function spot(name) {
    //no song picked
    if(name === undefined)
    {
        name = "The Sign";
    }
        
    Spotify.search(
        { type: 'track', query: name }, 
        //error
        function(err, data) {
		if (err){
	        console.log('Error occurred: ' + err);
	        return;
        }
        //print this
        console.log("---------------------------")
	    console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
	    console.log("Song: " + data.tracks.items[0].name);
	    console.log("Preview: " + data.tracks.items[0].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("---------------------------")
	});  

}

//movie function
function movie(name) {

    //nothing input, default to this
	if (name === undefined){
        name = "Mr Nobody";
    }

    axios.get("http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=trilogy").then(
	function (response) {
        console.log("---------------------------")
		console.log("Title: " + response.data.Title);
		console.log("Release Year: " + response.data.Year);
		console.log("IMDB Rating: " + response.data.imdbRating);
		console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
		console.log("Country: " + response.data.Country);
		console.log("Language: " + response.data.Language);
		console.log("Movie Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
        console.log("---------------------------")
        }
    )
};

//bandsintown function
function bandsInTown(name){
    axios.get("https://rest.bandsintown.com/artists/" + name + "/events?app_id=codingbootcamp").then(
        function (response) {
            response.data.forEach(concert => {
            console.log("---------------------------")
            console.log(concert.venue.name)
            console.log(concert.venue.city + ", " + concert.venue.region)
            console.log(moment(concert.datetime).format("MM/DD/YYYY"))
            console.log("---------------------------")
            })
        }
    );
}

//doWhat function

function doWhat() {
	fs.readFile('random.txt', "utf8", function(error, data){

		if (error) {
    		return console.log(error);
  		}

		// split by commas 
		var textData = data.split(",");
		if (textData[0] === "spotify-this-song") {
            //extract 2nd and 2nd to last element
			var thisSong = textData[1].slice(1, -1);
			spot(thisSong);
        } 

        if (textData[0] === "concert-this") {
			var artist = textData[1].slice(1, -1);
			bandsInTown(artist);
        }  
        
        if(textData[0] === "movie-this") {
			var movieName = textData[1].slice(1, -1);
			movie(movieName);
		} 
		
  	});

};




