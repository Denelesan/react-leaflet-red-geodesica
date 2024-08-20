import React from 'react';
import './App.css';
import Map from "./map/Map"
import Leaflet from "../node_modules/leaflet/dist/leaflet.css" //Necesario, aunque al parecer no se utilice
import "leaflet-search/src/leaflet-search"
import "leaflet-search/src/leaflet-search.css"
import "leaflet-control-geocoder/dist/Control.Geocoder.css"

function App() {
  return (
    <Map/>
  );
}

export default App;
