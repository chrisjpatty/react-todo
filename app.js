var express = require('express');
var app = express();
var react = require('react');
var reactDOM = require('react-dom');

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile('public/index.html');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});