import { useEffect, useState } from "react";
import { LayerGroup, LayersControl, Marker, Popup } from "react-leaflet";
import defaultIcon from "../icon/defaultIcon";
import proj4 from "proj4";
import { Card, Table } from "antd";


const WGS84UTM = "EPSG:32719"
const GEO = "EPSG:3857"
const WGS84GEO="EPSG:4326"
proj4.defs(GEO,"+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs +type=crs")
proj4.defs(WGS84UTM,"+proj=utm +zone=19 +south +datum=WGS84 +units=m +no_defs +type=crs");
proj4.defs(WGS84GEO,"+proj=longlat +datum=WGS84 +no_defs +type=crs");

const PopupMarker = ({feature})=>{
    const [columns, setColumns] = useState([{
        title: "Id",
        dataIndex: "nombre:punto",
        key:"id"
    }])
    const [dataSource, setDataSource] = useState([])

    console.log(feature)
    
    return (
        <div>
            
                <Table columns={columns} dataSource={dataSource}>

                </Table>
            
        </div>
    )
}


const GeodeticMarkerLayer = ({wfsData})=>{
    const [data, setData] = useState(null)
   
    //console.log(data)
    useEffect(()=>{
        wfsData
        .then(data=>{
            setData(data);
        })
        .catch(error =>{
            console.error("Error al traer WFS Data", error)
        })
    },[wfsData])
        if (!data){
            return <div>...Loading</div>
        }
       
        const layer = data.features.map((feature)=>{
            const {coordinates} = feature.geometry
            const reProjCoordinates = proj4(WGS84UTM, WGS84GEO, coordinates)
            
            return (
                <Marker
                key={String(coordinates)} 
                position={[reProjCoordinates[1], reProjCoordinates[0]]}
                icon={defaultIcon}
                >
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

