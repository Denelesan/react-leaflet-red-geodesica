
import Modal from "antd/es/modal/Modal"


const MonografiaVertice = ({nombrePunto, visible, showModal,hideModal})=>{

    

    return (
        <>
        <Modal 
            title={<h4>Monografía de: {nombrePunto}</h4>}
            open={visible} 
            footer={null}
            handleOk={showModal} 
            onCancel={hideModal}
            >
            <h1>Capa de Prueba</h1>
        </Modal>
        
        </>
    )

}

export default MonografiaVertice