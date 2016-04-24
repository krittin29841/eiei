var express = require('express')
var request = require('request')
var app = express()
var bodyParser = require('body-parser')
var token = "EAAWtQILH87kBAMs0GWpKPQ55aUgKAufSpSQ5g2axGHPLozyWVWVxkL1JzJ6FQvGJ5V4MqlOnZC47o2fNDOE959bDZApr1j02VuHapE3AjJoJGc0m123L49Y7vnrCo7U3MFJbWZCdH84nkrgUm7UqJeZCy0DOZB1vaZAoRUHb1eoQZDZD";

function sendTextMessage(sender, text) {
  var messageData = {
    text:text
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
}

app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/webhook/', function (req, res) {
  if (req.query['hub.verify_token'] === 'warhead') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
})


app.post('/webhook/', function (req, res) {
  var messaging_events = req.body.entry[0].messaging;
  for (i = 0; i < messaging_events.length; i++) {
    var event = req.body.entry[0].messaging[i];
    var sender = event.sender.id;
    if (event.message && event.message.text) {
      var text = event.message.text;
      // Handle a text message from this sender
      sendTextMessage(sender, text)
      console.log(text);
    }
  }
  res.sendStatus(200);
});

app.set('port', (process.env.PORT || 3000))

app.listen(app.get('port'), function () {
  console.log('Example aoo listening on port ' + app.get('port') + ' !')
})

