import { click } from "@testing-library/user-event/dist/click"
import { hover } from "@testing-library/user-event/dist/hover"
import { Button, Col } from "antd"
import { useEffect, useState } from "react"
import { LayersControl, GeoJSON, LayerGroup, Popup } from "react-leaflet"



export const ComunasLayer = ({data, setComunaFilter, getComunaFilter, getDataFilter})=>{
    
    const comunaFilter = getComunaFilter()
    
    const layer = <GeoJSON key={'geo-json-layer'}
    data={data}
    eventHandlers={
        {click:(e)=>{
            //const dataFilter = getDataFilter()
            setComunaFilter((prevState)=>{
                const sameState = prevState === e.propagatedFrom.feature
                return sameState ? null : e.propagatedFrom.feature
            })
            
            //console.log(e.layer.feature.properties.comuna_nom)
            //setSelect(e.layer.feature.properties.comuna_nom)
        },
        mouseover:(e)=>{
            
            e.propagatedFrom.setStyle({color:comunaFilter === e.propagatedFrom.feature ? "yellow" : "red",
            weight:0.5,
            fillOpacity:0.10})
        },
        mouseout:(e)=>{
        
            e.propagatedFrom.setStyle({color:comunaFilter === e.propagatedFrom.feature ? "yellow" : "blue",
            weight:0.5,
            fillOpacity:0.10})
        }}
    }
    style={feature=>{
        
        return{
            color: comunaFilter === feature ? "yellow" : "blue",
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