const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const juegos = require(__dirname + '/routers/juegos.js');

mongoose.connect('mongodb://localhost:27017/juegos',{useNewUrlParser: true});

let app = express();

app.use(bodyParser.json());
app.use('/juegos',juegos);

app.listen(8080);
