import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";

import style from "./style.module.scss";
import capitalizeFLetter from "../../utils/tools/string";
import findColorByType from "../../utils/style/typeColors";

import Tabs from "../../components/tabs";
import Stats from "../../components/stats";
import Moves from "../../components/moves";
import Button from "../../components/button";

export default function Details (){
  //DATA
  const params = useParams();
  const [pokemon, setPokemon] = useState({
    name:"",
    sprites:{
      front_default:"",
    },
    types:[{
      type:{
        name:"",
      }
    }],
    stats:[{
      base_stat:0,
      stat:{
        name:"",
      }
    }],
    moves:[],

  });

  //METHODS
  async function getPkmn() {
    await axios.get(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
      .then(res => {
        setPokemon(res.data);
        console.log(pokemon);
      });
  }

  //MOUNTED
  useEffect(()=>{
    getPkmn();
  }, []);

  // useMemo(() => getPkmn(), [pokemon]);

  //VIEW
  return(
    <div className={style.content}>
      {/* HEADER */}
      <header className={style.itemHeader}>
        <Button><FontAwesomeIcon icon={icons.faArrowLeft} /></Button>
        <h2>{capitalizeFLetter(pokemon.name)}</h2>
        <Button><FontAwesomeIcon icon={icons.faHeart} /></Button>
      </header>
      
      {/* IMAGE */}
      <div className={style.imgContainer}>
        <img src={pokemon.sprites?.front_default} />
      </div>
      
      {/* COLORED TYPE TAGS */}
      <div className={style.typeTagsContainer}>
        {pokemon.types.map(type => {
          const tagColor = findColorByType(type.type.name);
          return (
            <div
              key={uuidv4()}
              style={{ backgroundColor: `${tagColor.color}` }}
              className={style.typeTag}
            >
              <span>{capitalizeFLetter(type.type.name)}</span>
            </div>
          );
        })}
      </div>

      {/* TABS */}
      <Tabs elements={[
        {
          name:"Stats",
          content:<Stats stats={pokemon.stats}></Stats>,
          height:"30vh",
        },
        {
          name:"Moves",
          content:<Moves moves={pokemon.moves}></Moves>,
          height:"40vh",
        },
        {
          name:"Location",
          content:<h1>3</h1>,

        },
        {
          name:"Forms",
          content:
          <>
            <h1>4</h1>
          </>
        },
      ]} />
    </div>
    
  );
  
}