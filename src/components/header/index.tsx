import style from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Switch from "react-input-switch";
import { ThemeColors } from "../../utils/enum/theme";


interface IProps{
  setTheme: any,
  currentTheme:string,
}

export default function Header (props:IProps) {
  const [search, setSearch] = useState(" ");
  const [switchValue, setSwitchValue] = useState(props.currentTheme === ThemeColors.L );

  function onChangeSearch(e:React.FormEvent<HTMLInputElement>){
    setSearch(e.currentTarget.value);
  }

  function onSearch(){
    console.log("search action");
  }

  useEffect(()=>{
    switchValue ? 
      props.setTheme(ThemeColors.L) : props.setTheme(ThemeColors.D);
  }, [switchValue]);

  return (
    <header 
      className={`
        ${style.header} 
        ${props.currentTheme === ThemeColors.L ? style.lightTheme : style.darkTheme}
  ]   `}
    >
      <div className={style.container}>
        <div className={style.switchContainer}>
          <h1>Pokédex</h1>
          <Switch value={switchValue ? 1 : 0} onChange={setSwitchValue} className={style.switchComponent} />
        </div>
        
        <div>
          <input type="text" value={search} onChange={onChangeSearch} />
          <button onClick={onSearch}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
        </div>  
      </div>
      
    </header>
  );
}