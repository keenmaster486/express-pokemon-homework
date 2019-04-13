console.log("server.js loaded");

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

const pokemon = require("./pokemon");


app.get('/', function(req, res)
{
	res.send("Go to /pokemon");
});


app.get('/pokemon', function(req, res)
{
	res.render('index.ejs', {pokemon: pokemon});
});

app.get('/pokemon/new', function(req, res)
{
	res.render('new.ejs', {});
});

app.post('/pokemon', function(req, res)
{
	pokemon.push(req.body);
	res.redirect('/pokemon');
});

app.listen(port, function()
{
	console.log(`listening on port ${port}`)
});

app.get('/pokemon/:id', function(req, res)
{
	res.render('show.ejs', {pokemon: pokemon[req.params.id], id:req.params.id});
});

app.get('/pokemon/:id/edit', function(req, res)
{
	res.render('edit.ejs', {pokemon: pokemon[req.params.id], id:req.params.id});
});

app.post('/pokemon/:id', function(req, res)
{
	pokemon[req.params.id] = req.body;
	res.redirect('/pokemon');
});


module.exports = app;