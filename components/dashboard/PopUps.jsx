import React, {useState} from "react";
import {Modal, Button} from "antd";

const PopUps = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    }

    const handleOk = () =>{
        setIsModalVisible(false);
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    }

    return(
        <>
        <button type="primary" onClick={showModal}>
            Open
        </button>
        <Modal
            title = "Basic Modal"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
        >
        
        </Modal>
        </>
    );
}

export default PopUps;
