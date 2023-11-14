import { Add } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logoMedcloud from "../../assets/logo-medcloud.svg";
import { HeaderContainer } from "./styles";

export function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    navigate(`?search=${encodeURIComponent(newSearchTerm)}`, {
      replace: true,
    });
  };

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
        label="Search by name"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
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
