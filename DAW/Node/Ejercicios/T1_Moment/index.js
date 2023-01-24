const moment = require('moment');

let ahora = moment();
let antes = moment("28/02/2015", "DD/MM/YYYY");
let despues = moment("30/04/2028", "DD/MM/YYYY");

console.log(moment.duration(ahora.diff(antes)).years() + " years and month " + moment.duration(ahora.diff(antes)).months());
console.log(moment.duration(despues.diff(ahora)).years() + " years and month " + moment.duration(despues.diff(ahora)).months());

if(antes.isBefore(ahora)){
    console.log("Correcto");
}
if(despues.isAfter(ahora)){
    console.log("Correcto");
}

let dentroMes = ahora.add(1,'month').format("DD/MM/YYYY");
console.log(dentroMes);