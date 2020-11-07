const fs = require('fs'); // File System

let tareasJSON = fs.readFileSync('./tareas.json', 'utf8');
let arrayDeTareas = JSON.parse(tareasJSON);

//---------------------------------------------------------------------------------------------------------------------------------

switch(process.argv[2]) {  

//---------------------------------------------------------------------------------------------------------------------------------

        // LISTAR TAREA

    case 'listarTareas':
        console.log("Este es el listado de tareas");
        console.log("----------------------------");
        if (arrayDeTareas.length < 1) {
            console.log("    * ruido de grillos *    \n\n   Pssst... no hay tareas");
        } else {
            for (let i = 0; i < arrayDeTareas.length; i++) {
                console.log((i+1) + '. ' + arrayDeTareas[i].titulo + " • " + arrayDeTareas[i].estado);
            }
        }
        break;
        

        
//---------------------------------------------------------------------------------------------------------------------------------

        // CREAR TAREA
        
    case 'crearTarea':
        let nuevaTarea = {
            titulo: process.argv[3],
            estado: (process.argv[4] == undefined) ? "pendiente" : process.argv[4]
        }
        if (process.argv[3] == undefined) {
            console.log("Ups faltó algo... Deberías ponerle un título ¿no?");
        } else {
            arrayDeTareas.push(nuevaTarea) // Metí la nuevaTarea en el array arrayDeTareas
        let nuevasTareasEnJSON =  JSON.stringify(arrayDeTareas, null, 2) // Armé una variable que guarda el arrayDeTareas en formato JSON
        fs.writeFileSync('./tareas.json', nuevasTareasEnJSON) // Al tareas.json le agrego el array en formato JSON
        console.log(`Tu tarea llamada "${nuevaTarea.titulo}" y su estado "${nuevaTarea.estado}" fue creada con éxito!`);
        }
        break;

        

//---------------------------------------------------------------------------------------------------------------------------------

        // BORRAR TAREA

    case 'borrarTarea':
    //índice    ['node' ← 0, 'app.js' ← 1, 'borrarTarea' ← 2, 'titulo' ← 3]
    //elementos [    1     ,       2     ,          3       ,      4      ]
        if(process.argv.length < 4){ // Pregunto si es menor que 4 elementos (por eso el .length)
            console.log('Ups... Te faltó poner el título de la tarea, más específico porfis ;)');
            console.log("\nEstas son todas las tareas, seleccioná alguna por su número\n----------------------------------------------------------------");
            for (let i = 0; i < arrayDeTareas.length; i++) {
                    console.log((i+1) + '. ' + arrayDeTareas[i].titulo + " • " + arrayDeTareas[i].estado);
                }
                console.log('----------------------------------------------------------------\nCuando te asegures cuál vas a borrar, seleccionala por su número después del comando\n\n[ Ejemplo: node app.js borrarTarea 3 ]');
        } else {
            let laTareaAEliminar = process.argv[3] - 1
            arrayDeTareas.splice(laTareaAEliminar, 1)
            fs.writeFileSync("./tareas.json", JSON.stringify(arrayDeTareas, null, 2))
            console.log(`¡Excelente!\n¡Tu tarea "${(arrayDeTareas[laTareaAEliminar].titulo) - 1}" ha sido borrada para siempre!`);
    }
    break;


    
//---------------------------------------------------------------------------------------------------------------------------------

        // FILTRAR TAREAS
        
    case 'filtrarTareas':
        let estadoParaBuscar = process.argv[3]
        let tareasFiltradas = arrayDeTareas.filter(function(elemento, indice){
            elemento.posicionOriginal = indice + 1
            return estadoParaBuscar.toLowerCase() == (elemento.estado).toLowerCase()
        })
            console.log(`Tareas filtradas por "${estadoParaBuscar}" son:\n-------------------------------------`);
            for (let i = 0; i < tareasFiltradas.length; i++) {
                console.log(`${tareasFiltradas[i].posicionOriginal}. ${tareasFiltradas[i].titulo} • ${tareasFiltradas[i].estado}`);
            }
        break;


//---------------------------------------------------------------------------------------------------------------------------------

        // EDITAR ESTADO DE TAREA

    case 'cambiarEstadoDe':
        let laTarea = process.argv[3]
        let elNuevoEstado = process.argv[4]
        if (laTarea == undefined) { // SI NO HAY TAREA
            console.log("Ups, necesito el nombre de la tarea primero y luego el estado que quieras ponerle\n\n[ Por ejemplo: cambiarEstadoDe 'tarea' 'terminado' ]");
            console.log(`\nEstas son todas las tareas hasta ahora\n--------------------------------------`);
            for (let i = 0; i < arrayDeTareas.length; i++) {
                console.log((i+1) + '. ' + arrayDeTareas[i].titulo + " • " + arrayDeTareas[i].estado);
            }
        } else if (elNuevoEstado == undefined) { // SI NO HAY ESTADO
            console.log(`Tu tarea seleccionada es la número "${laTarea}", y el estado actualmente es "${arrayDeTareas[laTarea - 1].estado}", pero necesito el estado que quieras poner luego del nombre\n\nPor ejemplo: cambiarEstadoDe ${laTarea} 'terminado'`);
        } else {
            arrayDeTareas[laTarea - 1].estado = elNuevoEstado;
            fs.writeFileSync('./tareas.json', JSON.stringify(arrayDeTareas, null, 2))
        console.log(`¡Tu tarea cambió de estado a "${elNuevoEstado}" exitosamente!`);
        console.log("--------------------------------------------");
        console.log(`${arrayDeTareas[laTarea - 1].titulo} • ${elNuevoEstado}`);
            }
        break;


//---------------------------------------------------------------------------------------------------------------------------------

        // HELP

    case 'help':
        console.log("Comandos\n-------------\n• listarTareas\n• crearTarea 'nombre' 'estado' ← opcional (predeterminado: pendiente)\n• filtrarTareas 'terminada/pendiente'\n• borrarTarea 'título'");
        break;


//---------------------------------------------------------------------------------------------------------------------------------

        // ERROR

    default:
        console.log("Ups... eso no lo entiendo aún, para ver los comandos disponibles escribí → help")
            break;
        }
