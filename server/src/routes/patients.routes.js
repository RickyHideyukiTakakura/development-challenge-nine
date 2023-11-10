const { Router } = require("express");
const PatientsController = require("../controllers/PatientsController");

const patientsRouter = Router();
const patientsController = new PatientsController();

patientsRouter.post("/", patientsController.create);
patientsRouter.get("/", patientsController.index);
patientsRouter.get("/:id", patientsController.show);
patientsRouter.put("/:id", patientsController.update);
patientsRouter.delete("/:id", patientsController.delete);

module.exports = patientsRouter;
