const { Router } = require("express");
const patientsRouter = require("./patients.routes");

const routes = Router();

routes.use("/patients", patientsRouter);

module.exports = routes;
