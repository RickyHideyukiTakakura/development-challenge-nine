import {
  Button,
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
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import avatarPlaceholder from "../../../../assets/avatar_placeholder.jpeg";
import { api } from "../../../../services/api";
import { Avatar, PatientList } from "./styles";

export interface PatientData {
  id: string;
  name: string;
  email: string;
  birth_date: string;
  address: string;
  avatar: string;
}

export function PatientsList() {
  const [filteredPatients, setFilteredPatients] = useState<PatientData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: patients = [],
    isLoading,
    isError,
  } = useQuery<PatientData[]>("patients", fetchPatients);

  const navigate = useNavigate();
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

  async function fetchPatients() {
    const response = await api.get(`/patients`);
    return response.data;
  }

  function handlePageChange(_event: ChangeEvent<unknown>, page: number) {
    setCurrentPage(page);
  }

  function getImageURL(patientAvatar: string) {
    return patientAvatar
      ? `${api.defaults.baseURL}/files/${patientAvatar}`
      : avatarPlaceholder;
  }

  function handleNavigateToDetails(id: string) {
    navigate(`/details/${id}`);
  }

  useEffect(() => {
    const filtered = patients.filter((patient) =>
      patient.name.includes(search)
    );

    setFilteredPatients(filtered);
    setCurrentPage(1);
  }, [search, patients]);

  return (
    <PatientList>
      {isLoading ? (
        <p>Loading....</p>
      ) : isError || !patients ? (
        <h1>No patients found</h1>
      ) : (
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
                  <TableRow
                    key={patient.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
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
                        onClick={() => handleNavigateToDetails(patient.id)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
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
      )}
    </PatientList>
  );
}
