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
    <>
      {stats.map((stat) => (
        <div key={uuidv4()} className={style.statsContainer}>
          <label htmlFor={`${stat.stat.name}`}>{stat.stat.name}</label>
          <div>
            <input
              type="range"
              id={`${stat.stat.name}`}
              name={`${stat.stat.name}`}
              value={stat.base_stat}
              readOnly
            />
            <span>{stat.base_stat}</span>
          </div>
        </div>
      ))}
    </>
  );
}