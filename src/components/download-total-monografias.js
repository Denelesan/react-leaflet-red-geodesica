import { Alert, Button, Modal } from "antd";
import ReactDOM from 'react-dom'
import { DomUtil, latLng } from "leaflet";
import { Control } from "leaflet";
import { unmountComponentAtNode } from "react-dom";
import {DownloadOutlined} from "@ant-design/icons"
import { createControlComponent } from '@react-leaflet/core'
import L from "leaflet"
import { useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import JSZip from 'jszip'
import { blobImage, capitalizeWord } from "../utils/functions/all-functions"
import { saveAs } from 'file-saver'; 


/*
const node = DomUtil.create("div")

Control.DownloadTotalMonografias = Control.extend({
    options:{
        position:"topright"
    },
    onAdd: function(map){
        const {getDataFilter} = this.options
        const commonProps ={
            className:'leaflet-control-layers',
            style:{width:'35px', height:'35px'}
        }
        const root = ReactDOM.createRoot(node)
        root.render(
            <div className="download-total-monografias">
                <Button title="Fit to World"
                {...commonProps}
                icon={<DownloadOutlined style={{color:"blue"}}/>}
                onClick={()=>{
                console.log("Prueba:"+ getDataFilter)
                }
                }
                >

                </Button>

            </div>
        )
        return node
    }
})

export const DownloadTotalMonografias = createControlComponent(
    (props)=> new Control.DownloadTotalMonografias(props)
)*/

const DownloadTotalMonografias = ({getComunaFilter,getDataFilter})=>{
    
    const styleDefault = {
        width:'35px', 
        height:'35px', 
        zIndex:'500',
        position:'absolute',
        right:'10px', 
        top:'115px',
        transition: "none"}
    const [style, setStyle] = useState(
        styleDefault
    )
    const [disableButton, setDisableButton] = useState(true)
    const [messageError, setMessageError] = useState()

    const comunaFilter = getComunaFilter()
    const dataFiltered = getDataFilter()

    useEffect(()=>{
        
        if(comunaFilter && dataFiltered.length < 200){
            setDisableButton(false)
        }
        else {
            
            setDisableButton(true)
        }
        
    },[comunaFilter, dataFiltered])
    
    useEffect(()=>{
    const layersControlContainer = document.querySelector(".leaflet-control-layers")

    if (layersControlContainer){
        layersControlContainer.addEventListener("mouseenter", ()=>{
            setStyle({
                width:'35px', 
                height:'35px', 
                zIndex:'500',
                position:'absolute',
                right:'10px', 
                top:'215px',
                transition: "none"})
        })
        layersControlContainer.addEventListener("mouseleave", ()=>{
            
            setStyle(styleDefault)
        })
    }
    },[])
    
    return (
        
        <Button
            title="Descargar Total Monografías"
            className="leaflet-control-layers"
            style={style}
            disabled={disableButton}
            icon={<DownloadOutlined/>}
            onClick={async ()=>{
                    const zip = new JSZip()
                    let comunaName = capitalizeWord(comunaFilter.properties.comuna_nom)
                    let arrayDate = Object.values(dataFiltered)
                    
                    for (let element of arrayDate) {
                        let namePoint = element.properties.nombre_punto
                        let imagenPunto = `monografias/${namePoint}.jpg`
                        try {
                            const response = await blobImage(imagenPunto)
                            
                            zip.file(`${namePoint}.jpg`,response)
                            
                            
                        }
                        catch (error){
                            console.log(`Error al descargar la imagen de vértice ${namePoint}:`, error)
                            /*Modal.error({
                                title: 'Error',
                                content: "Ocurrió un error al generar el archivo ZIP de Monografías",
                            });*/
                        }
                        
                        

                    };

                    zip.generateAsync({type:'blob'}).then((content)=>{
                        if(content.size > 25){
                            saveAs(content, `Monografías-${comunaName}.zip`) 
                            setMessageError("El archivo ZIP se generó correctamente")
                            Modal.success({
                                title: 'Error',
                                content: `El archivo ZIP de Monografías de la comuna de ${comunaName} se generó correctamente`,
                            });
                        }else{
                            setMessageError("Ocurrió un error al generar el archivo ZIP")
                            Modal.error({
                                title: 'Error',
                                content: `Ocurrió un error al generar el archivo ZIP de Monografías de la comuna de ${comunaName}`,
                            });
                        }
                        
                    })
                    
                    
                }
            }>
                
        </Button>
        
        
    )
}
export default DownloadTotalMonografias