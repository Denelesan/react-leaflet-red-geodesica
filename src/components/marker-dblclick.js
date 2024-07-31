import { useEffect, useState, useRef } from "react";
import { Marker, LayerGroup, useMap, Popup} from "react-leaflet"
import Card from "antd/es/card/Card";
import blueIcon from "../icon/blueIcon";
import L from "leaflet"
import { Button } from "antd";





const MarkerDblClick = ({isActive})=>{
   
    const [refReady, setRefReady] = useState(false);
    let popupRef = useRef()
    const [markerPosition, setMarkerPosition] = useState(null)
    const leafletMap = useMap()
    leafletMap.doubleClickZoom.disable()

    leafletMap.on("dblclick",(e)=>{
        setMarkerPosition(e.latlng)
    })
    leafletMap.on("click",(e)=>{
        setMarkerPosition(null)
        setRefReady(false)
        
    })

    useEffect(()=>{
        if (refReady && isActive && popupRef.current){
            console.log("adentro")
            //popupRef.openOn(leafletMap)
           popupRef.current.openOn(leafletMap)
        }
        console.log(refReady, isActive,popupRef.current)
    },[isActive, markerPosition,refReady,leafletMap])
    
    return markerPosition ? (
        //console.log(markerPosition)
        <Marker
        key={String(markerPosition.lat)}
        position={[markerPosition.lat, markerPosition.lng]}
        icon={blueIcon}
    ><Popup
        ref={(r=>{
            popupRef.current = r;            
            setRefReady(true)
        })}>
        <div>
         <Card type="inner" title="Nombre" >
        </Card>
        <Button type="primary">Vértice más cercano</Button>
        </div>
    </Popup>
   
        </Marker>
        
    ) : null
     //console.log(coordinates)
        
}


export default MarkerDblClick;