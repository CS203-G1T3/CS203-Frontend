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
        <div className="flex shadow-xl h-40 w-70 bg-indigo-50 rounded-lg p-4" id="open-btn">
            <div className="flex">
                <UserIcon className="h-16 w-16"/>
            </div>
            
            <div className="flex flex-col h-full pl-2">
                <span className="">{header}</span>
                <span className="text-2xl font-bold">{value}</span>
                <button className="absolute mt-28 text-red-500 mr-4" onClick={showModal}>
                    Click here for more details
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
            </div>

        </div>
    
    );
}

export default PopUps;

