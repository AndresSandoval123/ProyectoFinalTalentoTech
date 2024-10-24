const mongoose = require("mongoose");//Módulo que permite usar tareas mas complejas al usar la bd de mongos, asu vez esta funciona si o si sobre la el módulo de mongodb, si este módulo no se instala primero, no funcionara.
const express = require("express"); 
const http = require("http");
const morgan = require("morgan"); // Permite monitoriar las peticiones.
const bp = require("body-parser");
const cors = require("cors");
const app = express(); // Con esta variable traemos todas las caracteristicas de express, para poder usarla.

const hostname = "localhost";
const port = 3000;



//-------------------------------------------------------------------------------------------------------------------------------------------------
//                                                                 Conexión a la base de datos
//-------------------------------------------------------------------------------------------------------------------------------------------------

const bdURL = 'mongodb://127.0.0.1:27017/bdProyectoFinal' //ruta url para acceder a nuestra bd activa.
mongoose.connect( bdURL ); // Establece esta conexión.

// Eventos para administración de la conexión
mongoose.connection.on("connected", ()=>{
  console.log(`Conexión a mongo realizada en: ${bdURL}.`);
});

mongoose.connection.on("error", (error)=>{
  console.log(`ERROR, no hay conexión a mongo ${error}.`);
});

mongoose.connection.on("disconnected", (error)=>{
  console.log(`Desconexión a mongo db realiza con éxito.`);
});

// Cuando termine Node, se desconectará de mongodb.
process.on( "SIGINT", ()=>{
  mongoose.connection.close(()=>{
    console.log("Conecion con base de datos terminada por finalización del servidor.");
    process.exit(0);
  });
});

//-------------------------------------------------------------------------------------------------------------------------------------------------


app.use(cors()); //Esto permite CORS para todas las rutas

app.use(morgan("dev"));
app.use(bp.json());

require('./rutas/rutslibro')(app);// Permite que en esta ruta o modulo, valide el si extiste y muestre su contenido.

app.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end(`<html><head><title>Express</title></head><body><h1>Hola desde el Api RestFull</h1></body></html>`);
});

app.listen(port,hostname,()=>{
  console.log(`Servidor en ejecución en http://${hostname}:${port}`);
})