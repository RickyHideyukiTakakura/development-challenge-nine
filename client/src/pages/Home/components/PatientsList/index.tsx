import {
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PatientsRow } from "../PatientsRow";
import { PatientType } from "../../../../interfaces/IPatients";

interface PatientsListProps {
  patients?: PatientType[];
}

export function PatientsList({ patients }: PatientsListProps) {
  const [filteredPatients, setFilteredPatients] = useState<PatientType[]>([]);

  const [currentPage, setCurrentPage] = useState(1);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("search") || "";

  const patientsPerPage = 5;
  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const patientsToBeDisplayed = filteredPatients.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );

  function handlePageChange(_event: ChangeEvent<unknown>, page: number) {
    setCurrentPage(page);
  }

  useEffect(() => {
    if (!patients) {
      return;
    }
    const filtered = patients.filter((patient) =>
      patient.name.includes(search)
    );

    setFilteredPatients(filtered);
    setCurrentPage(1);
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
            {patientsToBeDisplayed.map((patient) => (
              <PatientsRow key={patient.id} patient={patient} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        style={{ marginTop: "10px" }}
      />
    </>
  );
}
