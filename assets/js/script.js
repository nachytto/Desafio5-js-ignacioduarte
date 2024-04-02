// Capturar el input
const getInput = document.getElementById("getTarea");
const getBtn = document.getElementById("btn-agregar");
const getLista = document.getElementById("listaTareas");
const getTotal = document.getElementById("tareasTotales");
const getCompletas = document.getElementById("tareasCompletas");

const listaTareas = [
    {
        descripcion:"Sacar a pasear al perro"
    },
    {
        descripcion:"Estudiar fisica"
    },
    {
        descripcion:"Estudiar para la prueba"
    }
];

// Funcion para añadir tarea
function añadirTarea() {
    // Capturar informacion del input
    const getDescripcion = getInput.value;

    if (getDescripcion.trim() !== "") {
        // Agregar la descripcion y su estado como un arreglo
        listaTareas.push({ descripcion: getDescripcion, estado: false });
        // Vaciar la lista una vez hecho el push
        getInput.value = "";
        // Funcion para actualizar la lista
        actualizarLista();
    }
}

// Función para eliminar tarea
function eliminarTarea(index) {
    listaTareas.splice(index, 1);
    actualizarLista();
}

function actualizarLista() {
    getLista.innerHTML = "";

    // Inicializar los contadores en 0, de la cantidad de tareas y las tareas realizadas
    let tareasTotales = 0;
    let tareasRealizadas = 0;

    // Recorrer la lista
    for (let i = 0; i < listaTareas.length; i++) {
        const tarea = listaTareas[i];
        const li = document.createElement("li");

        // Agregar id de la tarea
        const idTarea = document.createElement("span");
        idTarea.textContent = `${i}`;
        idTarea.style.margin = "8px";

        // Agregar descripción de la tarea
        const descripcionTarea = document.createElement("span");
        descripcionTarea.textContent = `${tarea.descripcion}`;
        descripcionTarea.style.margin = "8px";

        //Checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tarea.completed;
        checkbox.style.margin = "8px";

        checkbox.addEventListener("change", ()=>{
            tarea.completed = checkbox.checked;
            actualizarLista();
        })

        // Agregar botón de borrar
        const borrar = document.createElement("button");
        borrar.textContent = "X"; // Agregué el texto al botón
        borrar.style.color = "black";
        borrar.style.backgroundColor= "white"
        // Añadir evento de clic al botón de borrar
        borrar.addEventListener("click", () => eliminarTarea(i)); // Pasar el índice 'i'

        // Agregar elementos 
        li.appendChild(idTarea);
        li.appendChild(descripcionTarea);
        li.appendChild(checkbox);
        li.appendChild(borrar); // Añadir el botón de borrar al elemento 'li'

        if (tarea.completed) {
            li.classList.add("estado");
            tareasRealizadas++;
        }

        // Usar appendChild(li) en lugar de appendChild("li")
        getLista.appendChild(li);
        tareasTotales++;
    }

    getTotal.textContent = tareasTotales;
    getCompletas.textContent = tareasRealizadas;
}

getBtn.addEventListener("click", añadirTarea);
actualizarLista();
