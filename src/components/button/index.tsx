import style from "./style.module.scss";

interface Iprops {
  children: JSX.Element|string,
  onClick?: React.MouseEventHandler,
  selected?: boolean,
  type?:string
}

export default function Button (props:Iprops){
  return (
    <button 
      onClick={props.onClick} 
      className={`
        ${style.button} 
        ${props.selected && props.type === "favorite" ? style.favoriteSelected : style.favoriteUnselected}
      `}>
      {props.children}
    </button>
  );
}