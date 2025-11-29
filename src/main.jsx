import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { ColorModeContext, useMode } from "./theme.jsx"; // custom theme hook
import { AuthProvider } from "./contexts/AuthContext.jsx";

const Main = () => {
  const { theme, colorMode } = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
       <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
      </AuthProvider>
    </ColorModeContext.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
