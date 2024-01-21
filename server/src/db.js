// Importar el módulo dotenv para cargar variables de entorno desde un archivo .env
require("dotenv").config();
// Importar Sequelize y módulos relacionados
const { Sequelize } = require("sequelize");
const fs = require('fs');
const path = require('path');

//const {DB_USER, DB_PASSWORD, DB_HOST, DB_NAME} = process.env;

// Obtener la cadena de conexión a la base de datos desde la variable de entorno
const dataBaseDeploy = process.env.DATA_BASE_DEPLOY;
// Importar los modelos de la base de datos
const DriverModel = require("./models/Driver");
const TeamModel = require("./models/Team");

//const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
const sequelize = new Sequelize(dataBaseDeploy, {
  logging: false, // Desactivar los mensajes de registro de Sequelize
  native: false, // Desactivar la compatibilidad nativa con Node.js
});

sequelize.authenticate()
  .then((res) => console.log("Connection to DB-Drivers stablished succesfully"))
  .catch((error) => console.log("Connection fail: " + error.message))

// Obtener el nombre del archivo actual  
const basename = path.basename(__filename);

const modelDefiners = [];

// Leer los archivos del directorio "models" y filtrar aquellos que son modelos
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
// Importar cada modelo y añadirlo al array modelDefiners
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Iterar sobre los modelos y llamar a la función de definición para cada uno
modelDefiners.forEach(model => model(sequelize));

// Convertir los nombres de los modelos a mayúsculas
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);
// Llamar a las funciones de definición de modelos para Driver y Team
DriverModel(sequelize);
TeamModel(sequelize);
// Obtener los modelos de la base de datos
const { Driver, Team } = sequelize.models;
// Definir la relación muchos a muchos entre Driver y Team a través de la tabla intermedia DriverTeam
Driver.belongsToMany(Team, { through: 'driver_team', timestamps: false });
Team.belongsToMany(Driver, { through: "driver_team", timestamps: false });
// Exportar los modelos y la instancia de conexión para su uso en otras partes de la aplicación
module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};