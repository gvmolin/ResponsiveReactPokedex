import style from "./style.module.scss";
import { v4 as uuidv4 } from "uuid";

interface IProps{
  list:IItem[],
  title:string,
  detail?:string
}

interface IItem{
  name:string,
  detail:string|number,
}

export default function CollapsibleList(props:IProps){
  //METHODS
  function onCategoryClick(e:React.MouseEvent){
    const content = e.currentTarget.parentElement?.children[1];
    if(content){
      content.classList.contains(style.none) ?
        content.classList.remove(style.none) : 
        content.classList.add(style.none);
    }
  }

  //view
  return (
    <div className={style.category}>
      <button onClick={onCategoryClick}><h4>{props.title}</h4></button>
      <div className={style.none}>
        {
          props.list.map((item => (
            <div key={uuidv4()}>
              <h4>{ item.name }</h4>
              <h6>{ item.detail }</h6>
            </div>
          )))
        }
      </div>
    </div>
  );

}