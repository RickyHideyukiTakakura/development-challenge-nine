export interface PatientType {
  id?: string;
  name: string;
  email: string;
  birth_date: string;
  address: string;
  avatar?: string;
}

export interface PatientData {
  patients: PatientType[];
  totalCount: number;
}
