console.log("Windahbot booting up.");

const twitterUsername = '@BangWindahBot';

//making sure npm run develop works
if (process.env.NODE_ENV === "develop") {
    require('dotenv').config();
};

//rules for node-schedule
var schedule = require("node-schedule");

//schedule utk greetings , tz = gmt+0
var goodMorning = new schedule.RecurrenceRule();
goodMorning.hour = 23;
goodMorning.minute = 0;


var goodAfternoon = new schedule.RecurrenceRule();
goodAfternoon.hour = 5;
goodAfternoon.minute = 0;


var goodEvening = new schedule.RecurrenceRule();
goodEvening.hour = 8;
goodEvening.minute = 35;


var goodNight = new schedule.RecurrenceRule();
goodNight.hour = 14;
goodNight.minute = 0;



//array to pull soundtracks from
var windahImpression = [
    "adik adik terkedick kedick.", // Legend of Zelda
    "adik adik sekalian.",
    "teman Teman sekalian.",
    "adik adik.",
    "teman teman.",
    "guys",
    "teman teman, dan para perempuan, dan adik adik diluar sana.",
    "adik adik, kita absen dulu. Yang bilang 'absen' pake emot.",
    "teman teman, kita absen dulu. Yang bilang 'absen' pake emot.",
    "adik adik diluar sana.",
    "teman teman adik adik sekalian."
  ];
var windahImpressionLength = windahImpression.length;

// ... append to bottom of file:

// Create a Twitter client object to connect to the Twitter API
var Twit = require('twit');

// Pulling keys from another file
var config = require('./config.js');
// Making a Twit object for connection to the API
var T = new Twit(config);

// Setting up a user stream
var stream = T.stream('statuses/filter', { track: twitterUsername });

// Now looking for Tweet events
// See: https://dev.Twitter.com/streaming/userstreams
stream.on('tweet', pressStart);

// ... append to bottom of file:

function pressStart(tweet) {
    console.log(tweet);
    var id = tweet.id_str;
    var text = tweet.text;
    var name = tweet.user.screen_name;
    var rootTweetId = tweet.in_reply_to_status_id_str;
    var rootUserName = tweet.in_reply_to_screen_name;
    console.log("id :" + id + " text: " + text + " name: " + name);
    let absen = /(absen)/gi;
    let keren = /(keren)/gi;
    let halo = /(halo)/gi;
    let hallo = /(hallo)/gi;
    let bohong = /(bohong)/gi;
    let regexAbsen = text.match(absen) || [];
    let regexAbsen2 = regexAbsen.length > 0;

    let regexKeren = text.match(keren) || [];
    let regexKeren2 = regexKeren.length > 0;
  
    let regexhalo = text.match(halo) || [];
    let regexhalo2 = regexhalo.length > 0;
    let regexhalo3 =  text.match(hallo) || [];
    let regexhalo4 = regexhalo3.length > 0;

    let regexBohong = text.match(bohong) || [];
    let regexBohong2 = regexBohong.length > 0;
    //this helps with errors, so you can see if the regex matched and if playerTwo is true or false
    
  
  
    // checks text of tweet for mention of SNESSoundtracks
    if (text.includes(twitterUsername) && regexAbsen2 === true) {
  
      // Start a reply back to the sender
      var replyText = ("Ada @" + name);
  
      // Post that tweet
      T.post('statuses/update', { in_reply_to_status_id: id , status: replyText  }, gameOver);
        
    }
    else if(text.includes(twitterUsername) && regexKeren2 === true) {
        // Start a reply back to the sender
      var replyText = ("Keren @" + rootUserName + " walaupun gaada yang peduli.");
  
      if(rootUserName !== null){
        T.post('statuses/update', { in_reply_to_status_id: rootTweetId , status: replyText  }, gameOver);
      };
    }
    else if(text.includes(twitterUsername) && regexhalo2 === true ) {
        // Start a reply back to the sender
      var replyText = ("Halo @" + name + " apa kabar?");
  
      // Post that tweet
      console.log("Jadi reply ke : " + id)
      T.post('statuses/update', { in_reply_to_status_id: id , status: replyText  }, gameOver);
    }
    else if(text.includes(twitterUsername) && regexhalo4 === true) {
      // Start a reply back to the sender
    var replyText = ("Halo @" + name + " apa kabar?");

    // Post that tweet
    console.log("Jadi reply ke : " + id)
    T.post('statuses/update', { in_reply_to_status_id: id , status: replyText  }, gameOver);
  }
    else if(text.includes(twitterUsername) && regexBohong2 === true ) {
      // Start a reply back to the sender
    //var replyText = ("Jangan bohong kamu @" + rootUserName + " kata @" + name);
    var replyText = ("Jangan bohong kamu @" + rootUserName);
    // Post that tweet
    console.log("Jadi reply ke : " + id)
    if(rootUserName !== null){
      T.post('statuses/update', { in_reply_to_status_id: rootTweetId , status: replyText  }, gameOver);
    }
    
   }
    else {
      console.log("uh-uh-uh, they didn't say the magic word.");
    };
  
    function gameOver(err, reply) {
      if (err) {
        console.log(err.message);
        console.log("Game Over");
      } else {
        console.log('Tweeted: ' + reply.text);
      }
    };
  }

  function morning() {
    var windahImpressionElement = Math.floor(Math.random() * windahImpressionLength);
    var morningText = "Selamat Pagi " + windahImpression[windahImpressionElement];
    T.post('statuses/update', { status: morningText }, gameOver);

    function gameOver(err, reply) {
        if (err) {
          console.log(err.message);
          console.log("ADUH APASIH GAIS GAJELAS");
        } else {
          console.log('Tweeted: ' + reply.text);
        }
      }
  }

  function afternoon() {
    var windahImpressionElement = Math.floor(Math.random() * windahImpressionLength);
    var morningText = "Selamat Siang "+ windahImpression[windahImpressionElement];
    T.post('statuses/update', { status: morningText }, gameOver);

    function gameOver(err, reply) {
        if (err) {
          console.log(err.message);
          console.log("ADUH APASIH GAIS GAJELAS");
        } else {
          console.log('Tweeted: ' + reply.text);
        }
      }
  }

  function evening() {
    var windahImpressionElement = Math.floor(Math.random() * windahImpressionLength);
    var morningText = "Selamat Sore "+ windahImpression[windahImpressionElement];
    T.post('statuses/update', { status: morningText }, gameOver);

    function gameOver(err, reply) {
        if (err) {
          console.log(err.message);
          console.log("ADUH APASIH GAIS GAJELAS");
        } else {
          console.log('Tweeted: ' + reply.text);
        }
      }
  }

  function night() {
    var windahImpressionElement = Math.floor(Math.random() * windahImpressionLength);
    var morningText = "Selamat Malam "+ windahImpression[windahImpressionElement];
    T.post('statuses/update', { status: morningText }, gameOver);

    function gameOver(err, reply) {
        if (err) {
          console.log(err.message);
          console.log("ADUH APASIH GAIS GAJELAS");
        } else {
          console.log('Tweeted: ' + reply.text);
        }
      }
  }

  const goodMorningTweet = schedule.scheduleJob(goodMorning, morning);
  const goodAfternoonTweet = schedule.scheduleJob(goodAfternoon, afternoon);
  const goodEveningTweet = schedule.scheduleJob(goodEvening, evening);
  const goodNightTweet = schedule.scheduleJob(goodNight, night);

  