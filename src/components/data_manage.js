import { useState,useEffect } from "react";
// This function retrieves the stored data from local storage or returns a default value
function GetStoredData() {
 
  try {
    const storedDataString = localStorage.getItem('myWeatherData');
    return storedDataString ? JSON.parse(storedDataString) : null;
  } catch (e) {
    console.log(e)
  }
}
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
          Math.cos(lat2 * (Math.PI / 180)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
 // console.log(lat1,lat2,lon1,lon2)
  return distance;
}

export function FindClosestLocation( data) {
  var latitude,longitude;
  let closestLocation = null;
  let minDistance = Number.MAX_VALUE;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
             latitude = position.coords.latitude;
             longitude = position.coords.longitude;
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
            // You can use latitude and longitude here
            data.forEach((item) => {
              const distance = calculateDistance(latitude, longitude, item.latitude, item.longitude);
              if (distance < minDistance) {
                  minDistance = distance;
                  closestLocation =item;
              }
          });
          console.log(closestLocation)
          info.data=closestLocation;
          info.pol=closestLocation.pollutants.PM10;
          return closestLocation;
        },
        (error) => {
            console.error('Error getting location:', error.message);
        }
    );
} else {
    console.error('Geolocation is not supported by this browser.');
}
    

// console.log(latitude,longitude)
 
 return Data.find(item=>item.id===7)
}


// Get stored data from local storage or set default if not available

const Data = GetStoredData();
const info = { data:FindClosestLocation(Data) ,
               pol: [] ,
               colors:["#03071E","#370617","#6A040F","#9D0208","#D00000","#DC2F02","#E85D04","#F48C06"],
               selected:{color:"#03071E",key:""}
               };

// var userdata=0;
// try{
// if(localdata.info && localdata.grouplist && localdata.tasklist){
//     userdata=localdata;
// }}catch(e){console.log(e)}

//   const Data = userdata;
export { info };
export default Data;