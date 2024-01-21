const { Router } = require("express");
const {handlerGetAllTeams} = require("../handlers/teamsHandlers");

const teamsRouter = Router();


teamsRouter.get("/", handlerGetAllTeams);

module.exports = teamsRouter;
