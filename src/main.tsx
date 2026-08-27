import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { store } from "./app/store";
import theme from "./app/MaterialTheme";
import "./css/index.css";
import App from "./app/App.tsx";
import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <App />
        </Router>{" "}
      </ThemeProvider>{" "}
    </Provider>
  </StrictMode>,
);
