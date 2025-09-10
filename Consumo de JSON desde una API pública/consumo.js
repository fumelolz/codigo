let name = "Ditto";
let weight = 40;
let abilities = ["limber", "imposter"];

fetch("https://pokeapi.co/api/v2/pokemon/ditto")
  .then(response => response.json())
  .then(data => {
    name = data.name;
    weight = data.weight;
    abilities = data.abilities.map(a => a.ability.name);
  })
  .catch(error => {
    document.getElementById("info").innerHTML = "Error al obtener datos.";
    console.error("Error:", error);
  });

console.log("Nombre:", name);
console.log("Peso:", weight);
console.log("Habilidades:", abilities);

document.getElementById("info").innerHTML =
        `<strong>Nombre:</strong> ${name}<br>` +
        `<strong>Peso:</strong> ${weight}<br>` +
        `<strong>Habilidades:</strong> ${abilities.join(", ")}`;