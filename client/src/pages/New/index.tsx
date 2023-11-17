import { CreatePatientForm } from "../../components/CreatePatientForm";
import { ReturnButton } from "../../components/ReturnButton";
import { NewContainer } from "./styles";

export function New() {
  return (
    <NewContainer>
      <ReturnButton />
      <CreatePatientForm />
    </NewContainer>
  );
}
