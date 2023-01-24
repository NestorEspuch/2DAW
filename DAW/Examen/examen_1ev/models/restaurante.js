const mongoose = require('mongoose');

let comentarioSchema = new mongoose.Schema({
  creador: {
      type: String,
      required: true
  },
  fecha: {
      type: Date,
      min: new Date('01-01-2022'),
      max: Date.now
  }
});

let restauranteSchema = new mongoose.Schema({
  nombre: {
      type: String,
      required: true,
      minlength: 6
  },
  descripcion: {
      type: String,
      required: true
  },
  telefono: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
            var re = /^\d{9}$/;
            return (!v || !v.trim().length) || re.test(v)
        },
        message: 'El número de teléfono proporcionado no es válido.'
    }
  },
  imagen: {
      type: String,
      required: false
  },
  tipo: {
      type: String,
      enum: ['italiano','vegetariano','vegano','comida rápida','otro']
  },
  puntuacion: {
      type: Number,
      required: true,
      min: 0,
      max: 5
  },
  precio: {
      type: Number,
      required: true,
      min: 0
  },
  comentarios: {
      type: [comentarioSchema]
  }
});

let Restaurante = mongoose.model('restaurante', restauranteSchema);
module.exports = Restaurante;
