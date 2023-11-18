import { zodResolver } from "@hookform/resolvers/zod";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Button, TextField } from "@mui/material";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import * as zod from "zod";
import avatarPlaceholder from "../../assets/avatar_placeholder.jpeg";
import { PatientData } from "../../pages/Home/components/PatientsList";
import { api } from "../../services/api";
import { Avatar, AvatarInput, ButtonContainer, FormContainer } from "./styles";

const patientValidationFormSchema = zod.object({
  name: zod.string().nullable(),
  email: zod.string().email().nullable(),
  birthDate: zod.string().nullable(),
  address: zod.string().nullable(),
});

type UpdatePatientFormData = zod.infer<typeof patientValidationFormSchema>;

export function UpdatePatientForm() {
  const params = useParams();
  const navigate = useNavigate();

  const { data: patientById } = useQuery<PatientData>(
    ["patient", params.id],
    fetchPatient
  );

  const avatarUrl =
    patientById && patientById.avatar
      ? `${api.defaults.baseURL}/files/${patientById.avatar}`
      : avatarPlaceholder;

  const [avatar, setAvatar] = useState(avatarUrl);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const updatePatientForm = useForm<UpdatePatientFormData>({
    resolver: zodResolver(patientValidationFormSchema),
    defaultValues: {
      name: patientById ? patientById.name : "",
      email: patientById && patientById.email,
      birthDate: null,
      address: patientById ? patientById.address : "",
    },
  });

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = updatePatientForm;

  async function fetchPatient() {
    const response = await api.get(`/patients/${params.id}`);
    return response.data;
  }

  function formatDate(dateString: string | null) {
    if (!dateString) {
      return "";
    }

    const date = parseISO(dateString);
    return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  }

  async function updateAvatarFile(patient: PatientData, avatarFilename: File) {
    try {
      if (avatarFilename) {
        const fileUploadForm = new FormData();
        fileUploadForm.append("avatar", avatarFilename);

        const response = await api.patch(
          `/patients/${params.id}/avatar`,
          fileUploadForm
        );

        patient.avatar = response.data.avatar;
      }
    } catch (error) {
      console.error("Error updating patient avatar:", error);
      alert("Failed to update avatar.");
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

  async function handleUpdatePatient(data: UpdatePatientFormData) {
    try {
      if (!patientById) {
        return alert("Patient data is missing");
      }

      const updatePatient = {
        name: data.name || patientById.name,
        email: data.email || patientById.email,
        birth_date: data.birthDate
          ? formatDate(data.birthDate)
          : patientById.birth_date,
        address: data.address || patientById.address,
      };

      if (avatarFile) {
        await updateAvatarFile(patientById, avatarFile);
      }

      await api.put(`/patients/${params.id}`, updatePatient);

      alert("Patient has been updated successfully");
      navigate(-1);
    } catch (error) {
      console.error("Error updating patient:", error);
      alert("Failed to update patient.");
    }
  }

  async function handleDeletePatient() {
    const confirm = window.confirm(
      "Are you sure you want to delete this patient?"
    );

    if (confirm) {
      try {
        await api.delete(`/patients/${params.id}`);
        navigate("/");
      } catch (error) {
        console.error("Error deleting patient:", error);
        alert("Failed to delete patient.");
      }
    }
  }

  watch("name");
  watch("email");
  watch("birthDate");
  watch("address");

  return (
    <FormContainer onSubmit={handleSubmit(handleUpdatePatient)}>
      <Avatar>
        <img src={avatar} alt="User avatar" />

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
      />

      <TextField
        id="email"
        label="Email"
        variant="outlined"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email ? errors.email.message : ""}
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
      />

      <TextField
        id="address"
        label="Address"
        variant="outlined"
        {...register("address")}
        error={!!errors.address}
        helperText={errors.address ? errors.address.message : ""}
      />

      <ButtonContainer>
        <Button variant="contained" color="error" onClick={handleDeletePatient}>
          Delete patient
        </Button>

        <Button variant="contained" type="submit">
          Update patient
        </Button>
      </ButtonContainer>
    </FormContainer>
  );
}
