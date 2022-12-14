import { v4 as uuidv4 } from "uuid";
import capitalizeFLetter from "../../utils/tools/string";
import CollapsibleList from "../collapsibleList";
import { useState, useEffect, useMemo, ReactElement } from "react";

interface IProps {
  locations:any[],
}

export default function Locations(props:IProps) : ReactElement{
  const [versions, setVersions] = useState([{}]); 
  const [info, setInfo] = useState([{
    name: "",
    locations: [""]
  },]);
 
  function getVersions(locations:any[]){
    const arr :any[]= [];
    locations.forEach(location => {
      location.version_details.forEach((element:any) => {
        arr.push(element.version.name);
      });
    });
    
    setVersions(arr.filter(function(item, pos) {
      return arr.indexOf(item) == pos;
    }));
  }

  function organizeInfo(){
    const arr = initInfoArr();
    arr.forEach(locationNewObj => {
      props.locations.forEach(locationPropObj => {
        locationPropObj.version_details.forEach((versionDetailsObj:any) => {
          if(versionDetailsObj.version.name === locationNewObj.name) locationNewObj.locations.push(locationPropObj.location_area.name);
        });
      });
    });
    setInfo(arr);
  }

  function initInfoArr(){
    const arr:{name:string, locations:string[]}[] = [];
    versions.forEach(version => {
      arr.push({
        name: `${version}`,
        locations: []
      });
    });
    return arr;
  }

  useMemo( () => {
    if(versions.length > 1){
      organizeInfo();
    }
    
  }, [versions]);

  useEffect(()=>{
    getVersions(props.locations);
  }, [props.locations]);

  return (
    <div>
      {
        props.locations.length > 0 ?
          info.map(version => (
            <CollapsibleList
              key={uuidv4()}
              title={capitalizeFLetter(version.name.replace(/-/g, " "))}
              list={version.locations.map(location => ({
                name: capitalizeFLetter(location.replace(/-/g, " ")), // capitalizeFLetter(location.location_area.name.replace(/-/g, " ")),
                detail: "",
              }))}
            />
          )) :
          <div>
            <h4>None locations available</h4>
          </div>
      }
    </div>
  );
}