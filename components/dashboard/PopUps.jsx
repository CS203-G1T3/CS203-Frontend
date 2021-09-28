import React, {useState} from "react";
import {Modal, Button} from "antd";

const PopUps = ({ header, value, title, body, disclaimer}) => {
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
        <div className="flex flex-col items-baseline shadow-xl h-50 w-60 m-4 bg-gray-200 rounded-lg p-4" id="open-btn">
            <p className="order-first">{header}</p>
            <p className="order-second text-2xl font-bold">{value}</p>
            <button type="primary" onClick={showModal}>
                Click here for more details
            </button>
            <Modal
                title={title}
                visible={isModalVisible}
                onOk={handleOk}
                okText={<a href = "https://www.stb.gov.sg/content/stb/en/home-pages/advisory-for-food-and-beverage-establishments.html" target="_blank">READ MORE</a>}
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
    
    );
}

export default PopUps;

