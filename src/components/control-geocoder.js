import "leaflet-control-geocoder";
import { Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet"
import { useEffect, useRef, useState } from "react";
import { Card } from "antd";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const ControlGeocoder = ()=>{
    const map = useMap()
    const [markerPositionResult, setMarkerPositionResult] = useState(null)
    const [nameResult, setNameResult] = useState()
    const markerRef = useRef(null)

    map.on("click", (e)=>{
        setMarkerPositionResult(null)
        
    })

    useEffect(()=>{

        if (!map) return;

        const geocoder = new L.Control.geocoder({
            placeholder:"Ingresa tu dirección",
            position:"topright",
            defaultMarkGeocode: false,
            collapsed: false
        })

        console.log(geocoder)
        geocoder.on("markgeocode", (e)=>{
            const resultPosition = e.geocode.center
            const resultName = e.geocode.name
            console.log("resultPosition", resultPosition)
            
            if (resultPosition){
                setMarkerPositionResult(resultPosition)
                setNameResult(resultName)
                map.setView(resultPosition, map.getZoom())
                map.flyTo(resultPosition, 17)
                map.removeControl(geocoder)
                map.addControl(geocoder)
            }
            
            /*const marker = L.marker(resultPosition, {
                icon: new L.Icon.Default()
            });*/
        })
        
        map.addControl(geocoder)
        
        
        

    }, [map])

    useEffect(()=>{
        if(markerRef.current){
            markerRef.current.openPopup()
        }

    },[markerPositionResult])

return markerPositionResult ? 
<Marker
key={String(markerPositionResult.lat)}
position={markerPositionResult}
ref={markerRef}
//icon={blueIcon}
>
    <Popup >
        <>
        <Card size="small" bordered={false}>
        <p style={{fontSize:10}}>{nameResult}</p>
        </Card>
        </>
        </Popup>
</Marker>
:null

}

export default ControlGeocoder