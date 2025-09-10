
const persona = {
  nombre: "Daniel Magadan",
  edad: 29,
  carrera: "Ingeniería en Sistemas Computacionales",
  trabajando: true,
  habilidades: ["C#", "Python", "Angular","JavaScript", "HTML", "CSS", "Node.js"],
  direccion: {
    calle: "Av. Siempre Viva",
    numero: 742,
    ciudad: "Springfield"
  },
};

console.log("Objeto original:", persona);

const jsonData = JSON.stringify(persona);
console.log("JSON convertido:", jsonData);

const objetoNuevo = JSON.parse(jsonData);
console.log("Objeto generado con JSON.parse():", objetoNuevo);
