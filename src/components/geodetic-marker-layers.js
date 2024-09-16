import { useEffect, useMemo, useRef, useState } from "react";
import { LayerGroup, LayersControl, Marker, Popup, Tooltip, useMap } from "react-leaflet";
import defaultIcon from "../icon/defaultIcon";
import proj4 from "proj4";
import { Button, Card, Result, Table, Image } from "antd";
import MonografiaVertice from "./monografia-vertice";
import { isFocusable } from "@testing-library/user-event/dist/utils";
import BooleanPointInPolygon from "@turf/boolean-point-in-polygon"



const WGS84UTM = "EPSG:32719"
const GEO = "EPSG:3857"
const WGS84GEO="EPSG:4326"
proj4.defs(GEO,"+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs +type=crs")
proj4.defs(WGS84UTM,"+proj=utm +zone=19 +south +datum=WGS84 +units=m +no_defs +type=crs");
proj4.defs(WGS84GEO,"+proj=longlat +datum=WGS84 +no_defs +type=crs");

const isThereFile = (nombreVertice) =>{
    return new Promise((resolve)=>{
        let img = new window.Image()
    img.src = `monografias/${nombreVertice}.jpg`

    img.onload=()=> resolve(true)
    img.onerror=()=> resolve(false)
    }
    
    )
    
}
const PopupMarker = ({feature, popupRef, isPopupVisible})=>{
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
    const map = useMap()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [imagenExiste, setImagenExiste] = useState(null)
    console.log(map._zoom)
    let lat = feature.geometry.coordinates[1]
    let lng =feature.geometry.coordinates[0]
    let coordinatesZoom = {lat, lng}
    let actualZoom = map._zoom
    //map.flyTo(coordinatesZoom, actualZoom)
     

    useEffect(()=>{
        isThereFile(feature.properties.nombre_punto).then(result=>
            setImagenExiste(result))
            
        
    },[feature])
    
    const showModal = ()=>{
        setIsModalOpen(true)
        isPopupVisible()
        
    }
    const hideModal = ()=>{
        
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
            
                <Table 
                    pagination={false}
                    size='small'
                    style={{marginBottom:10
                    }}
                    columns={columns} 
                    dataSource={dataSource}>
                </Table>
                {imagenExiste && <Button  block type="primary" onClick={showModal}>Monografía</Button>}
                <MonografiaVertice nombrePunto={feature.properties.nombre_punto} visible={isModalOpen} hideModal={hideModal}/>
        </div>
    )
}


const GeodeticMarkerLayer = ({wfsData, getComunaFilter, setDataFilter})=>{
    const map = useMap()
    const [zoom, setZoom] = useState(null)
    const [zoomPopup, setZoomPopup] = useState(null)
    const [data, setData] = useState(null)
    const popupRef = useRef()
    const comunaFilter = getComunaFilter()
    

   
    const isPopupVisible = ()=>{
        if (popupRef.current){
            popupRef.current._closeButton.click()
        }
    }

    map.on("zoom",(e)=>{
        
        if (e.target._zoom > 14){
            setZoom(true)
        }else if(e.target._zoom > 10 && e.target._zoom < 15){
            setZoomPopup(true)
            setZoom(null)
        }else if(e.target._zoom < 14){
            setZoom(null)
            //setZoomPopup(null)
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

        const filterData = useMemo(()=>{
            return data ? data.features.filter((currentFeature)=>{
                let filterByGeo = true;
                if(comunaFilter){
                    filterByGeo = BooleanPointInPolygon(currentFeature, comunaFilter)
                    
                }
                
                return filterByGeo
            }) : []
        },[data, comunaFilter]) 
        
        
        useEffect(()=>{
            if (filterData.length > 0){
                setDataFilter(filterData)
            }else{
                setDataFilter(data)
            }
            
        },[filterData])

        if (!data){
            return <div>...Loading</div>
        }
              

        const layer = filterData.map((feature)=>{
            
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
                {zoomPopup &&
                    <Popup offset={[-10, 25]}  >
                       <PopupMarker feature={feature} popupRef={popupRef} isPopupVisible={isPopupVisible}></PopupMarker>
                    </Popup>}
                </Marker>
        
                )
        
            }
            )        
            
    return (
       <LayersControl.Overlay  checked name="Red Geodésica">
        <LayerGroup>{layer}</LayerGroup>
       </LayersControl.Overlay >
    
    )
}

export default GeodeticMarkerLayer

