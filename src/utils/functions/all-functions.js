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

// FUNCION DE VERTICE MAS CERCANO
   //var puntoMasCercano
   
export function findNearestVertex(coord, map, data) {
    const geoJsonLayer = L.geoJSON(data,{
        pointToLayer: function(coords){
            let coordinatesUTM = coords.geometry.coordinates
            let coordinatesGEOInverse = proj4(WGS84UTM, WGS84GEO, coordinatesUTM)
            let coordinatesGEO = [coordinatesGEOInverse[1], coordinatesGEOInverse[0]]
            return L.marker(coordinatesGEO )
        }
    })
    const layers = Object.values(geoJsonLayer._layers)
    const coordObject = L.latLng(coord)
    console.log(layers)
    console.log(coordObject)
    var puntoMasCercano = GeometryUtil.closestLayer(map, layers, coordObject)
    console.log(puntoMasCercano, coord, map, data.features)
    /*var vertexLocationFound;
    var markerVertexLocationFound;
        if(vertexLocationFound){
            vertexLocationFound.remove()
            markerVertexLocationFound.remove()
        }
        var puntoMasCercano = L.GeometryUtil.closestLayer(map, data.getLayers(), coord)
        vertexLocationFound = L.circle(puntoMasCercano.latlng, {radius:100})
        console.log(puntoMasCercano)
        markerVertexLocationFound = L.marker(puntoMasCercano.latlng,{icon:L.divIcon({className:'marker-transparent'})})
        var textLocationFound = `<b>${puntoMasCercano.layer.feature.properties.nombre_punto}</b>`
        
        
        markerVertexLocationFound.addTo(map)
        markerVertexLocationFound.bindTooltip(textLocationFound,{ permanent: true, className: "map-label", offset: [20, 0] }).openTooltip()
        vertexLocationFound.addTo(map)
        //rutaMasCercana( puntoMasCercano.latlng,coord)
        map.flyTo(puntoMasCercano.latlng, 17)*/

    }