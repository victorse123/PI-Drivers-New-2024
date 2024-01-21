const { Router } = require("express");
const { handlerGetAllDrivers, handlerGetDriverByName, handlerGetDriverById, handlerCreateNewDriver, handlerGetAllNationalities, handlerGetLocalNationalities, handlerGetFlagByDriver, handlerDeleteDriver } = require("../handlers/driversHandlers");


const driversRouter = Router();


driversRouter.get("/nationalities", handlerGetAllNationalities);
driversRouter.get("/localnationalities", handlerGetLocalNationalities);
driversRouter.get("/flag/:id", handlerGetFlagByDriver);
driversRouter.get("/name", handlerGetDriverByName);
driversRouter.get("/:id", handlerGetDriverById);
driversRouter.get("/", handlerGetAllDrivers);
driversRouter.post("/", handlerCreateNewDriver);
driversRouter.delete("/:id", handlerDeleteDriver);

module.exports = driversRouter;
