import { Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import avatarPlaceholder from "../../assets/avatar_placeholder.jpeg";
import { ReturnButton } from "../../components/ReturnButton";
import { PatientsContext } from "../../contexts/PatientsContext";
import { api } from "../../services/api";
import { DetailsContainer } from "./styles";

export function Details() {
  const { patientById, fetchPatientById } = useContext(PatientsContext);

  const avatarUrl =
    patientById && patientById.avatar
      ? `${api.defaults.baseURL}/files/${patientById.avatar}`
      : avatarPlaceholder;

  const navigate = useNavigate();
  const params = useParams();

  function handleNavigateToEdit() {
    navigate(`/edit/${params.id}`);
  }

  useEffect(() => {
    if (params.id) {
      fetchPatientById(params.id);
    }
  }, [fetchPatientById, params.id]);

  return (
    <DetailsContainer>
      <ReturnButton />
      {patientById ? (
        <>
          <img src={avatarUrl} />

          <div>
            <h2>Patient details</h2>
            <p>{patientById.name}</p>
            <p>{patientById.email}</p>
            <p>{patientById.birth_date}</p>
            <p>{patientById.address}</p>
            <Button
              variant="contained"
              startIcon={<Edit />}
              onClick={handleNavigateToEdit}
            >
              Edit
            </Button>
          </div>
        </>
      ) : (
        <h1>No patients found</h1>
      )}
    </DetailsContainer>
  );
}
