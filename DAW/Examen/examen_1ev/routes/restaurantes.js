const express = require("express");
const Restaurante = require("../models/restaurante");

const router = express.Router();

router.get("/", (req, res) => {
  Restaurante.find()
    .then((resultado) => {
      if (resultado.length >= 1) {
        res.status(200).send({resultado: resultado });
      } else {
        res.status(500).send({
          error: "No se encontraron restaurantes.",
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        error: "No se encontraron restaurantes.",
      });
    });
});

router.get("/:id", (req, res) => {
  Restaurante.findById(req.params["id"])
    .then((resultado) => {
      if (resultado) {
        res.status(200).send({resultado: resultado });
      } else {
        res.status(400).send({
          error: "Restaurante no encontrado.",
        });
      }
    })
    .catch(() => {
      res.status(400).send({ ok: false, error: "Restaurante no encontrado." });
    });
});

router.post("/", (req, res) => {
  if (req.body) {
    const restaurante = new Restaurante(req.body);
    restaurante
      .save()
      .then((resultado) => {
        res.status(200).send({resultado: resultado });
      })
      .catch(() => {
        res.status(400).send({
          error: "Error insertando el restaurante.",
        });
      });
  } else {
    res.status(400).send({
      ok: false,
      error: "Error insertando el restaurante.",
    });
  }
});

router.put("/:id", (req, res) => {
  if (req.body) {
    Restaurante.findByIdAndUpdate(
      req.params["id"],
      {
        $set: {
          nombre: req.body.nombre,
          descripcion: req.body.descripcion,
          telefono: req.body.telefono,
          imagen: req.body.imagen,
          tipo: req.body.tipo,
          puntuacion: req.body.puntuacion,
          precio: req.body.precio,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .then((resultado) => {
        res.status(200).send({resultado: resultado });
      })
      .catch((error) => {
        res.status(400).send({
          error: error + "Error modificando el restaurante.",
        });
      });
  } else {
    res.status(500).send({
      error: "Datos recibidos incorrectos.",
    });
  }
});

router.delete("/:id", (req, res) => {
  Restaurante.findByIdAndDelete(req.params["id"])
    .then((resultado) => {
      res.status(200).send({resultado: resultado });
    })
    .catch(() => {
      res.status(400).send({error: "Error eliminando el restaurante." });
    });
});

function convertDate(dateString) {;
  let array = dateString.split("-")
  return new Date(array[2]+"-"+array[1]+"-"+array[0]);
}

router.post("/comentarios/:idRestaurante", (req, res) => {
  let comentario = {
    creador: req.body.creador,
    fecha: convertDate(req.body.fecha),
  };
  Restaurante.findById(req.params["idRestaurante"])
    .then((resultado) => {
      resultado.comentarios.push(comentario);
      resultado
        .save()
        .then((result) => {
          res.status(200).send({resultado: result });
        })
        .catch((e) => {
          res.status(400).send({
            error: "Error modificando los comentarios del restaurante: "+ e,
          });
        });
    })
    .catch(() => {
      res.status(400).send({
        ok: false,
        error: "Error modificando los comentarios del restaurante.",
      });
    });
});

module.exports = router;
