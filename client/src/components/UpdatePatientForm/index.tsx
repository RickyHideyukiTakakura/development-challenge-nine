import { zodResolver } from "@hookform/resolvers/zod";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Button, TextField } from "@mui/material";
import { format, parse, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as zod from "zod";
import avatarPlaceholder from "../../assets/avatar_placeholder.jpeg";
import { usePatientById } from "../../hooks/usePatientById";
import { PatientType } from "../../interfaces/IPatients";
import { api } from "../../services/api";
import { Avatar, AvatarInput, ButtonContainer, FormContainer } from "./styles";

const patientValidationFormSchema = zod.object({
  name: zod.string().nullable(),
  email: zod.string().email().nullable(),
  birthDate: zod.string().max(10).nullable(),
  address: zod.string().nullable(),
});

type UpdatePatientFormData = zod.infer<typeof patientValidationFormSchema>;

interface UpdatePatientFormProps {
  patient: PatientType;
}

export function UpdatePatientForm({ patient }: UpdatePatientFormProps) {
  const navigate = useNavigate();
  const params = useParams();

  const { updatePatient, delPatient } = usePatientById();

  const avatarUrl = patient.avatar
    ? `${api.defaults.baseURL}/files/${patient.avatar}`
    : avatarPlaceholder;

  const [avatar, setAvatar] = useState(avatarUrl);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const updatePatientForm = useForm<UpdatePatientFormData>({
    resolver: zodResolver(patientValidationFormSchema),
    defaultValues: {
      name: patient.name,
      email: patient.email,
      birthDate: formatDateToDefault(patient.birth_date),
      address: patient.address,
    },
  });

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = updatePatientForm;

  function formatDate(dateString: string | null) {
    if (!dateString) {
      return "";
    }

    const date = parseISO(dateString);
    return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  }

  function formatDateToDefault(dateString: string | null) {
    if (!dateString) {
      return "";
    }

    const date = parse(dateString, "dd 'de' MMMM 'de' yyyy", new Date(), {
      locale: ptBR,
    });

    return format(date, "yyyy-MM-dd");
  }

  async function updateAvatarFile(patient: PatientType, avatarFilename: File) {
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
      const updatePatientData = {
        name: data.name || patient.name,
        email: data.email || patient.email,
        birth_date: data.birthDate
          ? formatDate(data.birthDate)
          : patient.birth_date,
        address: data.address || patient.address,
      };

      if (avatarFile) {
        await updateAvatarFile(patient, avatarFile);
      }

      if (params.id) {
        await updatePatient(params.id, updatePatientData);
      }

      alert("Patient has been updated successfully");
      navigate(-1);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(`Failed to upload patient: ${error.response.data.message}.`);
      throw new Error(error);
    }
  }

  async function handleDeletePatient() {
    const confirm = window.confirm(
      "Are you sure you want to delete this patient?"
    );

    if (confirm) {
      try {
        if (params.id) {
          delPatient(params.id);
          navigate("/");
        }
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
