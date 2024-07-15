import { LayersControl, MapContainer, TileLayer } from "react-leaflet";

const Map = ()=>{

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
                         
                </LayersControl>         
           
        </MapContainer>
    )
}


export default Map;