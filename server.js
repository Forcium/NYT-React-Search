//--------------------------------------------------Dependencies

var moment = require('moment');
moment().format("MMM Do YY");


var express = require('express');

var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var Article = require('./models/Article.js');

var app = express();

var PORT = process.env.PORT || 5000;

mongoose.Promise = Promise;

//---------------------------------------Use morgan and body parser with our app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//--------------------------------------Static file support with public folder
app.use(express.static('./public'));

//-----------------------------------------Database configuration for mongoose

// mongoose.connect("mongodb://heroku_qk9szx8g:547891d1l7eiamipu4cme7a2v6@ds139954.mlab.com:39954/heroku_qk9szx8g");

mongoose.connect("mongodb://localhost/nytreact", {useMongoClient: true});

var db = mongoose.connection;

db.on("error", function(error) {
  console.log("Database Error:", error);
});




//-------------Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

//---------------------------------------------Fix Below

app.get('/', function(req, res) {
  res.sendFile('./public/index.html');
})

app.get('/api/saved', function(req, res) {

  Article.find({}).exec(function(err, doc) {

    if (err) {
      console.log(err);
    } else {
      res.send(doc);
    }
  })
});

app.post('/api/saved', function(req, res) {

  var newArticle = new Article({
    title: req.body.title,
    date: req.body.date,
    url: req.body.url
  });

  newArticle.save(function(err, doc) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.json(doc);
    }
  });
});

app.delete('/api/saved/:id', function(req, res) {

  Article.find({'_id': req.params.id}).remove().exec(function(err, doc) {
    res.send(doc);
  });

});

// LISTENER
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
