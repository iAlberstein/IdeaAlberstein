// BASE DE DATOS DE INVIITADOS CON SISTEMA DE REGISTRO Y BÚSQUEDA

/* 

Crear estructura de la base de datos: nombre, apellido, dni, procedencia, cargo
Permitirle al usuario buscar por palabra clave si el invitado/a ya fue agregado
Mostrar la lista de invitados que coincidan con la palabra clave ingresada
Permitirle al usuario agregar un invitado en caso de no encontrarlo
*/

// NOTA: El sistema utiliza ingresos por consola: filtrarInvitados() y agregarInvitado(), además de ingreso de datos por prompt y avisos por alert/confirm.


// FUNCIÓN CONSTRUCTORA
const Invitado = function (nombre,apellido,dni,procedencia,cargo){
    this.nombre = nombre
    this.apellido = apellido
    this.dni = dni
    this.procedencia = procedencia
    this.cargo = cargo
}

//GENERACIÓN DE INVITADOS PREDEFINIDOS
let invitado = new Invitado("Javier", "Milei", 21834641, "Libertad Avanza", "Presidente electo")

//LISTA DE INVITADOS CARGADOS
let lista = [invitado]


//FUNCIÓN DE FILTRADO DE INVITADOS POR APELLIDO
function filtrarInvitados(){
    let palabraClave = prompt("Ingresar el apellido del invitado: ").toUpperCase().trim()
    let resultado = lista.filter((x) => x.apellido.toUpperCase().includes(palabraClave))
    if(resultado.length > 0){
        console.table(resultado)
    }else{
        //POSIBILIDAD DE AGREGAR NUEVO INVITADO EN CASO DE NO SER ENCONTRADA LA palabraClave
        let agregarNuevo = confirm("No se encontró ningún invitado con el apellido: " + palabraClave + ". ¿Desea agregarlo al listado?")
        if(agregarNuevo){
            agregarInvitado()
        }else{
            alert("No se agregará ningún invitado.")
        }
    }
}

//FUNCIÓN PARA AGREGAR INVITADO A LA LISTA
function agregarInvitado(){
    let nombre = prompt("Ingresá el nombre del invitado: ")
    let apellido = prompt("Ingresá el apellido del invitado: ")
    let dni = parseInt(prompt("Ingresá el DNI del invitado: "))
    let procedencia = prompt("Ingresá la procedencia del invitado: ")
    let cargo = prompt("Ingresá el cargo del invitado: ")

    //VALIDACIÓN DE INGRESO DE DATOS (Permite que "procedencia" y "cargo" queden vacíos)
    if(nombre === "" || nombre == null || apellido === "" || apellido == null || isNaN(dni) || dni <= 0){
        alert("Por favor, ingresá datos válidos.")
        return
    }

    let invitado = new Invitado(nombre, apellido, dni, procedencia, cargo)

    lista.push(invitado)
    console.table(lista)
}