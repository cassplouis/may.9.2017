var express = require("express");
var bodyParsrer = require("body-parser");
var sqlite = require("sqlite3").verbose();
// help create definite path to index.html
var path = require("path");
var app = express();
var db = new sqlite.Database("example");

db.serialize(function(){
	db.run("CREATE TABLE lorem (name STRING, age INTEGER)")
})
// Whatever data, send to json
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());

app.get("/", function(req, res){
	res.sendFile(path.join(__dirname, "index.html"));
})

app.post("/", function(req, res){
	var data = {
		name: req.body.name, 
		age: req.body.age
	};

	db.serialize(function(){
		db.run("INSERT INTO lorem VALUES($name, $age)",{
			$name: date.name, 
			$age: data.age

	    }, function(){
			res.redirect("/data");
		});
	});
})

app.get("/data", function(req, res){
	db.serialize(function(){
		db.get("SELECT *FROM lorem", function(err, rows){
			if(err){
				console.log(err);
			} else{
				res.json(rows);
			}
		});
	});
})

app.listen(8080);

console.log("server is running"); 