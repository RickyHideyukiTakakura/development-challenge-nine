import { PatientForm } from "../../components/PatientForm";
import { EditContainer } from "./styles";

export function Edit() {
  return (
    <EditContainer>
      <PatientForm onDelete={"a"} title="Update patient" />
    </EditContainer>
  );
}
