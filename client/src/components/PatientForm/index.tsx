/* eslint-disable @typescript-eslint/no-explicit-any */
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Button, TextField } from "@mui/material";
import avatar from "../../assets/avatar_placeholder.jpeg";
import { Avatar, AvatarInput, ButtonContainer, FormContainer } from "./styles";

export function PatientForm({ onSubmit, onDelete, title }: any) {
  return (
    <FormContainer>
      <Avatar>
        <img src={avatar} alt="Foto do usuário" />

        <AvatarInput htmlFor="avatar">
          <CameraAltIcon />

          <input id="avatar" type="file" />
        </AvatarInput>
      </Avatar>

      <TextField id="outlined-basic" label="Name" variant="outlined" />
      <TextField id="outlined-basic" label="Email" variant="outlined" />
      <TextField
        id="outlined-basic"
        type="date"
        label="Birth Date"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
      />
      <TextField id="outlined-basic" label="Address" variant="outlined" />

      <ButtonContainer>
        {onDelete && (
          <Button variant="contained" color="error" onClick={onDelete}>
            Delete patient
          </Button>
        )}

        <Button variant="contained" onClick={onSubmit}>
          {title}
        </Button>
      </ButtonContainer>
    </FormContainer>
  );
}
