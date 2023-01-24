const mongoose = require('mongoose');

let edicionSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        min: 2000,
        max: 2022
    }
});

let juegoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        minlength: 6
    },
    descripcion: {
        type: String,
        required: true
    },
    edadMin: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    nJugadores: {
        type: Number,
        required: true
    },
    tipo: {
        type: String,
        enum: ['rol','escape','dados','fichas','cartas','tablero']
    },
    precio: {
        type: Number,
        required: true,
        min: 0
    },
    imagen: {
        type: String,
        required: false
    },
    ediciones: {
        type: [edicionSchema]
    }
});

let Juego = mongoose.model('juego', juegoSchema);
module.exports = Juego;
