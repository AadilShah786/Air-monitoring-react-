import React, { useEffect, useState } from "react";
import { info } from "./data_manage";

function Main_left({ style, item, value, trigger }) {
    const [isHovered, setIsHovered] = useState(false);
  const [styler, setStyler] = useState(style);

useEffect(()=>{
setStyler(style);
},[style]);

  const handleMouseEnter = () => {
    handleclick();
    const updatedStyle = { ...styler, color: "black",opacity:"1"};
    setStyler(updatedStyle);
    
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    const updatedStyle = { ...styler,opacity:"1", fontSize:"20px",color:"white" , transition: `font-size 0.3s ease-in-out, color 0.3s ease-in-out` };
    setStyler(updatedStyle);
    setIsHovered(false);
  };

  
    var name = null;
    var key = "PM10";
    const keysArray = Object.keys(item);
    keysArray.forEach(keyitem => {
        if (item[keyitem] === value) {
            name = keyitem.toString();
            if(name==="PM10"){name="Particulate Matter 10"}
            else if(name==="PM2.5"){name="Particulate Matter 2.5"}
            else if(name==="NO2"){name="Nitrogen Dioxide"}
            else if(name==="SO2"){name="Sulfer Dioxide"}
            else if(name==="NH3"){name="Ammonia"}
            else if(name==="CO"){name="Carbon Monoxide"}
            else if(name==="OZONE"){name="Ozone"}
            key = keyitem;
        }
    })
    
    const handleclick = () => {
        info.selected.key=key.toString();
       
        if(key.toString()==="PM10"){ info.selected.color=info.colors[1]}
        else if(key.toString()==="PM2.5"){ info.selected.color=info.colors[2]}
        else if(key.toString()==="NO2"){ info.selected.color=info.colors[3]}
        else if(key.toString()==="OZONE"){ info.selected.color=info.colors[4]}
        else if(key.toString()==="CO"){ info.selected.color=info.colors[6]}
        else if(key.toString()==="SO2"){ info.selected.color=info.colors[5]}
        else if(key.toString()==="NH3"){ info.selected.color=info.colors[7]}
      // console.log(info.selected.color, key)
        info.pol = item[key];
         //console.log(info.selected.key)
        trigger();
    }
    //var name=item.find(ele=>ele===value)
    return (
        <div className="Main_left" style={styler} onClick={handleclick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
            {name}
        </div>
    )
}
export default Main_left;