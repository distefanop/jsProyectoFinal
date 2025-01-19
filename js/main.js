// Se seleccionan los botones por su ID
const BOTON_REFUGIO = document.getElementById('boton1');
const BOTON_FICHA = document.getElementById('boton2');

// Se agregan eventos al hacer click
let nombreRefugio = null;
let fichas = [];

function crearFicha() {
    let nombre = prompt("¿Cómo se llama el perro/gato?");
    let genero = prompt("¿Es perro o gato?");
    let edad = parseInt(prompt("¿Qué edad tiene?")); // Validación básica para edad

    return { nombre, genero, edad };
}

BOTON_REFUGIO.addEventListener('click', () => {
  nombreRefugio = prompt("¿Cómo se llama el refugio?");

  if (nombreRefugio !== null) {
    console.log("¡Hola," + nombreRefugio + "!");
  } else {
    alert("No se ha introducido ningún dato");
  }
});

BOTON_FICHA.addEventListener('click', () => {
    if (nombreRefugio === null) {
        alert("No se registró ningún refugio");}
        else {let continuar = true;
            while (continuar) {
                const nuevaFicha = crearFicha();
                fichas.push(nuevaFicha);

                const seguirAgregando = prompt("¿Deseas agregar otra mascota? (si/no)");
                continuar = seguirAgregando.toLowerCase() === 'si';
            }
            console.log("Fichas registradas para el refugio: " + fichas.length);
        }
});

