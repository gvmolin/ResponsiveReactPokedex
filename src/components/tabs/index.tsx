import { v4 as uuidv4 } from "uuid";
import { useState, useMemo } from "react";
import style from "./style.module.scss";

interface IProps{
  elements:IContent[]
}

interface IContent{
  content:JSX.Element,
  name:string
}

export default function Tabs(props:IProps){
  const [current, setCurrent] = useState(props.elements[0]);  

  function onClickTab(element:IContent){
    setCurrent(element);
  }

  useMemo( () => setCurrent(props.elements[0]), [props.elements]);

  return (
    <div>
      <div className={style.tabsContainer}>
        {
          props.elements.map(element => (
            <div key={uuidv4()}>
              <button onClick={() => onClickTab(element)}>
                <h2 
                  className={
                    current.name === element.name ? style.selected : style.nonSelected
                  }
                >{element.name}
                </h2>
              </button>
            </div>
          ))
        }
      </div>
      <div>
        {current.content}
      </div>
      
    </div>
  );
}