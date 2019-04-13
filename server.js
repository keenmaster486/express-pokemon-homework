console.log("server.js loaded");

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const pokemon = require("./pokemon");


app.get('/', function(req, res)
{
	res.send("Go to /pokemon");
});


app.get('/pokemon', function(req, res)
{
	res.render('index.ejs', {pokemon: pokemon});
})

app.get('/pokemon/:id', function(req, res)
{
	res.render('show.ejs', {pokemon: pokemon[req.params.id]});
});


app.listen(port, function()
{
	console.log(`listening on port ${port}`)
});