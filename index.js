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
      boolean flag = false
      var score = 0
      var number = 0

      if(text.indexof("เกม")>-1){
      	number =1;
      	flag = true
      	if(flag == true && number == 1){
      		sendTextMessage(sender, "ตุ๊กกี้ กับ โก๊ะตี๋ ใครสูงกว่ากัน (1.ตุ๊กกี้ 2.โก๊ะตี๋)")
      		if(flag && text.indexOf("2")>-1){
      			score++;
      			number = 2;
      		}else {
      			number =2;
      		}
      	}
      	if(flag == true && number == 2){
      		sendTextMessage(sender, "ฟุตบอลโลก 2018 ประเทศไหนเป็นเจ้าภาพ (1.บราซิล 2.รัสเซีย๋)")
      		if(flag && text.indexOf("2")>-1){
      			score++;
      			number = 3;
      		}else {
      			number =3;
      		}
      	}
      	if(flag == true && number == 3){
      		sendTextMessage(sender, "ไพ่ 1 สำรับ มีอักษรภาษาอังกฤษกี่ตัว")
      		if(flag && text.indexOf("4")>-1){
      			score++;
      			number = 4;
      		}else {
      			number =4;
      		}
      	}
      	if(flag == true && number == 4){
      		sendTextMessage(sender, "ใคร เก็บเมาคลีไปเลี้ยง (1.หมาป่า 2.แมวน้ำ๋)")
      		if(flag && text.indexOf("1")>-1){
      			score++;
      			number = 5;
      		}else {
      			number =5;
      		}
      	}
      	if(flag == true && number == 5){
      		sendTextMessage(sender, "ลูกเต๋า 6 หน้ามี จุดรวมกันกี่จุด")
      		if(flag && text.indexOf("21")>-1){
      			score++;
      			number = 6;
      		}else {
      			number =6;
      		}
      	}
      		sendTextMessage(sender, "คุณตอบถูก : "+score)
      		flag =false;
      		score = 0;
      		number = 0;
      } 
      
      console.log(text);
    }
  }
  res.sendStatus(200);
});

app.set('port', (process.env.PORT || 3000))

app.listen(app.get('port'), function () {
  console.log('Example aoo listening on port ' + app.get('port') + ' !')
})

