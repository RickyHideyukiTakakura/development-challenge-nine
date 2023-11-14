import { PatientForm } from "../../components/PatientForm";
import { ReturnButton } from "../../components/ReturnButton";
import { NewContainer } from "./styles";

export function New() {
  return (
    <NewContainer>
      <ReturnButton />
      <PatientForm title="Register patient" isNewPatient />
    </NewContainer>
  );
}
