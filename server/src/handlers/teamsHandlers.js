const controllerGetAllTeams = require("../controllers/teamsController");

const handlerGetAllTeams = async (req, res) => {
  try {
    const response = await controllerGetAllTeams();

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

};

module.exports = {
  handlerGetAllTeams,
};
