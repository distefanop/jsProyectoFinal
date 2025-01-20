// Se declaran variables

const BOTON_REFUGIO = document.getElementById('boton1');
const BOTON_FICHA = document.getElementById('boton2');
const BOTON_REGISTROS = document.getElementById('boton3');

let nombreRefugio = null;
let fichas = [];
let continuar = true;
let nuevaFicha;
let perrosEnAdopcion;

// Se declaran funciones
function crearFicha() {
    let nombre = prompt("¿Cómo se llama?").toUpperCase();
    let especie = prompt("¿Es perro o gato?").toUpperCase();
    let edad = parseInt(prompt("¿Cuántos años tiene?")); // Validación básica para edad

    return { nombre, especie, edad };
}

// Se agregan eventos al hacer click
BOTON_REFUGIO.addEventListener('click', () => {
  nombreRefugio = prompt("¿Cómo se llama el refugio?");

  if (nombreRefugio !== null) {
    alert("¡Hola, " + nombreRefugio.toUpperCase() + "!");
  } else {
    alert("No se ha introducido ningún dato");
  }
});

BOTON_FICHA.addEventListener('click', () => {
    if (nombreRefugio === null) {
        alert("No se registró ningún refugio");}
        else {  while (continuar) {
                nuevaFicha = crearFicha();
                fichas.push(nuevaFicha);

                const AGREGAR_FICHA = confirm("¿Deseas agregar otra mascota?");
                continuar = AGREGAR_FICHA
            }
            console.log("Fichas registradas a la fecha: " + fichas.length);
        }
        console.log(fichas)
});

BOTON_REGISTROS.addEventListener('click', () => {
    if (fichas.lenght === null) {
        alert("No se registró ninguna ficha");}
        else {  perrosEnAdopcion = fichas.filter(ficha => ficha.especie === "PERRO");
                gatosEnAdopcion = fichas.filter(ficha => ficha.especie === "GATO");
            }

            console.log("Perros en adopción: " + perrosEnAdopcion.length);
            console.log("Gatos en adopción: " + gatosEnAdopcion.length);
        }
);




