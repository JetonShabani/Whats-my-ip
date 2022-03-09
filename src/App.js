import './App.css';
import axios from 'axios';
import {useEffect, useState} from 'react'
import MyMap from './MyMap';
import CountryInfo from './Countries';

function App() {
  //use state to set the ip idress of the user and find the location.
  const [userIP, setUserIP] = useState();
  const [userLocation, setUserLocation] = useState({});
 //how to fetch the api with axios 
  useEffect(() => {
    const fetchIP = async () => {
      await axios
        .get(
          // this is my key "process.env..." stored in .env file for security
          `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_IPIFY_KEY}`
        )
        .then((response) => {
          // console.log(response.data)
          setUserIP(response.data.ip);
          setUserLocation(response.data.location);
          // console.log(response.data.location)
        })
        .catch((error) => console.log(error));
    };
    fetchIP();
    // console.log(userIP)
    // console.log(userLocation)
  }, []);

  return (
    <div className="App">
      <header className="App-header">Hello there! do you want to see your address ?</header>
      <main className='body'>
        <div className='information'>
        <p>
        Your IP is: {userIP}
        </p>
  
        {userLocation ? (
          <>
          <ul>
            <li>Your Location is: {userLocation.city}</li>
            <li>Your Region is: {userLocation.region}</li>
            <li>Your Country is: {userLocation.country}</li>
            <li>Your Latitude is: {userLocation.lat}</li>
            <li>Your Longitude is: {userLocation.lng}</li>
          </ul>
          </>
        ) : (
          "Loading..."
        )}
      <p id='country'>
        <CountryInfo  userCountry={userLocation.country}/>
        </p>
      </div>
  
      <div className='Map'>
      
          {userLocation ? (
            <MyMap lng={userLocation.lng} lat={userLocation.lat} />
          ) : (
            <p>Loading map...</p>
          )}
        </div>
        
    </main>
  </div>
  
  );
}

export default App;