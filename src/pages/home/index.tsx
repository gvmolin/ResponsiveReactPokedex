import { useEffect, useState } from "react";
import Card from "../../components/card";
import style from "./style.module.scss";
import axios from "axios";

export default function Home (){
  const [pokemons, setPokemons] = useState([{
    name:"",
    url:""
  }]);
  const [page, setPage] = useState(1);

  async function getPokemonList(){
    console.log(page);
    await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${(page - 1) * 30}&limit=${30}`).then(res => {
      const newPokemons = pokemons.length > 1 ?
        [...pokemons, ...res.data.results] :
        [...res.data.results];
      setPokemons(newPokemons);
      // console.log(arr);
    }).catch(err => {
      console.log(err);
    });
  }

  function scrollListener(e:any){
    if(e.target?.documentElement.scrollHeight ===
    (e.target?.documentElement.scrollTop + window.innerHeight)){
      setPage(prevPage => prevPage + 1);
    }
  }

  useEffect(() => {
    getPokemonList();
    window.addEventListener("scroll", scrollListener);
  }, []);

  useEffect(() => {
    getPokemonList();
    // console.log(page);
  }, [page]);

  return (
    <div className={style.content}>
      <div className={style.list}>
        {pokemons.map((pokemon,i) => (
          pokemon.url != "" && <Card key={i} data={{name:pokemon.name, url:pokemon.url}} />
        ))}
      </div>
    </div>
  );
}