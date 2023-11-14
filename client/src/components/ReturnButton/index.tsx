import { ArrowBackIosNewOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ReturnButtonContainer } from "./styles";

export function ReturnButton() {
  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  return (
    <ReturnButtonContainer onClick={handleBack}>
      <ArrowBackIosNewOutlined color="primary" />
      Return
    </ReturnButtonContainer>
  );
}
