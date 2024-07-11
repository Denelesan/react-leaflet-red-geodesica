# REACT-LEAFLET-MAPA-RED-GEODESICA
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
- Implementar un banner en el header.
- Conectarse a la data ubicada en un WFS.
- Implementar 3 mapas bases.
- Implementar un componente de markers (vértices)
- Implementar un componente de control de capas.
- Implementar un componente de popup, el cual despliegue valores de la capa en una tabla.
- Implementar un botón en el popup que abra una monografía.
- Implementar un botón para descargar la monografía.
- Implementar un feature que encuentre el vértice más cercano.
- Implementar un componente que busque y se acerque a un vértice.
- Implementar un componente de geocoding para direcciones.

## Non-Goals
- Mejorar diseño original.
- _Implementar al seleccionar una comuna, la posibilidad de descargar todas las monografìas (analizar)_
- Optimizar capa consumida desde geoserver.

## Background
- Como Sección, actualmente no disponemos con mapas web que puedan mostrar la información espacial que contamos, es por ello que me encuentro desarrollando distintos mapas web, con el fin de implementar una serie de mapas con funcionalidades y características específicas.
- A raiz de las solicitudes de monografías realizadas por correos, se cree que el mapa de vértices geodésicos es uno de los más necesarios, ya que sería de gran ayuda para los profesionales externos, poniendo a disposición información vértices geodésicos para la vinculación de las labores topográficas y geodésicas de los distintos proyectos de pavimentación en la Región Metropolitana.
-  Dado que actualmente estoy usando más React, he decidido aprovechar de implementar un proyecto de mapa web en React-Leaflet.
- La data principal se consumirá desde un servidor de mapa (_geoserver_), el cual permite conectarse a la data mediante un servicio llamado _Web Feature Services_ (WFS) en tiempo real.

![leaflet](./src/images/design-doc/leaflet.png)

## Detailed Design
_Usa diagramas donde veas necesario_

_Herramientas como [Excalidraw](https://excalidraw.com) son buenos recursos para esto_

Los cambios principales:

- Se utilizará para el diseño (IU) la librería de React [ant desing](https://ant.design/)
- Se deberá programar nuevamente el popup para implementar librería de diseñó.
- Crear componentes para la capa principal de data, control layer, popup, monografía, controles de búsqueda (vértices y calles).
- Nuevos plugins que funcionen en React: geocoding, busqueda y zoom a capa, esto se buscarán en [npm](https://www.npmjs.com) 

 Código que puede ser reusable?:
 - Se reutilizarán las funciones de buscar vértice más cercano, fetch para conectar con data en *WFS*.
 - Se reutilizarán los mapas bases (3).
 - Código relativo a los archivos de monografía, se consumirá y descargará de la misma manera que en leaflet.



## Solution 1
### Frontend
_Frontend…_
### Backend
_Backend…_

## Consideraciones
_Preocupaciones / trade-offs / tech debt_

## Métricas
_Que información necesitas para validar antes de lanzar este feature?_
