// Contadores del header
let totalTareas = 0;
let tareasCompletas = 0;

// llamar elementos del html
const tareaInput = document.getElementById("tareaInput");
const listaTareas = document.getElementById("lista-tareas");
const tareasTotal = document.getElementById("tareas-total");
const tareasCompletasElement = document.getElementById("tareas-completas");
const tareasIncompletas = document.getElementById("tareas-incompletas");
const buscador = document.querySelector(".in-busqueda");
const botonBusqueda = document.querySelector(".boton-busqueda");
const botonAgregarTarea = document.getElementById("añadir-tarea");
const tareaForm = document.getElementById("tarea-form");


// Función para actualizar los contadores
function actualizarContadores() {
    tareasTotal.textContent = totalTareas;
    tareasCompletasElement.textContent = tareasCompletas;
    tareasIncompletas.textContent = totalTareas - tareasCompletas;
}

// Función para agregar y crear elementos para nuevas tareas
function addTarea() {
    const nuevaTarea = tareaInput.value.trim();
    if (nuevaTarea !== "") {
        const tareaElemento = document.createElement("li");
        tareaElemento.textContent = nuevaTarea;

        const checkIcon = document.createElement("span");
        checkIcon.innerHTML = "";
        checkIcon.classList.add("fas", "fa-check");
        tareaElemento.appendChild(checkIcon);

        const deleteIcon = document.createElement("span");
        deleteIcon.innerHTML = "";
        deleteIcon.classList.add("fas", "fa-trash");
        tareaElemento.appendChild(deleteIcon);

        listaTareas.appendChild(tareaElemento);
        tareaInput.value = "";
        totalTareas++;
        actualizarContadores();
    }
}

// Función para marcar una tarea como completada
function marcarTareaCompleta(event) {
    const tarea = event.target.parentElement;
    tarea.classList.toggle("completada");
    if (tarea.classList.contains("completada")) {
        tareasCompletas++;
        tarea.style.backgroundColor = "rgba(202, 40, 61, 1)";
        tarea.style.textDecoration = "line-through";
        tarea.style.color = "#000000"
    } else {
        tareasCompletas--;
        tarea.style.backgroundColor = "";
        tarea.style.textDecoration = "";
        tarea.style.color = ""
    }
    actualizarContadores();
}


// Función para eliminar una tarea
function eliminarTarea(event) {
    const tarea = event.target.parentElement;
    if (tarea.classList.contains("completada")) {
        tareasCompletas--;
    }
    tarea.remove();
    totalTareas--;
    actualizarContadores();
}

// Función para mostrar y ocultar el formulario de agregar tarea
function showForm() {
    tareaForm.style.display = "block";
    botonAgregarTarea.style.display = "block";
}

// Función para  el boton cancelar del formulario
function cancelForm() {
    tareaForm.style.display = "none";
    botonAgregarTarea.style.display = "block";
}


// Función para mostrar solo la tarea buscada
function filtrarTareas() {
    const busqueda = buscador.value.toLowerCase();
    const tareas = listaTareas.getElementsByTagName("li");
    for (let i = 0; i < tareas.length; i++) {
        const tareaTexto = tareas[i].textContent.toLowerCase();
        if (tareaTexto.includes(busqueda)) {
            tareas[i].style.display = "list-item";
            tareas[i].style.display = "flex";
        } else {
            tareas[i].style.display = "none";
        }
    }
}


// Eventos del formulario para agregar tarea
botonAgregarTarea.addEventListener("click", showForm);
botonBusqueda.addEventListener("click", filtrarTareas);
tareaForm.addEventListener("reset", cancelForm);


// eventos para los botones marcar y eliminar tareas
listaTareas.addEventListener("click", function (event) {
    if (event.target.classList.contains("fa-check")) {
        marcarTareaCompleta(event);
    } else if (event.target.classList.contains("fa-trash")) {
        eliminarTarea(event);
    }
});


// Actualizar contadores de tareas
actualizarContadores();



