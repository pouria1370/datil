'use client'

import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import AddCommunication from "../components/AddCommunication/AddCommunication";
import Communications from "../components/Communications/Communications";
import { AppContext } from "../context/app-context";
import {ThemeProvider,createTheme} from "@mui/material";

const UserPanel = () => {
  'use client '
  const ctx = useContext(AppContext);
  const [theme, setTheme] = useState<any>("");
console.log(ctx?.theme);

  useEffect(() => {
    const theme = createTheme({
      palette: {
        mode: "light",
        primary: {
          main: ctx?.theme.primary || "#161B2",
        },
        secondary: {
          main: ctx?.theme.secondary || "#f50057",
        },
      },
    });
    setTheme(theme);
  }, [ctx?.theme]);

  return (
    <ThemeProvider theme={theme}>
      <div className="lg:px-64 lg:py-28 px-0 py-20 ">
        <Navbar />
        <div className="bg-gray p-10 rounded-[1rem]">
          <AddCommunication />
          <Communications />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default UserPanel;
