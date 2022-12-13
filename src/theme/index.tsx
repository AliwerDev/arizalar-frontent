import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      dark: "#006d77",
      main: "#83c5be",
      light: "#edf6f9",
      contrastText: "#fefefe",
    },
    error: {
      main: "#EA2027",
    },
    secondary: {
      dark: "#e29578",
      main: "#ffddd2",
    },
    info: {
      main: "#fff",
    },
  },
});
export default theme;
