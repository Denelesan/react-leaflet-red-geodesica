import { Button } from "antd";
import ReactDOM from 'react-dom'
import { DomUtil, latLng } from "leaflet";
import { Control } from "leaflet";
import { unmountComponentAtNode } from "react-dom";
import {BorderInnerOutlined, BorderOuterOutlined} from "@ant-design/icons"
import { createControlComponent } from '@react-leaflet/core'
import L from "leaflet"



const node = DomUtil.create("div")

Control.FitBoundToWorldControl = Control.extend({
    options:{
        position:"topright"
    },
    onAdd: function(map){
        const commonProps ={
            className:'leaflet-control-layers',
            style:{width:'35px', height:'35px'}
        }
        const root = ReactDOM.createRoot(node)
        root.render(
            <div className="fit-bounds-control-container">
                <Button title="Fit to World"
                {...commonProps}
                icon={<BorderOuterOutlined/>}
                onClick={()=>{
                map.setView(
                    L.latLng(-33.45, -70.65),
                    10
                )}
                }
                >

                </Button>

            </div>
        )
        return node
    }
})

export const FitBoundToWorldControl = createControlComponent(
    (props)=> new Control.FitBoundToWorldControl(props)
)