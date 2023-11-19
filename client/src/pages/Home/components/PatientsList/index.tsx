import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PatientType } from "../../../../interfaces/IPatients";
import { PatientsRow } from "../PatientsRow";

interface PatientsListProps {
  patients?: PatientType[];
}

export function PatientsList({ patients }: PatientsListProps) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("search") || "";
  const [filteredPatients, setFilteredPatients] = useState<PatientType[]>([]);

  useEffect(() => {
    if (!patients) {
      return;
    }

    const filtered = patients.filter((patient) =>
      patient.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPatients(filtered);
  }, [search, patients]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Birth Date</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="center">More</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPatients?.map((patient) => (
              <PatientsRow key={patient.id} patient={patient} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
