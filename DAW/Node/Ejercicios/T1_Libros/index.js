const express = require("express");

let app = express();
let libros = [
  {
    codi: 1,
    titol: "El juego de Ender",
    autor: "Orson Scott Card",
    preu: 7.95,
  },
  {
    codi: 2,
    titol: "El Señor de los Anillos",
    autor: "J.R.R. Tolkien",
    preu: 19.9,
  },
  {
    codi: 3,
    titol: "La tabla de Flandes",
    autor: "Arturo Pérez Reverte",
    preu: 8.5,
  },
  {
    codi: 4,
    titol: "La historia interminable",
    autor: "Michael Ende",
    preu: 12.35,
  },
];

app.get("/libros", (req, res) => {
  if (libros && libros.length > 0) {
    res.status(200).send({ ok: true, libros: libros });
  } else {
    res.status(500).send({ ok: false, error: "No se encontraron contactos" });
  }
});

app.get("/libros/:id", (req, res) => {
  let idLibro = libros.filter((libro) => {
    return libro.codi == req.params["id"];
  });

  if (idLibro.length > 0) {
    res.status(200).send({ ok: true, idLibro: idLibro[0] });
  } else {
    res.status(500).send({ ok: false, error: "No se encontraron contactos" });
  }
});

app.listen(8080);
