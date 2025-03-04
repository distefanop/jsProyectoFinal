// Variables y funciones iniciales

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
const selectProvincia = document.getElementById("provincia");
const selectModalProvincia = document.getElementById("modalProvincia");
const botonReset = document.getElementById("reset-button");
const botonDelete = document.getElementById("delete-button");

let tarjetas = [];
let provincias = [];

function guardarTarjetas() {
    localStorage.setItem('tarjetas', JSON.stringify(tarjetas));
}

// Función para crear tarjetas

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
        guardarCambios.removeEventListener('click', guardar);

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
        
        guardarCambios.addEventListener('click', guardar);
    
        function guardar(evento) {
            evento.preventDefault();
        
            const nuevoNombre = modalNombre.value.toLowerCase();
            const nuevaEdad = modalEdad.value;
            const nuevaProvincia = modalProvincia.value;
            const nuevaEspecie = modalEspecie.value;
            const nuevoSexo = modalSexo.value;
            const nuevoEnergico = modalEnergico.checked;
            const nuevoDesparasitado = modalDesparasitado.checked;
            const nuevoEsterilizado = modalEsterilizado.checked;
        
            // Verifica si se modificaron los campos
            if (
            nuevoNombre === tarjeta.nombre &&
            nuevaEdad === tarjeta.edad &&
            nuevaProvincia === tarjeta.provincia &&
            nuevaEspecie === tarjeta.especie &&
            nuevoSexo === tarjeta.sexo &&
            nuevoEnergico === tarjeta.energico &&
            nuevoDesparasitado === tarjeta.desparasitado &&
            nuevoEsterilizado === tarjeta.esterilizado
            ) {          
            Swal.fire({
                title: 'No se realizaron cambios',
                text: 'No se modificó ningún campo',
                icon: 'info',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#84b333',
                customClass: {
                    popup: 'swal2-contenedor',
                    htmlContainer: 'contenido',
                    confirmButton: 'btnConfirmar',
                }
            });
            
            return;
        }
    
        tarjeta.nombre = nuevoNombre;
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
    
        Swal.fire({
            title: 'Tarjeta Actualizada',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#84b333',
            customClass: {
                popup: 'swal2-contenedor',
                htmlContainer: 'contenido',
                confirmButton: 'btnConfirmar',
            }
            });
        }
    });
    
    botonesDiv.appendChild(botonEditar);

    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.addEventListener('click', () => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "La tarjeta se eliminará de forma permanente",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#84b333',
            cancelButtonColor: '#dc602e',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            customClass: {
                popup: 'swal2-contenedor',
                htmlContainer: 'contenido',
                confirmButton: 'btnConfirmar',
                cancelButton: 'btnCancelar'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    tarjeta.elemento.remove();
                    const indice = tarjetas.indexOf(tarjeta);
                    if (indice > -1) {
                        tarjetas.splice(indice, 1);
                        guardarTarjetas();
                    }
                    Swal.fire({
                        title: "Eliminada",
                        text: "La tarjeta fue eliminada",
                        icon: "success",
                        confirmButtonColor: '#84b333',
                        customClass: {
                            popup: 'swal2-contenedor',
                            htmlContainer: 'contenido',
                            confirmButton: 'btnConfirmar',
                        }
                    });
                } catch (error) {
                    console.error("Error al eliminar la tarjeta:", error);
                    Swal.fire({
                        title: "Error",
                        text: "No se pudo eliminar la ficha",
                        icon: "error",
                        customClass: {
                            htmlContainer: 'contenido',
                        }
                    });
                }
            }
        });
    });

    botonesDiv.appendChild(botonEliminar);

    tarjeta.elemento.appendChild(botonesDiv);

    return tarjeta;
}

// Eventos y funciones de interacción

generarTarjeta.addEventListener('click', () => {
    const nuevaTarjeta = crearTarjeta('Nombre', 'Edad');
    contenedorTarjetas.appendChild(nuevaTarjeta.elemento);

    tarjetas.push(nuevaTarjeta);
    guardarTarjetas();
});

closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('DOMContentLoaded', () => {
    contenedorTarjetas.innerHTML = '';
    const tarjetasGuardadas = localStorage.getItem('tarjetas');
    if (tarjetasGuardadas) {
        const tarjetasGuardadasArray = JSON.parse(tarjetasGuardadas);
        tarjetasGuardadasArray.forEach(tarjetaGuardada => {
            tarjetaGuardada.editando = false;

            // Se fija si tarjeta ya existe en el array 'tarjetas'
            let tarjetaExistente = tarjetas.find(tarjeta => tarjeta.nombre === tarjetaGuardada.nombre);

            // Actualiza las propiedades de la tarjeta existente
            if (tarjetaExistente) {            
                tarjetaExistente.edad = tarjetaGuardada.edad;
                tarjetaExistente.provincia = tarjetaGuardada.provincia;
                tarjetaExistente.especie = tarjetaGuardada.especie;
                tarjetaExistente.sexo = tarjetaGuardada.sexo;
                tarjetaExistente.energico = tarjetaGuardada.energico;
                tarjetaExistente.desparasitado = tarjetaGuardada.desparasitado;
                tarjetaExistente.esterilizado = tarjetaGuardada.esterilizado;
                tarjetaExistente.imagen = tarjetaGuardada.imagen;

            // Actualiza la visualización de la tarjeta existente
                tarjetaExistente.elemento.querySelector('.info').innerHTML = `<strong>${tarjetaExistente.nombre.toUpperCase()}</strong> (${tarjetaExistente.edad} años)`;
                tarjetaExistente.elemento.querySelector('img').src = tarjetaExistente.imagen;
                contenedorTarjetas.appendChild(tarjetaExistente.elemento);
            } else {
            // Si la tarjeta no existe, crea una nueva
                const nuevaTarjeta = crearTarjeta(tarjetaGuardada.nombre, tarjetaGuardada.edad);
                nuevaTarjeta.provincia = tarjetaGuardada.provincia;
                nuevaTarjeta.especie = tarjetaGuardada.especie;
                nuevaTarjeta.sexo = tarjetaGuardada.sexo;
                nuevaTarjeta.energico = tarjetaGuardada.energico;
                nuevaTarjeta.desparasitado = tarjetaGuardada.desparasitado;
                nuevaTarjeta.esterilizado = tarjetaGuardada.esterilizado;
                nuevaTarjeta.imagen = tarjetaGuardada.imagen;
                nuevaTarjeta.elemento.querySelector('.info').innerHTML = `<strong>${nuevaTarjeta.nombre.toUpperCase()}</strong> (${nuevaTarjeta.edad} años)`;
                nuevaTarjeta.elemento.querySelector('img').src = nuevaTarjeta.imagen;
                contenedorTarjetas.appendChild(nuevaTarjeta.elemento);
                tarjetas.push(nuevaTarjeta);
            }
        });
    }
    cargarProvincias();
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

botonReset.addEventListener('click', () => {
    document.getElementById('provincia').value = '';
    document.getElementById('especie').value = '';
    document.getElementById('sexo').value = '';
    document.getElementById('energico').value = '';
    document.getElementById('desparasitado').value = '';
    document.getElementById('esterilizado').value = '';

    filtrarTarjetas();
    });

botonDelete.addEventListener('click', () => {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "Las tarjetas se eliminarán de forma permanente",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#84b333',
        cancelButtonColor: '#dc602e',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        customClass: {
            popup: 'swal2-contenedor',
            htmlContainer: 'contenido',
            confirmButton: 'btnConfirmar',
            cancelButton: 'btnCancelar'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            eliminarTarjetas();
        }
    });
});

function eliminarTarjetas() {
    tarjetas.forEach(tarjeta => {
        tarjeta.elemento.remove();
    });
    tarjetas = [];
    guardarTarjetas();
    contenedorTarjetas.innerHTML = '';
    Swal.fire({
        title: "Tarjetas Eliminadas",
        text: "Todas las tarjetas han sido eliminadas",
        icon: "success",
        confirmButtonColor: '#84b333',
        customClass: {
            popup: 'swal2-contenedor',
            htmlContainer: 'contenido',
            confirmButton: 'btnConfirmar',
        }
    });
}

// Función para cargar provincias desde una API

function cargarProvincias() {
    fetch('https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre')
        .then(response => response.json())
        .then(data => {
            provincias = data.provincias.map(provincia => {
                let nombre = provincia.nombre;
                if (nombre === "Ciudad Autónoma de Buenos Aires") {
                    nombre = "CABA";
                } else if (nombre === "Tierra del Fuego, Antártida e Islas del Atlántico Sur") {
                    nombre = "Tierra del Fuego";
                }
                return nombre;
            });
            provincias.sort();
            provincias.forEach(provincia => {
                const option = document.createElement('option');
                option.value = provincia;
                option.textContent = provincia;
                selectProvincia.appendChild(option);

                const modalOption = document.createElement('option');
                modalOption.value = provincia;
                modalOption.textContent = provincia;
                selectModalProvincia.appendChild(modalOption);
            });
        })
        .catch(error => console.error('Error al cargar provincias:', error));
}