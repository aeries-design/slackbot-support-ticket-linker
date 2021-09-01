//DEPENDENCIES
const express = require('express');
const router = express.Router();
const axios = require('axios')
const request = require('request');

require('dotenv').config();

//GET SECRETS/ETC FROM ENV
const siteURL = process.env.SITE_URL;
const slackBotToken = process.env.SLACK_BOT_TOKEN;

router.get('/hi', function (req, res, next) {
  res.json(["HI"]);
})

router.post('/slack/receive/', function (req, res, next) {

  var token = slackBotToken;
  var body = req.body;
  var sendMessage = false;
  var responseURL = "";
  var responseObject = {};

  console.log(body);

  if (body.hasOwnProperty('event')) {
    if (body.event.type == 'message'
      && (body.event.hasOwnProperty('subtype') == false)) { // Making sure only new messages (and file shares) prompt messages.
      if (body.event.hasOwnProperty('bot_profile') == false
        && body.event.hasOwnProperty('thread_ts') == false) {

        //HOPEFULLY THIS STOPS IT RESPONDING TO ITSELF
        if (body.event.hasOwnProperty('bot_id') == false) {

          //WHEN SOMEONE POSTS IN A CHANNEL I'M IN

          sendMessage = true;
          responseURL = "https://slack.com/api/chat.postMessage"

          responseObject = {
            "icon_url": siteURL + "/images/aeriesbot.png",
            "channel": body.event.channel,
            "thread_ts": body.event.ts,
            "blocks": [
              {
                "type": "section",
                "text": {
                  "type": "mrkdwn",
                  "text": "Ticket link"
                }
              }
            ]
          }
        }
      }
    }
  }

  if (sendMessage == true) {
    console.log("Sending message :", responseURL, responseObject)
    request(
      {
        url: responseURL,
        json: true,
        method: 'POST',
        body: responseObject,
        headers: {
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json"
        }
      },

      //Sprint Planning doc
      function (error, response, body) {
        console.log(body)
        res.send(200);
      })
  } else {
    res.send(200);
  }

});

module.exports = router;
