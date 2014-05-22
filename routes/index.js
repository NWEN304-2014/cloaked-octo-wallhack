var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = process.env.DATABASE_URL;
var client = new pg.Client(connectionString);
client.connect();

router.get('/', function(req, res) {
  res.render('index', { title: 'Express', ac: 'Continue'});
});

router.get('/test',function(req,res){
 res.render('test',{title:'page1'});
});

router.get('/test2',function(req,res){
var author = req.query.author;
var title = req.query.title; 
var story = req.query.story;

console.log(typeof(author));

var query = client.query("INSERT INTO post (author,title,content) values ($1,$2,$3)",[author,title,story],function(err){
	if(err){
       		console.log(err);
        }
});



var arr = [];

for(var i=1 ; i < 5 ; i ++){
  
 var query = client.query('SELECT * FROM post WHERE id = $1',[i],function(err,result){
	if(err){
        console.log(err);
        }
       arr.push(result);
       if(arr.length == 4){
            
         res.render('test2',{title:"page2",
                    author:author,
                    story_title:title, 
                    story:story,
                    author1:arr[0].rows[0].author,
                    story_title1:arr[0].rows[0].title,
                    story1:arr[0].rows[0].content,
                    author2:arr[1].rows[0].author,
                    story_title2:arr[1].rows[0].title,
                    story2:arr[1].rows[0].content,
		    author3:arr[2].rows[0].author,
                    story_title3:arr[2].rows[0].title,
                    story3:arr[2].rows[0].content,
		    author4:arr[3].rows[0].author,
                    story_title4:arr[3].rows[0].title,
                    story4:arr[3].rows[0].content}
		
);
       }
       
  });
  
}



});

module.exports = router;
