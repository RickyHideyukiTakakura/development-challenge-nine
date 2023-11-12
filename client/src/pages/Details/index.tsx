import { Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DetailsContainer } from "./styles";

export function Details() {
  const navigate = useNavigate();

  function handleNavigateToEdit() {
    navigate("/edit");
  }

  return (
    <DetailsContainer>
      <img src="https://github.com/rickyhideyukitakakura.png" alt="" />

      <div>
        <h2>Patient details</h2>
        <p>Ricky Hideyuki Takakura</p>
        <p>rickytakakura@outlook.com</p>
        <p>11 de Maio de 2000</p>
        <p>Rua Julio de Castilho, Ponta Grossa, Paraná</p>
        <Button
          variant="contained"
          startIcon={<Edit />}
          onClick={handleNavigateToEdit}
        >
          Edit
        </Button>
      </div>
    </DetailsContainer>
  );
}
