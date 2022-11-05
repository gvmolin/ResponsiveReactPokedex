export function setLSFavorites(str:string, setFunc:React.Dispatch<React.SetStateAction<boolean>>):void{
  const favs = localStorage.getItem("favorites");
  if(favs && !checkFavs(str, favs.split(","))) {
    localStorage.setItem("favorites", `${favs}${str.replace(/ /g, "")},`);
    setFunc(true);
  } else {
    localStorage.setItem("favorites", `${str.replace(/ /g, "")},`);
    setFunc(true);
  }
}

export function rmLSFavorites(str:string, setFunc: React.Dispatch<React.SetStateAction<boolean>>):void{
  const favs = localStorage.getItem("favorites")?.split(",");
  if(favs && checkFavs(str, favs)) {
    const indexOf = favs.indexOf(str);
    if(indexOf > -1) {
      favs.splice(indexOf, 1);
      setFunc(false);
      localStorage.setItem("favorites", favs.join(","));
    } 
  }
}

export function controllerLSFavorites(bool:boolean, str:string, setFunc:React.Dispatch<React.SetStateAction<boolean>>):void{
  bool ? rmLSFavorites(str, setFunc) : setLSFavorites(str, setFunc);
}

export function checkFavs(str:string, arr:string[]) :boolean{
  if(arr && str != "") {
    const found = arr.find(arrElement => {
      return str.replace(/ /g, "") === arrElement.replace(/ /g, "");
    });
    return found !== undefined && found?.length > 0;
  }
  return false;
}

export function getFavs(str:string, setFunction:React.Dispatch<React.SetStateAction<boolean>>) :void{
  const favs = localStorage.getItem("favorites");
  if(favs && checkFavs(str, favs.split(","))) setFunction(true);
}