import { Add } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import logoMedcloud from "../../assets/logo-medcloud.svg";
import { HeaderContainer } from "./styles";

export function Header() {
  const navigate = useNavigate();

  function handleNavigateToNewPatient() {
    navigate("/new");
  }

  return (
    <HeaderContainer>
      <NavLink to="/">
        <img src={logoMedcloud} />
      </NavLink>

      <TextField
        id="outlined-basic"
        label="Search by name or email"
        variant="outlined"
      />

      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={handleNavigateToNewPatient}
      >
        Patient
      </Button>
    </HeaderContainer>
  );
}
