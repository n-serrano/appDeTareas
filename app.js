const fs = require('fs'); // File System

let tareasJSON = fs.readFileSync('./tareas.json', 'utf8');
let arrayDeTareas = JSON.parse(tareasJSON);

switch(process.argv[2]) {
    case 'help':
        console.log("Comandos\n-------------\n• listarTareas\n• crearTarea 'nombre'\n• filtrarTareas 'terminada/pendiente'");
        break;



//---------------------------------------------------------------------------------------------------------------------------------

        // LISTAR TAREA

    case 'listarTareas':
        console.log("Este es el listado de tareas");
        console.log("----------------------------");
        for (let i = 0; i < arrayDeTareas.length; i++) {
            console.log((i+1) + '. ' + arrayDeTareas[i].titulo + " • " + arrayDeTareas[i].estado);
        }
        break;



//---------------------------------------------------------------------------------------------------------------------------------

        // CREAR TAREA

    case 'crearTarea':
        let nuevaTarea = {
            titulo: process.argv[3],
            estado: 'pendiente'
        }
        arrayDeTareas.push(nuevaTarea)
        let nuevasTareasEnJSON =  JSON.stringify(arrayDeTareas, null, 2)
        fs.writeFileSync('./tareas.json', nuevasTareasEnJSON)
        console.log(`Tu tarea llamada "${nuevaTarea.titulo}" fue creada con éxito!`);
        break;



//---------------------------------------------------------------------------------------------------------------------------------

            // BORRAR TAREA

    case 'borrarTarea':
    //índice    ['node' ← 0, 'app.js' ← 1, 'borrarTarea' ← 2, 'titulo' ← 3]
    //elementos [    1     ,       2     ,          3       ,      4      ]
    if(process.argv.length < 4){ // Pregunto si es menor que 4 elementos (por eso el .length) 
        console.log('Te faltó poner el título de la tarea');
    } else {
        let tituloParaBuscar = process.argv[3].toLowerCase()
        let tareaComparada = arrayDeTareas.filter(function(elemento){ // Itera en cada objeto literal (en este caso) del JSON → el .filter()
            return tituloParaBuscar == elemento.titulo.toLowerCase() // Hago una comparación entre el título escrito por terminal y el título de la propiedad de cada objeto
        })
        if (tareaComparada.length == 1 /* ← Cantidad de elementos */) { // Acá pueden pasar dos cosas: que le haiga o que no le haiga
            let tareasQueMeQuedan = arrayDeTareas.filter(function(elemento){ // Itera en cada objeto literal (en este caso) del JSON → el .filter()
                return tituloParaBuscar != elemento.titulo.toLowerCase() // Que guarde todas las que NO se llamen como el título escrito por terminal
            })
            let tareasQueMeQuedanJSON = JSON.stringify(tareasQueMeQuedan, null, 2)
            fs.writeFileSync("./tareas.json", tareasQueMeQuedanJSON)
            console.log('Bien papi la borraste\n\n            Mayub85 - 2020');
            /*console.log("Estas son todas las tareas, seleccioná alguna por su título\n----------------------------------------------------------------");
            for (let i = 0; i < arrayDeTareas.length; i++) {
                console.log((i+1) + '. ' + arrayDeTareas[i].titulo + " • " + arrayDeTareas[i].estado);
            }
            console.log("\nCuando te asegures cuál vas a borrar, seleccionala poniendo el título(respetando los caracteres especiales) después del comando\n\nEjemplo: node app.js borrarTarea "título"");
            */
        } else {
            console.log('Esta no existe padre\n\n           Mayub85 - 2020');
        }
    }
    break;



//---------------------------------------------------------------------------------------------------------------------------------

        // FILTRAR TAREAS

    case 'filtrarTareas':
        let estadoParaBuscar = process.argv[3]
        let tareasFiltradas = arrayDeTareas.filter(function(elemento){
            return estadoParaBuscar == elemento.estado
        })
        if (estadoParaBuscar == 'pendiente'){
            console.log("Tareas pendientes\n---------------");
            for (let i = 0; i < tareasFiltradas.length; i++) {
                console.log('• ' + tareasFiltradas[i].titulo);
            }
        } else if (estadoParaBuscar == 'terminada'){
            console.log("Tareas terminadas\n---------------");
            for (let i = 0; i < tareasFiltradas.length; i++) {
                console.log('• ' + tareasFiltradas[i].titulo);
            }
        } else {
            console.log("Ups... algo falló\n\nEstados disponibles\n-------------------\n• pendiente\n• terminada");
        }
        break;



//---------------------------------------------------------------------------------------------------------------------------------

            // ERROR

    default:
        console.log("Ups... hubo un error, para ver los comandos disponibles → help")
        break;
}
