// // Se declaran variables

// const BOTON_REFUGIO = document.getElementById('boton1');
// const BOTON_FICHA = document.getElementById('boton2');
// const BOTON_REGISTROS = document.getElementById('boton3');

// let nombreRefugio = null;
// let fichas = [];
// let continuar = true;
// let nuevaFicha;
// let perrosEnAdopcion;

// // Se declaran funciones
// function crearFicha() {
//     let nombre = prompt("¿Cómo se llama?").toUpperCase();
//     let especie = prompt("¿Es perro o gato?").toUpperCase();
//     let edad = parseInt(prompt("¿Cuántos años tiene?")); // Validación básica para edad

//     return { nombre, especie, edad };
// }

// // Se agregan eventos al hacer click
// BOTON_REFUGIO.addEventListener('click', () => {
//   nombreRefugio = prompt("¿Cómo se llama el refugio?");

//   if (nombreRefugio !== null) {
//     alert("¡Hola, " + nombreRefugio.toUpperCase() + "!");
//   } else {
//     alert("No se ha introducido ningún dato");
//   }
// });

// BOTON_FICHA.addEventListener('click', () => {
//     if (nombreRefugio === null) {
//         alert("No se registró ningún refugio");}
//         else {  while (continuar) {
//             nuevaFicha = crearFicha();
//             fichas.push(nuevaFicha);

//             const AGREGAR_FICHA = confirm("¿Deseas agregar otra mascota?");
//             continuar = AGREGAR_FICHA

//             console.log(fichas)
//             console.log("Fichas registradas a la fecha: " + fichas.length);
//         }            
//     }
// });

// BOTON_REGISTROS.addEventListener('click', () => {
//     if (fichas.length === 0) {
//         alert("No se registró ninguna ficha");}
//         else {  perrosEnAdopcion = fichas.filter(ficha => ficha.especie === "PERRO");
//                 gatosEnAdopcion = fichas.filter(ficha => ficha.especie === "GATO");

//                 console.log("Perros en adopción: " + perrosEnAdopcion.length);
//                 console.log("Gatos en adopción: " + gatosEnAdopcion.length);
//             }
//         }
// );



const generarTarjeta = document.getElementById('generarTarjeta');
const contenedorTarjetas = document.getElementById('contenedorTarjetas');
const modal = document.getElementById('modal');
const modalNombre = document.getElementById('modalNombre');
const modalEdad = document.getElementById('modalEdad');
const modalProvincia = document.getElementById('modalProvincia');
const modalEspecie = document.getElementById('modalEspecie');
const modalSexo = document.getElementById('modalSexo');
const modalEnergico = document.getElementById('modalEnergico');
const modalDesparasitado = document.getElementById('modalDesparasitado');
const modalEsterilizado = document.getElementById('modalEsterilizado');
const guardarCambios = document.getElementById('guardarCambios');
const closeButton = document.querySelector('.close-button');
const filtros = document.getElementById("filtros");

let tarjetas = [];

function guardarTarjetas() {
    localStorage.setItem('tarjetas', JSON.stringify(tarjetas));
}

generarTarjeta.addEventListener('click', () => {
    const nuevaTarjeta = crearTarjeta('Nombre', 'Edad');
    contenedorTarjetas.appendChild(nuevaTarjeta.elemento);

    tarjetas.push(nuevaTarjeta);
    guardarTarjetas();
});

function crearTarjeta(nombre, edad) {
    const tarjeta = {
        nombre: nombre.toLowerCase(),
        edad: edad,
        provincia: '',
        especie: '',
        sexo: '',
        energico: false,
        desparasitado: false,
        esterilizado: false,
        editando: false,
        elemento: document.createElement('div'),
        imagen: './img/img-logo-tr.png'
    };

    tarjeta.elemento.classList.add('tarjeta');

    const imagen = document.createElement('img');
    imagen.src = tarjeta.imagen;
    imagen.alt = 'Imagen por defecto';

    imagen.addEventListener('click', () => {
        const seleccionImagen = document.createElement('input');
        seleccionImagen.type = 'file';
        seleccionImagen.accept = 'image/*';

        seleccionImagen.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    imagen.src = e.target.result;
                    imagen.alt = file.name;
                    tarjeta.imagen = e.target.result;
                    guardarTarjetas();
                }
                reader.readAsDataURL(file);
            }
        });

        seleccionImagen.click();
    });

    tarjeta.elemento.appendChild(imagen);

    const info = document.createElement('div');
    info.classList.add('info');
    info.innerHTML = `<strong>${nombre.toUpperCase()}</strong> (${edad} años)`;
    tarjeta.elemento.appendChild(info);

    const botonesDiv = document.createElement('div');
    botonesDiv.classList.add('botones');

    const botonEditar = document.createElement('button');
    botonEditar.textContent = 'Editar';
    botonEditar.addEventListener('click', () => {
        tarjeta.editando = true;
        modal.style.display = 'block';
        modalNombre.value = tarjeta.nombre.toUpperCase();
        modalEdad.value = tarjeta.edad;
        modalProvincia.value = tarjeta.provincia;
        modalEspecie.value = tarjeta.especie;
        modalSexo.value = tarjeta.sexo;
        modalEnergico.checked = tarjeta.energico;
        modalDesparasitado.checked = tarjeta.desparasitado;
        modalEsterilizado.checked = tarjeta.esterilizado;

        guardarCambios.removeEventListener('click', guardar);
        guardarCambios.addEventListener('click', guardar);

        function guardar(evento) {
            evento.preventDefault();

            const nuevoNombre = modalNombre.value;

            tarjeta.nombre = nuevoNombre.toLowerCase();
            const nuevaEdad = modalEdad.value;
            const nuevaProvincia = modalProvincia.value;
            const nuevaEspecie = modalEspecie.value;
            const nuevoSexo = modalSexo.value;
            const nuevoEnergico = modalEnergico.checked;
            const nuevoDesparasitado = modalDesparasitado.checked;
            const nuevoEsterilizado = modalEsterilizado.checked;

            tarjeta.edad = nuevaEdad;
            tarjeta.provincia = nuevaProvincia;
            tarjeta.especie = nuevaEspecie;
            tarjeta.sexo = nuevoSexo;
            tarjeta.energico = nuevoEnergico;
            tarjeta.desparasitado = nuevoDesparasitado;
            tarjeta.esterilizado = nuevoEsterilizado;

            info.innerHTML = `<strong>${tarjeta.nombre.toUpperCase()}</strong> (${tarjeta.edad} años)`;
            modal.style.display = 'none';
            tarjeta.editando = false;

            guardarCambios.removeEventListener('click', guardar);
            guardarTarjetas();
        }
    });

    botonesDiv.appendChild(botonEditar);

    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.addEventListener('click', () => {
        tarjeta.elemento.remove();
        const indice = tarjetas.indexOf(tarjeta);
        if (indice > -1) {
            tarjetas.splice(indice, 1);
            guardarTarjetas();
        }
    });

    botonesDiv.appendChild(botonEliminar);

    tarjeta.elemento.appendChild(botonesDiv);

    return tarjeta;
}

closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('DOMContentLoaded', () => {
    const tarjetasGuardadas = localStorage.getItem('tarjetas');
    if (tarjetasGuardadas) {
        tarjetas = JSON.parse(tarjetasGuardadas);
        tarjetas.forEach(tarjeta => {
            const nuevaTarjeta = crearTarjeta(tarjeta.nombre, tarjeta.edad);
            nuevaTarjeta.nombre = tarjeta.nombre;
            nuevaTarjeta.edad = tarjeta.edad;
            nuevaTarjeta.provincia = tarjeta.provincia;
            nuevaTarjeta.especie = tarjeta.especie;
            nuevaTarjeta.sexo = tarjeta.sexo;
            nuevaTarjeta.energico = tarjeta.energico;
            nuevaTarjeta.desparasitado = tarjeta.desparasitado;
            nuevaTarjeta.esterilizado = tarjeta.esterilizado;
            nuevaTarjeta.elemento.querySelector('.info').innerHTML = `<strong>${tarjeta.nombre.toUpperCase()}</strong> (${tarjeta.edad} años)`;
            nuevaTarjeta.elemento.querySelector('img').src = tarjeta.imagen;
            contenedorTarjetas.appendChild(nuevaTarjeta.elemento);
        });
    }
});

function filtrarTarjetas() {
    const provincia = document.getElementById("provincia").value;
    const especie = document.getElementById("especie").value;
    const sexo = document.getElementById("sexo").value;
    const energico = document.getElementById("energico").value;
    const desparasitado = document.getElementById("desparasitado").value;
    const esterilizado = document.getElementById("esterilizado").value;

    tarjetas.forEach(tarjeta => {
        let mostrar = true;

        if (provincia !== "" && tarjeta.provincia !== provincia) {
            mostrar = false;
        }

        if (especie !== "" && tarjeta.especie !== especie) {
            mostrar = false;
        }

        if (sexo !== "" && tarjeta.sexo !== sexo) {
            mostrar = false;
        }

        if (energico !== "" && tarjeta.energico.toString() !== energico) {
            mostrar = false;
        }

        if (desparasitado !== "" && tarjeta.desparasitado.toString() !== desparasitado) {
            mostrar = false;
        }

        if (esterilizado !== "" && tarjeta.esterilizado.toString() !== esterilizado) {
            mostrar = false;
        }

        tarjeta.elemento.style.display = mostrar ? "inline-block" : "none";
    });
}

filtros.addEventListener("change", filtrarTarjetas);

filtrarTarjetas();

// Botón para resetear filtros
const botonReset = document.createElement('button');
botonReset.textContent = 'Resetear Filtros';
filtros.appendChild(botonReset);
botonReset.classList.add('reset-button')

botonReset.addEventListener('click', () => {
    document.getElementById('provincia').value = '';
    document.getElementById('especie').value = '';
    document.getElementById('sexo').value = '';
    document.getElementById('energico').value = '';
    document.getElementById('desparasitado').value = '';
    document.getElementById('esterilizado').value = '';

    filtrarTarjetas();
  });