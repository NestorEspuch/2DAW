const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const restaurantes = require(__dirname + '/routes/restaurantes.js');

mongoose.connect('mongodb://localhost:27017/restaurantes',{useNewUrlParser: true});

let app = express();

app.use(bodyParser.json());
app.use('/restaurantes',restaurantes);

app.listen(8080);
