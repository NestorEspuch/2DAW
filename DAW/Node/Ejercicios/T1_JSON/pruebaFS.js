const fs = require("fs");
const file = "file.txt";
const text = "Texto que va a ir dentro del fichero\n" + "Está es la línea de abajo\n";

let saveDate = () => {
  fs.writeFileSync(file, text);
};
let readDate = () => {
  return fs.readFileSync(file, "utf-8");
};

saveDate();
console.log(readDate());
