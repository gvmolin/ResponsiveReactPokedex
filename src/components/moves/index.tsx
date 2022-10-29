import { useState, useEffect } from "react";
import CollapsibleList from "../collapsibleList";
import capitalizeFLetter from "../../utils/tools/string";

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
  }],
}

interface IFormattedMove {
  name:string,
  detail:number|string,
}

export default function Moves(props: IProps) {
  //DATA
  const [moves, setMoves] = useState(props.moves);

  //METHODS
  function organizeMove(obj:IMove):IFormattedMove{
    return {
      name: capitalizeFLetter(obj.move.name),
      detail: ( obj.version_group_details[0].move_learn_method.name === "level-up" ?
        obj.version_group_details[0].level_learned_at :
        obj.version_group_details[0].move_learn_method.name )
    };
  }

  //MOUNTED
  useEffect(()=>{
    setMoves(props.moves);
  }, []);

  //VIEW
  return (
    <div>
      <CollapsibleList 
        title={"Level up"} 
        list={moves.filter(move => 
          move.version_group_details[0].move_learn_method.name === "level-up"
        ).map(move => 
          organizeMove(move)
        ).sort((a,b) => (a.detail > b.detail) ? 1 : ((b.detail > a.detail) ? -1 : 0))}
      />
      <CollapsibleList
        title={"Machine"}
        list={moves.filter(move =>
          move.version_group_details[0].move_learn_method.name === "machine"
        ).map(move=> 
          organizeMove(move)
        )}
      />
      <CollapsibleList
        title={"Tutor"}
        list={moves.filter(move =>
          move.version_group_details[0].move_learn_method.name === "tutor"
        ).map(move=> organizeMove(move))}
      />
    </div>
  );
}