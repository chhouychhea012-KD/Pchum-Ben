"use client";
import { createTheme } from "@mui/material/styles";
import type { ThemeMode } from "@/types";

export function createAppTheme(mode: ThemeMode) {
  const dark = mode === "dark";
  return createTheme({
    cssVariables: true,
    palette: {
      mode,
      primary: { main: dark ? "#A84660" : "#7A263A", dark: "#521927" },
      secondary: { main: dark ? "#E0B84C" : "#C99A2E" },
      success: { main: "#3F7D58" },
      background: { default: dark ? "#171311" : "#FFF9EE", paper: dark ? "#221C19" : "#FFFFFF" },
      text: { primary: dark ? "#FFF8EC" : "#251F1D", secondary: dark ? "#D2C5BC" : "#736B65" },
      divider: dark ? "rgba(255,248,236,.12)" : "rgba(82,25,39,.12)",
    },
    shape: { borderRadius: 4.8 },
    typography: {
      fontFamily: '"Montserrat", "Battambang", "Noto Sans Khmer", "Public Sans", Inter, system-ui, sans-serif',
      h1: { fontWeight: 800, letterSpacing: "-0.03em" },
      h2: { fontWeight: 750, letterSpacing: "-0.02em" },
      h3: { fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.18, fontWeight: 800, letterSpacing: 0 },
      button: { textTransform: "none", fontWeight: 700 },
    },
    components: {
      MuiButton: { styleOverrides: { root: { borderRadius: "0.3rem", minHeight: 44 } } },
      MuiCard: { styleOverrides: { root: { borderRadius: "0.3rem", border: "1px solid", borderColor: "var(--mui-palette-divider)", boxShadow: "0 12px 36px rgba(72,45,30,.06)" } } },
      MuiTextField: { defaultProps: { size: "small" } },
      MuiFormControl: { defaultProps: { size: "small" } },
    },
  });
}
