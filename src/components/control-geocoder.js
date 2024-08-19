import "leaflet-control-geocoder";
import { useMap } from "react-leaflet";
import L from "leaflet"
import { useEffect } from "react";


const ControlGeocoder = ()=>{
    const map = useMap()

    useEffect(()=>{

        if (!map) return;
        const geocoder = new L.Control.geocoder({
            placeholder:"Ingresa tu dirección",
            position:"topright"
        })

        map.addControl(geocoder)

    }, [map])

    

return null

}

export default ControlGeocoder