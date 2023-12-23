// BASE DE DATOS DE INVIITADOS CON SISTEMA DE REGISTRO Y BÚSQUEDA

/* 

Crear estructura de la base de datos: nombre, apellido, dni, procedencia, cargo
Permitirle al usuario buscar por palabra clave si el invitado/a ya fue agregado
Mostrar la lista de invitados que coincidan con la palabra clave ingresada
Permitirle al usuario agregar un invitado en caso de no encontrarlo
*/

// FUNCIÓN CONSTRUCTORA DE INVITADO
const Invitado = function(nombre, apellido, dni, procedencia, cargo, mail) {
    this.nombre = nombre
    this.apellido = apellido
    this.dni = dni
    this.procedencia = procedencia
    this.cargo = cargo
    this.mail = mail
};

// GENERACIÓN DE INVITADOS PREDEFINIDOS
let invitado = new Invitado("Javier", "Milei", 21834641, "Libertad Avanza", "Presidente electo", "mailjavier@dominio.com")
let invitado2 = new Invitado("Victoria", "Villarruel", 20954786, "Libertad Avanza", "Vicepresidente electa", "mailvictoria@dominio.com")
let invitado3 = new Invitado("Patricia", "Bullrich", 11988336, "MINISTROS", "Ministra de Seguridad", "mailpatricia@dominio.com")

// LISTA DE INVITADOS CARGADOS
let lista = [invitado, invitado2, invitado3]

let invitadoCargadoBase = new Invitado("Nicolás", "Caputo", 11948336, "MINISTROS", "Ministro de Economía", "mailnicolas@dominio.com")

let listaInvitadosEnviados = [invitadoCargadoBase]

// LOCALSTORAGE
if (localStorage.getItem("invitados")) {
    lista = JSON.parse(localStorage.getItem("invitados"))
} else {
    lista = lista
}

if (localStorage.getItem("invitadosCargados")) {
    listaInvitadosEnviados = JSON.parse(localStorage.getItem("invitadosCargados"))
} else {
    listaInvitadosEnviados = listaInvitadosEnviados
}

// FUNCIÓN PARA LIMPIAR LA VISTA DEL INDEX.HTML
function limpiarVista() {
    const contenedor = document.getElementById("contenedor")
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild)
    }
}

// FUNCIÓN PARA MOSTRAR LA TABLA CON LOS DATOS DEL LOCALSTORAGE
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
    filtrarBtn.addEventListener("click", function() {
        const input = document.getElementById("filtrarInvitados").value
        mostrarTabla(input.trim().toUpperCase())
    });
    contenedor.appendChild(filtrarBtn)

    const limpiarBtn = document.createElement("button")
    limpiarBtn.id = "limpiarBtn"
    limpiarBtn.textContent = "Limpiar Filtro"
    limpiarBtn.addEventListener("click", function() {
        limpiarFiltro()
    });
    contenedor.appendChild(limpiarBtn)

    const agregarBtn = document.createElement("button")
    agregarBtn.id = "agregarInv"
    agregarBtn.textContent = "Agregar Invitado"
    agregarBtn.addEventListener("click", agregarInvitado)
    contenedor.appendChild(agregarBtn)

    const enviarInvitacionesBtn = document.createElement("button")
    enviarInvitacionesBtn.id = "enviarInvitacionesBtn"
    enviarInvitacionesBtn.textContent = "Enviar Invitaciones"
    enviarInvitacionesBtn.addEventListener("click", enviarInvitaciones)
    contenedor.appendChild(enviarInvitacionesBtn)

    // NUEVO BOTON PARA SUMAR INVITADOS A LA NUEVA LISTA
    const invitacionesEnviadasBtn = document.createElement("button")
    invitacionesEnviadasBtn.id = "invitacionesEnviadasBtn"
    invitacionesEnviadasBtn.textContent = "Ver Invitaciones enviadas"
    invitacionesEnviadasBtn.addEventListener("click", invitadosCargados)
    contenedor.appendChild(invitacionesEnviadasBtn)

    const tabla = document.createElement("table")

    const encabezados = document.createElement("tr");
    ["Apellido", "Nombre", "DNI", "Procedencia", "Cargo", "Mail", "Enviar"].forEach((titulo) => {
        const th = document.createElement("th")
        th.textContent = titulo
        encabezados.appendChild(th)
    });
    tabla.appendChild(encabezados)

    // FILTRADO DE LISTA POR APELLIDO
    const listaFiltrada = filtrarApellido ? lista.filter((invitado) => invitado.apellido.toUpperCase().includes(filtrarApellido)) : lista

    listaFiltrada.forEach((invitado) => {
        const fila = document.createElement("tr");

        ["apellido", "nombre", "dni", "procedencia", "cargo", "mail"].forEach((propiedad) => {
            const celda = document.createElement("td")
            celda.textContent = invitado[propiedad]
            fila.appendChild(celda)
        });

        // Agregar columna con checkbox
        const checkboxCell = document.createElement("td")
        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkboxCell.appendChild(checkbox)
        fila.appendChild(checkboxCell)

        tabla.appendChild(fila)
    });

    contenedor.appendChild(tabla)
}

// FUNCIÓN PARA ENVIAR INVITACIONES
function enviarInvitaciones() {
    const checkboxes = document.querySelectorAll("input[type=checkbox]")
    const invitadosSeleccionados = []

    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            invitadosSeleccionados.push(lista[index])
        }
    })

    listaInvitadosEnviados = listaInvitadosEnviados.concat(invitadosSeleccionados)

    // ACÁ SUCEDERÍA UNA MAGIA NEGRA, DIGO... PROGRAMACIÓN, QUE ENVIARÍA LOS MAILS

    lista = lista.filter((_, index) => !checkboxes[index].checked)

    localStorage.setItem("invitados", JSON.stringify(lista))
    localStorage.setItem("invitadosCargados", JSON.stringify(listaInvitadosEnviados))

    mostrarTabla()
}

// FUNCIÓN PARA VER LISTA DE INVITADOS CARGADOS
function invitadosCargados() {
    limpiarVista()

    const contenedor = document.getElementById("contenedor")

    const tabla = document.createElement("table")

    const encabezados = document.createElement("tr");
    ["Apellido", "Nombre", "DNI", "Procedencia", "Cargo", "Mail"].forEach((titulo) => {
        const th = document.createElement("th")
        th.textContent = titulo
        encabezados.appendChild(th)
    });
    tabla.appendChild(encabezados)

    const filtrarInput = document.createElement("input")
    filtrarInput.id = "filtrarInvitadosEnviados"
    filtrarInput.placeholder = "Filtrar por apellido"
    contenedor.appendChild(filtrarInput)

    const filtrarBtn = document.createElement("button")
    filtrarBtn.id = "filtrarInvitadosEnviadosBtn"
    filtrarBtn.textContent = "Filtrar"
    filtrarBtn.addEventListener("click", function() {
        const input = document.getElementById("filtrarInvitadosEnviados").value
        mostrarTablaInvitadosEnviados(input.trim().toUpperCase())
    });
    contenedor.appendChild(filtrarBtn)

    const limpiarBtn = document.createElement("button")
    limpiarBtn.id = "limpiarFiltroInvitadosEnviadosBtn"
    limpiarBtn.textContent = "Limpiar Filtro"
    limpiarBtn.addEventListener("click", function() {
        limpiarFiltroInvitadosEnviados()
    });
    contenedor.appendChild(limpiarBtn)

    const volverBtn = document.createElement("button")
    volverBtn.id = "volverBtn"
    volverBtn.textContent = "Volver al Inicio"
    volverBtn.addEventListener("click", function() {
        mostrarTabla()
    });
    contenedor.appendChild(volverBtn)

    listaInvitadosEnviados.forEach((invitado) => {
        const fila = document.createElement("tr");

        ["apellido", "nombre", "dni", "procedencia", "cargo", "mail"].forEach((propiedad) => {
            const celda = document.createElement("td")
            celda.textContent = invitado[propiedad]
            fila.appendChild(celda)
        });

        tabla.appendChild(fila)
    });

    contenedor.appendChild(tabla)
}

// FUNCIÓN PARA MOSTRAR LA TABLA DE INVITADOS ENVIADOS CON FILTRO POR APELLIDO
function mostrarTablaInvitadosEnviados(filtrarApellido = "") {
    limpiarVista()

    const contenedor = document.getElementById("contenedor")

    const filtrarInput = document.createElement("input")
    filtrarInput.id = "filtrarInvitadosEnviados"
    filtrarInput.placeholder = "Filtrar por apellido"
    filtrarInput.value = filtrarApellido
    contenedor.appendChild(filtrarInput)

    const filtrarBtn = document.createElement("button")
    filtrarBtn.id = "filtrarInvitadosEnviadosBtn"
    filtrarBtn.textContent = "Filtrar"
    filtrarBtn.addEventListener("click", function() {
        const input = document.getElementById("filtrarInvitadosEnviados").value
        mostrarTablaInvitadosEnviados(input.trim().toUpperCase())
    })
    contenedor.appendChild(filtrarBtn)

    const limpiarBtn = document.createElement("button")
    limpiarBtn.id = "limpiarFiltroInvitadosEnviadosBtn"
    limpiarBtn.textContent = "Limpiar Filtro"
    limpiarBtn.addEventListener("click", function() {
        limpiarFiltroInvitadosEnviados()
    });
    contenedor.appendChild(limpiarBtn)

    const volverBtn = document.createElement("button")
    volverBtn.id = "volverBtn"
    volverBtn.textContent = "Volver al Inicio"
    volverBtn.addEventListener("click", function() {
        mostrarTabla()
    });
    contenedor.appendChild(volverBtn)

    const tabla = document.createElement("table")

    const encabezados = document.createElement("tr");
    ["Apellido", "Nombre", "DNI", "Procedencia", "Cargo", "Mail"].forEach((titulo) => {
        const th = document.createElement("th")
        th.textContent = titulo
        encabezados.appendChild(th)
    });
    tabla.appendChild(encabezados)

    // FILTRADO DE LISTA POR APELLIDO
    const listaFiltrada = filtrarApellido ? listaInvitadosEnviados.filter((invitado) => invitado.apellido.toUpperCase().includes(filtrarApellido)) : listaInvitadosEnviados

    listaFiltrada.forEach((invitado) => {
        const fila = document.createElement("tr");

        ["apellido", "nombre", "dni", "procedencia", "cargo", "mail"].forEach((propiedad) => {
            const celda = document.createElement("td")
            celda.textContent = invitado[propiedad]
            fila.appendChild(celda)
        })

        tabla.appendChild(fila)
    })

    contenedor.appendChild(tabla)
}

// FUNCIÓN PARA LIMPIAR EL FILTRO EN LA TABLA DE INVITADOS ENVIADOS
function limpiarFiltroInvitadosEnviados() {
    document.getElementById("filtrarInvitadosEnviados").value = ""
    mostrarTablaInvitadosEnviados()
}

// FUNCIÓN PARA AGREGAR UN NUEVO INVITADO
function agregarInvitado() {
    limpiarVista()

    const contenedor = document.getElementById("contenedor")

    // FORMULARIO PARA AGREGAR UN NUEVO INVITADO
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

        <label for="mail-input">Mail:</label>
        <input id="mail-input" type="mail" required><br>

        <button type="submit">Agregar</button>
    `;

    form.addEventListener("submit", function(e) {
        e.preventDefault()

        const nombreInput = document.getElementById("nombre-input").value.trim()
        const apellidoInput = document.getElementById("apellido-input").value.trim()
        const dniInput = parseInt(document.getElementById("dni-input").value)
        const procedenciaInput = document.getElementById("procedencia-input").value
        const cargoInput = document.getElementById("cargo-input").value.trim()
        const mailInput = document.getElementById("mail-input").value.trim()

        if (isNaN(dniInput) || nombreInput === "" || apellidoInput === "") {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ingresá valores válidos',
            })
            return
        }

        const invitado = new Invitado(nombreInput, apellidoInput, dniInput, procedenciaInput, cargoInput, mailInput)

        // INCORPORACIÓN DE WEETALERTS
        if (lista.some((elemento) => elemento.dni === invitado.dni)) {
            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'El invitado ya se encontraba cargado en la lista.',
            });
            return
        }

        lista.push(invitado)

        localStorage.setItem("invitados", JSON.stringify(lista))
        // INCORPORACIÓN DE SWEETALERTS
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: `Se agregó el invitado ${invitado.nombre} ${invitado.apellido} correctamente`,
        })

        mostrarTabla()
    })

    contenedor.appendChild(form)
}

// FUNCIÓN PARA LIMPIAR EL FILTRO EN LA TABLA DE INVITADOS
function limpiarFiltro() {
    document.getElementById("filtrarInvitados").value = ""
    mostrarTabla()
}

const body = document.querySelector("body")

const contenedor = document.createElement("div")
contenedor.id = "contenedor"
body.appendChild(contenedor)

mostrarTabla()

function obtenerDatosClima(latitud, longitud) {
    const apiKey = '4d14d25691a0f3a9408924d99b71677a'
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${apiKey}&units=metric`
  
    fetch(weatherApiUrl)
        .then((response) => response.json()) 
        .then(data => {
          const temperaturaElemento = document.getElementById("temperatura")
          temperaturaElemento.textContent = `Temperatura actual en CABA: ${data.main.temp} °C`
        })    
    .catch(error => {console.error("Error en la URL de la API:")
    })   
  }
  document.addEventListener('DOMContentLoaded', function() {
    obtenerDatosClima(-34.60, -58.39)
  })

 