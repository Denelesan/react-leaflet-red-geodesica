import { useEffect, useState, useRef } from "react";
import { Marker, LayerGroup, useMap, Popup} from "react-leaflet"
import Card from "antd/es/card/Card";
import blueIcon from "../icon/blueIcon";
import L from "leaflet"
import { Button } from "antd";





const MarkerDblClick = ()=>{
    
    const [markerPosition, setMarkerPosition] = useState()
    const leafletMap = useMap()
    leafletMap.doubleClickZoom.disable()

    leafletMap.on("dblclick",(e)=>{
        setMarkerPosition(e.latlng)
    })
    leafletMap.on("click",(e)=>{
        setMarkerPosition(null)
    })
    
    return markerPosition ? (
        //console.log(markerPosition)
        <Marker
        key={String(markerPosition.lat)}
        position={[markerPosition.lat, markerPosition.lng]}
        icon={blueIcon}
    ><Popup>
        <div>
         <Card type="inner" title="Nombre" >
        </Card>
        <Button>Vértice más cercano</Button>
        </div>
    </Popup>
   
        </Marker>
        
    ) : null
     //console.log(coordinates)
        
}


export default MarkerDblClick;