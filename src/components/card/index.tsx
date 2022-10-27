import findColorByType from "../../utils/style/typeColors";
import capitalizeFLetter from "../../utils/tools/string";
import { useEffect, useState } from "react";
import axios from "axios";
import style from "./style.module.scss";

interface IData {
  data:{
    name:string,
    url:string,
  }
}

export default function Card (props:IData) {
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

  async function getPkmn() {
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
  },[]);

  return (
    <a
      className={style.card} 
      style={{backgroundColor: color?.color}}
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
  );
}