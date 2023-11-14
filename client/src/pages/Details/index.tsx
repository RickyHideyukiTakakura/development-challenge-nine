import { Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import avatarPlaceholder from "../../assets/avatar_placeholder.jpeg";
import { ReturnButton } from "../../components/ReturnButton";
import { api } from "../../services/api";
import { DetailsContainer } from "./styles";

interface PatientProps {
  id: string;
  name: string;
  email: string;
  birth_date: string;
  address: string;
  avatar: string;
}

export function Details() {
  const [patient, setPatient] = useState<PatientProps>();

  const avatarUrl =
    patient && patient.avatar
      ? `${api.defaults.baseURL}/files/${patient.avatar}`
      : avatarPlaceholder;

  const navigate = useNavigate();
  const params = useParams();

  function handleNavigateToEdit() {
    navigate(`/edit/${params.id}`);
  }

  useEffect(() => {
    async function fetchPatient() {
      const response = await api.get(`/patients/${params.id}`);
      setPatient(response.data);
    }

    fetchPatient();
  }, [params.id]);

  return (
    <DetailsContainer>
      <ReturnButton />
      {patient ? (
        <>
          <img src={avatarUrl} />

          <div>
            <h2>Patient details</h2>
            <p>{patient.name}</p>
            <p>{patient.email}</p>
            <p>{patient.birth_date}</p>
            <p>{patient.address}</p>
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
