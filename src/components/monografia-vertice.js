import Modal from "antd/es/modal/Modal"


const MonografiaVertice = ({getIsModalOpen,setIsModalOpen, handleOk,handleCancel})=>{

/*const [isModalOpen, setIsModalOpen] = useState(false)

const showModal = ()=>{
    setIsModalOpen(true)
}
const handleOk = ()=>{
    setIsModalOpen(false)
}

const handleCancel = ()=>{
    setIsModalOpen(false)
}*/
const isModalOpen = getIsModalOpen()


    return (
        <>
        <Modal 
            title="Vertice 1" 
            open={isModalOpen} 
            footer={null}
            handleOk={handleOk} 
            handleCancel={handleCancel}
            >
            <h1>Capa de Prueba</h1>
        </Modal>
        
        </>
    )

}

export default MonografiaVertice