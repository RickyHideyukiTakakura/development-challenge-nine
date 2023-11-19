import { Pagination } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { usePatient } from "../../hooks/usePatient";
import { PatientsList } from "./components/PatientsList";
import { HomeContainer } from "./styles";

export function Home() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, patientsPerPage, isLoading, isError } = usePatient(currentPage);

  if (!data) {
    return null;
  }

  const totalPages = Math.ceil(data.totalCount / patientsPerPage);

  async function handlePageChange(_event: ChangeEvent<unknown>, page: number) {
    setCurrentPage(page);
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }

  return (
    <HomeContainer>
      <h1>Patients</h1>
      <PatientsList patients={data.patients} />
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        style={{ marginTop: "10px" }}
      />
    </HomeContainer>
  );
}
