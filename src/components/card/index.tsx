import findColorByType from "../../utils/style/typeColors";
import capitalizeFLetter from "../../utils/tools/string";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Button from "../button";
import { controllerLSFavorites, getFavs } from "../../utils/tools/favorites";
import style from "./style.module.scss";

interface IProps {
  data:{
    name:string,
    url:string,
  }
}

export default function Card (props:IProps) :React.ReactElement{
  const [pokemon, setPokemon] = useState({
    id:0,
    name:"",
    sprites:{
      front_default:""
    },
    types:[{
      type: {
        name:""
      }
    }]
  });
  const [color, setColor] = useState({
    name:"",
    color:"",
  });
  const [favorite, setFavorite] = useState(false);

  async function getPkmn() :Promise<void> {
    await axios.get(props.data.url)
      .then(res => {
        setPokemon(res.data);
        return res.data;
      })
      .then(res => {
        const findColor = findColorByType(res.types[0].type.name);
        setColor(findColor);
      });
  }

  useEffect(()=>{
    getPkmn();
    getFavs(props.data.name, setFavorite);
  },[]);

  return (
    <div className={style.cardContainer}>
      <Button
        selected={favorite}
        type="favorite"
        onClick={() => controllerLSFavorites(favorite, pokemon.name, setFavorite)}
      ><FontAwesomeIcon icon={faHeart} /></Button>
      <a
        className={style.card}
        style={{ backgroundColor: color?.color }}
        href={`/details/${pokemon.id}`}
      >
        <div className={style.imageContainer}>
          
          <img src={pokemon.sprites.front_default} alt="Pokemon image" />
        </div>
        <div className={style.textContainer}>
          <h3>#{pokemon.id}</h3>
          <h2>{capitalizeFLetter(pokemon.name)}</h2>
        </div>
      </a>
    </div>
  );
}