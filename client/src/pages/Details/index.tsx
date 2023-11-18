import { Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import avatarPlaceholder from "../../assets/avatar_placeholder.jpeg";
import { ReturnButton } from "../../components/ReturnButton";
import { api } from "../../services/api";
import { PatientData } from "../Home/components/PatientsList";
import { DetailsContainer } from "./styles";

export function Details() {
  const navigate = useNavigate();
  const params = useParams();

  const {
    data: patientById,
    isLoading,
    isError,
    refetch,
  } = useQuery<PatientData>(["patient", params.id], fetchPatient);

  const avatarUrl =
    patientById && patientById.avatar
      ? `${api.defaults.baseURL}/files/${patientById.avatar}`
      : avatarPlaceholder;

  async function fetchPatient() {
    const response = await api.get(`/patients/${params.id}`);
    return response.data;
  }

  function handleNavigateToEdit() {
    navigate(`/edit/${params.id}`);
  }

  useEffect(() => {
    refetch();
  }, [params.id, refetch]);

  return (
    <DetailsContainer>
      <ReturnButton />
      {isLoading ? (
        <p>Loading...</p>
      ) : isError || !patientById ? (
        <h1>No patient found</h1>
      ) : (
        <>
          <img src={avatarUrl} alt="Patient avatar" />

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
      )}
    </DetailsContainer>
  );
}
