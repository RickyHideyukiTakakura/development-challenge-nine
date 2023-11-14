const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");
const AppError = require("../utils/AppError");

class PatientAvatarController {
  async create(request, response) {
    let filename = null;

    if (request.file) {
      const avatarFilename = request.file.filename;
      const diskStorage = new DiskStorage();
      filename = await diskStorage.saveFile(avatarFilename);
    }

    return response.json({ filename });
  }

  async update(request, response) {
    const { id } = request.params;
    const avatarFilename = request.file.filename;

    const diskStorage = new DiskStorage();

    const patient = await knex("patients").where({ id }).first();

    if (!patient) {
      throw new AppError("None patient find");
    }

    if (patient.avatar) {
      await diskStorage.deleteFile(patient.avatar);
    }

    const filename = await diskStorage.saveFile(avatarFilename);

    patient.avatar = filename;

    await knex("patients").update(patient).where({ id });

    return response.json(patient);
  }
}

module.exports = PatientAvatarController;
