// web.js
var express = require("express");
var logfmt = require("logfmt");
var db = require("orchestrate")("e462ea01-a628-4d3d-8e51-74597885f32d")
var app = express();

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {

  db.get('matches','1') {
    .then(function (result) {
      res.send('Success');
    })
    .fail(function (err) {
      res.send('Error');
    })
  }


});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
