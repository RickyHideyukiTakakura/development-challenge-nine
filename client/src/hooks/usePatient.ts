import { useQuery } from "@tanstack/react-query";
import { PatientData, PatientFormType } from "../interfaces/IPatients";
import { getPatients, postPatient } from "../services/api";

export function usePatient(enabled = true) {
  const queryData = useQuery<PatientData>({
    queryKey: ["patients"],
    queryFn: getPatients,
    enabled,
  });

  function createPatient(patient: PatientFormType) {
    postPatient(patient);
  }

  return { ...queryData, createPatient };
}
