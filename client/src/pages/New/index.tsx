import { PatientForm } from "../../components/PatientForm";
import { NewContainer } from "./styles";

export function New() {
  return (
    <NewContainer>
      <PatientForm title="Register patient" />
    </NewContainer>
  );
}
