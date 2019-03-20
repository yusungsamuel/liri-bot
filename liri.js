require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require("node-spotify-api")

var spotify = new Spotify(keys.spotify);

var axios = require("axios")

var inquirer = require("inquirer")

var moment = require("moment")

function initiate () {
    inquirer.prompt([
        {
            type: "list",
            message: "What can I do for you?",
            name: "option",
            choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"]
        }
    ]).then(function(response){
        if (response.option === "concert-this"){
            concertPrompt()
        }
        else if (response.option === "spotify-this-song"){
            
        }
        else if (response.option === "movie-this"){
            moviePrompt()
        }
        else if (response.option === "do-what-it-says"){
            
        }
    }) 
}

function concertPrompt (){
        
    inquirer.prompt([
        {
            type: "input",
            name: "artist",
            message: "Who's concert are planning to go to?",
            default: "Katy Perry"
        }
    ]).then(function (answer){
        axios.get("https://rest.bandsintown.com/artists/" + answer.artist + "/events?app_id=codingbootcamp").then(function(axiosResponse){
        console.log("Venue's Name: " + axiosResponse.data[0]["venue"]["name"])
        console.log("Venue's Location: " + axiosResponse.data[0]["venue"]["city"] + " ," + axiosResponse.data[0]["venue"]["country"])
        console.log("Date of the Event: " + moment(axiosResponse.data[0]["datetime"]).format("MM/DD/YYYY"))
        })
    })
    
}

function moviePrompt (){
        
    inquirer.prompt([
        {
            type: "input",
            name: "movie",
            message: "What movie do you want to watch?",
            default: "Inception"
        }
    ]).then(function (answer){
        axios.get("http://www.omdbapi.com/?t=" + answer.movie + "&apikey=trilogy" ).then(function(axiosResponse){
            console.log("Title: " + axiosResponse.data["Title"])
            console.log("This movie was released in " + axiosResponse.data["Year"])
            console.log("IMDB rating: " + axiosResponse.data["Ratings"][0]["Value"])
            console.log("Rotten Tomatoes rating: " + axiosResponse.data["Ratings"][1]["Value"])
            console.log("Country Origin: " + axiosResponse.data["Country"])
            console.log("Language: " + axiosResponse.data["Language"])
            console.log("Plot: " + axiosResponse.data["Plot"])
            console.log("Cast: " + axiosResponse.data["Actors"])
        })
    })
    
}

function spotifyPrompt () {
}

initiate()