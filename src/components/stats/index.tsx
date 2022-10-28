import { v4 as uuidv4 } from "uuid";
import style from "./style.module.scss";
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
          <label htmlFor={`${stat.stat.name}`}>{stat.stat.name}</label>
          <div>
            {/* <input
              min='0'
              max='240'
              type="range"
              id={`${stat.stat.name}`}
              name={`${stat.stat.name}`}
              value={stat.base_stat}
              readOnly
            /> */}
            <div className={style.totalProgress} >
              <div style={{width:`${ (10 * stat.base_stat) / 23 }%`}}>{stat.base_stat}</div>
              {/* <span></span> */}
            </div>


            
          </div>
        </div>
      ))}
    </div>
  );
}