import React, { useState, useEffect, useRef } from "react";
import '../css/left.css';
import Data, { info } from "./data_manage";
import aqi50 from '../assets/aqi_0_50.png';
import aqi100 from '../assets/aqi_50_100.png';
import aqi200 from '../assets/aqi_100_200.png';
import aqi300 from '../assets/aqi_200_300.png';
import aqi400 from '../assets/aqi_300_400.png';
import aqi500 from '../assets/aqi_400_500.png';
import aqi_image3 from '../assets/aqi_image3.png';

function Left({ trigger ,rerender}) {
    const [searchcity, setsearchcity] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [display, setdisplay] = useState({ aqi: info.data.aqi, image: aqi_image3, text: "none", station: info.data.station, city: info.data.city, state: info.data.state});
    
    useEffect(()=>{
        renderleft();
       
    },[rerender]);

    const handleformsubmit = (event) => {
        event.preventDefault();
    }
    const handlechange = (event) => {
        const value = event.target.value;
        setsearchcity(event.target.value);

        const stationNames = Data.map(item => item.station);

        // Filtering station names based on the search term
        const filteredSuggestions = stationNames.filter(station =>
            station.toLowerCase().includes(value.toLowerCase())
        );

        setSuggestions(filteredSuggestions);

    }

    const searchRef = useRef();

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setSuggestions([]); // Close suggestions when clicking outside the search box
        }
    };
    const handlesearch =(search)=>{
        let val2 = Data.find(item => item.station === search);
        info.data=val2;
        renderleft();
        trigger();
    }
    const renderleft = () => {
       var val =info.data;
        var image;
        var text;
        var aqi = val.aqi;
        if (aqi < 50) {
            image = aqi50;
            text = "good";
        } else if (aqi < 100) {
            image = aqi100;
            text = "moderate";
        } else if (aqi < 200) {
            image = aqi200;
            text = "poor";
        } else if (aqi < 300) {
            image = aqi300;
            text = "unhealthy";
        } else if (aqi < 400) {
            image = aqi400;
            text = "severe";
        } else {
            image = aqi500;
            text = "hazardous";
        }
        var text2 = val.station
        let commaIndex = text2.indexOf(',');
        let hyphenIndex = text2.indexOf('-');
        //console.log(commaIndex,hyphenIndex) 
        let station = text2.substring(0, commaIndex);

        // var station=(val.station.substring(0,val.station.indexOf(',')) + text.substring(val.station.indexOf('-'))).trim();
        const dis = { aqi: val.aqi, image: image, text: text, station: station, city: val.city, state: val.state };
        setdisplay(dis);
        setsearchcity("");
        info.data = val;
        if (val.pollutants.PM10) {
            info.pol = val.pollutants.PM10
        } else if (val.pollutants["PM2.5"]) {
            info.pol = val.pollutants["PM2.5"]
        }else if (val.pollutants["NO2"]) {
            info.pol = val.pollutants["NO2"]
        }else if (val.pollutants["CO"]) {
            info.pol = val.pollutants["CO"]
        }else if (val.pollutants["SO2"]) {
            info.pol = val.pollutants["SO2"]
        }else if (val.pollutants["NH3"]) {
            info.pol = val.pollutants["NH3"]
        }else {
            info.pol = val.pollutants["OZONE"]
        }
        //console.log(val);
       
    }
    return (
        <div className="Left">
            <div>
                <form className="search-form" role="search" onSubmit={handleformsubmit}>
                    <input className="form-control" ref={searchRef} type="search" id="cityin" autoComplete="off" placeholder="Search Location Here" value={searchcity} onChange={handlechange} />
                    <ul className="suggestions-container">
                        {suggestions.map((suggestion, index) => (
                            <li key={index} onClick={() => handlesearch(suggestion)}>{suggestion}</li>
                        ))}
                    </ul>

                    {/* <button className="search-btn" type="submit" onClick={handlesearch}>
                    <p>Search</p>
                </button> */}
                </form>

                <div className="tip" style={{ height: "8%", fontSize: "40px", fontWeight: "600", margin: "none", padding: "none" }}>
                    <div style={{ marginBlockEnd: "none", marginBlockStart: "none", padding: "none" }}> AQI: {display.aqi}</div>
                    <div style={{ margin: "none", padding: "none" }} >{display.text}</div>
                </div>
            </div>
            <div className="cartoon">
                <img src={display.image} height={"100%"}></img>
            </div>
            <div className="location">
                <div className="station">{display.station}</div>
                <div className="city">{display.city}</div>
                <div className="state">{display.state}</div>
            </div>
        </div>
    )
}

export default Left;