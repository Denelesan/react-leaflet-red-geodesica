import "leaflet-control-geocoder";
import { useMap } from "react-leaflet";
import L from "leaflet"
import { useEffect, useState } from "react";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const ControlGeocoder = ()=>{
    const map = useMap()
    const [markerPositionResult, setMarkerPositionResult] = useState(null)

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

        geocoder.on("markgeocode", (e)=>{
            const resultPosition = e.geocode.center
            setMarkerPositionResult(resultPosition)
            console.log(e)
            console.log(markerPositionResult)
            const marker = L.marker(markerPositionResult, {
                icon: new L.Icon.Default()
            }).addTo(map);
        })

        map.addControl(geocoder)
        

    }, [map])

    

return null

}

export default ControlGeocoder