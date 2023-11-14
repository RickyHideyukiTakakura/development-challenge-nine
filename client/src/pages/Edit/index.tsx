import { PatientForm } from "../../components/PatientForm";
import { ReturnButton } from "../../components/ReturnButton";
import { EditContainer } from "./styles";

export function Edit() {
  return (
    <EditContainer>
      <ReturnButton />
      <PatientForm title="Update patient" />
    </EditContainer>
  );
}
