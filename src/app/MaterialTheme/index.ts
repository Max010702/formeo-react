import { createTheme, type ThemeOptions } from "@mui/material/styles";
import { common } from "@mui/material/colors";
import shadow from "./shadow";
import typography from "./typography";

/**
 * WARM MODERN FURNITURE THEME
 */
const light: ThemeOptions = {
  palette: {
    mode: "light",
    background: {
      default: "#F7F4EE",
      paper: common.white,
    },
    primary: {
      contrastText: common.white,
      main: "#1F2A24", // deep green/black
    },
    secondary: {
      contrastText: "#1F2A24",
      main: "#B78A5A", // warm wood/gold
    },
    text: {
      primary: "#25211D",
      secondary: "#7D746A",
      disabled: "#A39A90",
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          height: "100%",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          height: "100%",
          scrollBehavior: "smooth",
        },
        body: {
          background: "#F7F4EE",
          color: "#25211D",
          height: "100%",
          minHeight: "100%",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          fontWeight: 700,
          letterSpacing: "0.08em",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
  shadows: shadow as ThemeOptions["shadows"],
  typography,
};

let theme = createTheme(light);

theme = createTheme(theme, {
  components: {
    MuiContainer: {
      styleOverrides: {
        maxWidthLg: {
          [theme.breakpoints.up("lg")]: {
            maxWidth: "1300px",
          },
        },
      },
    },
  },
});

export default theme;
