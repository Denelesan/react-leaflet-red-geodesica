import { useEffect, useState } from "react";
import { LayerGroup, LayersControl, Marker, Popup, Tooltip, useMap } from "react-leaflet";
import defaultIcon from "../icon/defaultIcon";
import proj4 from "proj4";
import { Button, Card, Result, Table } from "antd";
import MonografiaVertice from "./monografia-vertice";



const WGS84UTM = "EPSG:32719"
const GEO = "EPSG:3857"
const WGS84GEO="EPSG:4326"
proj4.defs(GEO,"+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs +type=crs")
proj4.defs(WGS84UTM,"+proj=utm +zone=19 +south +datum=WGS84 +units=m +no_defs +type=crs");
proj4.defs(WGS84GEO,"+proj=longlat +datum=WGS84 +no_defs +type=crs");


const PopupMarker = ({feature})=>{
    const [columns, setColumns] = useState([
        {
        title: "Propiedad",
        dataIndex: "propiedad",
        key: "propiedad",
        render: (text)=><b>{text}</b>
        //rowScope: 'row'
        },
        {
            title: "Valor",
            dataIndex: "valor",
            key:"valor"
        },
    ])

    const [isModalOpen, setIsModalOpen] = useState(false)

    const showModal = ()=>{
        setIsModalOpen(true)
    }
    const hideModal = ()=>{
        console.log("cancel")
        setIsModalOpen(false)
    }
    
     
    const newRows= []
    const list = feature.properties
    const attributesFilter = ["Nombre Vértice","Estado","Este","Norte","Cota NMM","Altura Elipsoidal","Altura Geoidal","Sistema de Referencia"]
    const newNamesAttributes = {
        "nombre_punto":"Nombre Vértice",
        "estado": "Estado",
        "este":"Este",
        "norte": "Norte",
        "cota_nmm": "Cota NMM",
        "altura_elipsoidal": "Altura Elipsoidal",
        "altura_geoidal": "Altura Geoidal",
        "sistema_referencia": "Sistema de Referencia"
    }
    const listWithNewNamesAttributes= Object.entries(list).reduce((newObject,[clave,valor])=>{
        const newName = newNamesAttributes[clave] || clave
        newObject[newName] = valor;
        return newObject
      },{})
    const keys = Object.keys(listWithNewNamesAttributes).filter(key=>attributesFilter.includes(key))
      
      keys.forEach(elemento=>{
    const row = {
            propiedad:elemento,
            valor:listWithNewNamesAttributes[elemento],
            key:elemento
    }
    newRows.push(row)
    
    
    //console.log(elemento + " tiene el valor de "+ list[elemento])
})
   
    //const dataSource = [feature.properties]
    const dataSource = newRows

    

    
    return (
        <div>
            
                <Table style={{marginBottom:10}}
                    pagination={false}
                    size="small"
                    columns={columns} 
                    dataSource={dataSource}>
                </Table>
                <Button  block type="primary" onClick={showModal}>Monografía</Button>
                <MonografiaVertice nombrePunto={feature.properties.nombre_punto} visible={isModalOpen} hideModal={hideModal}/>
        </div>
    )
}


const GeodeticMarkerLayer = ({wfsData})=>{
    const map = useMap()
    const [zoom, setZoom] = useState(null)
    const [data, setData] = useState(null)
    map.on("zoom",(e)=>{
        if (e.target._zoom > 13){
            setZoom(true)
        }else{
            setZoom(null)
        }
    })

    useEffect(()=>{
        setData(wfsData)//ESTO HAY QUE COMENTAR CUANDO SE RESUELVA EL GEOSERVER Y DESCOMENTAR LO DE ABAJO
        /*wfsData
        .then(data=>{
            setData(data);
        })
        .catch(error =>{
            console.error("Error al traer WFS Data", error)
        })*/
    },[wfsData])

        if (!data){
            return <div>...Loading</div>
        }
       
        const layer = data.features.map((feature)=>{
            const name = feature.properties.nombre_punto
            const {coordinates} = feature.geometry
            //const reProjCoordinates = proj4(WGS84UTM, WGS84GEO, coordinates)
            
            return (
                <Marker
                key={String(coordinates)} 
                position={[coordinates[1], coordinates[0]]}
                icon={defaultIcon}
                >{zoom &&
                (<Tooltip direction={"top"} offset={[-25, 10]} permanent={true}><b>{name}</b></Tooltip>)}
                    <Popup>
                       <PopupMarker feature={feature}></PopupMarker>
                    </Popup>
                </Marker>
        
                )
        
            }
            )        
        
    return (
       <LayersControl.Overlay checked name="Red Geodésica">
        <LayerGroup>{layer}</LayerGroup>
       </LayersControl.Overlay>

    )
}

export default GeodeticMarkerLayer

