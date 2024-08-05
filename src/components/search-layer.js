import "leaflet-search/src/leaflet-search";
import L from "leaflet"
import { useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import proj4 from "proj4"

const WGS84UTM = "EPSG:32719"
const GEO = "EPSG:3857"
const WGS84GEO="EPSG:4326"
proj4.defs(GEO,"+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs +type=crs")
proj4.defs(WGS84UTM,"+proj=utm +zone=19 +south +datum=WGS84 +units=m +no_defs +type=crs");
proj4.defs(WGS84GEO,"+proj=longlat +datum=WGS84 +no_defs +type=crs");

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
    
    useEffect(()=>{
        if (wfsData.wfsData){
            let data = wfsData.wfsData

            const dataLeaflet = L.geoJSON(data,{pointToLayer: function(coords){
                let coordinatesUTM = coords.geometry.coordinates
                let coordinatesGEOInverse = proj4(WGS84UTM, WGS84GEO, coordinatesUTM)
                let coordinatesGEO = [coordinatesGEOInverse[1], coordinatesGEOInverse[0]]
                return L.marker(coordinatesGEO,{icon:invisibleIcon} )
            }})

            const controlSearch = new L.Control.Search({
                position: "topleft",
                textPlaceholder: "Busca un vértice Geodésico",
                layer: dataLeaflet,
                propertyName: 'nombre_punto',
                initial:false,
                zoom:18,
                marker:false
            })

            map.addControl(controlSearch)

            return ()=>{
                map.removeControl(controlSearch)
            }

        }

    },[map, wfsData]);

    return null
}

export default SearchLayerControl