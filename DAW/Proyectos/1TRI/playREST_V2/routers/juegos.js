const express = require("express");
const Juego = require("../models/juego");

const router = express.Router();

router.get("/", (req, res) => {
  Juego.find()
    .then((resultado) => {
      if (resultado) {
        res.status(200).send({ ok: true, resultado: resultado });
      } else {
        res.status(400).send({
          ok: false,
          error: "Se ha encontrado un fallo en la petición.",
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        ok: false,
        error: "No se encontraron juegos de mesa.",
      });
    });
});

router.get("/:id", (req, res) => {
  Juego.findById(req.params["id"])
    .then((resultado) => {
      if (resultado) {
        res.status(200).send({ ok: true, resultado: resultado });
      } else {
        res.status(500).send({
          ok: false,
          error: "Error al buscar el juego.",
        });
      }
    })
    .catch(() => {
      res.status(400).send({ ok: false, error: "Juego no encontrado." });
    });
});

router.post("/", (req, res) => {
  if (req.body) {
    const juego = new Juego(req.body);
    juego
      .save()
      .then((resultado) => {
        res.status(200).send({ ok: true, resultado: resultado });
      })
      .catch(() => {
        res.status(400).send({
          ok: false,
          error: "Error insertando el juego.",
        });
      });
  } else {
    res.status(400).send({
      ok: false,
      error: "Error insertando el juego.",
    });
  }
});

router.put("/:id", (req, res) => {
  if (req.body) {
    Juego.findByIdAndUpdate(
      req.params["id"],
      {
        $set: {
          nombre: req.body.nombre,
          descripcion: req.body.descripcion,
          edadMin: req.body.edadMin,
          nJugadores: req.body.nJugadores,
          tipo: req.body.tipo,
          precio: req.body.precio,
          imagen: req.body.imagen,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .then((resultado) => {
        res.status(200).send({ ok: true, resultado: resultado });
      })
      .catch((error) => {
        res.status(400).send({
          ok: false,
          error: error + "Error modificando el juego.",
        });
      });
  } else {
    res.status(500).send({
      ok: false,
      error: "Datos recibidos incorrectos.",
    });
  }
});

router.put("/ediciones/:idJuego", (req, res) => {
  let edicion = {
    nombre: req.body.nombre,
    year: req.body.year,
  };
  Juego.findById(req.params["idJuego"])
    .then((resultado) => {
      resultado.ediciones.push(edicion);
      resultado
        .save()
        .then((result) => {
          res.status(200).send({ ok: true, resultado: result });
        })
        .catch(() => {
          res.status(400).send({
            ok: false,
            error: "Error modificando las ediciones del juego",
          });
        });
    })
    .catch(() => {
      res.status(400).send({
        ok: false,
        error: "Error modificando las ediciones del juego",
      });
    });
});

router.delete("/:id", (req, res) => {
  Juego.findByIdAndDelete(req.params["id"])
    .then((resultado) => {
      res.status(200).send({ ok: true, resultado: resultado });
    })
    .catch(() => {
      res.status(400).send({ ok: false, error: "Error eliminando el juego" });
    });
});

router.delete("/ediciones/:idJuego/:idEdicion", (req, res) => {
  Juego.findById(req.params["idJuego"])
    .then((juego) => {
      let ediciones = juego.ediciones.filter(
        (e) => e.id != req.params["idEdicion"]
      );
      Juego.findByIdAndUpdate(
        juego.id,
        { ediciones: ediciones },
        {
          new: true,
          runValidators: true,
        }
      )
        .then((resultado) => {
          res.status(200).send({ ok: true, resultado: resultado });
        })
        .catch(() => {
          res.status(400).send({
            ok: false,
            error: "Error eliminando la edicion del juego",
          });
        });
    })
    .catch(() => {
      res.status(400).send({
        ok: false,
        error: "Error eliminado la edición del juego",
      });
    });
});

module.exports = router;
