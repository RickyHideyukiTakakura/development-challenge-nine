import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { PatientsContextProvider } from "./contexts/PatientsContext";
import { GlobalStyle } from "./styles/global";
import { theme } from "./styles/theme";

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <PatientsContextProvider>
          <Router />
        </PatientsContextProvider>
      </BrowserRouter>

      <GlobalStyle />
    </ThemeProvider>
  );
}
