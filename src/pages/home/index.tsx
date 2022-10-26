import { useEffect, useState } from "react";
import Card from "../../components/card";
import style from "./style.module.scss";
import axios from "axios";

export default function Home (){
  const [pokemons, setPokemons] = useState([]);

  async function getPokemonList(){
    await axios.get("https://pokeapi.co/api/v2/pokemon/").then(res => {
      setPokemons(res.data.results);
    }).catch(err => {
      console.log(err);
    });
  }

  useEffect(() => {
    getPokemonList();
  }, []);

  return (
    <div className={style.content}>
      <div className={style.list}>
        {pokemons.map((pokemon,i) => (
          <Card key={i} data={pokemon} />
        ))}
      </div>
    </div>
  );
}