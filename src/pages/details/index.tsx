import React, { useEffect, useState, useMemo, } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import { useSwipeable } from "react-swipeable";

import style from "./style.module.scss";
import capitalizeFLetter from "../../utils/tools/string";
import findColorByType from "../../utils/style/typeColors";
import { getFavs, controllerLSFavorites } from "../../utils/tools/favorites";

import Tabs from "../../components/tabs";
import Stats from "../../components/stats";
import Moves from "../../components/moves";
import Button from "../../components/button";
import Locations from "../../components/locations";

export default function Details (): React.ReactElement{
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
  const handlersLeftBar = useSwipeable({
    preventScrollOnSwipe: true,
    onSwipedRight: (eventData) => prevPage(eventData)
  });
  const handlersRightBar = useSwipeable({
    preventScrollOnSwipe: true,
    onSwipedLeft: (eventData) => nextPage(eventData)
  });
  const navigate = useNavigate();

  //METHODS
  async function getPkmn() :Promise<void> {
    await axios.get(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
      .then(res => {
        setPokemon(res.data);
        return res.data;
      }).then(res => {
        getLocationsList(res.location_area_encounters);
        return res;
      }).then(res => {
        getFavs(res.name, setFavorite);
        organizeMega(res.name);
      });
  }

  async function organizeMega(name:string) :Promise<void> {
    const newMega = INITIAL_MEGA;
    let url = `https://pokeapi.co/api/v2/pokemon-form/${name}-mega`;
    let url2 = "";
    if(name === "charizard" || name === "mewtwo"){
      url2 = url + "-y";
      url = url + "-x";
    } 

    const id1 = await getMega(url);
    if(typeof id1 === "string") {
      newMega.id = [id1];
      newMega.hasMega = true;
    }
    
    if(url2 !== "") {
      const id2 = await getMega(url2);
      if(typeof id2 === "string") {
        if(!newMega.id.includes(id2)){
          newMega.id = [...newMega.id, id2];
          newMega.hasMega = true;
          setMega(newMega);
        }
      }
    } else {
      setMega(newMega);
    }
  }

  async function getMega(url:string) :Promise<number|undefined>{
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

  async function getLocationsList(url:Promise<string>) :Promise<void> {
    await axios.get(await url).then(res => {
      if(res.status === 200){
        setLocationsList(res.data);
      }
    });
  }

  function prevPage(e) :void{
    e && navigate(`/details/${pokemon.id - 1}`);
  }

  function nextPage(e) :void{
    e && navigate(`/details/${pokemon.id + 1}`);
  }



  //MOUNTED
  useEffect(()=>{
    getPkmn();
  }, []);

  useEffect(()=>{
    organizeMega(pokemon.name);
  }, [pokemon]);

  useEffect(()=>{
    setFavorite(false);
    getPkmn();
  }, [params]);

  useMemo(()=>{
    setMega({
      hasMega:true,
      id:mega.id,
    });
  }, [locationsList]);

  //VIEW
  return(
    <div className={style.content}>
      <div className={style.container}>
        {/* HEADER */}
        <header className={style.itemHeader}>
          <Button onClick={() => history.back()}><FontAwesomeIcon icon={icons.faArrowLeft} /></Button>
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
            <h2>{capitalizeFLetter(pokemon.name)}</h2>
            <h4>#{pokemon.id}</h4>
          </div>
          <Button
            selected={favorite}
            type="favorite"
            onClick={() => controllerLSFavorites(favorite, pokemon.name, setFavorite)}
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
          <div {...handlersLeftBar} style={{ height: "50vh", width: "20vw", position: "absolute", top: "1000", left: "0" }}></div>
          <img src={pokemon.sprites?.front_default} />
          <div {...handlersRightBar} style={{ height: "50vh", width: "20vw", position: "absolute", top: "1000", right: "0" }}></div>
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
      </div>

      <div className={style.container}>


        {/* TABS */}
        <Tabs height={"60vh"} elements={[
          {
            name: "Stats",
            content: <Stats stats={pokemon.stats} />,
          },
          {
            name: "Moves",
            content: <Moves moves={pokemon.moves} />,
          },
          {
            name: "Location",
            content: <Locations locations={locationsList} />,
          },
          {
            name: "Details",
            content:
              <>
                <h1>details</h1>
              </>
          },
        ]} />
      </div>
    </div>
    
  );
  
}