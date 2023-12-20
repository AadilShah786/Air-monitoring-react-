import React from "react";
import '../css/top.css';
import Data,{info} from "./data_manage";

function Top({rerender , trigger}){

    var stations=Data.filter(item=>item.city===info.data.city);
    const suggcity =()=>{
       var stationlist= stations.map(item=>{
        let text = item.station
        let commaIndex = text.indexOf(',');
        
        let stationname = text.substring(0, commaIndex);
        const handleclick=(set)=>{
            info.data=set;
            trigger()
        }
            return (
                <div key={item.id} className="top_item" onClick={()=>{handleclick(item)}}>
                    {stationname}
                </div>
            )
        })
        return stationlist;
    }
    return(
        <div className="Top">
            <div className="Top_left">
                {stations[0].city}
            </div>
            <div className="Top_right">
                {suggcity()}
            </div>
            
        </div>
    )
}

export default Top;