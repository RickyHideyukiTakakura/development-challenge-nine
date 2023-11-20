import { useQuery } from "@tanstack/react-query";
import { PatientType } from "../interfaces/IPatients";
import { deletePatient, getPatientById, putPatient } from "../services/api";

export function usePatientById(patientId?: string) {
  const queryData = useQuery<PatientType>({
    queryKey: ["patient-id", patientId],
    queryFn: () => {
      if (!patientId) {
        return {} as PatientType;
      }
      return getPatientById(patientId);
    },
  });

  async function updatePatient(id: string, patient: PatientType) {
    await putPatient(id, patient);
  }

  async function delPatient(id: string) {
    await deletePatient(id);
  }

  return { ...queryData, updatePatient, delPatient };
}
