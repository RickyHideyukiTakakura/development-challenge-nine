import { ReturnButton } from "../../components/ReturnButton";
import { UpdatePatientForm } from "../../components/UpdatePatientForm";
import { EditContainer } from "./styles";

export function Edit() {
  return (
    <EditContainer>
      <ReturnButton />
      <UpdatePatientForm />
    </EditContainer>
  );
}
