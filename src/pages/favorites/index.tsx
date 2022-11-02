import { useEffect, useState } from "react";
import Card from "../../components/card";
import style from "./style.module.scss";
// import axios from "axios";

export default function Favorites (){
  const [favorites, setFavorites] = useState([{
    name:"",
    url:""
  }]);

  async function getFavsList(){
    setFavorites([]);
    const favs = localStorage.getItem("favorites")?.split(",");
    favs && favs.map( fav => {
      const obj = {
        name:fav,
        url:`https://pokeapi.co/api/v2/pokemon/${fav}`
      };
      favorites.length ? 
        setFavorites(prevFavorites => [...prevFavorites, obj]) : 
        setFavorites([obj]);
    });
  }

  useEffect(()=>{
    getFavsList();
  }, []);
  

  return (
    <div className={style.content}>
      <div className={style.list}>
        {favorites.map((pokemon,i) => (
          pokemon.url != "" && <Card key={i} data={{name:pokemon.name, url:pokemon.url}} />
        ))}
      </div>
    </div>
  );
}