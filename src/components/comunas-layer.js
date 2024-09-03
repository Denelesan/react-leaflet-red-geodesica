import { click } from "@testing-library/user-event/dist/click"
import { useEffect, useState } from "react"
import { LayersControl, GeoJSON, LayerGroup } from "react-leaflet"



export const ComunasLayer = ({data, setComunaFilter, getComunaFilter, getDataFilter})=>{
    const dataFilter = getDataFilter()
    const comunaFilter = getComunaFilter()
  
    const layer = <GeoJSON key={'geo-json-layer'}
    data={data}
    eventHandlers={
        {click:(e)=>{
            
            setComunaFilter((prevState)=>{
                const sameState = prevState === e.propagatedFrom.feature
                return sameState ? null : e.propagatedFrom.feature
            })
            
            //console.log(e.layer.feature.properties.comuna_nom)
            //setSelect(e.layer.feature.properties.comuna_nom)
        }}
    }
    style={feature=>{
        return{
            
            color: comunaFilter === feature ? "red" : "blue",
            weight:0.5,
            fillOpacity:0.10
        }
    }}>

    </GeoJSON>


    return (
    <LayersControl.Overlay name="Comunas">
        <LayerGroup>{layer}</LayerGroup>
    </LayersControl.Overlay>

    )
}

export default ComunasLayer