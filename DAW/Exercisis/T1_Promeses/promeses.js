let datos = [
    { nombre: "Nacho", telefono: "966112233", edad: 41 },
    { nombre: "Ana", telefono: "911223344", edad: 36 },
    { nombre: "Mario", telefono: "611998877", edad: 15 },
    { nombre: "Laura", telefono: "633663366", edad: 17 },
  ];

let promesaNombre = datos => {
    return new Promise((resolve,reject) => {
        let resultado = datos.filter(persona => persona.nombre == "Ana");
        if(resultado.length > 0)
            resolve(resultado);
        else
            reject("No hay resultados");
    })
};

promesaNombre(datos).then(resultado => {
    console.log("Coincidencias encontradas");
    console.log(resultado);
}).catch(error => {
    console.log("Error",error);
});

let pNuevaPersona = (persona,datos) => {
    return new Promise((resolve,reject) => {
        let resultado = datos.filter(p => p.telefono === persona.telefono);
        if(resultado == 0)
        {
            datos.push(persona);
            resolve(datos);
        }
        else
        {
            reject("La persona ya existe");
        }
    })
};

pNuevaPersona({ nombre: "Juan", telefono: "966112276", edad: 23 },datos).then(resultado => {
    console.log("Subido correctamente");
    console.log(resultado);
}).catch(error => {
    console.log("Error: "+error);
})

let pBorrarPersona = (telefono,datos) => {
    return new Promise((resolve,reject) => {
        let resultado = datos.filter(p => p.telefono === telefono)
        if(resultado == 0)
        {
            reject("No existe esa persona.");
        }
        else
        {
            datos = datos.filter((p) => p.telefono !== telefono);
            resolve(datos);
        }
    })
};

pBorrarPersona("633663366",datos).then(resultado => {
    console.log("Borrado correctamente");
    console.log(resultado);
}).catch(error => {
    console.log("Error: "+error);
});
