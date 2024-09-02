import { click } from "@testing-library/user-event/dist/click"
import { useState } from "react"
import { LayersControl, GeoJSON, LayerGroup } from "react-leaflet"



export const ComunasLayer = ({data})=>{
    const [select, setSelect] = useState(false)
    const layer = <GeoJSON key={'geo-json-layer'}
    data={data}
    eventHandlers={
        {click:(e)=>{
            setSelect((prevState)=>{
                const sameState = prevState === e.propagatedFrom.feature
                return sameState ? null : e.propagatedFrom.feature
            })
            
            //console.log(e.layer.feature.properties.comuna_nom)
            //setSelect(e.layer.feature.properties.comuna_nom)
        }}
    }
    style={feature=>{
        return{
            
            color: select === feature ? "red" : "blue",
            weight:0.5,
            fillOpacity:0.10
        }
    }}>

    </GeoJSON>


    return (
    <LayersControl.Overlay name="Comunas" checked>
        <LayerGroup>{layer}</LayerGroup>
    </LayersControl.Overlay>

    )
}

export default ComunasLayer