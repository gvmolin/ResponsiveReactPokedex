import style from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faHeart } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect, ReactElement } from "react";
import Switch from "react-input-switch";
import { ThemeColors } from "../../utils/enum/theme";
import axios from "axios";
import AutocompleteSearch from "../autocompleteSearch/index";

interface IProps {
  setTheme: React.Dispatch<React.SetStateAction<string|null>>,
  currentTheme: string,
}

export default function Header(props: IProps):ReactElement {
  const [switchValue, setSwitchValue] = useState(props.currentTheme === ThemeColors.L);
  const [pokemonList, setPokemonList] = useState([]);

  async function getList() :Promise<void> {
    await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=10000&offset=0").then(
      res => {
        setPokemonList(res.data.results);
      }
    );
  }

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    switchValue ?
      props.setTheme(ThemeColors.L) : props.setTheme(ThemeColors.D);
  }, [switchValue]);

  return (
    <>
      <div style={{height:"20vh"}}></div>
      <header
        className={`
        ${style.header} 
        ${props.currentTheme === ThemeColors.L ? style.lightTheme : style.darkTheme}
      `}
      >
        <div className={style.container}>
          <div className={style.switchContainer}>
            <a href="/"><h1>Pokédex</h1></a>
            
            <div>
              <a href="/favorites">
                <h3 
                  className={props.currentTheme === ThemeColors.D ? style.darkTheme : ""}
                ><FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                </h3>
              </a>
              <h3 style={{width:"6vw", marginLeft:"1vw"}}>
                {props.currentTheme === ThemeColors.D ?
                  <FontAwesomeIcon icon={faMoon} style={{ color: "white" }} /> :
                  <FontAwesomeIcon icon={faSun} />
                }
              </h3>
              <Switch
                value={switchValue ? 1 : 0}
                onChange={setSwitchValue}
                className={style.switchComponent}
                styles={{
                  track: {
                    backgroundColor: "white"
                  },
                  trackChecked: {
                    backgroundColor: "#222429"
                  },
                  button: {
                    backgroundColor: "#222429"
                  },
                  buttonChecked: {
                    backgroundColor: "white"
                  }
                }}
              />
            </div>
          </div>
          <AutocompleteSearch list={pokemonList} />
        </div>
      </header>
    </>

  );
}