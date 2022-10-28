import { useMemo, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import style from "./style.module.scss";

interface IProps {
  moves:IMove[],
}

interface IMove {
  move:{
    name:string,
  },
  version_group_details:[{
    level_learned_at:number,
    move_learn_method:{
      name:string,
    },
  },],
}

export default function Moves(props: IProps) {
  const [moves, setMoves] = useState(props.moves);

  useEffect(()=>{
    setMoves(props.moves);
    props.moves.forEach(element => {
      console.log(element.version_group_details[0]);
    });
    // console.log(props.moves);
    
  });

  // useMemo(()=> setMoves(props.moves), [props]);

  return (
    <div className={style.container}>
      <div className="style.category">
        <h3>Level up:</h3>
        {
          moves.map((move => {
            if (move.version_group_details[0].move_learn_method.name === "level-up") {
              return (
                <div key={uuidv4()}>
                  <h4>{move.move.name}</h4>
                  <h6>{move.version_group_details[0].level_learned_at}</h6>
                </div>
              );
            }
          }))
        }

      </div>

      <div className="style.category">
        <h3>Machine:</h3>
        {
          moves.map((move => {
            if (move.version_group_details[0].move_learn_method.name === "machine") {
              return (
                <div key={uuidv4()}>
                  <h4>{move.move.name}</h4>
                  <h6>{move.version_group_details[0].move_learn_method.name}</h6>
                </div>
              );
            }
          }))
        }

      </div>

      <div className="style.category">
        <h3>Tutor:</h3>
        {
          moves.map((move => {
            if (move.version_group_details[0].move_learn_method.name === "tutor") {
              return (
                <div key={uuidv4()}>
                  <h4>{move.move.name}</h4>
                  <h6>{move.version_group_details[0].move_learn_method.name}</h6>
                </div>
              );
            }
          }))
        }

      </div>
      
    </div>
  );
}