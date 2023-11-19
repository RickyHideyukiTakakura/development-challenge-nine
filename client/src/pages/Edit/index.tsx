import { useParams } from "react-router-dom";
import { ReturnButton } from "../../components/ReturnButton";
import { UpdatePatientForm } from "../../components/UpdatePatientForm";
import { usePatientById } from "../../hooks/usePatientById";
import { EditContainer } from "./styles";
import { useEffect } from "react";

export function Edit() {
  const params = useParams();

  const { data, isLoading, isError, refetch } = usePatientById(params.id);

  useEffect(() => {
    refetch();
  }, [params.id, refetch]);

  if (!data) {
    return null;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }

  return (
    <EditContainer>
      <ReturnButton />
      <UpdatePatientForm patient={data} />
    </EditContainer>
  );
}
