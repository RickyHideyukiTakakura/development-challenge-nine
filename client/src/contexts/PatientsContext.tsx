import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChangeEvent, ReactNode, createContext, useState } from "react";
import avatarPlaceholder from "../assets/avatar_placeholder.jpeg";

interface PatientData {
  name: string;
  email: string;
  birthDate: string;
  address: string;
}

interface PatientsContextProviderProps {
  children: ReactNode;
}

interface PatientsContextType {
  avatar: string;
  avatarFile: File | null;
  createNewPatient: (data: PatientData) => void;
  handleChangeAvatar: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const PatientsContext = createContext({} as PatientsContextType);

export function PatientsContextProvider({
  children,
}: PatientsContextProviderProps) {
  const [avatar, setAvatar] = useState(avatarPlaceholder);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  function formatDate(dateString: string | undefined) {
    if (!dateString) {
      return "";
    }

    const date = parseISO(dateString);
    return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  }

  function createNewPatient(data: PatientData) {
    const newPatient = {
      name: data.name,
      email: data.email,
      birth_date: formatDate(data.birthDate),
      address: data.address,
    };
  }

  function handleChangeAvatar(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files && event.target.files[0];

    if (file) {
      setAvatarFile(file);

      const imagePreview = URL.createObjectURL(file);
      setAvatar(imagePreview);
    }
  }

  return (
    <PatientsContext.Provider
      value={{ createNewPatient, handleChangeAvatar, avatar, avatarFile }}
    >
      {children}
    </PatientsContext.Provider>
  );
}
