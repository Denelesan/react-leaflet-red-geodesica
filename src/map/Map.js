import { LayersControl, MapContainer, TileLayer, useMap } from "react-leaflet";

//Components
import GeodeticMarkerLayer from "../components/geodetic-marker-layers";
import MarkerDblClick from "../components/marker-dblclick"
//Data
import { red_geodesica_data } from "../data/red_geodesica_json5";

//Funciones
import { fetchWFSData } from "../utils/functions/all-functions";
import { useState } from "react";


const urlWFSRedGeodesica = 'http://163.247.53.138:443/geoserver/serviu/wfs?' +
                                'service=wfs&' +
                                'version=2.0.0&' +
                                'request=GetFeature&' +
                                'typeNames=serviu:vw_vertices_geodesicos_vigentes&' +                            
                                'outputFormat=application%2Fjson'
   

const Map = ()=>{
    //const wfsData = fetchWFSData(urlWFSRedGeodesica)  
   
    
    
    return (
        <MapContainer zoom={10} center={[-33.45, -70.65]}>
            <LayersControl>
                <LayersControl.BaseLayer checked name="<b>Positron Map</b>">
                    <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    
                    />
                </LayersControl.BaseLayer>   
                <LayersControl.BaseLayer name="OSM Street">
                    <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="World Imagery Map">
                    <TileLayer
                    attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    
                    />
                </LayersControl.BaseLayer>   
            <GeodeticMarkerLayer wfsData={red_geodesica_data}/>         
            </LayersControl>    
            <MarkerDblClick isActive wfsData={red_geodesica_data}/>
           
        </MapContainer>
    )
}


export default Map;