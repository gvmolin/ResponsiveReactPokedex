import style from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Header () {

  const [search, setSearch] = useState(" ");

  function onChangeSearch(e:React.FormEvent<HTMLInputElement>){
    setSearch(e.currentTarget.value);
  }

  function onSearch(){
    console.log(search);
  }


  return (
    <header className={style.header}>
      <div className={style.container}>
        <h1>Pokédex</h1>
        <div>
          <input type="text" value={search} onChange={onChangeSearch} />
          <button onClick={onSearch}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
        </div>
        
      </div>
      
    </header>
  );
}