import { ReactNode, createContext, useState } from "react";
import { api } from "../services/api";

export interface PatientData {
  id: string;
  name: string;
  email: string;
  birth_date: string;
  address: string;
  avatar: string;
}

interface PatientsContextProviderProps {
  children: ReactNode;
}

interface PatientsContextType {
  patientById: PatientData | null;
  fetchPatientById: (id: string) => void;
}

export const PatientsContext = createContext({} as PatientsContextType);

export function PatientsContextProvider({
  children,
}: PatientsContextProviderProps) {
  const [patientById, setPatientById] = useState<PatientData | null>(null);

  async function fetchPatientById(id: string) {
    try {
      const response = await api.get(`/patients/${id}`);
      setPatientById(response.data);
    } catch (error) {
      console.error("Error fetch patient:", error);
      alert("Failed to fetch patient.");
    }
  }

  return (
    <PatientsContext.Provider value={{ patientById, fetchPatientById }}>
      {children}
    </PatientsContext.Provider>
  );
}
