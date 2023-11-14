import { PatientsList } from "./components/PatientsList";
import { HomeContainer } from "./styles";

export function Home() {
  return (
    <HomeContainer>
      <h1>Patients</h1>
      <PatientsList />
    </HomeContainer>
  );
}
