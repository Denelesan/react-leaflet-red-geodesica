
import { Button, Image } from "antd"
import Modal from "antd/es/modal/Modal"

import { useState } from "react"

import { downloadImage } from "../utils/functions/all-functions"
//const images = require.context("../images/monografias")
const MonografiaVertice = ({nombrePunto, visible, showModal,hideModal})=>{

    const [isLoadImage, setIsLoadImage] = useState(true)
    
    
    
    //const imagenPunto = images(`./${nombrePunto}.jpg`)
    const imagenPunto = `monografias/${nombrePunto}.jpg`
    const fallbackImage = "https://static.vecteezy.com/system/resources/previews/004/726/030/non_2x/warning-upload-error-icon-with-cloud-vector.jpg"


    return (
        <>
        
        <Modal 
            //title={<h4>Monografía de: {nombrePunto}</h4>}
            open={visible} 
            footer={[isLoadImage?
                <Button key={nombrePunto} size="small" block type="primary" onClick={()=>downloadImage(imagenPunto, nombrePunto)}>
                    Descargar
                </Button>:null
            ]}
            handleOk={showModal} 
            onCancel={hideModal}
            //height={"100vh"}
            //width={"20%"}
            closable={false}
            style={{
                padding:0
            }}
            centered={true}
            >
            <Image
            preview={false}
            height="85vh"
            width="100%"
            //src={isLoadImage? imagenPunto:fallbackImage}
            src={imagenPunto}
            fallback="https://static.vecteezy.com/system/resources/previews/004/726/030/non_2x/warning-upload-error-icon-with-cloud-vector.jpg"
            onError={()=>setIsLoadImage(false)}
          
            

            />
        </Modal>
        
        </>
    )

}

export default MonografiaVertice