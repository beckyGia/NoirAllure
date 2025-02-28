import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material";

export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode, // dynamically set the mode to either light or dark
      accent: {
        //main: mode === "light" ? "#573e00" : "#ffe6a8",
        main: mode === "light" ? "#ffe6a8" : "#e6a605",
      },
      primary: {
        //main: mode === "light" ? "#a2582a" : "#d58b5d",
        main: mode === "light" ? "#ffbe90" : "#702f00",
        light:
          mode === "light"
            ? "hsl(23, 59%, 40%, 20%)"
            : "hsl(23, 59%, 60%, 20%)",
      },
      secondary: {
        main: mode === "light" ? "#6f1c1b" : "#e49290",
        primary:
          mode === "light" ? "hsl(1, 61%, 27%, 20%)" : "hsl(23, 59%, 60%, 20%)",
        light:
          mode === "light" ? "hsl(1, 61%, 27%, 10%)" : "hsl(1, 61%, 73%, 10%)",
        medium:
          mode === "light" ? "hsl(1, 61%, 27%, 30%)" : "hsl(1, 61%, 73%, 30%)",
      },
      background: {
        default: mode === "light" ? "#ffecd6" : "#402000",
        // original : #291600
        //  #402000 (More red/orange warmth)
        // #3A1A00 (Subtle increase in warmth)
        // #331500 (A balanced reddish-brown)

        main: mode === "light" ? "hsla(0, 0%, 0%, 5%)" : "hsl(0, 0%, 100%, 5%)",
        navMain: mode === "light" ? "#e2d2d1" : "#2f1f1d",
      },
      text: {
        primary: mode === "light" ? "#000000" : "#ffffff",
        light:
          mode === "light" ? "hsla(0, 0%, 0%, 90%)" : "hsl(0, 0%, 100%, 90%)",
        contrast: mode === "light" ? "#ffffff" : "#000000",
      },
      gray: {
        main: mode === "light" ? "#f2f2f2" : "#0d0d0d",
        primary: mode === "light" ? "#6b6666" : "#999494",
      },
    },
    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

// Custom hook to manage mode and theme
export const useMode = () => {
  // Check if the user has a preferred theme in localStorage or use the system default
  const savedMode =
    localStorage.getItem("themeMode") ||
    (window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");

  const [mode, setMode] = useState(savedMode); // Default mode is either from localStorage or system preference

  // Toggle between dark and light modes
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => {
          const newMode = prev === "light" ? "dark" : "light";
          localStorage.setItem("themeMode", newMode); // Persist the mode in localStorage
          return newMode;
        });
      },
    }),
    []
  );

  // Create the theme based on the current mode
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode];
};

const lightMode = {
  "--text": "#000000",
  "--bg": "#ffecd6",
  "--primary": "#a2582a",
  "--secondary": "#6f1c1b",
  "--accent": "#573e00",
  "--textcontrast": "#64d97b",
  "--bgcontrast": "#64d97b",
  "--primarycontrast": "#ffdd00",
  "--secondarycontrast": "#64d97b",
  "--accentcontrast": "#64d97b",
  "--text5": "hsla(0, 0%, 0%, 5%)",
  "--text10": "hsla(0, 0%, 0%, 10%)",
  "--text15": "hsla(0, 0%, 0%, 15%)",
  "--text20": "hsla(0, 0%, 0%, 20%)",
  "--text25": "hsla(0, 0%, 0%, 25%)",
  "--text30": "hsla(0, 0%, 0%, 30%)",
  "--text35": "hsla(0, 0%, 0%, 35%)",
  "--text40": "hsla(0, 0%, 0%, 40%)",
  "--text45": "hsla(0, 0%, 0%, 45%)",
  "--text50": "hsla(0, 0%, 0%, 50%)",
  "--text55": "hsla(0, 0%, 0%, 55%)",
  "--text60": "hsla(0, 0%, 0%, 60%)",
  "--text65": "hsla(0, 0%, 0%, 65%)",
  "--text70": "hsla(0, 0%, 0%, 70%)",
  "--text75": "hsla(0, 0%, 0%, 75%)",
  "--text80": "hsla(0, 0%, 0%, 80%)",
  "--text85": "hsla(0, 0%, 0%, 85%)",
  "--text90": "hsla(0, 0%, 0%, 90%)",
  "--text95": "hsla(0, 0%, 0%, 95%)",
  "--primary5": "hsla(23, 59%, 40%, 5%)",
  "--primary10": "hsla(23, 59%, 40%, 10%)",
  "--primary15": "hsla(23, 59%, 40%, 15%)",
  "--primary20": "hsla(23, 59%, 40%, 20%)",
  "--primary25": "hsla(23, 59%, 40%, 25%)",
  "--primary30": "hsla(23, 59%, 40%, 30%)",
  "--primary35": "hsla(23, 59%, 40%, 35%)",
  "--primary40": "hsla(23, 59%, 40%, 40%)",
  "--primary45": "hsla(23, 59%, 40%, 45%)",
  "--primary50": "hsla(23, 59%, 40%, 50%)",
  "--primary55": "hsla(23, 59%, 40%, 55%)",
  "--primary60": "hsla(23, 59%, 40%, 60%)",
  "--primary65": "hsla(23, 59%, 40%, 65%)",
  "--primary70": "hsla(23, 59%, 40%, 70%)",
  "--primary75": "hsla(23, 59%, 40%, 75%)",
  "--primary80": "hsla(23, 59%, 40%, 80%)",
  "--primary85": "hsla(23, 59%, 40%, 85%)",
  "--primary90": "hsla(23, 59%, 40%, 90%)",
  "--primary95": "hsla(23, 59%, 40%, 95%)",
  "--secondary5": "hsla(1, 61%, 27%, 5%)",
  "--secondary10": "hsla(1, 61%, 27%, 10%)",
  "--secondary15": "hsla(1, 61%, 27%, 15%)",
  "--secondary20": "hsla(1, 61%, 27%, 20%)",
  "--secondary25": "hsla(1, 61%, 27%, 25%)",
  "--secondary30": "hsla(1, 61%, 27%, 30%)",
  "--secondary35": "hsla(1, 61%, 27%, 35%)",
  "--secondary40": "hsla(1, 61%, 27%, 40%)",
  "--secondary45": "hsla(1, 61%, 27%, 45%)",
  "--secondary50": "hsla(1, 61%, 27%, 50%)",
  "--secondary55": "hsla(1, 61%, 27%, 55%)",
  "--secondary60": "hsla(1, 61%, 27%, 60%)",
  "--secondary65": "hsla(1, 61%, 27%, 65%)",
  "--secondary70": "hsla(1, 61%, 27%, 70%)",
  "--secondary75": "hsla(1, 61%, 27%, 75%)",
  "--secondary80": "hsla(1, 61%, 27%, 80%)",
  "--secondary85": "hsla(1, 61%, 27%, 85%)",
  "--secondary90": "hsla(1, 61%, 27%, 90%)",
  "--secondary95": "hsla(1, 61%, 27%, 95%)",
  "--accent5": "hsla(43, 100%, 17%, 5%)",
  "--accent10": "hsla(43, 100%, 17%, 10%)",
  "--accent15": "hsla(43, 100%, 17%, 15%)",
  "--accent20": "hsla(43, 100%, 17%, 20%)",
  "--accent25": "hsla(43, 100%, 17%, 25%)",
  "--accent30": "hsla(43, 100%, 17%, 30%)",
  "--accent35": "hsla(43, 100%, 17%, 35%)",
  "--accent40": "hsla(43, 100%, 17%, 40%)",
  "--accent45": "hsla(43, 100%, 17%, 45%)",
  "--accent50": "hsla(43, 100%, 17%, 50%)",
  "--accent55": "hsla(43, 100%, 17%, 55%)",
  "--accent60": "hsla(43, 100%, 17%, 60%)",
  "--accent65": "hsla(43, 100%, 17%, 65%)",
  "--accent70": "hsla(43, 100%, 17%, 70%)",
  "--accent75": "hsla(43, 100%, 17%, 75%)",
  "--accent80": "hsla(43, 100%, 17%, 80%)",
  "--accent85": "hsla(43, 100%, 17%, 85%)",
  "--accent90": "hsla(43, 100%, 17%, 90%)",
  "--accent95": "hsla(43, 100%, 17%, 95%)",
};

const darkMode = {
  "--text": "#ffffff",
  "--bg": "#291600",
  "--primary": "#d58b5d",
  "--secondary": "#e49290",
  "--accent": "#ffe6a8",
  "--textcontrast": "#64d97b",
  "--bgcontrast": "#64d97b",
  "--primarycontrast": "#ffdd00",
  "--secondarycontrast": "#64d97b",
  "--accentcontrast": "#64d97b",
  "--text5": "hsl(0, 0%, 100%, 5%)",
  "--text10": "hsl(0, 0%, 100%, 10%)",
  "--text15": "hsl(0, 0%, 100%, 15%)",
  "--text20": "hsl(0, 0%, 100%, 20%)",
  "--text25": "hsl(0, 0%, 100%, 25%)",
  "--text30": "hsl(0, 0%, 100%, 30%)",
  "--text35": "hsl(0, 0%, 100%, 35%)",
  "--text40": "hsl(0, 0%, 100%, 40%)",
  "--text45": "hsl(0, 0%, 100%, 45%)",
  "--text50": "hsl(0, 0%, 100%, 50%)",
  "--text55": "hsl(0, 0%, 100%, 55%)",
  "--text60": "hsl(0, 0%, 100%, 60%)",
  "--text65": "hsl(0, 0%, 100%, 65%)",
  "--text70": "hsl(0, 0%, 100%, 70%)",
  "--text75": "hsl(0, 0%, 100%, 75%)",
  "--text80": "hsl(0, 0%, 100%, 80%)",
  "--text85": "hsl(0, 0%, 100%, 85%)",
  "--text90": "hsl(0, 0%, 100%, 90%)",
  "--text95": "hsl(0, 0%, 100%, 95%)",
  "--primary5": "hsl(23, 59%, 60%, 5%)",
  "--primary10": "hsl(23, 59%, 60%, 10%)",
  "--primary15": "hsl(23, 59%, 60%, 15%)",
  "--primary20": "hsl(23, 59%, 60%, 20%)",
  "--primary25": "hsl(23, 59%, 60%, 25%)",
  "--primary30": "hsl(23, 59%, 60%, 30%)",
  "--primary35": "hsl(23, 59%, 60%, 35%)",
  "--primary40": "hsl(23, 59%, 60%, 40%)",
  "--primary45": "hsl(23, 59%, 60%, 45%)",
  "--primary50": "hsl(23, 59%, 60%, 50%)",
  "--primary55": "hsl(23, 59%, 60%, 55%)",
  "--primary60": "hsl(23, 59%, 60%, 60%)",
  "--primary65": "hsl(23, 59%, 60%, 65%)",
  "--primary70": "hsl(23, 59%, 60%, 70%)",
  "--primary75": "hsl(23, 59%, 60%, 75%)",
  "--primary80": "hsl(23, 59%, 60%, 80%)",
  "--primary85": "hsl(23, 59%, 60%, 85%)",
  "--primary90": "hsl(23, 59%, 60%, 90%)",
  "--primary95": "hsl(23, 59%, 60%, 95%)",
  "--secondary5": "hsl(1, 61%, 73%, 5%)",
  "--secondary10": "hsl(1, 61%, 73%, 10%)",
  "--secondary15": "hsl(1, 61%, 73%, 15%)",
  "--secondary20": "hsl(1, 61%, 73%, 20%)",
  "--secondary25": "hsl(1, 61%, 73%, 25%)",
  "--secondary30": "hsl(1, 61%, 73%, 30%)",
  "--secondary35": "hsl(1, 61%, 73%, 35%)",
  "--secondary40": "hsl(1, 61%, 73%, 40%)",
  "--secondary45": "hsl(1, 61%, 73%, 45%)",
  "--secondary50": "hsl(1, 61%, 73%, 50%)",
  "--secondary55": "hsl(1, 61%, 73%, 55%)",
  "--secondary60": "hsl(1, 61%, 73%, 60%)",
  "--secondary65": "hsl(1, 61%, 73%, 65%)",
  "--secondary70": "hsl(1, 61%, 73%, 70%)",
  "--secondary75": "hsl(1, 61%, 73%, 75%)",
  "--secondary80": "hsl(1, 61%, 73%, 80%)",
  "--secondary85": "hsl(1, 61%, 73%, 85%)",
  "--secondary90": "hsl(1, 61%, 73%, 90%)",
  "--secondary95": "hsl(1, 61%, 73%, 95%)",
  "--accent5": "hsl(43, 100%, 83%, 5%)",
  "--accent10": "hsl(43, 100%, 83%, 10%)",
  "--accent15": "hsl(43, 100%, 83%, 15%)",
  "--accent20": "hsl(43, 100%, 83%, 20%)",
  "--accent25": "hsl(43, 100%, 83%, 25%)",
  "--accent30": "hsl(43, 100%, 83%, 30%)",
  "--accent35": "hsl(43, 100%, 83%, 35%)",
  "--accent40": "hsl(43, 100%, 83%, 40%)",
  "--accent45": "hsl(43, 100%, 83%, 45%)",
  "--accent50": "hsl(43, 100%, 83%, 50%)",
  "--accent55": "hsl(43, 100%, 83%, 55%)",
  "--accent60": "hsl(43, 100%, 83%, 60%)",
  "--accent65": "hsl(43, 100%, 83%, 65%)",
  "--accent70": "hsl(43, 100%, 83%, 70%)",
  "--accent75": "hsl(43, 100%, 83%, 75%)",
  "--accent80": "hsl(43, 100%, 83%, 80%)",
  "--accent85": "hsl(43, 100%, 83%, 85%)",
  "--accent90": "hsl(43, 100%, 83%, 90%)",
  "--accent95": "hsl(43, 100%, 83%, 95%)",
};
