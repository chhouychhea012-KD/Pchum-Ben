"use client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useAppStore } from "@/stores/app-store";
import { createAppTheme } from "@/theme/theme";

export default function Providers({ children }: { children: React.ReactNode }) {
  const mode = useAppStore((s)=>s.settings.theme);
  const theme = useMemo(()=>createAppTheme(mode),[mode]);
  useEffect(() => {
    void useAppStore.persist.rehydrate();
  }, []);
  return <ThemeProvider theme={theme}><CssBaseline />{children}</ThemeProvider>;
}
