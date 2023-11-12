import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#009adf",
      light: "#f5f",
    },
    secondary: {
      main: "#002639",
    },
    background: {
      default: "#f5f5f5",
    },
    text: {
      primary: "#757575",
      secondary: "#52575c",
    },
  },

  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "100%",
          borderRadius: "8px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          height: "2rem",
          fontSize: "1rem",
          textTransform: "none",
          padding: "0.5rem 2rem",
          border: "none",
          borderRadius: "8px",
          textWrap: "nowrap",
        },
      },
    },
  },
});
