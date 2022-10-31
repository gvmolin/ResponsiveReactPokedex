import style from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Switch from "react-input-switch";
import { ThemeColors } from "../../utils/enum/theme";
import axios from "axios";
import AutocompleteSearch from "../autocompleteSearch/index";

interface IProps {
  setTheme: any,
  currentTheme: string,
}

export default function Header(props: IProps) {
  const [switchValue, setSwitchValue] = useState(props.currentTheme === ThemeColors.L);
  const [pokemonList, setPokemonList] = useState([]);

  async function getList() {
    await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=10000&offset=0").then(
      res => {
        setPokemonList(res.data.results);
        console.log(res);
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
              <h3>
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