import { useEffect, useState, useMemo } from "react";
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
import Locations from "../../components/locations";

export default function Details (){
  interface IMega{
    hasMega:boolean,
    id:number[]
  }

  const INITIAL_PKMN = {
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
    location_area_encounters:"",
    id:0,
  };

  const INITIAL_MEGA:IMega = {
    hasMega:false,
    id:[],
  };

  //DATA
  const params = useParams();
  const [pokemon, setPokemon] = useState(INITIAL_PKMN);
  const [mega, setMega] = useState(INITIAL_MEGA);
  const [locationsList, setLocationsList] = useState([]);
  const [favorite, setFavorite] = useState(false);

  //METHODS
  async function getPkmn() {
    await axios.get(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
      .then(res => {
        setPokemon(res.data);
        return res.data;
      }).then(res => {
        getLocationsList(res.location_area_encounters);
        return res;
      }).then(res => {
        getFavs(res.name);
        organizeMega(res.name);
      });
  }

  async function organizeMega(name:string) {
    const newMega = mega;
    let url = `https://pokeapi.co/api/v2/pokemon-form/${name}-mega`;
    let url2 = "";
    if(name === "charizard" || name === "mewtwo"){
      url2 = url + "-y";
      url = url + "-x";
    } 

    const id1 = await getMega(url);
    if(typeof id1 === "string") {
      newMega.id = [id1];
    }
    
    if(url2 !== "") {
      const id2 = await getMega(url2);
      if(typeof id2 === "string") {
        if(!newMega.id.includes(id2)){
          newMega.id = [...newMega.id, id2];
          setMega(newMega);
        }
      }
    } else {
      setMega(newMega);
    }
  }

  async function getMega(url:string):Promise<number|undefined>{
    try {
      if (url != "") {
        let number = 0;
        await axios.get(url).then(res => {
          if (res.status === 200) {
            const split = res.data.pokemon.url.split("/");
            number = split[split.length - 2];
          }
        });
        return number;
      }
    } catch (error) {
      console.log("This pokemon doesnt have a mega evolution.");
    }
  }

  async function getLocationsList(url:Promise<string>) {
    await axios.get(await url).then(res => {
      if(res.status === 200){
        setLocationsList(res.data);
      }
    });
  }

  function setLSFavorites(){
    const favs = localStorage.getItem("favorites");
    if(favs && !checkFavs(pokemon.name, favs.split(","))) {
      localStorage.setItem("favorites", `${favs},${pokemon.name.replace(/ /g, "")}`);
      setFavorite(true);
    } else {
      localStorage.setItem("favorites", `${pokemon.name.replace(/ /g, "")}`);
      setFavorite(true);
    }
  }

  function rmLSFavorites(){
    const favs = localStorage.getItem("favorites")?.split(",");
    if(favs && checkFavs(pokemon.name, favs)) {
      const indexOf = favs.indexOf(pokemon.name);
      if(indexOf > -1) {
        favs.splice(indexOf, 1);
        setFavorite(false);
        localStorage.setItem("favorites", favs.join(","));
      } 
    }
  }

  function controllerLSFavorites(){
    favorite ? rmLSFavorites() : setLSFavorites();
  }

  function checkFavs(str:string, arr:string[]){
    if(arr && str != "") {
      const found = arr.find(arrElement => {
        return str.replace(/ /g, "") === arrElement.replace(/ /g, "");
      });
      return found?.length ? true : false;
    }
  }

  function getFavs(str:string){
    const favs = localStorage.getItem("favorites");
    if(favs && checkFavs(str ,favs.split(","))) setFavorite(true);
  }

  //MOUNTED
  useEffect(()=>{
    getPkmn();
  }, []);

  useMemo(()=>{
    setMega({
      hasMega:true,
      id:mega.id,
    });
  }, [locationsList]);

  //VIEW
  return(
    <div className={style.content}>
      {/* HEADER */}
      <header className={style.itemHeader}>
        <Button onClick={() => history.back()}><FontAwesomeIcon icon={icons.faArrowLeft} /></Button>
        <div style={{
          display:"flex",
          flexDirection:"column",
          alignItems:"center",
        }}>
          <h2>{capitalizeFLetter(pokemon.name)}</h2>
          <h4>#{pokemon.id}</h4>
        </div>
        <Button 
          selected={favorite} 
          type="favorite" 
          onClick={controllerLSFavorites}
        ><FontAwesomeIcon icon={icons.faHeart} /></Button>
      </header>

      {
        mega.hasMega && mega.id.map((element: number) =>
          <div key={uuidv4()} className={style.seeMegaButton}>
            <a href={`/details/${element}/`}>
              <button>Mega Evolution</button>
            </a>
          </div>
        )
      }
    
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
          content:<Stats stats={pokemon.stats} />,
          height:"25vh",
        },
        {
          name:"Moves",
          content:<Moves moves={pokemon.moves} />,
          height:"50vh",
        },
        {
          name:"Location",
          content:<Locations locations={locationsList}/>,
          height:"50vh",
        },
        {
          name:"Details",
          content:
          <>
            <h1>details</h1>
          </>
        },
      ]} />
    </div>
    
  );
  
}