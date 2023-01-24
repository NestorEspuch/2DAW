const fs = require('fs');
let ruta = "/Users/nesto/OneDrive/Escritorio";

fs.readdirSync(ruta).forEach(f => {console.log(f);});
