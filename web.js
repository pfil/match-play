// web.js
var express = require("express");
var logfmt = require("logfmt");
var match = require("./routes/match")

var app = express();

app.use(logfmt.requestLogger());

//if (!process.env.orchestrate_key) {
//  console.log('Orchestrate API Key required.')
//  process.exit(1)
//}

var db = require("orchestrate")("e462ea01-a628-4d3d-8e51-74597885f32d")

app.set('views', __dirname + '/views')
app.set('view engine', 'hjs')
//app.use(express.favicon())
//app.use(express.logger('dev'))
//app.use(express.bodyParser())
//app.use(express.methodOverride())
//app.use(app.router)
//app.use(require('less-middleware')(__dirname + '/public'))
//app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {

  db.get('Matches','1')
  .then(function (result) {

    res.send(result.body);
  })
  .fail(function (err) {
    console.log(JSON.stringify(err));
  })
}
       );

app.get('/match/:matchid', function (req, res) {
  //console.log("matchid: " + req.params.matchid);

  //db.get('Matches',req.params.matchid.toString())
  db.get('Matches','1')
  .then(function (result) {
    res.render('match/show', result.body)
  })
  .fail(function (err) {
    console.log("error message: " + err.message);
    res.end('No match found')
  })
})

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
