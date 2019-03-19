require("dotenv").config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var axios = require("axios")

var inquirer = require("inquirer")

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

        }
        else if (response.option === "spotify-this-song"){
            
        }
        else if (response.option === "movie-this"){
            
        }
        else if (response.option === "do-what-it-says"){
            
        }
    }) 
}

