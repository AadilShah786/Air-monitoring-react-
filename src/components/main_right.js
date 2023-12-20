import React, { useEffect, useState } from "react";
import { info } from "./data_manage";
import CO from '../assets/CO.png';
import NO2 from '../assets/NO2.png';
import NH3 from '../assets/NH3.png';
import SO2 from '../assets/SO2.png';
import OZONE from '../assets/O3.png';

function Main_right({ rerender }) {
    const [element, setElement] = useState(info.pol);
    const [delayedStyle, setDelayedStyle] = useState(null);

    useEffect(() => {
        setElement(info.pol);

        // Set a timeout to apply the background style after 1 second (adjust as needed)
        const timeout = setTimeout(() => {
            setDelayedStyle({
                background: `linear-gradient(135deg, ${info.selected.color},${info.selected.color},${info.colors[1]})`
            });
        }, 400); // Adjust the delay time here (in milliseconds)

        return () => clearTimeout(timeout); // Clear timeout on unmount or rerender
    }, [rerender]);
    const keys= Object.keys(info.data.pollutants);
    var selected;
    keys.forEach(item=>{
        if(info.data.pollutants[item]===element){
            selected=item;
        }
    })
    var image
    if(selected===CO){
        image=CO;
    }
  
    console.log(selected)
    return (
        <div className="Main_right" style={delayedStyle}>
            <div className="right_image">
                <img src={image} height={250}></img>
            </div>
            {element.pollutant_avg}<br />
            {info.data.station}
        </div>
    )
}

export default Main_right;
