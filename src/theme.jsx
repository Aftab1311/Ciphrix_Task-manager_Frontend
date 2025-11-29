import { createContext, useMemo, useState } from "react";
import { createTheme } from "@mui/material/styles";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const useMode = () => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                background: { default: "#f6f7f9" },
              }
            : {
                background: { default: "#121212" },
              }),
        },
      }),
    [mode]
  );

  return { theme, colorMode };
};
