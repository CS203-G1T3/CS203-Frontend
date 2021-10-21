import React, { useEffect, useState } from 'react'
import { Form, Input, Button} from 'antd';
import { useRouter } from "next/router";
import { addIndustry } from '../../services/industryService';


//issue: error 403 although clientId is being inputted in


function IndustryForm({adminId}) {
    const router = useRouter()

    const onFinish = async (values) => {
        const res = await addIndustry(
            adminId,
            values.industryName,
            values.subIndustryName,
            values.industryDesc,
            console.log(adminId)
        )
        console.log(res)
        if (res) router.reload(window.location.pathname)
    }
    
    const onFinishFailed = (errorInfo) => {
        alert("Industry creation failed!")
    }
    return(
        <Form
        name="basic"
        labelCol={{
            span: 7,
        }}
        wrapperCol={{
            span: 10,
        }}
        initialValues={{
            remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        >
        <Form.Item
            label="Name of Industry"
            name="industryName"
            rules={[
            {
                required: true,
                message: `Please enter the name of industry!`,
            },
            ]}
        >
            <Input />
        </Form.Item> <br></br>

        <Form.Item
            label="Name of Sub-Industry"
            name="subIndustryName"
            rules={[
            {
                required: true,
                message: `Please enter the name of subIndustry!`,
            },
            ]}
        >
            <Input />
        </Form.Item> <br></br>

        <Form.Item
            label="Description of industry and sub-industry"
            name="industryDesc"
            rules={[
            {
                required: true,
                message: `Please enter a description of the industry and sub-industry!`,
            },
            ]}
        >
            <Input />
        </Form.Item> <br></br>
        <Form.Item
            wrapperCol={{
            offset: 8,
            span: 16,
            }}
        >
            <Button type="primary" htmlType="submit"> Add Industry</Button>
        </Form.Item>

        </Form>
)
   
    
}

export default IndustryForm

