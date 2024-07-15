import React from 'react';
import './App.css';
import Map from "./map/Map"
import Leaflet from "../node_modules/leaflet/dist/leaflet.css" //Necesario, aunque al parecer no se utilice

function App() {
  return (
    <Map/>
  );
}

export default App;
