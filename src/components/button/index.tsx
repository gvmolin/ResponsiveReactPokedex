import style from "./style.module.scss";

interface Iprops {
  children: JSX.Element|string,
  onClick?: React.MouseEventHandler,
}

export default function Button (props:Iprops){
  return (
    <button onClick={props.onClick} className={style.button}>
      {props.children}
    </button>
  );
}