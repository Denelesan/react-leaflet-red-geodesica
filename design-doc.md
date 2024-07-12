# DESIGN DOC TO MAKE A WEB MAP IN REACT-LEAFLET
Link: [Link a este design doc](#)

Author(s): Daniel Paredes Villalobos

Status: [~~Draft~~, Ready for review, In Review, Reviewed]

Ultima actualización: 2024-07-10

## Contenido
- Goals
- Non-Goals
- Background
- Overview
- Detailed Design
  - Solucion 1
    - Frontend
    - Backend
  - Solucion 2
    - Frontend
    - Backend
- Consideraciones
- Métricas

## Links
- [Un link](#)
- [Otro link](#)

## Objetivo

- Migrar un proyecto de web map realizado en Leaflet a React-leafet, migrando el 100% de sus funcionalidades, plugins, conexiones y diseño web.

- Contar con un webmap realizado en base a un framework como ReactJS, con el fin de, en el futuro, analizar mejoras de funcionamiento aprovechando el manejo de sus estados.

- Poner en práctica lo aprendido sobre react-leaflet.

- Evaluar, al final del proyecto, la continuidad de futuros mapas utilizando React.


## Goals
- Implementar 3 mapas bases.
- Implementar capa espacial de vértices.
- Soportar un control de capas.
- Soportar un popup a cada vértice.
- Soportar desplegar la monografía de cada vértice.
- Implementar un feature que encuentre el vértice más cercano.
- Soportar un buscador de vértices.
- Soportar un buscador de direcciones (geocoding)

## Non-Goals
- Mejorar diseño original.
- _Implementar al seleccionar una comuna, la posibilidad de descargar todas las monografìas (analizar)_
- Optimizar capa consumida desde geoserver.

## Background
- Como equipo, actualmente no disponemos con mapas web que puedan mostrar la información espacial que contamos, es por ello que me encuentro desarrollando distintos mapas web, con el fin de implementar una serie de mapas con funcionalidades y características específicas.
- A raiz de las solicitudes de monografías realizadas por correos, se cree que el mapa de vértices geodésicos es uno de los más necesarios, ya que sería de gran ayuda para los profesionales externos, poniendo a disposición información vértices geodésicos para la vinculación de las labores topográficas y geodésicas de los distintos proyectos de pavimentación en la Región Metropolitana.
-  Dado que actualmente estoy usando más React, he decidido aprovechar de implementar un proyecto de mapa web en React-Leaflet.
- La data principal se consume desde un servidor de mapa (_geoserver_), el cual permite conectarse a la data mediante un servicio llamado _Web Feature Services_ (WFS) en tiempo real.

![leaflet](./src/images/design-doc/leaflet.png)

## Detailed Design

En la vista 1, se puede ver la estructura principal del web map.
![Alt text](image.png)


En la vista 2, se detalla la vista con el popup correspondiente, cuyo interior va un botón que permitirá abrir la monografía del vértice
![Alt text](image-1.png)

En la vista 3, se detalla la monografía del vértice seleccionado al costado derecho. En su interior, un botón para descargar la imagen de la monografía.
![Alt text](image-2.png)

Los cambios principales:

- Se utilizará para el diseño (IU) la librería de React [ant desing](https://ant.design/)
- Se deberá programar nuevamente el popup para implementar librería de diseñó.
- Crear componentes para la capa principal de data, control layer, popup, monografía, controles de búsqueda (vértices y calles).
- Nuevos plugins que funcionen en React: geocoding, búsqueda y zoom a capa, esto se buscarán en [npm](https://www.npmjs.com) 

 Código que puede ser reusable?:
 - Se reutilizarán las funciones sobre búsqueda de vértice más cercano y fetch para conectar con data en *WFS*.
 - Se reutilizarán los mapas bases (3).
 - Código relativo a los archivos de monografía, se consumirá y descargará de la misma manera que en leaflet.


## Solución de Migración Web Map en React-leaflet
### Fetch a data en WFS
```javascript
function fetchWFSData(url, layerName){
        fetch(url,{
            method:'GET',
            mode: 'cors'
        })
        .then(function(response){
            if(response.status ==200){
                
                return response.json(response)
            } else{
                throw new Error ("Fetch API could not fetch the data")
            }
        })
        .then (function(geojson){
            addWFSData(geojson,layerName)
        })
        .catch(function(error){
            console.log(error)
        })
    }

```
### Función para encontrar vértice más cercano
Se reciclará la misma función utilizada en Leaflet. Analizar mejor o inclusión de un componente:
```javascript 
  var vertexLocationFound;
   var markerVertexLocationFound;
    function findNearestVertex(coord) {
        if(vertexLocationFound){
            vertexLocationFound.remove()
            markerVertexLocationFound.remove()
        }
        var puntoMasCercano = L.GeometryUtil.closestLayer(map, WFSLayer.getLayers(), coord)
        vertexLocationFound = L.circle(puntoMasCercano.latlng, {radius:100})
        console.log(puntoMasCercano)
        markerVertexLocationFound = L.marker(puntoMasCercano.latlng,{icon:L.divIcon({className:'marker-transparent'})})
        var textLocationFound = `<b>${puntoMasCercano.layer.feature.properties.nombre_punto}</b>`
        
        
        markerVertexLocationFound.addTo(map)
        markerVertexLocationFound.bindTooltip(textLocationFound,{ permanent: true, className: "map-label", offset: [20, 0] }).openTooltip()
        vertexLocationFound.addTo(map)
        //rutaMasCercana( puntoMasCercano.latlng,coord)
        map.flyTo(puntoMasCercano.latlng, 17)

    }
  
    function rutaMasCercana (ubicacionProyecto, verticeMasCercano){
        L.Routing.control({
            waypoints: [
                ubicacionProyecto,
                verticeMasCercano
            ],
            routeWhileDragging: true,
            showAlternatives: true,
            altLineOptions: {
                      styles: [
                            {color: 'black', opacity: 0.2, weight: 9},
                            {color: 'white', opacity: 0.8, weight: 6},
                            {color: 'blue', opacity: 0.5, weight: 2}
    ]
                      },
          }).addTo(map);

    }
```
### Plugins
#### Buscador de elemento en capa
Existe un plugin en npm para instalar, es el mismo utilizado en leaflet [*Leaflet Control Search*](https://www.npmjs.com/package/leaflet-search) 
```
npm i leaflet-search
```
#### Buscador de direcciones
Se utilizará el plugin [*leaflet-control-geocoder*](https://www.npmjs.com/package/leaflet-control-geocoder), también al parecer que es la misma librería.
```
npm i leaflet-control-geocoder
``` 

####

## Consideraciones
_Preocupaciones / trade-offs / tech debt_

## Métricas
_Que información necesitas para validar antes de lanzar este feature?_
