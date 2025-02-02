import { useQuery } from "@tanstack/react-query";
import { PatientData, PatientType } from "../interfaces/IPatients";
import { getPatients, postPatient } from "../services/api";

export function usePatient(page = 1, patientsPerPage = 5, enabled = true) {
  const queryData = useQuery<PatientData>({
    queryKey: ["patients", page, patientsPerPage],
    queryFn: () => getPatients(page, patientsPerPage),
    enabled,
  });

  async function createPatient(patient: PatientType) {
    await postPatient(patient);
  }

  return { ...queryData, createPatient, patientsPerPage };
}
