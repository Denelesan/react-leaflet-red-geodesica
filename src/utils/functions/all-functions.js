import L from "leaflet"
import GeometryUtil from "leaflet-geometryutil"
import proj4 from "proj4"
//Functión para gestionar la petición y la respuesta desde un servicio WFS

const WGS84UTM = "EPSG:32719"
const GEO = "EPSG:3857"
const WGS84GEO="EPSG:4326"
proj4.defs(GEO,"+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs +type=crs")
proj4.defs(WGS84UTM,"+proj=utm +zone=19 +south +datum=WGS84 +units=m +no_defs +type=crs");
proj4.defs(WGS84GEO,"+proj=longlat +datum=WGS84 +no_defs +type=crs");

export function fetchWFSData(url){
    return fetch(url,{
        method:'GET',
        mode: 'cors'
    })
    .then(response=>{
        if(response.status ===200){
            
            return response.json()
        } else{
            throw new Error ("Fetch API could not fetch the data")
        }
    })
    .catch(function(error){
        
        console.log(error);
        throw error; 
    })
}
//Función para reproyectar coordenadas a un objeto
export function reProjCoordinatesDataToGeo(data){
    const layer = data.features.map((feature)=>{        
        const {coordinates} = feature.geometry
        const reProjCoordinates = proj4(WGS84UTM, WGS84GEO, coordinates)
        return {
            ...feature,
            geometry:{
                ...feature.geometry,
                coordinates:reProjCoordinates
            }
        }    
       
    })
    return {...data,
        features:layer}
}

//Función para reproyectar coordenadas sólo valores

export function reProjCoordinatesValuesGeoToUTM(lng, lat){
    let arrayCoordinates = [lng, lat]
    return proj4(WGS84GEO,WGS84UTM, arrayCoordinates)
}
// FUNCION DE VERTICE MAS CERCANO
   //var puntoMasCercano
   
export function findNearestVertex(coord, map, data) {
 
        const geoJsonLayer = L.geoJSON(data,{
        })
        const layers = Object.values(geoJsonLayer._layers)
        const coordObject = L.latLng(coord)
        
        var puntoMasCercano = GeometryUtil.closestLayer(map, layers, coordObject)
        map.flyTo(puntoMasCercano.latlng, 17)
        console.log("puntomascercano",puntoMasCercano.latlng)
        return puntoMasCercano
    
    
    }


export async function downloadImage (fileURL, fileName){
    
        try{
            const response = await fetch (fileURL);
            

            if(!response.ok){
                throw new Error("No se encontró la imagen")
            }
        
            
        const contentType = response.headers.get('Content-Type')

        if (!contentType || !contentType.startsWith('image/')){
            throw new Error (`Tipo de contenido inesperado: ${contentType}`)
        }

        const blob = await response.blob()
        const link = document.createElement('a');
        //console.log("fileName:"+fileName)
        link.href = URL.createObjectURL(blob);
        link.download = fileName
        //console.log("link:"+link);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        return { success: true, message: `Imagen ${fileName} descargada correctamente.` };
    }

    catch (error){
        console.error(error)

        throw error
    }
      
}

export async function blobImage (fileURL){
    
    try{
        const response = await fetch (fileURL);
        

        if(!response.ok){
            throw new Error("No se encontró la imagen")
        }
    
        
    const contentType = response.headers.get('Content-Type')

    if (!contentType || !contentType.startsWith('image/')){
        throw new Error (`Tipo de contenido inesperado: ${contentType}`)
    }

    const blob = await response.blob()

    return blob;
}

catch (error){
    console.error(error)

    throw error
}
  
}

export function capitalizeWord (text){
    return text.toLowerCase() //"Convertimos todas las palabras en mayúsculas"
            .split(' ') //Separamos el texto en razón de los espacios
            .map(word=>word.charAt(0).toUpperCase()+word.slice(1)) //Por cada palabra concatenamos, la selección de la primera letra transformada en mayúscula con el resto de la palabra.
            .join(' ') //unimos nuevamente las palabras separadas por un espacio

}