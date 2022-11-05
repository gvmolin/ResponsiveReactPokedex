import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import Header from "../components/header";
import Details from "../pages/details";
import { useState, useEffect } from "react";
import { ThemeColors } from "../utils/enum/theme";
import style from "./style.module.scss";
import Favorites from "../pages/favorites";

export default function AppRouter(): JSX.Element {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  useEffect(()=>{
    const LSTheme = localStorage.getItem("theme");
    if(LSTheme) setTheme(ThemeColors.D === LSTheme ? ThemeColors.D : ThemeColors.L);
  }, []);

  useEffect(()=>{
    if(theme) localStorage.setItem("theme", theme);
  }, [theme]);
  
  return (
    <Router>
      <div className={`${theme === ThemeColors.L ? style.lightTheme : style.darkTheme}`}>
        <Header setTheme={setTheme} currentTheme={theme ? theme : ThemeColors.D} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/details/:id' element={<Details />} />
          <Route path='/favorites' element={<Favorites />} />
        </Routes>
      </div>

    </Router>
  );
}

