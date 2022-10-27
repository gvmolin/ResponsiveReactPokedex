import style from "./style.module.scss";

interface Iprops {
  children: JSX.Element|string,
}

export default function Button (props:Iprops){
  return (
    <button className={style.button}>
      {props.children}
    </button>
  );
}