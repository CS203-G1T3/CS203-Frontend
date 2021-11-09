import React, {useState} from "react";
import {Modal, Button} from "antd";
import { UserIcon } from '@heroicons/react/solid';

const PopUps = ({ header, value, title, body}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    }

    const handleOk = () =>{
        setIsModalVisible(false);
        
    }

    const handleCancel = () => {
        setIsModalVisible(false);
      };
    
    return(
        <>                       
            <button className="flex flex-col" onClick={showModal}>
                <span className="text-gray-400">{header}</span>
                <span className="text-3xl font-bold">{value}</span>
            </button>    
            <Modal
                title={title}
                visible={isModalVisible}
                onOk={handleOk}
                okText={<a href = "https://www.enterprisesg.gov.sg/media-centre/media-releases/2021/september/mr06721_updated-advisory-for-safe-management-measures-at-food_beverage-establishments" target="_blank">READ MORE</a>}
                okType="round"
                onCancel={handleCancel}
                cancelButtonProps={{style:{display:'none'}}}
            >
                <p className="text-2xl">Safe Management Measures for F&B Establishments - Coffee Shops</p>
                <p className="text-blue-600">Updated as of 27 July 2021</p>
                <p className ="text-900">{body}</p>
                <p className="text-gray-600">Safe Management Measures are mandated by the Ministry of Manpower (MOM) and the Multi Ministry Task Force.</p>
            </Modal>
        </>
    );
}

export default PopUps;

