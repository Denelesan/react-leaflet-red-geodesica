import { LayersControl, MapContainer, TileLayer, Control } from "react-leaflet";
import { Image } from "antd";
//Components
import GeodeticMarkerLayer from "../components/geodetic-marker-layers";
import MarkerDblClick from "../components/marker-dblclick";

//Control
import SearchLayerControl from "../components/search-layer";
import Scale from "../components/scale";
import ControlGeocoder from "../components/control-geocoder";
import { FitBoundToWorldControl } from "../components/control-home-view";
//Data
import { red_geodesica_data } from "../data/red_geodesica_json5";

//Funciones
import { fetchWFSData, reProjCoordinatesDataToGeo } from "../utils/functions/all-functions";
import { useEffect, useState } from "react";



const urlWFSRedGeodesica = 'http://163.247.53.138:443/geoserver/serviu/wfs?' +
                                'service=wfs&' +
                                'version=2.0.0&' +
                                'request=GetFeature&' +
                                'typeNames=serviu:vw_vertices_geodesicos_vigentes&' +                            
                                'outputFormat=application%2Fjson'
   
const Map = ()=>{
    const [wfsData, setWFSData] = useState(null) 
    useEffect(()=>{
        fetchWFSData(urlWFSRedGeodesica)
        .then((resolvedData) =>{
            //setWFSData(resolvedData)
            //const layer = reProjCoordinatesData(resolvedData)
            setWFSData(reProjCoordinatesDataToGeo(resolvedData))
  
        })
        .catch(error=>{
            console.error("Error al obtener datos", error)
        })
    },[])  
    
    
    
    return (
        <MapContainer zoom={10} center={[-33.45, -70.65]} minZoom={9}>
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
                <LayersControl.BaseLayer name="Smooth Dark Map">
                    <TileLayer
                    attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}?api_key=65bf92e4-95a1-4289-8179-c02b5ce4d6ff'
                    authorization='Stadia-Auth 65bf92e4-95a1-4289-8179-c02b5ce4d6ff'
                    ext='png'
                    />
                </LayersControl.BaseLayer>   
                
            <GeodeticMarkerLayer wfsData={wfsData}/>  
                 
            </LayersControl>    
            
            <MarkerDblClick isActive wfsData={wfsData} />
         
            <SearchLayerControl wfsData={wfsData} /> 
            <ControlGeocoder />
            
            <FitBoundToWorldControl />
            
            <Scale />
            
            
           
        </MapContainer>
    )
}


export default Map;