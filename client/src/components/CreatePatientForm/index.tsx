import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Button, TextField } from "@mui/material";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import avatarPlaceholder from "../../assets/avatar_placeholder.jpeg";
import { api } from "../../services/api";
import { Avatar, AvatarInput, ButtonContainer, FormContainer } from "./styles";

export function CreatePatientForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState(avatarPlaceholder);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
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

  function handleChangeAvatar(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files && event.target.files[0];

    if (file) {
      setAvatarFile(file);

      const imagePreview = URL.createObjectURL(file);
      setAvatar(imagePreview);
    }
  }

  async function handleCreateNewPatient() {
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
        <Button variant="contained" onClick={handleCreateNewPatient}>
          Register patient
        </Button>
      </ButtonContainer>
    </FormContainer>
  );
}
