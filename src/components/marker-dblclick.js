import { useEffect, useState, useRef, isValidElement } from "react";
import { Marker, LayerGroup, useMap, Popup, Circle} from "react-leaflet"
import Card from "antd/es/card/Card";
import blueIcon from "../icon/blueIcon";
import L from "leaflet"
import { Button } from "antd";
import proj4 from "proj4";
import { findNearestVertex } from "../utils/functions/all-functions";

const WGS84UTM = "EPSG:32719"
const GEO = "EPSG:3857"
const WGS84GEO="EPSG:4326"
proj4.defs(GEO,"+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs +type=crs")
proj4.defs(WGS84UTM,"+proj=utm +zone=19 +south +datum=WGS84 +units=m +no_defs +type=crs");
proj4.defs(WGS84GEO,"+proj=longlat +datum=WGS84 +no_defs +type=crs");



const MarkerDblClick = ({isActive, wfsData})=>{
    const [nearestVertex, setNearestVertex] = useState(null)
    
    let findPoint;
    const [refReady, setRefReady] = useState(false);
    let popupRef = useRef()
    const [markerPosition, setMarkerPosition] = useState(null)
    const leafletMap = useMap()
    leafletMap.doubleClickZoom.disable()

    leafletMap.on("dblclick",(e)=>{
        setMarkerPosition(e.latlng)
        //const markerPositionReproj = proj4(WGS84GEO, WGS84UTM, markerPosition)
        
    })
    leafletMap.on("click",(e)=>{
        setMarkerPosition(null)
        setRefReady(false)
        
    })
    
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
    var markerPositionReproj=[];
    var markerPositionArrays=[]
    var markerPositionArraysOrder=[]
    if (markerPosition){
            markerPositionArrays = Object.values(markerPosition)
           markerPositionArraysOrder = [markerPositionArrays[1], markerPositionArrays[0]]
           markerPositionReproj= proj4(WGS84GEO,WGS84UTM,markerPositionArraysOrder)
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
            <p><b>Este:</b> {(markerPositionReproj[0].toFixed(3))} m</p>
            <p><b>Norte: </b>{(markerPositionReproj[1].toFixed(3))} m</p>
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
            pathOptions={{fillColor:'blue'}} />
        )}
        </Marker>
        
    ) : null
     //console.log(coordinates)
        
}


export default MarkerDblClick;