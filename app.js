
var express = require("express");
var bodyParser=require('body-parser')
var mysql=require("mysql")
var app=express();
app.use(bodyParser.urlencoded({extended: false}))
app.set("view engine" , "ejs");
app.use(express.static("public"));
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'society',
  multipleStatements : true
});
connection.connect(function(err){
	if(err)
		console.log('Error');
	else
	console.log('Connected..');
})
app.get("/",function(req,res){
	res.render("login.ejs");
});
var id;
app.get("/entry",function(req,res){
	res.render("enquire.ejs");
})
app.post("/logins",function(req,res){
	console.log(req.body);
	var a="SELECT * FROM login WHERE id = '"+req.body.id+"' AND password = '"+req.body.password+"';"
	id=req.body.id;
	console.log(a);
	connection.query(a, function (err, result, fields) {
    if (err) throw err;
    if(result.length!=0)
    	res.render("form.ejs");
    else
    	res.render("login.ejs");
  });
	});
app.post("/searches",function(req,res){
	console.log(req.body);
	if(req.body.search=='vehiclenumber')
	var b="SELECT * FROM entry WHERE VehicleNumber = '"+req.body.number+"';"
	else
	if(req.body.search=='mobile')
	var b="SELECT * FROM entry WHERE Contact = '"+req.body.number+"';"
	else
	if(req.body.search=='towerflat')
	var b="SELECT * FROM entry WHERE Tower = '"+req.body.tower+"' AND Flat = '"+req.body.flat+"';"
	console.log(b);
	connection.query(b, function (err, result, fields) {
    if (err) throw err;
    if(result.length!=0)
    	res.send(result);
    else
    	res.send("No Entry Found!");
  });
})
app.get("/emergency",function(req,res){
	res.render("emergency.ejs");
});
app.post("/results",function(req,res){
	console.log(req.body);
	var sql="insert into entry values('"+ req.body.vehicle+"','"+req.body.identity+"','"+req.body.number+"','"+req.body.name+"','"+req.body.contact+"','"+req.body.tower+"','"+req.body.flat+"','"+req.body.intercom+"',NOW(),'"+id+"')";
	console.log(sql);
	connection.query(sql, function (err) {
  if (err) throw err
  console.log('Done!');
  res.render("form.ejs");
})
})
app.listen(3000,function(){
console.log("Server started on port 3000");
})