import { Button, TableCell, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import avatarPlaceholder from "../../../../assets/avatar_placeholder.jpeg";
import { PatientType } from "../../../../interfaces/IPatients";
import { api } from "../../../../services/api";
import { Avatar } from "./styles";

interface PatientsRowProps {
  patient: PatientType;
}

export function PatientsRow({ patient }: PatientsRowProps) {
  const navigate = useNavigate();

  function getImageURL(patientAvatar: string | undefined) {
    return patientAvatar
      ? `${api.defaults.baseURL}/files/${patientAvatar}`
      : avatarPlaceholder;
  }

  function handleNavigateToDetails(id: string) {
    navigate(`/details/${id}`);
  }

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        <Avatar>
          <img src={getImageURL(patient.avatar)} />
          {patient.name}
        </Avatar>
      </TableCell>
      <TableCell align="right">{patient.email}</TableCell>
      <TableCell align="right">{patient.birth_date}</TableCell>
      <TableCell align="right">{patient.address}</TableCell>
      <TableCell align="center">
        <Button
          onClick={() => patient.id && handleNavigateToDetails(patient.id)}
        >
          View
        </Button>
      </TableCell>
    </TableRow>
  );
}
