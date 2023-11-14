const { Router } = require("express");
const multer = require("multer");
const PatientsController = require("../controllers/PatientsController");
const PatientAvatarController = require("../controllers/PatientAvatarController");
const uploadConfig = require("../configs/upload");

const patientsRouter = Router();
const patientsController = new PatientsController();
const patientAvatarController = new PatientAvatarController();

const upload = multer(uploadConfig.MULTER);

patientsRouter.post(
  "/avatar",
  upload.single("avatar"),
  patientAvatarController.create
);
patientsRouter.post("/", patientsController.create);
patientsRouter.get("/", patientsController.index);
patientsRouter.get("/:id", patientsController.show);
patientsRouter.put("/:id", patientsController.update);
patientsRouter.patch(
  "/:id/avatar",
  upload.single("avatar"),
  patientAvatarController.update
);
patientsRouter.delete("/:id", patientsController.delete);

module.exports = patientsRouter;
