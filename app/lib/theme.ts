import { createTheme } from "@mui/material";
import { green, yellow } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: green[800],
    },
    secondary: {
      main: yellow[600],
    },
  },
});

export default theme