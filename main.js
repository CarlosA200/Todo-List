// variables Contadores del header
let totalTareas = 0;
let tareasCompletas = 0;

// Llamar elementos del HTML
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
        tarea.style.backgroundColor = "rgba(0, 255, 0, 0.5)";
        tarea.style.textDecoration = "line-through";
        tarea.style.color = "#000000";
    } else {
        tareasCompletas--;
        tarea.style.backgroundColor = "";
        tarea.style.textDecoration = "";
        tarea.style.color = "";
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





// Función para el botón cancelar del formulario
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





// Eventos para los botones marcar y eliminar tareas
listaTareas.addEventListener("click", function (event) {
    if (event.target.classList.contains("fa-check")) {
        marcarTareaCompleta(event);
    } else if (event.target.classList.contains("fa-trash")) {
        eliminarTarea(event);
    }
});





// Actualizar contadores de tareas automaticamente
actualizarContadores();





// html del inicio de seccion
const loginContainer = document.getElementById("login-container");
const loginForm = document.getElementById("login-form");
const cancelButton = document.getElementById("cancel-button");
const userSelection = document.getElementById("user-selection");
const users = document.querySelectorAll(".user");





// Usuarios, sus contraseñas y colores por defecto
const usuarios = [
    { username: "Carlos", password: "pass", colorClass: "user1-bg" },
    { username: "Angela", password: "pass", colorClass: "user2-bg" },
    { username: "Dany", password: "pass", colorClass: "user3-bg" },
];

let selectedUser = null;





// Función para mostrar el formulario de inicio de sesión al abrir la pagina
function showLoginForm() {
    loginForm.style.display = "block";
}





// Función para ocultar el formulario de inicio de sesion al iniciar sesion
function hideLoginForm() {
    loginForm.style.display = "none";
}





// Función para mostrar la selección de usuarios
function showUserSelection() {
    userSelection.style.display = "flex";
    loginContainer.style.display = "none";
}





// Función para ocultar la selección de usuarios al seleccionar uno
function hideUserSelection() {
    userSelection.style.display = "none";
}





// Función para verificar si el inicio de seccion es correcto
function checkLogin(event) {
    event.preventDefault();
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const username = usernameInput.value;
    const password = passwordInput.value;

    const user = usuarios.find(u => u.username === username && u.password === password);

    if (user) {
        selectedUser = user;
        document.body.classList.add(selectedUser.colorClass);
        loginContainer.style.display = "none";
        showTodoListContent();
        limpiarListaTareas();
        mostrarTareasPorUsuario();
    } else {
        alert("Credenciales inválidas. Inténtalo nuevamente.");
    }
}




// Función para limpiar la lista de tareas y mostrar por defecto
function limpiarListaTareas() {
    listaTareas.innerHTML = "";
    totalTareas = 0;
    tareasCompletas = 0;
}





// Función para mostrar el contenido del TODO LIST
function showTodoListContent() {
    document.getElementById("page-content").style.display = "block";
}




// Agregar eventos a los botones y usuarios
botonAgregarTarea.addEventListener("click", showLoginForm);
cancelButton.addEventListener("click", hideLoginForm);
loginForm.addEventListener("submit", checkLogin);

users.forEach(user => {
    user.addEventListener("click", () => {
        selectedUser = usuarios[user.dataset.userId];
        document.body.classList.add(selectedUser.colorClass);
        hideUserSelection();
        showLoginForm();
    });
});







//tareas por defecto para cada usuario
const tareasPorDefecto = [
    // usuario Carlos
    {
        usuario: "Carlos",
        tareas: [
            {
                tarea: "Ir a la Universidad",
                completada: false,
            },
            {
                tarea: "Salir al Cine a las 8PM",
                completada: true,
            },
        ],
    },





    // usuario Angela
    {
        usuario: "Angela",
        tareas: [
            {
                tarea: "Avanzar proyecto Todo List",
                completada: false,
            },
        ],
    },





    // usuario Dany
    {
        usuario: "Dany",
        tareas: [
            {
                tarea: "Ir al GYM a las de 5pm a 8",
                completada: true,
            },
        ],
    },
];








// Función para mostrar las tareas por defecto al seleccionar un usuario
function mostrarTareasPorUsuario() {
    const tareasUsuario = tareasPorDefecto.find((user) => user.usuario === selectedUser.username);
    if (tareasUsuario) {
        tareasUsuario.tareas.forEach((tarea) => {
            const tareaElemento = document.createElement("li");
            tareaElemento.textContent = tarea.tarea;

            if (tarea.completada) {
                tareaElemento.classList.add("completada");
                tareaElemento.style.backgroundColor = "rgba(0, 255, 0, 0.5)";
                tareaElemento.style.textDecoration = "line-through";
                tareaElemento.style.color = "#000000";
                tareasCompletas++;
            }

            const checkIcon = document.createElement("span");
            checkIcon.innerHTML = "";
            checkIcon.classList.add("fas", "fa-check");
            tareaElemento.appendChild(checkIcon);

            const deleteIcon = document.createElement("span");
            deleteIcon.innerHTML = "";
            deleteIcon.classList.add("fas", "fa-trash");
            tareaElemento.appendChild(deleteIcon);

            listaTareas.appendChild(tareaElemento);
            totalTareas++;
        });
    }

    actualizarContadores();
}
