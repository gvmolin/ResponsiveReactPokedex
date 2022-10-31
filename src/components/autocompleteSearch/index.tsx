import { useState, useEffect } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { findBestMatch } from "string-similarity";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./style.module.scss";

interface IProps {
  list: any[]
}

export default function AutocompleteSearch (props:IProps){
  const [search, setSearch] = useState(" ");
  const [searchResult, setSearchResult] = useState([{
    target:""
  }]);

  function onChangeSearch(e:React.FormEvent<HTMLInputElement>){
    setSearch(e.currentTarget.value);
  }

  function filterList(arr){
    const results = findBestMatch(search, arr.map(pokemon => `${pokemon.name.toLowerCase()}`));
    const filtered = results.ratings
      .filter(result => result.rating > 0.4)
      .sort((a, b) => a.rating < b.rating ? 1 : -1);
    setSearchResult(filtered);
  }

  useEffect(()=>{
    if(search.replace(/ /g, "").length && props.list.length > 1) filterList(props.list);
  }, [search]);

  return (
    <>
      <div
        className={`
        ${searchResult.length && searchResult[0].target.length && style.blurEffect }
      `}
      ></div>
      <div className={style.container}>
        <div
          className={`
          ${style.inputContainer} 
          ${searchResult.length && searchResult[0].target.length ? style.showingSearch : ""}`}>
          <input type="text" value={search} onChange={onChangeSearch} />
          <button><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
        </div>
        {
          searchResult.length && searchResult[0].target.length ? (
            <div className={style.suggestionsContainer}>
              <ul>
                {searchResult.map((result, i) => (
                  <>
                    <li key={uuidv4()}><a href={`/details/${result.target}`}><h4>{result.target}</h4></a></li>
                    {
                      i + 1 < searchResult.length &&
                      <div style={{ display: "flex", width: "110%", justifyContent: "center" }}><hr /></div>
                    }
                  </>

                ))}
              </ul>
            </div>
          ) : <></>
        }
      </div>
    </>
      
    
  );
}