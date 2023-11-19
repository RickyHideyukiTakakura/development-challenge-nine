import { zodResolver } from "@hookform/resolvers/zod";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Button, TextField } from "@mui/material";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as zod from "zod";
import avatarPlaceholder from "../../assets/avatar_placeholder.jpeg";
import { usePatient } from "../../hooks/usePatient";
import { api } from "../../services/api";
import { Avatar, AvatarInput, ButtonContainer, FormContainer } from "./styles";

const patientValidationFormSchema = zod.object({
  name: zod.string().min(1, "Enter a patient name"),
  email: zod.string().email("Enter a valid email address."),
  birthDate: zod.string().min(1).max(10),
  address: zod.string().min(1),
});

type NewPatientFormData = zod.infer<typeof patientValidationFormSchema>;

export function CreatePatientForm() {
  const { createPatient } = usePatient();

  const [avatar, setAvatar] = useState(avatarPlaceholder);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const newPatientForm = useForm<NewPatientFormData>({
    resolver: zodResolver(patientValidationFormSchema),
    defaultValues: {
      name: "",
      email: "",
      birthDate: undefined,
      address: "",
    },
  });

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = newPatientForm;

  function formatDate(dateString: string | undefined) {
    if (!dateString) {
      return "";
    }

    const date = parseISO(dateString);
    return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  }

  async function uploadAvatar(avatarFile: File) {
    try {
      const avatarFormData = new FormData();
      avatarFormData.append("avatar", avatarFile);

      const {
        data: { filename },
      } = await api.post("/patients/avatar", avatarFormData);

      return filename;
    } catch (error) {
      console.error("Error uploading avatar:", error);
      throw error;
    }
  }

  function handleChangeAvatar(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files && event.target.files[0];

    if (file) {
      setAvatarFile(file);

      const imagePreview = URL.createObjectURL(file);
      setAvatar(imagePreview);
    }
  }

  async function handleCreateNewPatient(data: NewPatientFormData) {
    try {
      const uploadedAvatarFileName = avatarFile
        ? await uploadAvatar(avatarFile)
        : "";

      const newPatient = {
        name: data.name,
        email: data.email,
        birth_date: formatDate(data.birthDate),
        address: data.address,
        avatar: uploadedAvatarFileName,
      };

      createPatient(newPatient);

      alert("Patient has been created successfully");
      navigate("/");
    } catch (error) {
      console.error("Error creating new patient:", error);
      alert("Failed to create patient. Please try again.");
    }
  }

  watch("name");
  watch("email");
  watch("birthDate");
  watch("address");

  return (
    <FormContainer onSubmit={handleSubmit(handleCreateNewPatient)}>
      <Avatar>
        <img src={avatar} alt="Foto do usuário" />

        <AvatarInput htmlFor="avatar">
          <CameraAltIcon />

          <input id="avatar" type="file" onChange={handleChangeAvatar} />
        </AvatarInput>
      </Avatar>

      <TextField
        id="name"
        label="Name"
        variant="outlined"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name ? errors.name.message : ""}
        required
      />

      <TextField
        id="email"
        label="Email"
        variant="outlined"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email ? errors.email.message : ""}
        required
      />

      <TextField
        id="date"
        type="date"
        label="Birth Date"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        {...register("birthDate")}
        error={!!errors.birthDate}
        helperText={errors.birthDate ? errors.birthDate.message : ""}
        required
      />

      <TextField
        id="address"
        label="Address"
        variant="outlined"
        {...register("address")}
        error={!!errors.address}
        helperText={errors.address ? errors.address.message : ""}
        required
      />

      <ButtonContainer>
        <Button type="submit" variant="contained">
          Register patient
        </Button>
      </ButtonContainer>
    </FormContainer>
  );
}
