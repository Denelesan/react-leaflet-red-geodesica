import "leaflet-search/src/leaflet-search";
import L from "leaflet"
import { Circle, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { floatButtonPrefixCls } from "antd/es/float-button/FloatButton";



 // Definir un ícono completamente invisible
 const invisibleIcon = L.icon({
    iconUrl: 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=',
    iconSize: [0, 0], // Establece el tamaño del ícono a 0
    iconAnchor: [0, 0], // Ajusta el punto de anclaje
    popupAnchor: [0, 0], // Ajusta el punto de anclaje del popup
    shadowSize: [0, 0], // Sin sombra
  });
/*
const SearchLayerControl =(data)=>{

    const map = useMap()
    const [layer, setLayer] = useState(null)
    
    useEffect(()=>{
        console.log(data.data)
        if (!map) return;
        if (data && data.data){
            let dataFormat = data.data
            const dataLeaflet = L.geoJSON(dataFormat,{pointToLayer: function(coords){
                let coordinatesUTM = coords.geometry.coordinates
                let coordinatesGEOInverse = proj4(WGS84UTM, WGS84GEO, coordinatesUTM)
                let coordinatesGEO = [coordinatesGEOInverse[1], coordinatesGEOInverse[0]]
                return L.marker(coordinatesGEO )
            }
            
        })
        
        console.log(dataLeaflet)
        setLayer(dataLeaflet)

        
        const searchLayer = new  L.Control.Search({
            position:'topleft',
            textPlaceholder: "Busca un vértice Geodésico",
            layer: dataLeaflet,
            propertyName:"nombre_punto",
            initial: false,
            marker:false
        }).addTo(map)

        //layer.addTo(map)
        
        return ()=> {map.removeControl(searchLayer)
                map.removeLayer(dataLeaflet)
        }
    }
    },[map, data])

    

    return null;                
       
}
*/
const SearchLayerControl =(wfsData)=>{
    const map = useMap()
    console.log(wfsData)
    const [circle, setCircle] = useState(null)
    const [foundPosition, setFoundPosition] = useState(null)

    map.on("click",(e)=>{
        setFoundPosition(null)
        
        //setRefReady(false)
        
    })
    useEffect(()=>{
        if (!map) return;

        if (wfsData.wfsData){
            let data = wfsData.wfsData
            console.log("searchdata",data)
            const dataLeaflet = L.geoJSON(data,{pointToLayer: (coords)=>{
                let coordinatesGEO = coords.geometry.coordinates                
                coordinatesGEO = [coordinatesGEO[1], coordinatesGEO[0]]
                return L.marker(coordinatesGEO,{icon:invisibleIcon} )
            }})
            console.log("dataleaflet",dataLeaflet)
            const controlSearch = new L.Control.Search({
                position: "topleft",
                textPlaceholder: "Busca un vértice Geodésico",
                layer: dataLeaflet,
                propertyName: 'nombre_punto',
                initial:false,
                zoom:18,                
                collapsed:false,
                marker: false
                
            })

            map.addControl(controlSearch)            
            dataLeaflet.addTo(map);

            controlSearch.on('search:locationfound', (e)=>{
                let lat = e.latlng.lat
                let lng = e.latlng.lng
                let coordinates = {lat, lng}
                
                setFoundPosition(coordinates)
                if(foundPosition){
                    setFoundPosition(null)
                    setFoundPosition(coordinates)
                }
                else{
                //setFoundPosition(coordinates)
                console.log("locationFound",coordinates)
                console.log("FoundPosition",foundPosition)
                }
                
            })
            
            return ()=>{
                map.removeControl(controlSearch)
            }

        }

    },[map, wfsData]);

    return foundPosition ? <Circle
    center={foundPosition}
    radius={100}
    pathOptions={{fillColor:'blue'}}
    >
</Circle>:null
}

export default SearchLayerControl
/*
*/