var express = require('express');
var fs = require('fs');
var app = express();
var mathjs = require('mathjs');
var math = mathjs();
var pg = require('pg').native;
var connectionString = process.env.DATABASE_URL;
var client;

app.set('views', __dirname + '/views');

app.use(express.multipart());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);
app.use(express.bodyParser());
app.use(express.static(__dirname));
app.use(app.router);

client = new pg.Client(connectionString);
client.connect();

var stories = [];
var key;

app.get('http://rocky-hamlet-2798.herokuapp.com/', function (req, res) {
  res.render('index', {});
});

app.post('http://rocky-hamlet-2798.herokuapp.com/base', function(req, res){
    
    var query = client.query('SELECT * FROM stories', function(err, result) {
      if(err){
        console.log(err);
      }
      var newStories = [];
      var R = 6371; // Radius of the earth in km
      for(i = 0; i < result.rows.length; i++) {
        var dLat = (result.rows[i].latitude - req.body.latitude) * Math.PI / 180;  // deg2rad below
        var dLon = (result.rows[i].longitude - req.body.longitude) * Math.PI / 180;
        var a = 0.5 - Math.cos(dLat)/2 + Math.cos(req.body.latitude * Math.PI / 180) * Math.cos(result.rows[i].latitude * Math.PI / 180) * (1 - Math.cos(dLon))/2;
        var dist = R * 2 * Math.asin(Math.sqrt(a));
        if(dist < 1000) {
          var story = {
            "headline": result.rows[i].headline,
            "author": result.rows[i].author,
            "story": result.rows[i].story,
            "image": result.rows[i].image_name,
            "latitude": result.rows[i].latitude,
            "longitude": result.rows[i].longitude
          }
          newStories.push(story);
        }
      } //for loop
      
      var id, size, selected = [];
      if(newStories.length > 6) size = 5;
      else size = newStories.length;
      for(index = 0; index < size; index++) {
        id = Math.floor(Math.random() * newStories.length);
        selected.push(newStories[id]);
        newStories.splice(id, 1);
      }
      stories = selected;
      key = stories.length - 1;
      res.redirect("/base");
   
    });// callback for query 

});

app.get('http://rocky-hamlet-2798.herokuapp.com/base', function (req, res) {
    if(stories.length==0) {
	  res.render('base', {
		  headline : "There is no stories in this area", 
                  author: " ", 
                  story: "Please edit your story and share it with other people",
                  image: ""
		  });
    } else {
        res.render('base', {
        headline1 : stories[0].headline, 
        author1 : stories[0].author, 
        story1 : stories[0].story,

        headline2 : stories[1].headline, 
        author2 : stories[1].author, 
        story2 : stories[1].story,

        headline3 : stories[2].headline, 
        author3 : stories[2].author, 
        story3 : stories[2].story,

        headline4 : stories[3].headline, 
        author4 : stories[3].author, 
        story4 : stories[3].story,

        headline5 : stories[4].headline, 
        author5 : stories[4].author, 
        story5 : stories[4].story,

        image : stories[0].image
        }); 
      }
});



app.get('http://rocky-hamlet-2798.herokuapp.com/base/image/:index', function (req, res) {
   if(stories.length <= req.params.index || req.params.index < 0) {
    res.statusCode = 404;
    return res.send('Error 404: No quote found');
  }
  res.send({"imageName" : stories[req.params.index].image});
});

app.post('http://rocky-hamlet-2798.herokuapp.com/base/upload', function (req, res) {
    console.log(req.files);

    if(!req.body.hasOwnProperty('etching') || !req.body.hasOwnProperty('headline') || !req.body.hasOwnProperty('latitude') || !req.body.hasOwnProperty('longitude')) {
    res.statusCode = 400;
    return res.send('Error 400: Post syntax incorrect.');
    }

    fs.readFile(req.files.image.path, function(err, data) {
    var imageName = req.files.image.name;
    var newImage;
    if(!imageName) {
      console.log("There was no image uploaded");
      //newImage = "user-interface-background.jpg";
      client.query('INSERT INTO stories(headline, author, story, latitude, longitude) VALUES($1, $2, $3, $4, $5)',[req.body.headline, req.body.author, req.body.etching, req.body.latitude, req.body.longitude]);
    }else {
      var newPath = __dirname + "/public/image/" + imageName;
      newImage = req.files.image.name;
      fs.writeFile(newPath, data, function (err) {
      client.query('INSERT INTO stories(headline, author, story, image_name, latitude, longitude) VALUES($1, $2, $3, $4, $5, $6)', [req.body.headline, req.body.author, req.body.etching, req.files.image.name, req.body.latitude, req.body.longitude]);
      });
    }
    var newStory = {
	"headline": req.body.headline,
        "author": req.body.author,
        "story": req.body.etching,
        "image": newImage,
        "latitude": req.body.latitude,
        "longitude": req.body.longitude
	};
    if(stories.length < 5) stories[stories.length] = newStory;
    else stories[stories.length-1] = newStory;
    key = stories.length - 1;
    res.redirect("/base");
  });
});

app.get('http://rocky-hamlet-2798.herokuapp.com/base/uploads/:file', function (request, response) {
	var file = request.params.file;
	var img = fs.readFileSync(__dirname + "/public/image/" + file);
	response.writeHead(200, {'Content-Type': 'image/jpeg' });
	response.end(img);
});

var server = app.listen(app.get('port'), function () {
    console.log('Listening on port %d', server.address().port);
});
