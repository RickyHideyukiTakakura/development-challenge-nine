import { useQuery } from "@tanstack/react-query";
import { PatientData, PatientFormType } from "../interfaces/IPatients";
import { getPatients, postPatient } from "../services/api";

export function usePatient(page = 1, patientsPerPage = 5, enabled = true) {
  const queryData = useQuery<PatientData>({
    queryKey: ["patients", page, patientsPerPage],
    queryFn: () => getPatients(page, patientsPerPage),
    enabled,
  });

  function createPatient(patient: PatientFormType) {
    postPatient(patient);
  }

  return { ...queryData, createPatient, patientsPerPage };
}
