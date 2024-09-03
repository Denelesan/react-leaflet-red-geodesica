import { useEffect, useState, useRef, isValidElement } from "react";
import { Marker, LayerGroup, useMap, Popup, Circle, Tooltip, CircleMarker} from "react-leaflet"
import Card from "antd/es/card/Card";
import blueIcon from "../icon/blueIcon";
import L from "leaflet"
import { Button } from "antd";
import proj4 from "proj4";
import { findNearestVertex, reProjCoordinatesValuesGeoToUTM } from "../utils/functions/all-functions";

const WGS84UTM = "EPSG:32719"
const GEO = "EPSG:3857"
const WGS84GEO="EPSG:4326"
proj4.defs(GEO,"+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs +type=crs")
proj4.defs(WGS84UTM,"+proj=utm +zone=19 +south +datum=WGS84 +units=m +no_defs +type=crs");
proj4.defs(WGS84GEO,"+proj=longlat +datum=WGS84 +no_defs +type=crs");



const MarkerDblClick = ({isActive, wfsData})=>{
    const [nearestVertex, setNearestVertex] = useState(null)
    const map = useMap()
    let findPoint;
    const [refReady, setRefReady] = useState(false);
    let popupRef = useRef()
    const [markerPosition, setMarkerPosition] = useState(null)
    const [comunasActive, setComunasActive] = useState(false)
    const leafletMap = useMap()

    useEffect(()=>{
        leafletMap.doubleClickZoom.disable()

        const onOverlayAdd =  (event)=>{
            console.log("overlayadd",event.name)
            setComunasActive(true)
        }

        const onOverlayRemove = (event)=>{
            console.log("overlayremove", event.name)
            setComunasActive(false)
        }
        
        const onDblClick = (e)=>{
            console.log(comunasActive)
            comunasActive? null : setMarkerPosition(e.latlng)
                        
        }

        const onClick =(e)=>{
            setMarkerPosition(null)
            setRefReady(false)           
        }

        map.on("overlayadd", onOverlayAdd)
        map.on("overlayremove", onOverlayRemove)
        map.on("dblclick", onDblClick)
        map.on("click", onClick)

        return () => {
            // Limpia los eventos al desmontar el componente
            map.off("overlayadd", onOverlayAdd);
            map.off("overlayremove", onOverlayRemove);
            map.off("dblclick", onDblClick);
            map.off("click", onClick);
        };

    }, [leafletMap, comunasActive])       
    
   
    
    useEffect(()=>{
        setNearestVertex(null)
    },[markerPosition])

    useEffect(()=>{
        if (refReady && isActive && popupRef.current){
            //console.log("adentro")
            //popupRef.openOn(leafletMap)
            
            popupRef.current.openOn(leafletMap)
           
           
        }
        //console.log(refReady, isActive,popupRef.current)
    },[isActive, markerPosition,refReady,leafletMap])   
    var markerPositionArrays=[]    
    var markerPositionUTM = [];
    if (markerPosition){
        markerPositionArrays = Object.values(markerPosition)             
        markerPositionUTM = reProjCoordinatesValuesGeoToUTM(markerPosition.lng, markerPosition.lat)
        
        //console.log("CoordenadasProj",reProjCoordinatesData(markerPosition))
        //markerPositionReproj= proj4(WGS84GEO,WGS84UTM,markerPositionArraysOrder)
           //return markerPositionReproj
           
    }
    
    return markerPosition ? (
        
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
         <Card size="small" type="inner" title="Ubicación de Proyecto" style={{marginBottom:10, width:200}} >
            <p><b>Este:</b> {(markerPositionUTM[0].toFixed(3))} m</p>
            <p><b>Norte: </b>{(markerPositionUTM[1].toFixed(3))} m</p>
        </Card>
        <Button block type="primary" onClick={()=>{
            findPoint = findNearestVertex(markerPositionArrays, leafletMap, wfsData)  
                    
            setNearestVertex(findPoint)
            }} >Vértice más cercano</Button>
        </div>
    </Popup>
        {nearestVertex && (
            <Circle
            center={nearestVertex.latlng}
            radius={100}
            pathOptions={{fillColor:'blue'}} >
                
            </Circle>
            
            
        )}
        </Marker>
        
    ) : null
     //console.log(coordinates)
     
}


export default MarkerDblClick;