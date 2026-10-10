import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Palette = {
  bg: string; surface: string; raised: string; text: string; sub: string; line: string;
  primary: string; g1: string; g2: string; danger: string;
};
export type Mode = "system" | "light" | "dark";

const light: Palette = {
  bg: "#F5F8F5", surface: "#FFFFFF", raised: "#E9F5E5", text: "#14201A", sub: "#5E6B62", line: "#E0E8E1",
  primary: "#20A201", g1: "#2DB510", g2: "#168200", danger: "#D6383D",
};
const dark: Palette = {
  bg: "#0D1410", surface: "#16201A", raised: "#1F2D24", text: "#EDF5EE", sub: "#97AC9C", line: "#2A3B30",
  primary: "#3DCB1C", g1: "#2BAE10", g2: "#177F00", danger: "#FF6B6F",
};

type Ctx = { c: Palette; isDark: boolean; mode: Mode; setMode: (m: Mode) => void };
const ThemeCtx = createContext<Ctx>({ c: light, isDark: false, mode: "system", setMode: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const scheme = useColorScheme();
  const [mode, setModeState] = useState<Mode>("system");

  useEffect(() => {
    AsyncStorage.getItem("nm:theme")
      .then((v) => { if (v === "light" || v === "dark" || v === "system") setModeState(v); })
      .catch(() => {});
  }, []);

  const setMode = (m: Mode) => {
    setModeState(m);
    AsyncStorage.setItem("nm:theme", m).catch(() => {});
  };

  const isDark = mode === "system" ? scheme === "dark" : mode === "dark";
  const value = useMemo(() => ({ c: isDark ? dark : light, isDark, mode, setMode }), [isDark, mode]);
  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

export const useTheme = () => useContext(ThemeCtx);
