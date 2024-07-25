import React, { useEffect, useState } from 'react';
import './App.css';
import {  Table } from 'antd';

const urlWFSRedGeodesica = 'http://163.247.53.138:443/geoserver/serviu/wfs?' +
                                'service=wfs&' +
                                'version=2.0.0&' +
                                'request=GetFeature&' +
                                'typeNames=serviu:vw_vertices_geodesicos_vigentes&' +                            
                                'outputFormat=application%2Fjson'

function App() {
  const [columns, setColumns] = useState([])
  const [data, setData] = useState([])

  useEffect(()=>{
    fetch(urlWFSRedGeodesica)
      .then(res=>res.json())
      .then(result=>{
        const list = result.features || []
        const firstObject = list[0].properties || {}
        const cols = []
        
        for (let key in firstObject){
          const col = {
            title:key,
            dataIndex:key,
            key:key
          }
          cols.push(col)
        }
        setColumns(cols)
        
        

        const simpleDataArray = list.map(feature=>{
           return{
            ...feature.properties}
          
        })
       setData(simpleDataArray)
      
      })
  },[])
  return (
    <div>
      <Table columns={columns} dataSource={data}></Table>  
    </div>
  );
}

export default App;
