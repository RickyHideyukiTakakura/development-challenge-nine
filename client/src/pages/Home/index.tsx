import { usePatient } from "../../hooks/usePatient";
import { PatientsList } from "./components/PatientsList";
import { HomeContainer } from "./styles";

export function Home() {
  const { data, isLoading, isError } = usePatient();

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
    <HomeContainer>
      <h1>Patients</h1>
      <PatientsList patients={data.patients} />
      {/* <Pagination /> */}
    </HomeContainer>
  );
}
