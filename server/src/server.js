// Importar las bibliotecas necesarias para el servidor
const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

// Crear una instancia de Express
const server = express();
// Configurar middleware para registrar solicitudes en la consola durante el desarrollo
server.use(morgan("dev"));
// Configurar middleware para manejar datos JSON en las solicitudes
server.use(express.json());
// Configurar middleware para permitir solicitudes desde cualquier origen (CORS)
server.use(cors());
// Configurar middleware para analizar el cuerpo de las solicitudes como JSON
server.use(bodyParser.json());
// Configurar el enrutador para manejar las rutas definidas en routes/index.js
server.use(router);
// habilitan y configuran el manejo de solicitudes CORS en el servidor. Esto es útil cuando tu servidor necesita interactuar con aplicaciones web en otros dominios y deseas controlar quién tiene acceso a tus recursos y qué métodos HTTP están permitidos
// Middleware adicional para habilitar y configurar el manejo de solicitudes CORS en el servidor.
// Esto es útil cuando el servidor necesita interactuar con aplicaciones web en otros dominios.
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Permitir cualquier origen
    res.header("Access-Control-Allow-Credentials", "true"); // Permitir credenciales en solicitudes
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    ); // Permitir ciertos encabezados en las solicitudes
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next(); // Permitir ciertos métodos HTTP
  });
// Exportar la instancia de Express para ser utilizada en otros archivos  
module.exports = server;
