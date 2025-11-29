// src/contexts/ThemeContext.jsx
import React, { createContext, useState, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';

export const ThemeToggleContext = createContext();

export function ThemeProvider({ children }) {
  const prefersDark = localStorage.getItem('theme') === 'dark';
  const [mode, setMode] = useState(prefersDark ? 'dark' : 'light');

  const toggle = () => {
    const next = mode === 'light' ? 'dark' : 'light';
    setMode(next);
    localStorage.setItem('theme', next);
  };

  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  return (
    <ThemeToggleContext.Provider value={{ mode, toggle }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeToggleContext.Provider>
  );
}
