let datos = [
    { nombre: "Nacho", telefono: "966112233", edad: 41 },
    { nombre: "Ana", telefono: "911223344", edad: 36 },
    { nombre: "Mario", telefono: "611998877", edad: 15 },
    { nombre: "Laura", telefono: "633663366", edad: 17 },
  ];
  
  let nuevaPersona = (persona) => {
    let existe = datos.filter(
      (personaTelefono) => personaTelefono.telefono === persona.telefono
    );
  
    if (existe.length == 0) datos.push(persona);
  };
  
  let borrarPersona = (telefono) => {
    datos = datos.filter((persona) => persona.telefono !== telefono);
  };
  
  nuevaPersona({ nombre: "Laura", telefono: "4444", edad: 17 });
  console.log(datos);
  
  let adultos = datos.filter((persona) => {
    return persona.edad >= 18;
  });
  
  console.log(adultos);