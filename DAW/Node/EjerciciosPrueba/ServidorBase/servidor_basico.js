const http = require('http');
const fs = require('fs');

let atenderPeticion = (request, response) => {
    response.writeHead(200,{"Content-Type":"text/html"});
    let contenido = fs.readFileSync('../../../../DIW/Repaso/index.html','utf-8');
    response.write(contenido);
    response.end();
}

http.createServer(atenderPeticion).listen(8080);