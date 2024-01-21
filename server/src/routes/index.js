const { Router } = require("express");
const driversRouter = require('./drivers')
const teamsRouter = require('./teams')

const router = Router();

router.use("/drivers", driversRouter)
router.use("/teams", teamsRouter)

module.exports = router;
