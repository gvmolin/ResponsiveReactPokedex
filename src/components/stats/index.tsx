import { v4 as uuidv4 } from "uuid";
import style from "./style.module.scss";
import capitalizeFLetter from "../../utils/tools/string";
import { useEffect, useState } from "react";

interface IProps{
  stats:IStat[]
}

interface IStat{
  base_stat:number,
  stat:{
    name:string,
  }
}

export default function Stats (props:IProps){
  const [stats, setStats] = useState(props.stats);

  useEffect(()=>{
    setStats(props.stats);
  });

  return(
    <div className={style.container}>
      {stats.map((stat) => (
        <div key={uuidv4()} className={style.line}>
          <label htmlFor={`${stat.stat.name}`}><h4>{capitalizeFLetter(stat.stat.name)}</h4></label>
          <div>
            <div className={style.totalProgress} >
              <div style={{width:`${(10 * stat.base_stat) / 23 }%`}}>{stat.base_stat}</div>
            </div>


            
          </div>
        </div>
      ))}
    </div>
  );
}