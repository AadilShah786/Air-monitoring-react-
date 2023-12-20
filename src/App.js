import coordata from './components/data.js';
import './App.css';
import apidata from './components/apidata';
import Left from './components/left.js';
import Top from './components/top.js';
import Main from './components/main.js';
import { useState, useCallback } from 'react';

apidata()
  .then(data => {
    // console.log(data)
    data.forEach(element => {
      if (!(element.latitude && element.longitude)) {
        try {
          var lat = coordata.find(temp => temp.properties.station === element.station);

          if (lat) {
            element.latitude = lat.geometry.coordinates[0];
            // var lon=coordata.find(temp => temp.properties.station === element.station);
            element.longitude = lat.geometry.coordinates[1];
          } else {

          }
        } catch (error) {
          console.log(error);
          // console.log(element)
          //console.log(coordata.find(temp => temp.properties.station === element.station));
        }
      }
    });
    if (data.length != 0) {
      try {
        const updatedDataString = JSON.stringify(data);
        localStorage.setItem('myWeatherData', updatedDataString);
      } catch (e) {
        console.log(e)
      }

    } else {
      console.log("no data")
    }

  });


function App() {
  const [rerender, setrender] = useState(false);

  const triggerrender = useCallback(() => {

    setrender(prevState => !prevState); // Toggle state
  }, []);
 
  return (
    <div className='App'>
      <Left trigger={triggerrender} rerender={rerender} />
      <div className='Right'>
        <Top rerender={rerender} trigger={triggerrender} />
        <Main rerender={rerender} />
      </div>

    </div>
  );
}

export default App;

// ID: 1
// Country: India
// State: Andhra Pradesh
// City: Amaravati
// station:"Secretariat, Amaravati - APPCB"
// Last Update: 17-12-2023 01:00:00
// Latitude: 16.5150833
// Longitude: 80.5181667
// AQI: 155
// Max AQI: 155
// Max Element: pm25

// Pollutants:
// - PM10:
//   Avg: 118
//   Max: 189
//   Min: 88
// - CO:
//   Avg: 49
//   Max: 61
//   Min: 6
// - NH3:
//   Avg: 3
//   Max: 4
//   Min: 1
// - NO2:
//   Avg: 20
//   Max: 44
//   Min: 8
// - OZONE:
//   Avg: 40
//   Max: 92
//   Min: 6
// - PM2.5:
//   Avg: 155
//   Max: 323
//   Min: 95
// - SO2:
//   Avg: 16
//   Max: 19
//   Min: 14


// <div style={{width: 519, height: 297, position: 'relative', background: '#DDDDDD'}}>
//   <div style={{width: 467, height: 246, left: 26, top: 25, position: 'absolute', background: 'white', borderRadius: 20}} />
//   <div style={{width: 247, height: 0, left: 150, top: 25, position: 'absolute', transform: 'rotate(90deg)', transformOrigin: '0 0', border: '1px black solid'}}></div>
//   <div style={{width: 104, height: 18, left: 35, top: 39, position: 'absolute', background: 'white', borderRadius: 20, border: '1px black solid'}} />
//   <img style={{width: 79, height: 101, left: 40, top: 86, position: 'absolute'}} src="https://via.placeholder.com/79x101" />
//   <div style={{width: 71, height: 21, left: 40, top: 72, position: 'absolute', textAlign: 'center'}}><span style="color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'">AQI: 300<br/></span><span style="color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '200', wordWrap: 'break-word'">Unhealthy</span></div>
//   <div style={{width: 110, height: 57, left: 33, top: 206, position: 'absolute', background: '#E3E3E3', borderRadius: 12}} />
//   <div style={{width: 101, height: 57, left: 38, top: 206, position: 'absolute'}}><span style="color: 'rgba(0, 0, 0, 0.20)', fontSize: 14, fontFamily: 'Inter', fontWeight: '800', wordWrap: 'break-word'">Gulzarpet<br/></span><span style="color: 'rgba(0, 0, 0, 0.20)', fontSize: 10, fontFamily: 'Inter', fontStyle: 'italic', fontWeight: '300', wordWrap: 'break-word'">Anantapur<br/>Andhra pradesh</span></div>
//   <div style={{width: 322, height: 18, left: 161, top: 39, position: 'absolute', background: 'white', borderRadius: 20, border: '1px black solid'}} />
//   <div style={{width: 18, height: 0, left: 201, top: 39, position: 'absolute', transform: 'rotate(90deg)', transformOrigin: '0 0', border: '1px black solid'}}></div>
//   <div style={{width: 166, height: 191, left: 309, top: 72, position: 'absolute', background: '#D9D9D9', borderRadius: 13}} />
//   <div style={{width: 93, height: 17, left: 177, top: 77, position: 'absolute', background: '#D9D9D9', borderRadius: 13}} />
//   <div style={{width: 93, height: 17, left: 177, top: 240, position: 'absolute', background: '#D9D9D9', borderRadius: 13}} />
//   <div style={{width: 93, height: 17, left: 177, top: 213, position: 'absolute', background: '#D9D9D9', borderRadius: 13}} />
//   <div style={{width: 93, height: 17, left: 177, top: 187, position: 'absolute', background: '#D9D9D9', borderRadius: 13}} />
//   <div style={{width: 93, height: 17, left: 177, top: 161, position: 'absolute', background: '#D9D9D9', borderRadius: 13}} />
//   <div style={{width: 93, height: 17, left: 177, top: 133, position: 'absolute', background: '#D9D9D9', borderRadius: 13}} />
//   <div style={{width: 93, height: 17, left: 177, top: 105, position: 'absolute', background: '#D9D9D9', borderRadius: 13}} />
// </div>