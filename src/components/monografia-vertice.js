
import { Button, Image } from "antd"
import Modal from "antd/es/modal/Modal"

import { useState } from "react"

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
                <Button key={nombrePunto} block type="primary">
                    Descargar
                </Button>:null
            ]}
            handleOk={showModal} 
            onCancel={hideModal}
            height={"100%"}
            //width={"20%"}
            closable={false}
            style={{
                padding:20
            }}
            centered={true}
            >
            <Image
            preview={false}
            height={"100%"}
            //width="100%"
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