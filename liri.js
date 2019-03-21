require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require("node-spotify-api")

var spotify = new Spotify(keys.spotify);

var axios = require("axios")

var inquirer = require("inquirer")

var moment = require("moment")

var fs = require("fs")

var chalk = require("chalk")

function initiate() {
    inquirer.prompt([
        {
            type: "list",
            message: "What can I do for you?",
            name: "option",
            choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says", "nothing!"]
        }
    ]).then(function (response) {
        if (response.option === "concert-this") {
            concertPrompt()
        }
        else if (response.option === "spotify-this-song") {
            spotifyPrompt()
        }
        else if (response.option === "movie-this") {
            moviePrompt()
        }
        else if (response.option === "do-what-it-says") {
            doWhatItSays()
        }
        else {
            console.log()
        }
    })
}

function concertPrompt() {

    inquirer.prompt([
        {
            type: "input",
            name: "artist",
            message: "Who's concert are planning to go to?",
            default: "Katy Perry"
        }
    ]).then(function (answer) {
        axios.get("https://rest.bandsintown.com/artists/" + answer.artist + "/events?app_id=codingbootcamp").then(function (axiosResponse) {
            console.log(chalk.bold("Venue's Name: ") + axiosResponse.data[0]["venue"]["name"])
            console.log(chalk.bold("Venue's Location: ") + axiosResponse.data[0]["venue"]["city"] + " ," + axiosResponse.data[0]["venue"]["country"])
            console.log(chalk.bold("Date of the Event: ") + moment(axiosResponse.data[0]["datetime"]).format("MM/DD/YYYY"))
            initiate()
        })
    })

}

function moviePrompt() {

    inquirer.prompt([
        {
            type: "input",
            name: "movie",
            message: "What movie do you want to watch?",
            default: "Inception"
        }
    ]).then(function (answer) {
        axios.get("http://www.omdbapi.com/?t=" + answer.movie + "&apikey=trilogy").then(function (axiosResponse) {
            console.log(chalk.bold("Title: ") + axiosResponse.data["Title"])
            console.log(chalk.bold("This movie was released in ") + axiosResponse.data["Year"])
            console.log(chalk.bold("IMDB rating: ") + axiosResponse.data["Ratings"][0]["Value"])
            console.log(chalk.bold("Rotten Tomatoes rating: ") + axiosResponse.data["Ratings"][1]["Value"])
            console.log(chalk.bold("Country Origin: ") + axiosResponse.data["Country"])
            console.log(chalk.bold("Language: ") + axiosResponse.data["Language"])
            console.log(chalk.bold("Plot: ") + axiosResponse.data["Plot"])
            console.log(chalk.bold("Cast: ") + axiosResponse.data["Actors"])
            initiate()
        })
    })

}

function spotifyPrompt() {
    inquirer.prompt([
        {
            type: "input",
            message: "What song are you looking for?",
            name: "song",
            default: "The Sign"
        }
    ]).then(function (answer) {
        spotify.search({ type: 'track', query: answer.song, limit: 1 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            console.log(chalk.bold("Artist: ") + data["tracks"].items[0].artists[0].name)
            console.log(chalk.bold("Song Name: ") + data["tracks"].items[0].name)
            console.log(chalk.bold("Preview Link: ") + data["tracks"].items[0].album["external_urls"].spotify)
            console.log(chalk.bold("Album Name: ") + data["tracks"].items[0].album.name)

            initiate()
        })

    })
}

function doWhatItSays() {
    fs.readFile('random.txt', "utf8", (err, data) => {
        if (err) throw err;
        // console.log(data)
        var dataArr = data.split(",")
        spotify.search({ type: 'track', query: dataArr[1], limit: 1 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log(chalk.bold("Artist: ") + data["tracks"].items[0].artists[0].name);
            console.log(chalk.bold("Song Name: ") + data["tracks"].items[0].name);
            console.log(chalk.bold("Preview Link: ") + data["tracks"].items[0].album["external_urls"].spotify);
            console.log(chalk.bold("Album Name: ") + data["tracks"].items[0].album.name);

            initiate();
        });
    })
}


initiate()