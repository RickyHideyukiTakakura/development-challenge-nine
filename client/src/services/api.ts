import axios from "axios";
import { PatientType } from "../hooks/usePatient";

export const api = axios.create({
  baseURL: "http://localhost:3333",
});

export async function postPatient(patient: PatientType) {
  const response = await api.post(`/patients`, patient);
  return response.data;
}

export async function putPatient(id: string, patient: PatientType) {
  const response = await api.put(`/patients/${id}`, patient);
  return response.data;
}

export async function deletePatient(id: string) {
  const response = await api.delete(`/patients/${id}`);
  return response.data;
}

export async function getPatients() {
  const response = await api.get(`/patients`);
  return response.data;
}

export async function getPatientById(id: string) {
  const response = await api.get(`/patients/${id}`);
  return response.data;
}
