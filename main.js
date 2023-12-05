// BASE DE DATOS DE INVIITADOS CON SISTEMA DE REGISTRO Y BÚSQUEDA

/* 

Crear estructura de la base de datos: nombre, apellido, dni, procedencia, cargo
Permitirle al usuario buscar por palabra clave si el invitado/a ya fue agregado
Mostrar la lista de invitados que coincidan con la palabra clave ingresada
Permitirle al usuario agregar un invitado en caso de no encontrarlo
*/

// FUNCIÓN CONSTRUCTORA
const Invitado = function (nombre, apellido, dni, procedencia, cargo) {
    this.nombre = nombre
    this.apellido = apellido
    this.dni = dni
    this.procedencia = procedencia
    this.cargo = cargo
};

// GENERACIÓN DE INVITADOS PREDEFINIDOS
let invitado = new Invitado("Javier", "Milei", 21834641, "Libertad Avanza", "Presidente electo")
let invitado2 = new Invitado("Victoria", "Villaruel", 20954786, "Libertad Avanza", "Vicepresidente electa")
let invitado3 = new Invitado("Patricia", "Bullrich", 11988336, "MINISTROS", "Ministra de Seguridad")

// LISTA DE INVITADOS CARGADOS
let lista = [invitado, invitado2, invitado3]

// LOCALSTORAGE
if (localStorage.getItem("invitados")) {
    lista = JSON.parse(localStorage.getItem("invitados"))
} else {
    lista = lista
}


//FUNCIÓN PARA LIMPIAR LA VISTA DEL INDEX.HTML
function limpiarVista() {
    const contenedor = document.getElementById("contenedor")
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild)
    }
}


//FUNCIÓN PARA MOSTRAR LA TABLA CON LOS DATOS DEL LOCALSTORAGE
function mostrarTabla(filtrarApellido = "") {
    limpiarVista()

    const contenedor = document.getElementById("contenedor")

    const filtrarInput = document.createElement("input")
    filtrarInput.id = "filtrarInvitados"
    filtrarInput.placeholder = "Filtrar por apellido"
    filtrarInput.value = filtrarApellido
    contenedor.appendChild(filtrarInput)

    const filtrarBtn = document.createElement("button")
    filtrarBtn.id = "filtrarInv"
    filtrarBtn.textContent = "Filtrar"
    filtrarBtn.addEventListener("click", function () {
        const input = document.getElementById("filtrarInvitados").value
        mostrarTabla(input.trim().toUpperCase())
    })
    contenedor.appendChild(filtrarBtn)


    const limpiarBtn = document.createElement("button")
    limpiarBtn.id = "limpiarBtn"
    limpiarBtn.textContent = "Limpiar Filtro"
    limpiarBtn.addEventListener("click", function () {
        limpiarFiltro()
    })
    contenedor.appendChild(limpiarBtn)

    const agregarBtn = document.createElement("button")
    agregarBtn.id = "agregarInv"
    agregarBtn.textContent = "Agregar Invitado"
    agregarBtn.addEventListener("click", agregarInvitado)
    contenedor.appendChild(agregarBtn)


    const tabla = document.createElement("table")


    const encabezados = document.createElement("tr");
    ["Apellido", "Nombre", "DNI", "Procedencia", "Cargo"].forEach((titulo) => {
        const th = document.createElement("th")
        th.textContent = titulo
        encabezados.appendChild(th)
    })
    tabla.appendChild(encabezados)

    // FILTRADO DE LISTA POR APELLIDO
    const listaFiltrada = filtrarApellido ? lista.filter((invitado) => invitado.apellido.toUpperCase().includes(filtrarApellido)) : lista


    listaFiltrada.forEach((invitado) => {
        const fila = document.createElement("tr");


        ["apellido", "nombre", "dni", "procedencia", "cargo"].forEach((propiedad) => {
            const celda = document.createElement("td")
            celda.textContent = invitado[propiedad]
            fila.appendChild(celda)
        })

        tabla.appendChild(fila)
    })

    contenedor.appendChild(tabla)
}


//FUNCIÓN PARA AGREGAR UN NUEVO INVITADO
function agregarInvitado() {
    limpiarVista()

    const contenedor = document.getElementById("contenedor")

    //FORMULARIO PARA AGREGAR UN NUEVO INVITADO
    const form = document.createElement("form")
    form.innerHTML = `
        <h2>AGREGAR INVITADO</h2>
        <label for="nombre-input">Nombre:</label>
        <input id="nombre-input" type="text" required><br>

        <label for="apellido-input">Apellido:</label>
        <input id="apellido-input" type="text" required><br>

        <label for="dni-input">DNI:</label>
        <input id="dni-input" type="number" required><br>

        <label for="procedencia-input">Procedencia:</label>
        <select id="procedencia-input" required>
            <option value="Libertad Avanza">Libertad Avanza</option>
            <option value="GOBERNADORES">GOBERNADORES</option>
            <option value="INTENDENTES">INTENDENTES</option>
            <option value="MINISTROS">MINISTROS</option>
            <option value="CORTE SUPREMA">CORTE SUPREMA</option>
            <option value="CUERPO DIPLOMÁTICO">CUERPO DIPLOMÁTICO</option>
            <option value="HSN/HCDN">HSN/HCDN</option>
        </select><br>

        <label for="cargo-input">Cargo:</label>
        <input id="cargo-input" type="text"><br>

        <button type="submit">Agregar</button>
    `;

    form.addEventListener("submit", function (e) {
        e.preventDefault()

        const nombreInput = document.getElementById("nombre-input").value.trim()
        const apellidoInput = document.getElementById("apellido-input").value.trim()
        const dniInput = parseInt(document.getElementById("dni-input").value)
        const procedenciaInput = document.getElementById("procedencia-input").value
        const cargoInput = document.getElementById("cargo-input").value.trim()

        if (isNaN(dniInput) || nombreInput === "" || apellidoInput === "") {
            alert("Ingresá valores válidos")
            return
        }

        const invitado = new Invitado(nombreInput, apellidoInput, dniInput, procedenciaInput, cargoInput)

        if (lista.some((elemento) => elemento.dni === invitado.dni)) {
            alert("El invitado ya se encontraba cargado en la lista.")
            return
        }

        lista.push(invitado)

        localStorage.setItem("invitados", JSON.stringify(lista))
        alert(`Se agregó el invitado ${invitado.nombre} ${invitado.apellido} correctamente`)

        mostrarTabla()
    })

    contenedor.appendChild(form)
}

function limpiarFiltro() {
    document.getElementById("filtrarInvitados").value = ""
    mostrarTabla()
}

const body = document.querySelector("body")

const contenedor = document.createElement("div")
contenedor.id = "contenedor"
body.appendChild(contenedor)

mostrarTabla()

