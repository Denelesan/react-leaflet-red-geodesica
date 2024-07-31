import L from "leaflet"
//Functión para gestionar la petición y la respuesta desde un servicio WFS

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

//Función para crear marker con evento de doble click en el mapa

    /*
    //var popupUbicacionProyecto 
    var markerDblClick;
    var markerData
    var coordinateGeographicDblClick 

    function createMarkerWithPopup(e){

        // Crear el botón
        var button = document.createElement('button');
        button.id = "button-vertice-cercano";
        button.className = "btn btn-primary";
        button.type = "button";
        button.textContent = "Vértice más cercano";

        // Asignar el evento de clic al botón
        button.addEventListener("click", handleButtonClick);
       
        if (markerDblClick ){
            markerDblClick.off('popupopen'); // Eliminar el evento asociado al abrir el popup
            markerDblClick.off('popupclose'); // Eliminar el evento asociado al cerrar el popup
            markerDblClick.remove(); // Eliminar el marcador del mapa
            markerDblClick = null; // Limpiar la referencia al marcador
            
        }
        
        coordinateGeographicDblClick = e.latlng
        markerData={
            title:"Ubicación del Proyecto",
            ubicacion: `<b>Lat:</b>${coordinateGeographicDblClick.lat} <b>Long:</b>${coordinateGeographicDblClick.lng}`
        }
        var popupUbicacionProyecto = document.createElement('div');
        popupUbicacionProyecto.innerHTML= `
        <div>
            
            <div id="popupUbicacionProyecto">
                <b>${markerData.title}</b>
            </div>
            <p>${markerData.ubicacion}</p>
            
            <div id="button-separator">
            
            </div>
        </div>`;
        popupUbicacionProyecto.querySelector('#button-separator').appendChild(button);
         
        
        markerDblClick = L.marker(coordinateGeographicDblClick)
        markerDblClick.bindPopup(popupUbicacionProyecto)
        markerDblClick.addTo(map)
        markerDblClick.openPopup()
        
                }*/