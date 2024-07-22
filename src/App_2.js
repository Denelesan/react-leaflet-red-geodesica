import React, { useEffect, useState } from 'react';
import './App.css';
import {  Table } from 'antd';


function App() {
  const [columns, setColumns] =  useState([])

  const [dataSource, setDataSource] = useState([])

  useEffect(()=>{
    fetch('https://dummyjson.com/comments')
    .then(res => res.json())
    .then((result)=>{
      const list = result.comments || []
      const firstObject = list[0] || {}
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
      setDataSource(result.comments)
    });


  },[])

  return (
    <div>
      <Table columns={columns} dataSource={dataSource}></Table>  
    </div>
  );
}

export default App;
