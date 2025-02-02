const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class PatientsController {
  async create(request, response) {
    const { name, birth_date, email, address, avatar = null } = request.body;

    const checkIfPatientAlreadyExists = await knex("patients")
      .where({ email })
      .first();

    if (checkIfPatientAlreadyExists) {
      throw new AppError("Email already exists");
    }

    await knex("patients").insert({
      name,
      birth_date,
      email,
      address,
      avatar,
    });

    return response.json();
  }

  async index(request, response) {
    const { name, page = 1, patientsPerPage = 5 } = request.query;
    const offset = (page - 1) * patientsPerPage;

    let patient = knex("patients");

    if (name) {
      patient = patient.where("name", "like", `%${name}%`);
    }

    const totalCount = await patient.clone().count("* as totalCount").first();
    const filteredPatients = await patient
      .select("")
      .limit(patientsPerPage)
      .offset(offset);

    return response.json({
      patients: filteredPatients,
      totalCount: totalCount.totalCount,
    });
  }

  async show(request, response) {
    const { id } = request.params;

    const patient = await knex("patients").where({ id }).first();

    if (!patient) {
      throw new AppError("Patient not found");
    }

    return response.json(patient);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, birth_date, email, address } = request.body;

    const patient = await knex("patients").where({ id }).first();

    if (!patient) {
      throw new AppError("Patient not found");
    }

    if (email && email !== patient.email) {
      const patientWithUpdatedEmail = await knex("patients")
        .where({ email })
        .first();

      if (patientWithUpdatedEmail) {
        throw new AppError("Email already exists");
      }
    }

    patient.name = name ?? patient.name;
    patient.birth_date = birth_date ?? patient.birth_date;
    patient.email = email ?? patient.email;
    patient.address = address ?? patient.address;

    await knex("patients").where({ id }).update({
      name: patient.name,
      birth_date: patient.birth_date,
      email: patient.email,
      address: patient.address,
      updated_at: knex.fn.now(),
    });

    return response.json();
  }

  async delete(request, response) {
    const { id } = request.params;

    const patientExists = await knex("patients").where({ id }).first();

    if (!patientExists) {
      throw new AppError("Patient does not exist");
    }

    await knex("patients").where({ id }).delete();

    return response.json();
  }
}

module.exports = PatientsController;
