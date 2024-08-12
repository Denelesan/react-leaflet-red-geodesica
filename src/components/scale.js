import L from "leaflet"
import { useEffect } from "react"
import { useMap } from "react-leaflet"

const Scale = () =>{
    const map = useMap()
    
    useEffect(()=>{
        if (!map)return;
        const Scale = new L.control.scale({
            imperial:false,
            maxWidth: 200,
            })
        
        Scale.addTo(map)
        //map.addControl(Scale)

        
        
    },[map])

    return null
}

export default Scale