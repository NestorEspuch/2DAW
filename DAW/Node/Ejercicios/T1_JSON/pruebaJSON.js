const fs = require("fs");
const fileJSON = "fileJSON.json";
const fileJS = "fileJSON.js";

let objectJS = JSON.parse(fs.readFileSync(fileJSON,'utf-8'));
console.log(objectJS);

let personas = [
    { nombre: "Néstor", edad: 23 },
    { nombre: "Andrés", edad: 22 },
  ];

let personasJSON = JSON.stringify(personas);
console.log(personasJSON);