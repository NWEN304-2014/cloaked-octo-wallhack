var express = require('express');
var router = express.Router();
var pg = require('pg');

//var connectionString = process.env.DATABASE_URL;
var connectionString = "postgres://postgres:sky123456@localhost/nwen304";
var client = new pg.Client(connectionString);
client.connect();


//-------------------------------
router.get('/', function(req, res) {
res.render('map');

});

//------------------------------------
router.get('/base',function(req,res){
    
    baseFunction(req,res);

});


//------------------------------------------
router.post('/collectData',function(req,res){

var author = req.body.author;
var title = req.body.headline;
var story = req.body.etching;

var query = client.query("insert into post (author,title,content) values ($1,$2,$3)",[author,title,story],function(err){
	if(err){
	console.log(err);
        }
	
        	
      baseFunction(req,res);

});


});

//----------------------------------------

var baseFunction = function(req,res){

var query = client.query("select * from post order by id desc limit 1",function(err,result){
	if(err){
	   console.log(err);
        }
        
        var author = result.rows[0].author;
	var headline = result.rows[0].title;
	var story = result.rows[0].content;
	
        	res.render('base',{author:author, headline:headline, story:story});
		//res.render('base');
	

});

};





module.exports = router;
