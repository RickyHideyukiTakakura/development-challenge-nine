import { Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import avatarPlaceholder from "../../assets/avatar_placeholder.jpeg";
import { ReturnButton } from "../../components/ReturnButton";
import { usePatientById } from "../../hooks/usePatientById";
import { api } from "../../services/api";
import { DetailsContainer } from "./styles";

export function Details() {
  const navigate = useNavigate();
  const params = useParams();

  const { data, isLoading, isError, refetch } = usePatientById(params.id);

  useEffect(() => {
    refetch();
  }, [params.id, refetch]);

  if (!data) {
    return null;
  }

  const avatarUrl = data.avatar
    ? `${api.defaults.baseURL}/files/${data.avatar}`
    : avatarPlaceholder;

  function handleNavigateToEdit() {
    navigate(`/edit/${params.id}`);
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }

  return (
    <DetailsContainer>
      <ReturnButton />

      <>
        <img src={avatarUrl} alt="Patient avatar" />

        <div>
          <h2>Patient details</h2>
          <p>{data.name}</p>
          <p>{data.email}</p>
          <p>{data.birth_date}</p>
          <p>{data.address}</p>
          <Button
            variant="contained"
            startIcon={<Edit />}
            onClick={handleNavigateToEdit}
          >
            Edit
          </Button>
        </div>
      </>
    </DetailsContainer>
  );
}
