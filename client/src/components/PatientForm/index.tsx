import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Button, TextField } from "@mui/material";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import avatarPlaceholder from "../../assets/avatar_placeholder.jpeg";
import { PatientProps } from "../../pages/Home/components/PatientsList";
import { api } from "../../services/api";
import { Avatar, AvatarInput, ButtonContainer, FormContainer } from "./styles";

interface PatientFormProps {
  title: string;
  isNewPatient?: boolean;
}

export function PatientForm({ title, isNewPatient }: PatientFormProps) {
  const [patient, setPatient] = useState<PatientProps>();

  const avatarUrl =
    patient && patient.avatar
      ? `${api.defaults.baseURL}/files/${patient.avatar}`
      : avatarPlaceholder;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState(avatarUrl);
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
      alert("Failed to update avatar. Please try again.");
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

  async function handleNewPatient() {
    try {
      if (!name || !email || !birthDate || !address) {
        return alert("Please fill all fields");
      }

      const uploadedAvatarFileName = avatarFile
        ? await uploadAvatar(avatarFile)
        : "";

      const newPatient = {
        name,
        email,
        birth_date: formatDate(birthDate),
        address,
        avatar: uploadedAvatarFileName,
      };

      await api.post("/patients", newPatient);

      alert("Patient has been created successfully");
      navigate("/");
    } catch (error) {
      console.error("Error creating new patient:", error);
      alert("Failed to create patient. Please try again.");
    }
  }

  async function handleUpdatePatient() {
    try {
      if (!patient) {
        return alert("Patient data is missing");
      }

      const updatePatient = {
        name: name || patient.name,
        email: email || patient.email,
        birth_date: formatDate(birthDate) || patient.birth_date,
        address: address || patient.address,
      };

      if (avatarFile) {
        await updateAvatarFile(patient, avatarFile);
      }

      await api.put(`/patients/${params.id}`, updatePatient);

      alert("Patient has been updated successfully");
      navigate(-1);
    } catch (error) {
      console.error("Error updating patient:", error);
      alert("Failed to update patient. Please try again.");
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
        alert("Failed to delete patient. Please try again.");
      }
    }
  }

  function handleSubmitPatient() {
    isNewPatient ? handleNewPatient() : handleUpdatePatient();
  }

  useEffect(() => {
    async function fetchPatient() {
      const response = await api.get(`/patients/${params.id}`);
      setPatient(response.data);
    }

    fetchPatient();
  }, [params.id]);

  return (
    <FormContainer>
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
        onChange={(event) => setName(event.target.value)}
        required
      />

      <TextField
        id="email"
        label="Email"
        variant="outlined"
        onChange={(event) => setEmail(event.target.value)}
        required
      />

      <TextField
        id="date"
        type="date"
        label="Birth Date"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        onChange={(event) => setBirthDate(event.target.value)}
        required
      />

      <TextField
        id="address"
        label="Address"
        variant="outlined"
        onChange={(event) => setAddress(event.target.value)}
        required
      />

      <ButtonContainer>
        {!isNewPatient && (
          <Button
            variant="contained"
            color="error"
            onClick={handleDeletePatient}
          >
            Delete patient
          </Button>
        )}

        <Button variant="contained" onClick={handleSubmitPatient}>
          {title}
        </Button>
      </ButtonContainer>
    </FormContainer>
  );
}
