import { zodResolver } from "@hookform/resolvers/zod";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Button, TextField } from "@mui/material";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as zod from "zod";
import avatarPlaceholder from "../../assets/avatar_placeholder.jpeg";
import { PatientProps } from "../../pages/Home/components/PatientsList";
import { api } from "../../services/api";
import { Avatar, AvatarInput, ButtonContainer, FormContainer } from "./styles";

const patientValidationFormSchema = zod.object({
  name: zod.string(),
  email: zod.string().email().nullable(),
  birthDate: zod.string(),
  address: zod.string(),
});

type UpdatePatientFormData = zod.infer<typeof patientValidationFormSchema>;

export function UpdatePatientForm() {
  const [patient, setPatient] = useState<PatientProps | null>(null);

  const updatePatientForm = useForm<UpdatePatientFormData>({
    resolver: zodResolver(patientValidationFormSchema),
    defaultValues: {
      name: patient ? patient.name : "",
      email: patient && patient.email,
      birthDate: patient ? patient.birth_date : "",
      address: patient ? patient.address : "",
    },
  });

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = updatePatientForm;

  const [avatar, setAvatar] = useState(avatarPlaceholder);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const params = useParams();
  const navigate = useNavigate();

  function formatDate(dateString: string | undefined) {
    if (!dateString) {
      return "";
    }

    const date = parseISO(dateString);
    return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  }

  async function updateAvatarFile(patient: PatientProps, avatarFilename: File) {
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
      if (!patient) {
        return alert("Patient data is missing");
      }

      const updatePatient = {
        name: data.name || patient.name,
        email: data.email || patient.email,
        birth_date: formatDate(data.birthDate) || patient.birth_date,
        address: data.address || patient.address,
      };

      if (avatarFile) {
        await updateAvatarFile(patient, avatarFile);
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

  useEffect(() => {
    async function fetchPatient() {
      try {
        const response = await api.get(`/patients/${params.id}`);
        setPatient(response.data);
      } catch (error) {
        console.error("Error fetch patient:", error);
        alert("Failed to fetch patient.");
      }
    }

    fetchPatient();
  }, [params.id]);

  useEffect(() => {
    const avatarUrl =
      patient && patient.avatar
        ? `${api.defaults.baseURL}/files/${patient.avatar}`
        : avatarPlaceholder;

    setAvatar(avatarUrl);
  }, [patient]);

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
